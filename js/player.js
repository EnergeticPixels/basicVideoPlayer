window.addEventListener('load', function() {
    /*alert('hello from javascript');*/

    video = document.getElementById('video');
    playButton = document.getElementById('playBtn');

    video.load();
    video.addEventListener('canplay', function() {
        playButton.addEventListener('click', playOrPause, false);
    }, false);

}, false);

function playOrPause() {
    if(video.paused) {
        video.play();
        playButton.src='./images/pause.png';
    } else {
        video.pause();
        playButton.src='./images/play.png';
    }
};
