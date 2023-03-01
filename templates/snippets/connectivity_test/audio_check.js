"use strict";

//<!--audio bar 0-->
var volumeMeterEl;
var LOW_NOTE = 2;
var HIGH_NOTE = 9;
var audio_localstream;

$(document).ready(function() {
    volumeMeterEl = document.getElementById('volumeMeter');
});
function audio_volume_fn(stream){
//    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    const audioContext = new AudioContext();
    const mediaStreamAudioSourceNode = audioContext.createMediaStreamSource(stream);
    const analyserNode = audioContext.createAnalyser();
    mediaStreamAudioSourceNode.connect(analyserNode);

    const pcmData = new Float32Array(analyserNode.fftSize);
    const onFrame = () => {
        analyserNode.getFloatTimeDomainData(pcmData);
        let sumSquares = 0.0;
        for (const amplitude of pcmData) { sumSquares += amplitude*amplitude; }
        volumeMeterEl.value = Math.sqrt(sumSquares / pcmData.length);
        window.requestAnimationFrame(onFrame);
    };
    window.requestAnimationFrame(onFrame);
};

function colorPids(vol) {
  const allPids = [...document.querySelectorAll('.pid')];
  const numberOfPidsToColor = Math.round(vol / 10);
  const pidsToColor = allPids.slice(0, numberOfPidsToColor);
  for (const pid of allPids) {
    pid.style.backgroundColor = "#e6e7e8";
  }
  for (const pid of pidsToColor) {
      if(pidsToColor.length<LOW_NOTE){
          pid.style.backgroundColor = "yellow";
      }else if(pidsToColor.length<HIGH_NOTE){
          pid.style.backgroundColor = "#69ce2b";
      }else{
          pid.style.backgroundColor = "orange";
      }
  }
}

//LOGIC 1
//<!--audio bar 3-->

/*window.navigator = window.navigator || {};
/*navigator.getUserMedia =  navigator.getUserMedia       ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia    ||
                          null;*/
//navigator.getUserMedia({audio:true}, logic_1_success, logic_1_error);


////LOGIC 2
//$(document).ready(function() {
//    navigator.mediaDevices.getUserMedia({
//      audio: true,
//      video: false
//    })
//  .then(stream=>logic_2_success(stream))
//  .catch(err=>logic_2_error(err));
//});

var LOGIC_1_VAR = 1;
var audio_check_logic_1_success = function (stream) {
    var h = document.getElementsByClassName('check_if_allowed')[0];
    var paths = document.getElementsByTagName('path');
    var visualizer = document.getElementById('visualizer');
    var mask = visualizer.getElementById('mask');
    var path;
    var report = 0;

    //Audio stops listening in FF without // window.persistAudioStream = stream;
    //https://bugzilla.mozilla.org/show_bug.cgi?id=965483
    //https://support.mozilla.org/en-US/questions/984179
//        window.persistAudioStream = stream;

//    navigator.allMediaStreams.push(stream)

    //<!--audio bar 0-->
    audio_volume_fn(stream)
    audio_localstream = stream;

    h.innerHTML = "Thanks";
    h.setAttribute('style', 'opacity: 0;');
    var audioContent = new AudioContext();
    var audioStream = audioContent.createMediaStreamSource( stream );
    var analyser = audioContent.createAnalyser();
    audioStream.connect(analyser);
    analyser.fftSize = 1024;

    var frequencyArray = new Uint8Array(analyser.frequencyBinCount);
    visualizer.setAttribute('viewBox', '0 0 255 255');

    //Through the frequencyArray has a length longer than 255, there seems to be no
    //significant data after this point. Not worth visualizing.
    for (var i = 0 ; i < 255; i++) {
        path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('stroke-dasharray', '4,1');
        mask.appendChild(path);
    }
    var doDraw = function () {
        requestAnimationFrame(doDraw);
        analyser.getByteFrequencyData(frequencyArray);

        // testing

          var arraySum = frequencyArray.reduce((a, value) => a + value, 0);
          var average = arraySum / frequencyArray.length;
          var new_average = average*LOGIC_1_VAR;
//          console.warn(" new_average :"+new_average+"  LOGIC_1_VAR :"+LOGIC_1_VAR);

            //<!--audio bar 2-->
           colorPids(new_average);

           //<!--audio bar 1-->
           $(".audio_check_progress").css("width", new_average + "%")
           $(".audio_check_progress").attr("aria-valuenow", new_average)
           var new_LOW_NOTE = (LOW_NOTE-1)*10;
           var new_HIGH_NOTE = (HIGH_NOTE-1)*10;

//         console.warn(" new_average :"+new_average+"  new_LOW_NOTE :"+new_LOW_NOTE);


            if(new_average<new_LOW_NOTE){
                $(".audio_check_progress").addClass("bg_low")
                $(".audio_check_progress").removeClass("bg_medium")
                $(".audio_check_progress").removeClass("bg_high")
            }
            else if(new_average<new_HIGH_NOTE){
                $(".audio_check_progress").removeClass("bg_low")
                $(".audio_check_progress").addClass("bg_medium")
                $(".audio_check_progress").removeClass("bg_high")
            }
            else{
                $(".audio_check_progress").removeClass("bg_low")
                $(".audio_check_progress").removeClass("bg_medium")
                $(".audio_check_progress").addClass("bg_high")
            }

        var adjustedLength;
        for (var i = 0 ; i < 255; i++) {
            adjustedLength = Math.floor(frequencyArray[i]) - (Math.floor(frequencyArray[i]) % 5);
            paths[i].setAttribute('d', 'M '+ (i) +',255 l 0,-' + adjustedLength);
        }
    }

    doDraw();
}
var audio_check_logic_1_error = function (error) {
    $(".check_if_allowed").html("Allow access permission to proceed");
    $(".check_if_allowed").removeClass("dn");
    console.log(error);
}


var LOGIC_2_VAR = 1;
function audio_check_logic_2_success(stream) {
    //<!--audio bar 0-->
    audio_volume_fn(stream)
    audio_localstream = stream;

    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

    analyser.smoothingTimeConstant = 0.8;
    analyser.fftSize = 1024;

    microphone.connect(analyser);
    analyser.connect(scriptProcessor);
    scriptProcessor.connect(audioContext.destination);
    scriptProcessor.onaudioprocess = function() {
      const array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);
      const arraySum = array.reduce((a, value) => a + value, 0);
      const average = arraySum / array.length;

      var new_average = average*LOGIC_2_VAR;
//        console.warn(" new_average :"+new_average+"  LOGIC_2_VAR :"+LOGIC_2_VAR);

        //<!--audio bar 2-->
       colorPids(new_average);

       //<!--audio bar 1-->
       $(".audio_check_progress").css("width", new_average + "%")
       $(".audio_check_progress").attr("aria-valuenow", new_average)
       var new_LOW_NOTE = (LOW_NOTE-1)*10*LOGIC_2_VAR;
       var new_HIGH_NOTE = (HIGH_NOTE-1)*10*LOGIC_2_VAR;
        if(new_average<new_LOW_NOTE){
            $(".audio_check_progress").addClass("bg_low")
            $(".audio_check_progress").removeClass("bg_medium")
            $(".audio_check_progress").removeClass("bg_high")
        }
        else if(new_average<new_HIGH_NOTE){
            $(".audio_check_progress").removeClass("bg_low")
            $(".audio_check_progress").addClass("bg_medium")
            $(".audio_check_progress").removeClass("bg_high")
        }
        else{
            $(".audio_check_progress").removeClass("bg_low")
            $(".audio_check_progress").removeClass("bg_medium")
            $(".audio_check_progress").addClass("bg_high")
        }

    };
  }
function audio_check_logic_2_error(err) {
    /* handle the error */
    console.error(err);
    $(".check_if_allowed").html("Allow access permission to proceed")
    $(".check_if_allowed").removeClass("dn")
  }
