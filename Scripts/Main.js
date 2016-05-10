iconSize = 40;

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
    document.getElementById("canvas").removeEventListener("click", Initialise);
    document.getElementById("canvas").addEventListener("click", CanvasClicked);
    game.isPlaying = true;
    CountDown();
}

Start = function () {
    game.start();
}

Pause = function () {
    StopFrame();
    DrawPauseIcon();
}

StopFrame = function () {
    if (!game.isPlaying) return;

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
    DrawRestartIcon();
}

GameWon = function () {
    window.cancelAnimFrame(requestId);
    game.isPlaying = false;
    DrawGameWon();
    DrawRestartIcon();
}

DrawGameWon = function () {
    var ctx = game.context;
    ctx.font = "40px Arial";
    ctx.fillStyle = "#099";
    ctx.textAlign = "center";
    ctx.fillText('WIN!!', game.canvas.width / 2, game.canvas.height / 4);
}

CountDown = function () {
    sec = 4;
    isCountingDown = true;
    isCountDownPaused = false;
    game.isPlaying = true;
    DrawCountDown("Ready?");
    DoCountDown();
}

DoCountDown = function () {
    countDownRequestID = window.setInterval(function () {
        if (isCountDownPaused)
            return;
        game.clear();
        if (sec === 0) {
            clearInterval(countDownRequestID);
            isCountingDown = false;
            Start();
            return;
        }
        game.draw();
        if (sec > 1) {
            DrawCountDown(sec - 1);
        }
        else {
            DrawCountDown("Go!");
        }
        sec--;
    }, 1000);
}

DrawCountDown = function (sec) {
    var ctx = game.context;
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(sec, game.canvas.width / 2, game.canvas.height / 2);
}

CanvasClicked = function () {
    if (isCountingDown) {
        isCountDownPaused = !isCountDownPaused;
    }
    else if (!game.isPlaying)
        Initialise();
    else if (game.isMoving)
        Pause();
    else
        Start();
}

DrawPlayIcon = function () {
    if (playIcon.complete) { game.drawPlayIcon(); }
    else {
        playIcon.onload = game.drawPlayIcon;
    }
}

DrawPauseIcon = function () {
    if (pauseIcon.complete) { game.drawPauseIcon(); }
    else {
        pauseIcon.onload = game.drawPauseIcon;
    }
}

DrawRestartIcon = function () {
    if (restartIcon.complete) { game.drawRestartIcon(); }
    else {
        restartIcon.onload = game.drawRestartIcon;
    }
}

Load = function (event) {
    playIcon = document.getElementById('playIcon');
    pauseIcon = document.getElementById('pauseIcon');
    restartIcon = document.getElementById('restartIcon');

    easyButton = document.getElementById('easy');
    normalButton = document.getElementById('normal');
    hardButton = document.getElementById('hard');

    easyButton.addEventListener("click", SelectEasy);
    normalButton.addEventListener("click", SelectNormal);
    hardButton.addEventListener("click", SelectDifficult);

    var difficulty = GetDifficulty();

    game = new Game(difficulty);

    DrawPlayIcon();
    document.getElementById("canvas").addEventListener("click", Initialise);
}

document.addEventListener("DOMContentLoaded", Load);
document.addEventListener("GameOver", GameOver);
document.onkeydown = MovePaddle;
document.onkeypress = function (e) {
    if (e.keyCode === 0 || e.keyCode === 32) {
        e.preventDefault();
        CanvasClicked();
    }
}