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
    pauseButton.addEventListener("click", Pause);
    startButton.removeEventListener("click", Initialise);
    Start();
}

Start = function () {
    game.start();
}

Pause = function () {
    StopFrame();
    pauseButton.removeEventListener("click", Pause);
    startButton.setAttribute("disabled", true);
    stopButton.setAttribute("disabled", true);
    pauseButton.textContent = "RESTART";
    pauseButton.addEventListener("click", Restart);
}

Restart = function () {
    pauseButton.removeEventListener("click", Restart);
    startButton.removeAttribute("disabled")
    stopButton.removeAttribute("disabled")
    pauseButton.textContent = "PAUSE";
    Start();
    pauseButton.addEventListener("click", Pause);
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
    stopButton = document.getElementById('stop');

    game = new Game();

    startButton.addEventListener("click", Initialise);
    stopButton.addEventListener("click", Clear);
}

document.addEventListener("DOMContentLoaded", LoadButtons);
document.addEventListener("GameOver", GameOver);

document.onkeydown = MovePaddle;