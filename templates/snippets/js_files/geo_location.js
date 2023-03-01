

// LOGIC 1 start
const findMyState = () => {
    const status = document.querySelector('.status')

    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.warn(latitude + ' ' + longitude)

        const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

        fetch(geoApiUrl)
        .then(res => res.json())
        .then(data => {
            console.warn(data)
            status.textContent = data.principalSubdivision + " " + latitude + " " + longitude;
        })
    }

    const error = () => {
        status.textContent = 'Unable to retrieve your location';
    }

    navigator.geolocation.getCurrentPosition(success,error)

}
document.querySelector('.find-state').addEventListener('click', findMyState)
// LOGIC 1 end

// LOGIC 2 start
const getLocation = () => {
    // get the location from the user
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition, showError, options);
    }else{
        alert("Geolocation is not supported by this browser.");
    }
}
const options = {
    enableHihAccuracy:true,
    timeout:5000,
    maximumAge:0
}
const showPosition = (position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    console.warn(lat, long)
    sample(lat, long)

}

const showError = (error) => {
    console.warn(error)
    switch(error.code){
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.")
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
}
// LOGIC 2 start

// LOGIC 3 start
const getLocationByIp = () => {
    // get the user locaiton with ip address
    fetch("https://ipapi.co/json/")
    .then((response) => response.json())
    .then((data) => {
        console.warn(data)
    })
}
// LOGIC 3 end


//var map;
//function initialize(){
//     var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
//     var myOptions = {
//         zoom: 4,
//         center: myLatlng,
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//         }
//      map = new google.maps.Map(document.getElementById("map"), myOptions);
//      var marker = new google.maps.Marker({
//          position: myLatlng,
//          map: map,
//      title:"Fast marker"
//     });
//}
//
//google.maps.event.addDomListener(window,'load', initialize);



//$(document).ready(function (){
//     var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
//     var myOptions = {
//         zoom: 4,
//         center: myLatlng,
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//         }
//      var map = new google.maps.Map($('#map'), myOptions);
//      var marker = new google.maps.Marker({
//          position: myLatlng,
//          map: map,
//      title:"Fast marker"
//     });
//})

//
//function myMap() {
//var mapProp= {
//  center:new google.maps.LatLng(51.508742,-0.120850),
//  zoom:5,
//};
//var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
//}

//function initMap() {
//  // The location of Uluru
//  const uluru = { lat: -25.344, lng: 131.031 };
//  // The map, centered at Uluru
//  const map = new google.maps.Map(document.getElementById("map"), {
//    zoom: 4,
//    center: uluru,
//  });
//  // The marker, positioned at Uluru
//  const marker = new google.maps.Marker({
//    position: uluru,
//    map: map,
//  });
//}
//
//window.initMap = initMap;

function sample() {
    var myLatlng = new google.maps.LatLng(28.7026156,77.1036564);

    var choice1 = {
        center: myLatlng,
        zoom:15,
        mapTypes: google.maps.MapTypeId.ROADMAP
    };

    var i = new google.maps.Map(document.getElementById("m1"),choice1);

    var marker = new google.maps.Marker({
        position: myLatLng,
        i,
        title: "Hello World!",
    });
}