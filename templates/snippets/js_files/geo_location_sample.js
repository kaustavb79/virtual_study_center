{% load static %}
var map_locations = [];
var position_val = "";
var position_distance_meter_val = "";
var position_msg = "";
// get geo location start
var is_geolocation_allowed = false;
//var getLocation = () => {
//    // get the location from the user
//    if(navigator.geolocation){
//        navigator.geolocation.getCurrentPosition(showPosition, showError, options);
//    }else{
//        alert("Geolocation is not supported by this browser.");
//    }
//    render_location_required_div("before")
//}
var options = {
    enableHihAccuracy:true,
//    timeout:5000,
//    maximumAge:0
}
var showPosition = (position) => {

    position_val = position;
    geolocation_permission_granted_fn();

    let lat = position.coords.latitude;
    let long = position.coords.longitude;

//    console.warn(lat, long)
    sample(lat, long);
    show_next_btn();
//    initMap();
//    initialize();

}
var showError = (error) => {
    geolocation_permission_denied_fn();
    console.warn(error)
    switch(error.code){
        case error.PERMISSION_DENIED:
            alert("You have denied the request for Geolocation.")
            break;

        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.")
            break;

        case error.TIMEOUT:
            alert("The request to get user location time out.")
            break;

        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.")
            break;

        default:
            alert("An unknown error occurred.")
    }
    hide_next_btn()
}
// get geo location end














function geolocation_permission_granted_fn(){
    is_geolocation_allowed = true;

    $(".map_div").removeClass("dn");
    $(".check_in_out_div_outer").removeClass("dn");
    $(".distance_div").removeClass("dn");

//    render_location_required_div("after", true);
    $(".location_required_div").addClass('dn');
}
function geolocation_permission_denied_fn(){
    is_geolocation_allowed = false;

    $(".map_div").addClass("dn");
    $(".check_in_out_div_outer").addClass("dn");
    $(".distance_div").addClass("dn");

    render_location_required_div("after", false);
    $(".location_required_div").removeClass("dn");

    $(".your_location_cls").html("");


}

function render_location_required_div(status, is_permission=null){
    var location_required_div_html = "";
    var location_required_div_text_html = "";
    var status_html = "";

    if(status == "before"){

    }else if(status == "after"){
        if(is_permission){

        }else{
            status_html = `<div class="p5">You denied the request for Geolocation.</div>`;
        }
    }else{
        console.warn("something went wrong")
    }


    {% if request.is_mobile %}
        location_required_div_text_html = `<div class="location_required_div_text_m">
                                        ${status_html}
                                        <div class="p5">
                                            To verify your location, please turn on GPS / Location in settings.
                                        </div>
                                    </div>`;
    {% else %}
        location_required_div_text_html = `<div class="location_required_div_text_d">
                                            ${status_html}
                                            <div class="p5">
                                                To verify your location, please allow geolocation permission and reload the page.
                                            </div>
                                        </div>`;
    {% endif %}

    location_required_div_html = `<img class="" src="{% static 'images/error.png' %}">
                                    <div class="location_required_div_head">Location required</div>
                                    <div class="location_required_div_text">${location_required_div_text_html}</div>`;

    $(".location_required_div").html(location_required_div_html);
}

function render_location_distance(distance_meter, radius_allowed_in_meters, status){
    var msg_html = "";
    if(distance_meter){
        if(status == "true"){
            position_msg = `You are within the school premises.`;
            msg_html = `<div class="distance_div_inner valid flx">${position_msg}</div>`;
        }else if(status == "false"){
            position_msg = `You are ${distance_meter.toFixed(1)} meter away from the school premises.`;
           msg_html = `<div class="distance_div_inner invalid flx">${position_msg}</div>`;
        }
    }
    else{
       position_msg = `School location is not registered yet.`;
       msg_html = `<div class="distance_div_inner not_available flx">${position_msg}</div>`;
    }

    $(".distance_div").html(msg_html)
}

//document.querySelector('.find-state').addEventListener('click', getLocation)

// LOGIC 2 start
var map, lat1, long1, lat2, long2, distance_km, distance_meter, status, user_radius;



// set school lat long
//var school_lat_long = {
//    "lat":28.7026156,
//    "long":77.1036564
//}

//var school_lat_long = {
//    "lat":28.703426,
//    "long":77.105662
//}

var school_geolocation = {};
{% if request.user.profile.school_id.school_geolocation %}
    school_geolocation = {{request.user.profile.school_id.school_geolocation|safe}};
{% else %}
    school_geolocation = {};
{% endif %}






// set radius allowed in meter

var radius_allowed_in_meters;
try{
    radius_allowed_in_meters = school_geolocation["radius_allowed_in_meters"];
}catch{
    // school radius allowed in meter not present
    // radius_allowed_in_meters set to default 100 meter radius
    radius_allowed_in_meters = 100;
}


function sample(lat, long) {
    if(lat, long){

        var myLatlng = new google.maps.LatLng(lat, long);
        var choice1 = {
            center: myLatlng,
            zoom:15,
            disableDefaultUI: true,
            streetViewControl: false,
            mapTypes: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("m1"),choice1);

        var myMarker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: "Hello World!",
            animation: google.maps.Animation.DROP,
        });



        // user lat long for draw circle
        lat1 = lat;
        long1 = long;
        map_locations.push(['your_location',lat1,long1,1])

        // school lat long for draw circle
        lat2 = school_geolocation["lat"];
        long2 = school_geolocation["long"];
        map_locations.push(['school_location',lat2,long2,2])



        console.warn("user_lat_long---"+lat1, long1)
        console.warn("school_lat_long---"+lat2, long2)

        distance_km = calcCrow(lat1, long1, lat2, long2)
        distance_meter = distance_km * 1000;
        position_distance_meter_val = distance_meter;

//        alert("distance_meter "+ distance_meter)

        if(distance_meter<=radius_allowed_in_meters){
            status = true;
        }else{
            status = false;
        }

        render_location_distance(distance_meter, radius_allowed_in_meters, status)


        // school circle draw
        if (!jQuery.isEmptyObject(school_geolocation)){
            drawOnclick(lat2, long2, radius_allowed_in_meters, status)
        }

        // user circle draw
        user_radius = 15;
//        drawOnclick(lat1, long1, user_radius, status)


        addYourLocationButton(map, myMarker)

//        map.setCenter(myLatlng);

    }else{

    }
}







function render_map(){

}

function drawOnclick(lat, long, radius, status) {
    var strokeColor = "#333";
    var fillColor = "#bababa";

    if(status == "true"){
        strokeColor = "green";
        fillColor = "green";
    }else if(status == "false"){
        strokeColor = "red";
        fillColor = "red";
    }

//    console.warn(lat, long, radius, status)

    // alert("clicked");
    var antennasCircle = new google.maps.Circle({
      strokeColor: strokeColor,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: fillColor,
      fillOpacity: 0.35,
      map: map,
      center: {
        lat: lat,
        lng: long
      },
      radius: radius
    });
    // set ZOOM and POSITION fit to drawed
//    map.fitBounds(antennasCircle.getBounds());
  }

//alert(calcCrow(28.7026156,77.1036564,28.701812, 77.106728).toFixed(1));



//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1, long1, lat2, long2)
{
  var R = 6371; // earth radius in km
  var dLat = toRad(lat2-lat1);
  var dLong = toRad(long2-long1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLong/2) * Math.sin(dLong/2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value)
{
    return Value * Math.PI / 180;
}































///////////// add your location button start ////////////////

var school_location = {lat:school_geolocation["lat"], lng:school_geolocation["long"]};
{% load static %}
function addYourLocationButton(map, marker){
	var controlDiv = document.createElement('div');

	var firstChild = document.createElement('button');
	firstChild.style.backgroundColor = '#fff';
	firstChild.style.border = 'none';
	firstChild.style.outline = 'none';
	firstChild.style.width = '28px';
	firstChild.style.height = '28px';
	firstChild.style.borderRadius = '25px';
	firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
	firstChild.style.cursor = 'pointer';
	firstChild.style.marginRight = '10px';
	firstChild.style.padding = '0px';
	firstChild.title = 'Your Location';
	controlDiv.appendChild(firstChild);

	var secondChild = document.createElement('div');
	secondChild.style.margin = '5px';
	secondChild.style.width = '18px';
	secondChild.style.height = '18px';
	secondChild.style.backgroundImage = 'url({% static "/map/mylocation-sprite-1x.png" %})';
	secondChild.style.backgroundSize = '180px 18px';
	secondChild.style.backgroundPosition = '0px 0px';
	secondChild.style.backgroundRepeat = 'no-repeat';
	secondChild.id = 'you_location_img';
	firstChild.appendChild(secondChild);

	google.maps.event.addListener(map, 'dragend', function() {
		$('#you_location_img').css('background-position', '0px 0px');
	});

	firstChild.addEventListener('click', function() {
		var imgX = '0';
		var animationInterval = setInterval(function(){
			if(imgX == '-18') imgX = '0';
			else imgX = '-18';
			$('#you_location_img').css('background-position', imgX+'px 0px');
		}, 500);
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                // add your_location marker
                var myMarker = new google.maps.Marker({
                    map: map,
                    position: latlng
                });

//                // change marker position
//				marker.setPosition(latlng);

				map.setCenter(latlng);
				clearInterval(animationInterval);
				$('#you_location_img').css('background-position', '-144px 0px');

			});
		}
		else{
			clearInterval(animationInterval);
			$('#you_location_img').css('background-position', '0px 0px');
		}
	});

	controlDiv.index = 1;

    document.getElementById('your_location_id').innerHTML = "";
	document.getElementById('your_location_id').appendChild(controlDiv);

//	map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(controlDiv);
}


function initMap() {
    // create map
	map = new google.maps.Map(document.getElementById('m1'), {
        zoom: 15,
        center: school_location,
        disableDefaultUI: true,
	});

	// add school_location marker
	var myMarker = new google.maps.Marker({
		map: map,
		animation: google.maps.Animation.DROP,
		position: school_location
	});

    // add school_location premises
    var strokeColor = "#333";
    var fillColor = "#bababa";
    var antennasCircle = new google.maps.Circle({
      strokeColor: strokeColor,
      fillColor: fillColor,
      radius: radius_allowed_in_meters,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillOpacity: 0.35,
      map: map,
      center: school_location,
    });
    map.fitBounds(antennasCircle.getBounds());

//	addYourLocationButton(map, myMarker);
}

//$(document).ready(function(e) {
//	initMap();
//});

///////////// add your location button end ////////////////



















///////////// fit multiple point boundary start ////////////////


function initialize(map, map_locations) {
    var locations = map_locations;
    window.map = map;

//    window.map = new google.maps.Map(document.getElementById('m1'), {
//        mapTypeId: google.maps.MapTypeId.ROADMAP
//    });

    var infowindow = new google.maps.InfoWindow();

    var bounds = new google.maps.LatLngBounds();

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
        });

        bounds.extend(marker.position);

//        google.maps.event.addListener(marker, 'click', (function (marker, i) {
//            return function () {
//                infowindow.setContent(locations[i][0]);
//                infowindow.open(map, marker);
//            }
//        })(marker, i));
    }

    map.fitBounds(bounds);

//    var listener = google.maps.event.addListener(map, "idle", function () {
//        map.setZoom(3);
//        google.maps.event.removeListener(listener);
//    });
}
function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' + 'callback=initialize';
    document.body.appendChild(script);
}

//window.onload = loadScript;


///////////// fit multiple point boundary end ////////////////








































