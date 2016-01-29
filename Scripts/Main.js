window.requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();

window.cancelAnimFrame = (function () {
    return window.cancelAnimationFrame || window.mozCancelAnimationFrame;
})();

Initialise = function () {
    game.initialise();
    startButton.removeEventListener("click", Initialise);
    //Start();
    //startButton.removeAttribute("disabled")
    //stopButton.removeAttribute("disabled")
}

Start = function () {
    game.start();
    startButton.removeEventListener("click", Initialise);
    pauseButton.removeEventListener("click", Start);
    pauseButton.addEventListener("click", Pause);
    startIcon.src = "Images/Pause.png"
}

Pause = function () {
    StopFrame();

    pauseButton.removeEventListener("click", Pause);
    pauseButton.addEventListener("click", Start);
    startIcon.src = "Images/Play.png"
}

StopFrame = function () {
    window.cancelAnimFrame(requestId);
}

Clear = function () {
    StopFrame();
    game.clear();
    startButton.addEventListener("click", Initialise);
}

LoadButtons = function () {
    startButton = document.getElementById('start');
    pauseButton = document.getElementById('pause');
    newGameButton = document.getElementById('newGame');
    startIcon = document.getElementById('startIcon');
    newGameIcon = document.getElementById('newGameIcon');

    game = new Game();
    //game.playBar.drawPlayBar(game.context);

    startButton.addEventListener("click", Initialise);
    pauseButton.addEventListener("click", Pause);
    newGameButton.addEventListener("click", Clear);
}

document.addEventListener("DOMContentLoaded", LoadButtons);
document.addEventListener("GameOver", GameOver);

document.onkeydown = MovePaddle;