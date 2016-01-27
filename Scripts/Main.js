﻿window.requestAnimFrame = (function (callback) {
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
    Start();
    //startButton.removeAttribute("disabled")
    //stopButton.removeAttribute("disabled")
}

Start = function () {
    game.start();
    startButton.removeEventListener("click", Start);
    startButton.addEventListener("click", Pause);
    startIcon.src = "Images/Pause.png"
}

Pause = function () {
    StopFrame();

    startButton.removeEventListener("click", Pause);
    startButton.addEventListener("click", Start);
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
    newGameButton = document.getElementById('newGame');
    startIcon = document.getElementById('startIcon');
    newGameIcon = document.getElementById('newGameIcon');

    game = new Game();

    startButton.addEventListener("click", Initialise);
    newGameButton.addEventListener("click", Clear);
}

document.addEventListener("DOMContentLoaded", LoadButtons);
document.addEventListener("GameOver", GameOver);

document.onkeydown = MovePaddle;