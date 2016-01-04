/* Initialise */

function Game() {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.rowNumber = 5;
    this.blocks = [];
    this.blockWidth = 38;
    this.blockHeight = 10;
    this.ball = new Ball();
}

function Block(xStart, yStart, width, height) {
    this.xStart = xStart;
    this.yStart = yStart;
    this.width = width;
    this.height = height;
    this.fillStyle = "#999";
}

function Ball() {
    this.xStartPosition = 150;
    this.yStartPosition = 140;
    this.radius = 3;
    this.dx = 2;
    this.dy = -2;
    this.fillStyle = "#099";
}

Block.prototype.drawBlock = function (context) {
    context.beginPath();
    context.rect(this.xStart, this.yStart, this.width, this.height);
    context.fillStyle = this.fillStyle;
    context.fill();
    context.closePath();
}

Ball.prototype.drawBall = function (context, xStart, yStart) {
    context.beginPath();
    context.arc(xStart, yStart, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.fillStyle;
    context.fill();
    context.closePath();
}

Game.prototype.createBlocks = function(xMargin, yMargin, width, height) {
    for (var j = 0; j <= this.rowNumber - 1; j++) {
        var yStart = (j + 1) * yMargin + j * height;
        for (var i = 0; i <= 6; i++) {
            var xStart = (i + 1) * xMargin + i * width + (j % 2 == 0 ? 0 : 10)
            var block = new Block(xStart, yStart, this.blockWidth, this.blockHeight);
            this.blocks.push(block);
        }
    }
}

Game.prototype.drawBlocks = function () {
    for (var i = 0; i < this.blocks.length; i++)
    {
        this.blocks[i].drawBlock(this.context);
    }
}

Game.prototype.initialise = function () {
    game.createBlocks(3, 2, 38, 10);
    game.drawBlocks();
    game.ball.drawBall(game.context, game.ball.xStartPosition, game.ball.yStartPosition);
}

Game.prototype.clear = function () {
    game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
}

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();

// Let's play the game

document.addEventListener("DOMContentLoaded", function (event) {
    var startButton = document.getElementById('start');
    var pauseButton = document.getElementById('pause');
    var stopButton = document.getElementById('stop');

    game = new Game();

    startButton.addEventListener("click", Initialise);
    stopButton.addEventListener("click", Clear);

    //window.requestAnimFrame(game.drawBall());
});

Initialise = function () {
    game.initialise();
}

Clear = function () {
    game.clear();
}