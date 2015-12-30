window.addEventListener('load', function() {
    /*alert('hello from javascript');*/

    video = document.getElementById('video');
    playButton = document.getElementById('playBtn');
    pbarContainer = document.getElementById('pbar-container');
    pbar = document.getElementById('pbar');
    timeField = document.getElementById('time-field');
    soundButton = document.getElementById('soundBtn');
    sbarContainer = document.getElementById('sbar-container');
    sbar = document.getElementById('sbar');
    fullScrnButton = document.getElementById('fullscreenBtn');

    video.load();
    video.addEventListener('canplay', function() {
        playButton.addEventListener('click', playOrPause, false);
        pbarContainer.addEventListener('click', skip, false);
        updatePlayer();
        soundButton.addEventListener('click', muteOrUnmute, false);
        sbarContainer.addEventListener('click', changeVolume, false);
        fullScrnButton.addEventListener('click', fullscreen, false);
    }, false);

}, false);

function playOrPause() {
    if(video.paused) {
        video.play();
        playButton.src='./images/pause.png';
        update = setInterval(updatePlayer, 30);
    } else {
        video.pause();
        playButton.src='./images/play.png';
        window.clearInterval(update);
    }
};

function updatePlayer() {
    var percentage = (video.currentTime/video.duration)*100;
    pbar.style.width = percentage + "%";
    timeField.innerHTML = getFormattedTime();
    if(video.ended) {
        window.clearInterval(update);
        playButton.src = './images/replay.png';
    };
};

function skip(ev) {
    var mouseX = ev.pageX - pbarContainer.offsetLeft;
    // alert(mouseX);
    var barwidth = window.getComputedStyle(pbarContainer).getPropertyValue('width');
    barwidth = parseFloat(barwidth.substr(0, barwidth.length - 2));
    // alert(barwidth);
    video.currentTime = (mouseX/barwidth) * video.duration;
    updatePlayer();
};

function getFormattedTime() {

    var seconds = Math.round(video.currentTime); // rounds up to nearest second
    var minutes = Math.floor(seconds/60);  // rounds to nearest lower integer
    if (minutes > 0) seconds -= minutes*60;
    if (seconds.toString().length === 1) seconds = "0" + seconds;

    var totalSeconds = Math.round(video.duration);
    var totalMinutes = Math.floor(totalSeconds/60);
    if (totalMinutes > 0) totalSeconds -= totalMinutes*60;
    if (totalSeconds.toString().length === 1) totalSeconds = "0" + totalSeconds;

    return minutes + ":" + seconds + " / " + totalMinutes + ":" + totalSeconds;
};

function muteOrUnmute() {

    if(!video.muted) {
        video.muted = true;
        soundButton.src = './images/mute.png';
        sbar.style.display = 'none';
    } else {
        video.muted = false;
        soundButton.src = './images/sound.png';
        sbar.style.display = 'block';
    }
};

function changeVolume(ev) {
    var mouseX = ev.pageX - sbarContainer.offsetLeft;
    var sbarwidth = window.getComputedStyle(sbarContainer).getPropertyValue('width');
    sbarwidth = parseFloat(sbarwidth.substr(0, sbarwidth.length - 2));

    video.volume = (mouseX/sbarwidth);

    sbar.style.width = (mouseX/sbarwidth)*100 + "%";
    video.muted = false;
    soundButton.src = './images/sound.png';
    sbar.style.display = 'block';
};

function fullscreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullScreen) {
        video.webkitRequestFullScreen();
    } else if (video.mozRequestFullScreen) {
        // alert('i am in firefox');
        video.mozRequestFullScreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
};
