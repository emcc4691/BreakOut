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
    document.getElementById("canvas").addEventListener("click", CanvasClicked);
    game.isPlaying = true;
}

Start = function () {
    game.start();
}

Pause = function () {
    StopFrame();
}

StopFrame = function () {
    game.isMoving = false;
    window.cancelAnimFrame(requestId);
}

Clear = function () {
    StopFrame();
    game.clear();
}


TriggerGameOver = function () {
    var event = new Event("GameOver");
    document.dispatchEvent(event);
}

GameOver = function () {
    window.cancelAnimFrame(requestId);
    game.isPlaying = false;
    game.draw();

}

CanvasClicked = function () {
    if (!game.isPlaying)
        return;
    else if (game.isMoving)
        Pause();
    else
        Start();
}

document.addEventListener("DOMContentLoaded", function (event) { game = new Game(); });
document.addEventListener("GameOver", GameOver);
document.onkeydown = MovePaddle;