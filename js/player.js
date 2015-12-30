window.addEventListener('load', function() {
    /*alert('hello from javascript');*/

    video = document.getElementById('video');
    playButton = document.getElementById('playBtn');
    pbarContainer = document.getElementById('pbar-container');
    pbar = document.getElementById('pbar');

    video.load();
    video.addEventListener('canplay', function() {
        playButton.addEventListener('click', playOrPause, false);
        pbarContainer.addEventListener('click', skip, false);
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
}
