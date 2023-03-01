
function sound_play() {
    var audio = document.getElementById('sound_audio_id');
    if (audio.paused) {
        audio.play();
    }else{
        audio.currentTime = 0
    }
}