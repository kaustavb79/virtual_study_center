// connectivity_test.js start

"use strict"
console.warn("connectivity_test.js loaded...");


var ct_MediaDevices;
var hasMicrophone = false;
var hasSpeakers = false;
var hasWebcam = false;

var isMicrophoneAlreadyCaptured = false;
var isWebcamAlreadyCaptured = false;

var firefox_no_camera_fafa = `<svg width="21" height="21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 172 172"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#000"><path d="M29.31055,21.75196l-7.55859,7.55859l13.64746,13.68945h-19.27442c-8.86035,0 -16.125,7.26465 -16.125,16.125v53.75c0,8.86035 7.26465,16.125 16.125,16.125h96.75c2.47754,0 4.8291,-0.58789 6.92871,-1.5957l22.84375,22.88574l7.64258,-7.64258zM172,41.82422l-43,24.39746v-7.09668c0,-8.90234 -7.22266,-16.125 -16.125,-16.125h-47.49317l10.75,10.75h36.74317c2.98145,0 5.375,2.39355 5.375,5.375v36.28125l10.75,10.75l43,24.01953zM16.125,53.75h30.02442l64.5,64.5h-94.52442c-3.02344,0 -5.375,-2.35156 -5.375,-5.375v-53.75c0,-3.02344 2.35156,-5.375 5.375,-5.375zM161.25,60.30078v51.39844l-32.25,-17.97266v-15.15918z"></path></g></g></svg>`;
var chrome_no_camera_fafa = `<svg width="21" height="18" viewBox="0 0 21 18" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M21.75 12V1.5H1.5v21h20.25v-.438a1.991 1.991 0 0 1-1.25.438H12V14a2 2 0 0 1 2-2h7.75z" id="a"/></defs><g transform="translate(-3 -6)"><mask id="b" fill="#fff"><use xlink:href="#a"/></mask><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" fill="#5A5A5A" mask="url(#b)"/><g transform="translate(13.5 13.5)"><rect fill="#DB4437" width="10.5" height="10.5" rx="2"/><path d="M5.25 6.04L3.204 8.086a.559.559 0 0 1-.79-.79L4.46 5.25 2.414 3.204a.559.559 0 0 1 .79-.79L5.25 4.46l2.046-2.046a.559.559 0 0 1 .79.79L6.04 5.25l2.046 2.046a.559.559 0 0 1-.79.79L5.25 6.04z" fill="#FFF"/></g></g></svg>`;


const allMediaStreams = [];
var localTracks = {
  videoTrack: null,
  audioTrack: null
};
var localStreams = {
  videoStream: null,
  audioStream: null
};

var mics = []; // all microphones devices you can use
var cams = []; // all cameras devices you can use
var currentMic; // the microphone you are using
var currentCam; // the camera you are using


var main_constraints = {
    video: {
        width: { ideal: 1280 },
        height: { ideal: 1024 },
//        facingMode: "environment"
    },
    audio : false,
}

// use front face camera
var useFrontCamera = false;



//facingMode: {exact: "environment"}
//facingMode: {exact: "user"}
//facingMode: "environment"
//facingMode: "user"
//environment
//user

//width: 1280,
//height: 720

//ct_init_devices_access_permissions_fn()
// 1.

var video = "";
$(document).ready(function() {
//    ct_init_devices_access_permissions_fn()
//    show_connectivity_test();
    video = document.getElementById('cnd-vr-record');

    connectivity_test_events();

//    const btnChangeCamera = document.querySelector("#btnChangeCamera");
//
//    // switch camera
//    btnChangeCamera.addEventListener("click", function () {
//        useFrontCamera = !useFrontCamera;
////        initializeCamera();
//    });

    $("#toggle").click(function(){
        useFrontCamera = !useFrontCamera;
    })
});

function connectivity_test_events(){
    $(".mic-list .dropdown-item").unbind("click.mic-list-dropdown-item", select_audio_device)
    $(".mic-list .dropdown-item").bind("click.mic-list-dropdown-item", select_audio_device)

    $(".mic-list-btn").unbind("click.mic-list-btn", toggle_mic_list_dropdown_fn)
    $(".mic-list-btn").bind("click.mic-list-btn", toggle_mic_list_dropdown_fn)

    $(".cam-list .dropdown-item").unbind("click.cam-list-dropdown-item", select_video_device)
    $(".cam-list .dropdown-item").bind("click.cam-list-dropdown-item", select_video_device)

    $(".cam-list-btn").unbind("click.cam-list-btn", toggle_cam_list_dropdown_fn)
    $(".cam-list-btn").bind("click.cam-list-btn", toggle_cam_list_dropdown_fn)

    $(".ct_luein-modal-button.finish").unbind("click.finish", finish_device_selection)
    $(".ct_luein-modal-button.finish").bind("click.finish", finish_device_selection)

    $(".ct_luein-modal-button.cancel").unbind("click.cancel", cancel_device_selection)
    $(".ct_luein-modal-button.cancel").bind("click.cancel", cancel_device_selection)

    $("#btn-start-recording").unbind("click.start-recording", start_recording_stream)
    $("#btn-start-recording").bind("click.start-recording", start_recording_stream)

    $("#btn-stop-recording").unbind("click.stop-recording", stop_recording_stream)
    $("#btn-stop-recording").bind("click.stop-recording", stop_recording_stream)

    $("#btn-upload-recording").unbind("click.upload-recording", upload_recording_stream)
    $("#btn-upload-recording").bind("click.upload-recording", upload_recording_stream)

    $("#btn-cancel-recording").unbind("click.cancel-recording", cancel_recording_stream)
    $("#btn-cancel-recording").bind("click.cancel-recording", cancel_recording_stream)

}




function hide_connectivity_test(){
    $(".ct_luein-modal-container").addClass("dn");
}


function show_connectivity_test(){
    $(".ct_luein-modal-container").removeClass("dn");

    ct_init_devices_access_permissions_fn();
//    ct_init_devices_access_permissions_fn1()
}

var msg_time_out;
function ct_init_devices_access_permissions_fn1(){
    // call once when ct_init_devices_access_permissions_fn called,
    // show message for asking user to give permission to access user device
    // message shown after 1 sec if permission is pending
    msg_time_out = setTimeout(ct_show_allow_access_permissions_msg_fn_, 1000);
//    var constraints = {video:true, audio:true}
    var constraints = main_constraints
    console.warn('constraints---',constraints)
    // raise request to access mic and camera
    navigator.mediaDevices.getUserMedia(constraints)
    .then(stream =>{
        allMediaStreams.push(stream) // store all stream data into single object
        // get all devices using enumerateDevices
        navigator.mediaDevices.enumerateDevices()
        .then(devices => {
//            console.warn("--- 1.1 ---",devices);
            stream.stop(); // stop stream
            ct_init_devices_access_permissions_fn1_success(devices)
        })
        .catch(err => {throw err})
    })
    .catch(err => {
        ct_init_devices_access_permissions_fn1_error(err)
    })
}
function ct_init_devices_access_permissions_fn1_success(devices){
//    console.warn("--- 1.2 ---",devices);
    clearTimeout(msg_time_out); // clear msg_time_out to prevent ct_show_allow_access_permissions_msg_fn call
    dcc_close(); // close popup msg if opened at first time while asking for allow permission

    DetectRTC.load(callback);  // load fresh data to DetectRTC
    function callback(){
//        console.warn("--- 1.2.2 ---",devices);
        ct_MediaDevices = devices;
//        alert("--ct_init_devices_access_permissions_fn1_success----ct_MediaDevices---"+JSON.stringify(ct_MediaDevices))
        refresh_devices(devices); // override or refresh DetectRTC devices
        render_device_dropdown_fn();  // render all dropdown
//        updateDeviceList();
//        auto_set_devices();  // auto set devices
//        createElements(stream)
//        audio_check_logic_1_success(stream)  // audio_check.js is use for volume meter
//        audio_check_logic_2_success(stream)  // audio_check.js is use for volume meter
    }
}
function ct_init_devices_access_permissions_fn1_error(error) {

    clearTimeout(msg_time_out); // clear msg_time_out to prevent ct_show_allow_access_permissions_msg_fn call
    dcc_close(); // close popup msg if opened
    console.error(`-- ${error.code} -- ${error.name} -- ${error.message}`);

    // allow but busy
    //firefox - //-- 20 -- AbortError -- Starting videoinput failed
    //chrome - // -- 0 -- NotReadableError -- Could not start video source

    // not allow / block
    //firefox - //-- 0 -- NotAllowedError -- The request is not allowed by the user agent or the platform in the current context.
    //chrome - // -- 0 -- NotAllowedError -- Permission dismissed


    // allow but busy
    if(error.name == 'NotReadableError'||error.name == 'AbortError'){
        // Could not start after user permission, device is being used elsewhere
        ct_show_allow_access_permissions_msg_allow_but_use_somewhere_fn()
    }
     // not allow / block
    else if(error.name == 'NotAllowedError'){
        // Unable to capture after user denied
        ct_show_allow_access_permissions_msg_denied_fn()
    }
    //
    else{
        ct_show_allow_access_permissions_msg_denied_fn()
    }

}

function ct_init_devices_access_permissions_fn(){

//console.warn("calll.....")
    // call once when ct_init_devices_access_permissions_fn called,
    // show message for asking user to give permission to access user device
    // message shown after 0.5 sec if permission is pending
    msg_time_out = setTimeout(ct_show_allow_access_permissions_msg_fn_, 1000);
    var constraints = main_constraints



    console.warn('constraints---',constraints)

    // raise request to access mic and camera
	navigator.mediaDevices.getUserMedia(constraints)
	// handle if success of (raise request to access mic and camera)
    .then(stream =>
        navigator.mediaDevices.enumerateDevices()
        .then(devices => {
//            console.warn("--- 0.1 ---", devices);

            allMediaStreams.push(stream)
//            console.warn(" -- ct_init_devices_access_permissions_fn -- allMediaStreams.push(stream) ")
            //===============
            // issue..
            // 1. when user select any input device
            // 2. and refresh screen then
            // 3. stream after refresh is not correct with selected device
            // 4. stream start with default or first device in list
            set_localTracks(stream)
            //===============

            // here return stream and list of all devices
            return {"stream":stream, "devices":devices}
        })
        .catch(err => {throw err})
	)
	// call if user allow to access mic and camera
    .then(data => {
        // get the returned data of stream and list of all devices
        var devices = data["devices"];
        var stream = data["stream"];
//        console.warn("--- 0.2 ---", devices);

        clearTimeout(msg_time_out); // clear msg_time_out to prevent ct_show_allow_access_permissions_msg_fn call
        dcc_close(); // close popup msg if opened
        DetectRTC.load(callback);  // load fresh data to DetectRTC
        function callback(){
            ct_MediaDevices = devices;
//            alert("--ct_init_devices_access_permissions_fn----ct_MediaDevices---"+JSON.stringify(ct_MediaDevices))

            refresh_devices(devices);
            render_device_dropdown_fn()
            auto_set_devices();  // auto set devices

            if(constraints.video){
                createElements(stream)
            }

            if(constraints.audio){
                audio_check_logic_1_success(stream)  // audio_check.js is use for volume meter
    //            audio_check_logic_2_success(stream)  // audio_check.js is use for volume meter
            }

            show_device_selection();  // show every time device selection before video record
            show_finish_btn();

        }

//        stream.stop(); // stop the playing stream to release the mic and camera



        //// uncomment below lines for print the deviceId, kind and label
        //for (const mediaDeviceInfo of devices) {
        //    const {deviceId, kind, label} = mediaDeviceInfo;
        //    console.warn(deviceId, kind, label);
        //}

    })
    // call if user not allow to access mic and camera
    .catch(function(error) {

        clearTimeout(msg_time_out); // clear msg_time_out to prevent ct_show_allow_access_permissions_msg_fn call
        dcc_close(); // close popup msg if opened
console.error(`-- ${error.code} -- ${error.name} -- ${error.message}`);

// allow but busy
//firefox - //-- 20 -- AbortError -- Starting videoinput failed
//chrome - // -- 0 -- NotReadableError -- Could not start video source

// not allow / block
//firefox - //-- 0 -- NotAllowedError -- The request is not allowed by the user agent or the platform in the current context.
//chrome - // -- 0 -- NotAllowedError -- Permission dismissed


        // allow but busy
        if(error.name == 'NotReadableError'||error.name == 'AbortError'){
            // Could not start after user permission, device is being used elsewhere
            ct_show_allow_access_permissions_msg_allow_but_use_somewhere_fn()
        }
         // not allow / block
        else if(error.name == 'NotAllowedError'){
            // Unable to capture after user denied
            ct_show_allow_access_permissions_msg_denied_fn()
        }
        //
        else{
            ct_show_allow_access_permissions_msg_denied_fn()
        }

    });


}

function get_set_refreshed_devices_by_type(devices=[], type){
//    console.warn("--- get_set_refreshed_devices_by_type ---",devices)
    var MediaDevices = [];

     // to prevent duplication
    var alreadyUsedDevices = {};
    var audioInputDevices = [];
    var audioOutputDevices = [];
    var videoInputDevices = [];

    var isWebsiteHasMicrophonePermissions = false;
    var isWebsiteHasWebcamPermissions = false;

    devices.forEach(function(_device) {
        var device = _device;
        for (var d in _device) {
            try {
                if (typeof _device[d] !== 'function') {
                    device[d] = _device[d];
                }
            } catch (e) {}
        }
        if (alreadyUsedDevices[device.deviceId + device.label + device.kind]) {
            return;
        }

        // if it is MediaStreamTrack.getSources
        if (device.kind === 'audio') {
            device.kind = 'audioinput';
        }

        if (device.kind === 'video') {
            device.kind = 'videoinput';
        }

        if (!device.deviceId) {
            try{
                device.deviceId = device.id;
            }
            catch(err){

            }
//            catch(err){throw err}
        }

        if (!device.id) {
            device.id = device.deviceId;
        }



        if (!device.label) {
            device.isCustomLabel = true;
        try{
            if (device.kind === 'videoinput') {
            console.warn(device)
                device.label = 'Camera ' + (videoInputDevices.length + 1);
            } else if (device.kind === 'audioinput') {
                device.label = 'Microphone ' + (audioInputDevices.length + 1);
            } else if (device.kind === 'audiooutput') {
                device.label = 'Speaker ' + (audioOutputDevices.length + 1);
            } else {
                device.label = 'Please invoke getUserMedia once.';
            }
        }
        catch(err){

        }

            if (typeof DetectRTC !== 'undefined' && DetectRTC.browser.isChrome && DetectRTC.browser.version >= 46 && !/^(https:|chrome-extension:)$/g.test(location.protocol || '')) {
                if (typeof document !== 'undefined' && typeof document.domain === 'string' && document.domain.search && document.domain.search(/localhost|127.0./g) === -1) {
                    device.label = 'HTTPs is required to get label of this ' + device.kind + ' device.';
                }
            }
        } else {
            // Firefox on Android still returns empty label
            if (device.kind === 'videoinput' && !isWebsiteHasWebcamPermissions) {
                isWebsiteHasWebcamPermissions = true;
            }

            if (device.kind === 'audioinput' && !isWebsiteHasMicrophonePermissions) {
                isWebsiteHasMicrophonePermissions = true;
            }
        }


        if (device.kind === 'audioinput') {
            hasMicrophone = true;

            if (audioInputDevices.indexOf(device) === -1) {
                audioInputDevices.push(device);
            }
        }

        if (device.kind === 'audiooutput') {
            hasSpeakers = true;

            if (audioOutputDevices.indexOf(device) === -1) {
                audioOutputDevices.push(device);
            }
        }

        if (device.kind === 'videoinput') {
            hasWebcam = true;

            if (videoInputDevices.indexOf(device) === -1) {
                videoInputDevices.push(device);
            }
        }

        // there is no 'videoouput' in the spec.
        MediaDevices.push(device);

        alreadyUsedDevices[device.deviceId + device.label + device.kind] = device;
    })

    ///////////////////////////////////////////////////
    // override DetectRTC library fields by new data //
    ///////////////////////////////////////////////////
    // DetectRTC.load(); not working properly
//    DetectRTC.MediaDevices = MediaDevices; // after mobile device fixed
    DetectRTC.audioInputDevices = audioInputDevices;
    DetectRTC.audioOutputDevices = audioOutputDevices;
    DetectRTC.videoInputDevices = videoInputDevices;

    if(type === "audioinput"){
        return audioInputDevices;
    }
    else if(type === "audiooutput"){
        return audioOutputDevices;
    }
    else if(type === "videoinput"){
        return videoInputDevices;
    }else{
        return MediaDevices;
    }
}
function refresh_devices(ct_MediaDevices){
    get_set_refreshed_devices_by_type(ct_MediaDevices,null)

}
function get_videoinput(){
    return get_set_refreshed_devices_by_type(ct_MediaDevices,"videoinput")

}
function get_audioout(){
    return get_set_refreshed_devices_by_type(ct_MediaDevices,"audiooutput")

}
function get_audioinput(){
    return get_set_refreshed_devices_by_type(ct_MediaDevices,"audioinput")

}


function ct_show_allow_access_permissions_msg_fn_(){
//    console.warn("--- ct_show_allow_access_permissions_msg_fn_ ---")
    var confirmation_obj = {
        "icon":"",
        "head":`Allow LueinHire to use your camera and microphone`,
        "body":`LueinHire needs access to your camera and microphone so that your responses analyse after completing interview. LueinHire will ask you to confirm this decision on each browser and computer you use.`,
        "width":"400px",
        "action_type":"alert",
        "action_yes":action_yes,
        "action_no":action_no,
        "action_close":action_close,
        "position":"5",
        "alert_button_text":"Dismiss",
    }

    dynamic_confirmation(confirmation_obj);

    function action_yes(){
        //here define the code execute on action_yes
    }
    function action_no(){
        //here define the code execute on action_no
    }
    function action_close(){
        //here define the code execute on action_close
    }
}

function ct_show_allow_access_permissions_msg_denied_fn(){
//    alert('Unable to capture your camera. Please check console logs.');
//	displayAlert("Please allow microphone and camera access to your current browser", "error", 100000)

    var no_camera_icon = firefox_no_camera_fafa
    if(DetectRTC.browser.name == "Firefox"){
        no_camera_icon = firefox_no_camera_fafa;
    }else{
        no_camera_icon = chrome_no_camera_fafa;
    }

    var body = `<div class="">
                    LueinHire requires access to your camera and microphone.
                    Click the camera blocked icon
                    <div class="no_camera_icon_b">
                        <div class="no_camera_icon">
                            ${no_camera_icon}
                        </div>
                    </div>
                    in your browser's address bar.
                </div>`;


    var confirmation_obj = {
        "icon":"",
        "head":"Camera is blocked",
        "body":body,
        "width":"400px",
        "action_type":"alert",
        "action_yes":action_yes,
        "action_no":action_no,
        "action_close":action_close,
        "position":"5",
        "alert_button_text":"Dismiss",
    }

    dynamic_confirmation(confirmation_obj);

    function action_yes(){
        //here define the code execute on action_yes
    }
    function action_no(){
        //here define the code execute on action_no
    }
    function action_close(){
        //here define the code execute on action_close
    }

}

function show_block_msg_permanent(){

}

function ct_show_allow_access_permissions_msg_allow_but_use_somewhere_fn(){
//    alert('Something went wrong...!!!');
//	displayAlert("Something went wrong...!!!", "error", 100000)

	var confirmation_obj = {
        "icon":"",
        "head":"Something went wrong...!!!",
        "body":`Looks like the camera is being used in another browser or tab. Please check and retry again.`,
        "width":"400px",
        "action_type":"alert",
        "action_yes":action_yes,
        "action_no":action_no,
        "action_close":action_close,
        "position":"5",
        "alert_button_text":"Dismiss",
    }

    dynamic_confirmation(confirmation_obj);

    function action_yes(){
        //here define the code execute on action_yes
    }
    function action_no(){
        //here define the code execute on action_no
    }
    function action_close(){
        //here define the code execute on action_close
    }

}

function render_device_dropdown_fn(){
//    console.warn('--- render_device_dropdown_fn ---')
    var mic_dropdown_html = get_mic_device_dropdown_fn();
    var camera_dropdown_html = get_camera_device_dropdown_fn();
    $(".mic-list.dropdown-menu").html(mic_dropdown_html);
    $(".cam-list.dropdown-menu").html(camera_dropdown_html);
    connectivity_test_events();
}

function get_mic_device_dropdown_fn(){
    var devices = DetectRTC.audioInputDevices;
    var mic_dropdown_html = "";
    for(var i in devices){
        mic_dropdown_html += `<a class="dropdown-item" href="#">${devices[i].label}</a>`;
    }
    return mic_dropdown_html;
}

function get_camera_device_dropdown_fn(){
    var devices = DetectRTC.videoInputDevices;
    var camera_dropdown_html = "";
    for(var i in devices){
        camera_dropdown_html += `<a class="dropdown-item" href="#">${devices[i].label}</a>`;
    }
    return camera_dropdown_html;
}


function toggle_mic_list_dropdown_fn(){
    if($(".mic-list").closest(".input-group-prepend").hasClass("show")){
        hide_mic_list_dropdown_fn();
    }else{
        updateDeviceList();
        show_mic_list_dropdown_fn();
    }
}

function toggle_cam_list_dropdown_fn(){
    if($(".cam-list").closest(".input-group-prepend").hasClass("show")){
        hide_cam_list_dropdown_fn();
    }else{
        updateDeviceList();
        show_cam_list_dropdown_fn();
    }
}

function show_mic_list_dropdown_fn(){
    $(".mic-list").addClass("show");
    $(".mic-list").closest(".input-group-prepend").addClass("show");
}

function hide_mic_list_dropdown_fn(){
    $(".mic-list").removeClass("show");
    $(".mic-list").closest(".input-group-prepend").removeClass("show");
}

function show_cam_list_dropdown_fn(){
    $(".cam-list").addClass("show");
    $(".cam-list").closest(".input-group-prepend").addClass("show");
}

function hide_cam_list_dropdown_fn(){
    $(".cam-list").removeClass("show");
    $(".cam-list").closest(".input-group-prepend").removeClass("show");
}

function select_audio_device(auto_index=null){
//    console.warn("--- select_audio_device ---")
    var devices = DetectRTC.audioInputDevices;
    var new_index  = $(this).index();

    var old_selected_audio_device = get_selected_audio_device();
    var old_device_label, old_mic_index;
    var old_mic = {};
    if(old_selected_audio_device){
        old_device_label = old_selected_audio_device.label;
        old_mic = devices.find(function(device, index){
                        if(device.label === old_device_label)
                        {
                            device["index"] = index;
                            return device
                        }
                    });
        if(old_mic){
            old_mic_index = old_mic["index"]
        }
    }
    if((auto_index!=null)&&(Number.isInteger(auto_index))){
        if(old_mic_index != undefined){
            new_index = old_mic_index;
        }
        else{
          new_index = auto_index;
        }
    }

    var device = DetectRTC.audioInputDevices[new_index];
    var device_label = device.label;
    var deviceId = device.deviceId;

    // Call the first time Connectivity Test opens or loads
    if((auto_index!=null)&&(Number.isInteger(auto_index))){
//        $(".mic-input").val(device_label);
         // fix refresh issue
        set_stream_by_id(deviceId, device_label, selected_device_callback_fn_if)
        function selected_device_callback_fn_if(data){
            mics = devices;
            currentMic = devices.find(device => device.label === device_label);
            if(currentMic){
                var label = currentMic.label;
                $(".mic-input").val(label);
//                set_selected_audio_device(currentMic);
            }else{
                displayAlert("Select device is removed or not available, please check and try again...!!!", "warning", 2000)
                var reset_mic = devices[0]
                var reset_device_label = reset_mic.label;
                $(".mic-input").val(reset_device_label);
//                set_selected_audio_device(reset_mic);
            }
            hide_mic_list_dropdown_fn();
        }
    }
    else{
    // Call every time a user changes his device
         // fix refresh issue
        set_stream_by_id(deviceId, device_label, selected_device_callback_fn_else)
        function selected_device_callback_fn_else(data){
            mics = devices;
            currentMic = devices.find(device => device.label === device_label);
            if(currentMic){
                var label = currentMic.label;
                $(".mic-input").val(label);
                set_selected_audio_device(currentMic);
            }else{
                displayAlert("Select device is removed or not available, please check and try again...!!!", "warning", 2000)
                var reset_mic = devices[0]
                var reset_device_label = reset_mic.label;
                $(".mic-input").val(reset_device_label);
                set_selected_audio_device(reset_mic);
            }
            hide_mic_list_dropdown_fn();
        }
    }
}


function select_video_device(auto_index=null){
//    console.warn("--- select_video_device ---")
//    alert("--- select_video_device ---")

    var devices = DetectRTC.videoInputDevices;
    var new_index  = $(this).index();

    var old_selected_video_device = get_selected_video_device();
    var old_device_label, old_cam_index;
    var old_cam = {};

    if(old_selected_video_device){
        old_device_label = old_selected_video_device.label;
        old_cam = devices.find(function(device, index){
                        if(device.label === old_device_label)
                        {
                            device["index"] = index;
                            return device
                        }
                    });
        if(old_cam){
            old_cam_index = old_cam["index"]
        }
    }
    if((auto_index!=null)&&(Number.isInteger(auto_index))){
        if(old_cam_index != undefined){
            new_index = old_cam_index;
        }
        else{
          new_index = auto_index;
        }
    }

    var device = DetectRTC.videoInputDevices[new_index];
    var device_label = device.label;
    var deviceId = device.deviceId;

    // Call the first time Connectivity Test opens or loads
    if((auto_index!=null)&&(Number.isInteger(auto_index))){
//        $(".cam-input").val(device_label);
//    alert("--- select_video_device ---"+JSON.stringify("if")+"---")

        // Call every time a user changes his device
        set_stream_by_id(deviceId, device_label, selected_device_callback_fn_if)
        function selected_device_callback_fn_if(){
            cams = devices;
            currentCam = devices.find(device => device.label === device_label);
            if(currentCam){
                var label = currentCam.label;
                $(".cam-input").val(label);
//                set_selected_video_device(currentCam);
            }else{
                displayAlert("Select device is removed or not available, please check and try again...!!!", "warning", 2000)
                var reset_cam = devices[0]
                var reset_device_label = reset_cam.label;
                $(".cam-input").val(reset_device_label);
//                set_selected_video_device(reset_cam);
            }
            hide_cam_list_dropdown_fn();
        }
    }
    else{
//    alert("--- select_video_device ---"+JSON.stringify("else")+"---")

        // Call every time a user changes his device
        set_stream_by_id(deviceId, device_label, selected_device_callback_fn_else)
        function selected_device_callback_fn_else(){
            cams = devices;
            currentCam = devices.find(device => device.label === device_label);
            if(currentCam){
                var label = currentCam.label;
                $(".cam-input").val(label);
                set_selected_video_device(currentCam);
            }else{
                displayAlert("Select device is removed or not available, please check and try again...!!!", "warning", 2000)
                var reset_cam = devices[0]
                var reset_device_label = reset_cam.label;
                $(".cam-input").val(reset_device_label);
                set_selected_video_device(reset_cam);
            }
            hide_cam_list_dropdown_fn();
        }
    }



}

function auto_set_devices(){
//    select_audio_device(0);
    select_video_device(0);
}

function set_selected_audio_device(device){
   var device_json = "";
    var status = "fail";

    if(typeof device === 'object'){
        device_json = JSON.stringify(device);
    }else{
        status = "invalid device data";
        return status;
    }

    if (window.localStorage && device){
        try {
            window.localStorage.setItem('selectedAudioInput', device_json);
            status = "success";
        } catch (e) {
            console.warn(e)
            status = "fail";
        }
    }
    return status;
}

function get_selected_audio_device(){
    var device = {};
    if (window.localStorage) {
        try {
            var device_json = window.localStorage.getItem('selectedAudioInput');
            device = JSON.parse(device_json);
        } catch (e) {
            console.warn(e)
        }
    }
    return device
}


function set_selected_video_device(device){
    var device_json = "";
    var status = "fail";

    if(typeof device === 'object'){
        device_json = JSON.stringify(device);
    }else{
        status = "invalid device data";
        return status;
    }

    if (window.localStorage && device){
        try {
            window.localStorage.setItem('selectedVideoInput', device_json);
            status = "success";
        } catch (e) {
            console.warn(e)
            status = "fail";
        }
    }
    return status;
}

function get_selected_video_device(){
    var device = {};
    if (window.localStorage) {
        try {
            var device_json = window.localStorage.getItem('selectedVideoInput');
            device = JSON.parse(device_json);
        } catch (e) {
            console.warn(e)
        }
    }
    return device
}



function set_stream_by_id(myPreferredDeviceId, device_label, selected_device_callback){
//    console.warn('--- set_stream_by_id ---')
    var constraints = {}
    var is_video_stream = false;
    var is_audio_stream = false;

    var is_id_valid = check_device_id_exist(myPreferredDeviceId, device_label);
    if(jQuery.isEmptyObject( is_id_valid )){
        alert("invalid id")
        return
    }
    var callback_data = {
        'myPreferredDeviceId':myPreferredDeviceId,
        'is_id_valid':is_id_valid
    }
//    debugger;
    var get_updateDeviceList_val = DetectRTC.MediaDevices
    var is_device_valid = false;
    is_device_valid = check_device_exist_callback(get_updateDeviceList_val, callback_data)

    var is_all_valid = false;
    if(!jQuery.isEmptyObject( is_id_valid )){
        if(is_id_valid.kind == "audioinput"){
            constraints["audio"] = {
                deviceId: myPreferredDeviceId
            }
            is_audio_stream = true;
            is_all_valid = true;
        }else if(is_id_valid.kind == "audiooutput"){

        }else if(is_id_valid.kind == "videoinput"){
//            constraints["video"] = {
//                deviceId: myPreferredDeviceId,
//            }

            var temp_video_config = structuredClone(main_constraints.video);
            temp_video_config["deviceId"] = myPreferredDeviceId;
            constraints["video"]=temp_video_config;

            is_video_stream = true;
            is_all_valid = true;
        }
    }
//    alert("set_stream_by_id---- constraints after ----"+JSON.stringify(constraints))

    if(!jQuery.isEmptyObject( constraints )){

//// toggle camera for mobile user
//    constraints.video.facingMode = useFrontCamera ? {exact: "user"} : {exact: "environment"};
    constraints.video.facingMode = useFrontCamera ? "user": "environment";

//     ["back", "rear"]


//        console.warn("--- constraints ---",constraints)
//        console.warn("--- is_id_valid ---",is_id_valid)
//        console.warn("--- is_device_valid ---",is_device_valid)
//        console.warn("--- is_all_valid ---",is_all_valid)
//        console.warn("--- is_audio_stream ---",is_audio_stream)
//        console.warn("--- is_video_stream ---",is_video_stream)

        // raise request to access mic and camera
        navigator.mediaDevices.getUserMedia(constraints)

        // handle if success of (raise request to access mic and camera)
        .then(stream =>(
            navigator.mediaDevices.enumerateDevices()
            .then(devices => {
//                console.warn(" -- ct_init_devices_access_permissions_fn -- allMediaStreams.push(stream) ")
//                console.warn("--- 2.1 ---",devices);
                allMediaStreams.push(stream) // store all stream data into single object
                set_localTracks(stream)
                set_localStreams(stream)

                ct_MediaDevices = devices;
//                alert("--set_stream_by_id----ct_MediaDevices---"+JSON.stringify(ct_MediaDevices))

                refresh_devices(devices); // override or refresh DetectRTC devices
                render_device_dropdown_fn();  // render all dropdown
//                auto_set_devices();  // auto set devices
                if(is_video_stream){
                    createElements(stream)
                }
                if(is_audio_stream){
                    audio_check_logic_1_success(stream)  // audio_check.js is use for volume meter
//                    audio_check_logic_2_success(stream)  // audio_check.js is use for volume meter
                }

                selected_device_callback({"stream":stream, "devices":devices});
            })
            .catch(err => {
            alert(err)
            throw err
            })

//            console.warn("--- 2.1.1 ---",devices);
        ))

        // call if user not allow to access mic and camera
        .catch(function(error) {
            console.warn(error)
            // allow but busy
            if(error.name == 'NotReadableError'||error.name == 'AbortError'){
                // Could not start after user permission, device is being used elsewhere
                ct_show_allow_access_permissions_msg_allow_but_use_somewhere_fn()
            }
             // not allow / block
            else if(error.name == 'NotAllowedError'){
                // Unable to capture after user denied
                ct_show_allow_access_permissions_msg_denied_fn()
            }
//            // selected device removed
//            else if(error.name == 'TypeError'){
//                displayAlert("Select device is removed or not available, please check and try again...!!!", "warning", 2000)
//            }
            //
            else{
                ct_show_allow_access_permissions_msg_denied_fn()
            }
        });
    }
    else{
        alert("device removed")
    }

}

function check_device_exist_callback(devices, return_data){
    var is_device_valid = false;
    var is_id_valid = return_data.is_id_valid
    if(!jQuery.isEmptyObject( is_id_valid )){
        var device_id = is_id_valid.deviceId;
        var device_found = {};
        for(var index in devices){
            var device = devices[index]
            if(device.deviceId == device_id){
                is_device_valid = true;
                device_found = device;
                break;
            }else{
                // selected device is not exist
            }
        }
    }else{
        // selected device ID is not exist
    }
        return is_device_valid;
}

function finish_device_selection(){
//    var = get_selected_audio_device()

    var is_audio_valid = true;
    var is_video_valid = true;
    if(main_constraints.audio){
        if(jQuery.isEmptyObject( currentMic )){
            is_audio_valid = false;
        }
    }
    if(main_constraints.video){
        if(jQuery.isEmptyObject( currentCam )){
            is_video_valid = false;
        }
    }

    if(is_audio_valid && is_video_valid){
        // issue fixed - sometime work sometime not
        $.ajax({
           url:close_all(),
           success:function(){
               $("#btn-start-recording").click();
            }
        })
    }else{
        displayAlert("Please select a device","error",3000)
    }
}
function cancel_device_selection(){
    // default functionality
    close_all();
    hide_student_register_video_container();

//    // extra functionality
//    show_student_register_frm_container();
}
function close_all(){
    force_stop_all_stream();
    dcc_close();
    ////  hide_connectivity_test();
    hide_finish_btn();
}
function hide_finish_btn(){
    $(".ct_luein-modal-button.finish").addClass("dn");
}
function show_finish_btn(){
    $(".ct_luein-modal-button.finish").removeClass("dn");
}

function force_stop_all_stream(callback){
    for(var stream of allMediaStreams){
        stream.stop();
    }
    console.warn(callback)
    if(callback){
        callback();
    }
}


function set_localTracks(stream){

    if(stream.getAudioTracks()[0]){
        if(localTracks["audioTrack"]){
            localTracks["audioTrack"].stop();
        }
        localTracks["audioTrack"] = stream.getAudioTracks()[0]
    }

    if(stream.getVideoTracks()[0]){
        if(localTracks["videoTrack"]){
            localTracks["videoTrack"].stop();
        }
        localTracks["videoTrack"] = stream.getVideoTracks()[0]
    }

}
function set_localStreams(stream){

    if(stream.getAudioTracks()[0]){
        if(localStreams["audioStream"]){
            localStreams["audioStream"].stop();
        }
        localStreams["audioStream"] = stream
    }

    if(stream.getVideoTracks()[0]){
        if(localStreams["videoStream"]){
            localStreams["videoStream"].stop();
        }
        localStreams["videoStream"] = stream
    }

}


var get_updateDeviceList_val;
function get_updateDeviceList() {
    var return_data = navigator.mediaDevices.enumerateDevices()
    .then(devices => {
//        console.warn("--- updateDeviceList ---", devices)
        get_updateDeviceList_val = devices;
        return devices;
    })
    .catch(err => {throw err});
    return return_data;
}


function check_device_id_exist(device_id, device_label){
    var is_valid = false
    var device_found = {};
    for(var index in DetectRTC.MediaDevices){
        var device = DetectRTC.MediaDevices[index]
        if((device.deviceId == device_id)&&(device.label == device_label)){
            is_valid = true;
            device_found = device;
            break;
        }
    }
//    alert("check_device_id_exist ----device_found--"+ JSON.stringify(device_found))

    return device_found;
}

function createElements(stream){
    var div = document.createElement("div");
    div.className = "ct_video_div";
    div.id = "luein-video-player-".concat("abc");

//    var videoElement = video;
//    var videoElement = createVideoElement();
//    div.appendChild(videoElement);
    $("#pre-local-player").html("");
    $("#pre-local-player").html(div);

    if("srcObject" in video){
        // new version support
        video.srcObject = stream;
    }else{
        // old version support
        video.src = window.URL.createObjectURL(stream);
    }
    video.muted= true;

    video.onloadedmetadata = function(ev){
        // show in the video element what is being captured by webcam
        video.play().catch((e)=>{
           /* error handler */
        })
    }



}

function createVideoElement(){
    var videoElement = document.createElement("video");
    videoElement.id = "video_".concat("xyz"),
    videoElement.className = "ct_video";
    videoElement.controls = !1;
    return videoElement;
}


//createElements() {
//     this.container || (this.container = document.createElement("div")),
//      this.container.id = "agora-video-player-".concat(this.trackId),
//      this.container.style.width = "100%",
//      this.container.style.height = "100%",
//      this.container.style.position = "relative",
//      this.container.style.overflow = "hidden",
//      this.videoTrack ? (this.container.style.backgroundColor = "black", this.createVideoElement(), this.container.appendChild(this.videoElement)) : this.removeVideoElement(),
//      this.slot.appendChild(this.container)
//}
//
////createVideoElement() {
//    this.videoElement || (this.videoElementStatus = WL.INIT,
//                          this.videoElement = document.createElement("video"),
//                          this.videoElement.onerror = () => this.videoElementStatus = WL.ERROR,
//                          this.container && this.container.appendChild(this.videoElement),
//                          qq.forEach(e => {
//                                                this.videoElement && this.videoElement.addEventListener(e, this.handleVideoEvents)
//                                            }),
//     this.videoElementCheckInterval = window.setInterval(() => {
//        !document.getElementById("video_".concat(this.trackId)) && this.videoElement && (this.videoElementStatus = WL.DESTROYED)
//    }, 1e3)),
//    this.videoElement.id = "video_".concat(this.trackId),
//    this.videoElement.className = "agora_video_player",
//    this.videoElement.style.width = "100%",
//    this.videoElement.style.height = "100%",
//    this.videoElement.style.position = "absolute",
//    this.videoElement.controls = !1,
//    this.videoElement.setAttribute("playsinline", ""),
//    this.videoElement.style.left = "0",
//    this.videoElement.style.top = "0";
//    const e = oO();
//    if ("Safari" === e.name && 15 === Number(e.version) || IO() || !this.config.mirror || (this.videoElement.style.transform = "rotateY(180deg)"),
//        this.config.fit ? this.videoElement.style.objectFit = this.config.fit : this.videoElement.style.objectFit = "cover",
//        this.videoElement.setAttribute("muted", ""),
//        this.videoElement.muted = !0,
//        this.videoElement.srcObject && this.videoElement.srcObject instanceof MediaStream)
//    {
//        this.videoElement.srcObject.getVideoTracks()[0] !== this.videoTrack && (this.videoElement.srcObject = this.videoTrack ? new MediaStream([this.videoTrack]) : null, gO() && this.videoElement.load())
//    } else this.videoElement.srcObject = this.videoTrack ? new MediaStream([this.videoTrack]) : null, gO() && this.videoElement.load();
//    const t = this.videoElement.play();
//
//    void 0 !== t && t.catch(e => {
//        HD.debug("[".concat(this.trackId, "] playback interrupted"), e.toString()), cP("debug", this, "play back interrupted: ".concat(e.toString()))
//    })
//}


//      removeVideoElement() {
//         if (this.videoElement) {
//            qq.forEach(e => {
//               this.videoElement && this.videoElement.removeEventListener(e, this.handleVideoEvents)
//            }), this.videoElementCheckInterval && (window.clearInterval(this.videoElementCheckInterval), this.videoElementCheckInterval = void 0);
//            try {
//               this.container && this.container.removeChild(this.videoElement)
//            } catch (e) {}
//            this.videoElement = void 0, this.videoElementStatus = WL.NONE
//         }
//      }




//var a=null;
//function captureCameraIntr(callback) {
//    navigator.mediaDevices.getUserMedia(
//        { audio: true, video: true }
//    )
//    .then(function(camera) {
//        a = camera;
//    })
//    .catch(function(error) {
//        alert('Unable to capture your camera. Please check console logs.');
//        console.error(error);
//    });
//}
//captureCameraIntr()






//// take screenshot of screen
//https://developer.mozilla.org/en-US/docs/Web/API/ImageCapture
//
//const stream = await navigator.mediaDevices.getDisplayMedia();
//const track = stream.getVideoTracks()[0];
//const capture = new ImageCapture(track);
//// when you need the still image
//const bitmap = await capture.grabFrame();
//// if you want a Blob version
//const canvas = document.createElement("canvas");
//canvas.width = bitmap.width;
//canvas.height = bitmap.height;
//canvas.getContext("bitmaprenderer").transferFromImageBitmap(bitmap);
//const blob = await new Promise((res) => canvas.toBlob(res));


// take screenshot
//https://codepen.io/kmt91kok71/pen/PobBBOZ
//const canIRun  = navigator.mediaDevices.getDisplayMedia
//
//const takeScreenShot = async () => {
//      const stream = await navigator.mediaDevices.getDisplayMedia({
//        video: { mediaSource: 'screen' },
//      })
//      // get correct video track
//      const track = stream.getVideoTracks()[0]
//      // init Image Capture and not Video stream
//      const imageCapture = new ImageCapture(track)
//      // take first frame only
//      const bitmap = await imageCapture.grabFrame()
//      // destory video track to prevent more recording / mem leak
//      track.stop()
//
//      const canvas = document.getElementById('fake')
//      // this could be a document.createElement('canvas') if you want
//      // draw weird image type to canvas so we can get a useful image
//      canvas.width = bitmap.width
//      canvas.height = bitmap.height
//      const context = canvas.getContext('2d')
//      context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height)
//      const image = canvas.toDataURL()
//
//      // this turns the base 64 string to a [File] object
//      const res = await fetch(image)
//      const buff = await res.arrayBuffer()
//      // clone so we can rename, and put into array for easy proccessing
//      const file = [
//        new File([buff], `photo_${new Date()}.jpg`, {
//          type: 'image/jpeg',
//        }),
//      ]
//      return file
//}
//
//const button = document.getElementById('cake').onclick = () => canIRun ? takeScreenShot() : {}


//<button id="cake">Take Screeny</button>
//
//<br />
//
//<canvas id="fake"></canvas>



// connectivity_test.js end

//    let audioList = document.getElementById("audioList");
//    let videoList = document.getElementById("videoList");
function updateDeviceList() {
    navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
//        console.warn("--- updateDeviceList ---", devices)
        refresh_devices(devices);
        render_device_dropdown_fn();  // render all dropdown
    })
    .catch(err => {throw err});
}


let videoElement = document.getElementById("video");
let logElement = document.getElementById("log");

function log(msg) {
  logElement.innerHTML += msg + "<br>";
}

//document.getElementById("startButton").addEventListener("click", function() {
//  navigator.mediaDevices.getUserMedia({
//    video: {
//      width: 160,
//      height: 120,
//      frameRate: 30
//    },
//    audio: {
//      sampleRate: 44100,
//      sampleSize: 16,
//      volume: 0.25
//    }
//  }).then(stream => {
//      videoElement.srcObject = stream;
//      updateDeviceList();
//    })
//    .catch(err => log(err.name + ": " + err.message));
//}, false);



// navigator.mediaDevices.ondevicechange = function(event) {
//    console.warn('----Updated---1');
//    updateDeviceList();
//}
//
//navigator.mediaDevices.addEventListener('devicechange', function(event) {
//    console.warn("----Updated---2")
//    updateDeviceList();
//});






//var video_testing = document.getElementById("videoInput_testing")
//navigator.mediaDevices.getUserMedia({ video: true, audio: false })
//    .then(function(stream) {
//        video_testing.srcObject = stream;
//        video_testing.play();
//var d;
//navigator.enumerateDevices(device=>{d = device;})
//stream.stop()
//    })
//    .catch(function(err) {
//        console.log("An error occurred! " + err);
//    });





// record_video.js start
var recorder; // globally accessible
var upblob = ""; // globally accessible

///////////////////////////////////////////////////////////////
// these functions are called from record_video.js also for showing upload loader
function _(el) {
  return document.getElementById(el);

}

function progressHandler(event) {
//  _("loaded_n_total").innerHTML = "Uploaded " + event.loaded + " bytes of " + event.total;
  var percent = (event.loaded / event.total) * 100;
  _("vr-record-progress").value = Math.round(percent);
//  _("status").innerHTML = Math.round(percent) + "% uploaded... please wait";
    if(Math.round(percent)>99){
        $(".progress-wpr").addClass("dnone");
        $(".loading-div").removeClass("dnone");
    }
}

function completeHandler(event) {
    //  _("status").innerHTML = event.target.responseText;
    _("vr-record-progress").value = 0; //wil clear progress bar after successful upload
    //  location.reload();
    $("#loading-overlay").hide();
    ajax_success_fn(event);
}

function errorHandler(event) {
    //  _("status").innerHTML = "Upload Failed";
    ajax_error_fn(event)
}

function abortHandler(event) {
//  _("status").innerHTML = "Upload Aborted";

}

function ct_captureCamera(callback) {
    var mic_id = null;
    var cam_id = null;
    var constraints = {};
    if(main_constraints.audio){
        mic_id = currentMic.deviceId;
        constraints['audio'] = {
            deviceId: mic_id
        }
    }
    if(main_constraints.video){
        cam_id = currentCam.deviceId;
//        constraints['video'] = {
//            deviceId: mic_id,
//        }
        var temp_video_config = structuredClone(main_constraints.video);
        temp_video_config["deviceId"] = cam_id;
        constraints["video"]=temp_video_config;
    }

    console.warn('constraints---', constraints);

    //    hot fix -- unknown issue -- sometime working sometime not
    var delayInMilliseconds = 500; //1 second
//    setTimeout(function() {

        navigator.mediaDevices.getUserMedia(
            constraints
        )
        .then(function(camera) {
            allMediaStreams.push(camera) // store all stream data into single object
            callback(camera);
        }).catch(function(error) {
            alert('Unable to capture your camera. Please check console logs.');
            console.error(error, error.name, error.code);
            show_finish_btn();
    //        start_recording_stream();
        });
//    }, delayInMilliseconds);

}

function show_device_selection(){
    $(".cam_dropdown_div").removeClass("dn");
}
function hide_device_selection(){
    $(".cam_dropdown_div").addClass("dn");
}
function reset_recording_btn(){
    document.getElementById('btn-start-recording').disabled = false;
    document.getElementById('btn-stop-recording').disabled = true;
    document.getElementById('btn-upload-recording').disabled = true;
    document.getElementById('btn-cancel-recording').disabled = true;

    document.getElementById('btn-start-recording').innerHTML = "Start Recording";

    document.getElementById('btn-start-recording').classList.add("dn");
    document.getElementById('btn-stop-recording').classList.add("dn");
    document.getElementById('btn-upload-recording').classList.add("dn");
    document.getElementById('btn-cancel-recording').classList.add("dn");

}

function start_recording_stream(){

    document.getElementById('btn-start-recording').disabled = true;
    document.getElementById('btn-stop-recording').disabled = false;
    document.getElementById('btn-upload-recording').disabled = true;
    document.getElementById('btn-cancel-recording').disabled = true;

    ct_captureCamera(function(camera) {
        document.getElementById('btn-stop-recording').classList.remove("dn");
        hide_device_selection();

        console.warn('camera---',camera)
        video.muted = true;
        video.volume = 0;
        if("srcObject" in video){
            // new version support
            video.srcObject = camera;
        }else{
            // old version support
            video.src = window.URL.createObjectURL(camera);
        }


        recorder = RecordRTC(camera, {
            type: 'video'
        });

        // release camera on stopRecording
        recorder.startRecording();

        recorder.camera = camera;
    });
};

function stop_recording_stream() {
    document.getElementById('btn-stop-recording').disabled = true;
    recorder.stopRecording(stopRecordingCallback);
    document.getElementById('btn-start-recording').disabled = false;
    document.getElementById('btn-upload-recording').disabled = false;
    document.getElementById('btn-cancel-recording').disabled = false;

    document.getElementById('btn-start-recording').innerHTML = "Record Again";

    document.getElementById('btn-start-recording').classList.remove("dn");
    document.getElementById('btn-upload-recording').classList.remove("dn");
    document.getElementById('btn-cancel-recording').classList.remove("dn");

};

function stopRecordingCallback() {
    if("srcObject" in video){
        // new version support
        video.srcObject = null;
    }else{
        // old version support
        video.src = null;
    }

    video.muted = false;
    video.volume = 1;
    video.src = URL.createObjectURL(recorder.getBlob());
//    uploader(recorder.getBlob())
    upblob = recorder.getBlob();
    recorder.camera.stop();
    recorder.destroy();
    recorder = null;
}

function upload_recording_stream() {
     this.disabled = true;
    document.getElementById('btn-start-recording').disabled = false;
    document.getElementById('btn-start-recording').innerHTML = "Start Recording";
    video.src = "";
    $("#overlaybckclsbtn").show();
     uploader(upblob);
     $("#loading-overlay").show();
};



function uploader(soundBlob){
    hide_student_register_video_container();
    force_stop_all_stream();

    // config in attendance.js and student_register.js
    var form_data =get_ajax_data()

    var ajax = new XMLHttpRequest();
    ajax.upload.addEventListener("progress", progressHandler, false);
    ajax.addEventListener("load", completeHandler, false);
    ajax.addEventListener("error", errorHandler, false);
    ajax.addEventListener("abort", abortHandler, false);
    ajax.open("POST", AJAX_URL);
    ajax.send(form_data);
};

function cancel_recording_stream() {
    document.getElementById('btn-cancel-recording').disabled = true;
    document.getElementById('btn-start-recording').disabled = false;
    document.getElementById('btn-start-recording').innerHTML = "Start Recording";
    document.getElementById('btn-upload-recording').disabled = true;
    video.src = "";
    // set in attendance.js and student_register.js
    cancel_recording_stream_callback();

};

function show_student_register_video_container(){
    $(".student_register_video_container").removeClass("dn");
}
function hide_student_register_video_container(){
    $(".student_register_video_container").addClass("dn");
}



// record_video.js end



// extra functions
function compare( a, b ) {
  if ( a.audioinput < b.audioinput ){
    return -1;
  }
  if ( a.audioinput > b.audioinput ){
    return 1;
  }
  return 0;
}
