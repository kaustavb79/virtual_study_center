/////// start /////
var map;
var markers = [];
function initMap() {
  // The location of Uluru
  const uluru = { lat: 13.7460, lng: 0 };

  // The map, centered at Uluru
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2,
    center: uluru,
  });

<!--  // The marker, positioned at Uluru-->
<!--  const marker = new google.maps.Marker({-->
<!--    position: uluru,-->
<!--    map: map,-->
<!--  });-->
}
window.initMap = initMap;
initMap()
/////// end /////


/////// start /////
function initialize() {
  var input = document.getElementById('searchTextField');
  var autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        document.getElementById('city2').value = place.name;
        document.getElementById('cityLat').value = place.geometry.location.lat();
        document.getElementById('cityLng').value = place.geometry.location.lng();

        var lat = place.geometry.location.lat();
        var lng = place.geometry.location.lng();
        var location_name = place.name;
        // alert(lat+' '+lng)

        var search_location = { lat: lat, lng: lng, title:location_name }
        // const marker = new google.maps.Marker({
        //    position: search_location,
        //    map: map,
        //    title: location_name,
        //  });
          deleteMarkers();
          addMarker(search_location, place)

    });
}
google.maps.event.addDomListener(window, 'load', initialize);
/////// end /////


/////// start /////
// function addMarker(data) {
//    var marker = new google.maps.Marker({
//      position: new google.maps.LatLng(data.lat, data.lng),
//      map: map
//    });
/////// end /////


/////// start /////
// Adds a marker to the map and push to the array.
function addMarker(position, place) {
  const marker = new google.maps.Marker({
    position,
    map,
    title: position.title,
    draggable: true,
  });
  markers.push(marker);

  setZoom(map, position)
  addPopup(marker, place)
}

function get_popup_content(place){
    var name = place.name;
    var adr_address = place.adr_address;
    var formatted_address = place.formatted_address;
    var content = `
        <div class="popup_div">
            <div class="popup_name">${name}</div>
            <div class="popup_add">${formatted_address}</div>
            <div class="add_address_div">
                <div class="add_address"></div>
            </div>
        </div>
    `;
    return content;
}

function addPopup(marker, place){
 var content = get_popup_content(place)

  var popup = new google.maps.InfoWindow({
    content: content,
    maxWidth: 300
  });

  popup.open(map, marker);
}

function setZoom(map, pt){
// set zoom
  map.setCenter(pt);
  map.setZoom(15);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function hideMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  hideMarkers();
  markers = [];
}
/////// end /////