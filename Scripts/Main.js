﻿iconSize = 40;

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
    DrawRestartIcon();
}

CountDown = function () {
    var sec = 4;
    DrawCountDown("Ready?");
    var countDownRequestID = window.setInterval(function () {
        game.clear();
        if (sec === 0) {
            game.draw();
            DrawCountDown("GO!");
            clearInterval(countDownRequestID);
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
    if (gameOver)
        Initialise();
    else if (!game.isPlaying)
        return;
    else if (game.isMoving)
        Pause();
    else
        Start();
}

SelectEasy = function () {
    RemoveActiveClass();
    easyButton.classList.add("active");
    if (game != null) Clear();
    Load();
}

SelectNormal = function () {
    RemoveActiveClass();
    normalButton.classList.add("active");
    if (game != null) Clear();
    Load();
}

SelectDifficult = function () {
    RemoveActiveClass();
    hardButton.classList.add("active");
    if (game != null) Clear();
    Load();
}

RemoveActiveClass = function () {
    var activeButtons = document.getElementsByClassName('active');

    for (var i = 0; i <= activeButtons.length; i++) {
        activeButtons.item(i).classList.remove("active");
    }
}

DrawPlayIcon = function () {
    if (playIcon.complete) { game.drawPlayIcon(); }
    else {
        playIcon.onload = game.drawPlayIcon;
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