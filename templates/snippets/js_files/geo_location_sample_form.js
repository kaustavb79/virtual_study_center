"use strict"
var startId, trackId ;

console.warn('geo_location_sample_form loaded...')
$(document).ready(function(){
    geo_location_sample_form_event()
});


function geo_location_sample_form_event(){
//    document.querySelector('.find-state').addEventListener('click', getLocation)
//    $('.find-state').unbind('click', getLocation)
//    $('.find-state').bind('click', getLocation)
}


getLocation();



/////////////////////////////
var geoBtn= document.getElementById("next_btn_outer")
function getLocation() {
    navigator.permissions.query({
        name: 'geolocation'
    }).then(function(result) {
        if (result.state == 'granted') {
            console.warn('--1--');
            report(result.state);
        } else if (result.state == 'prompt') {
            console.warn('--2--');
            report(result.state);
        } else if (result.state == 'denied') {
            console.warn('--3--');
            report(result.state);
        }
        result.onchange = function(e) {
            console.warn('--4--');
            report(result.state);
        }
    });
    render_location_required_div("before");
}



function report(state) {
    console.warn('Permission ' + state);
     if (state == 'granted') {
         console.warn('--5--');
         hide_next_btn();
         trackId = navigator.geolocation.getCurrentPosition(showPosition, showError, options);
     }
     else if (state == 'prompt') {
        console.warn('--6--');
        hide_next_btn();
         trackId = navigator.geolocation.getCurrentPosition(showPosition, showError, options);
     }
     else if (state == 'denied'){
         console.warn('--7--');
         geolocation_permission_denied_fn();
         hide_next_btn()
     }
}

function show_next_btn(){
    geoBtn.style.display = 'flex';
}
function hide_next_btn(){
    geoBtn.style.display = 'none';
}
/////////////////////////
