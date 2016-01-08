/// <reference path="Ball.js" />
/* Initialise */

function Game() {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.rowNumber = 5;
    this.blocks = [];
    this.blockWidth = 38;
    this.blockHeight = 10;
    this.ball = new Ball(this.canvas.width, this.canvas.height);
    this.paddle = new Paddle(this.canvas.width, this.canvas.height);
}

function Block(xStart, yStart, width, height) {
    this.xStart = xStart;
    this.yStart = yStart;
    this.width = width;
    this.height = height;
    this.fillStyle = "#999";
}

function Paddle(canvasWidth, canvasHeight) {
    this.height = 3;
    this.width = 50;
    this.yPosition = canvasHeight * 0.9;
    this.xStartPostion = (canvasWidth / 2 - this.width / 2);
    this.xPosition = this.xStartPostion;
    this.fillStyle = "#444";
}

Paddle.prototype.drawPaddle = function (context) {
    context.beginPath();
    context.rect(this.xStartPostion, this.yPosition, this.width, this.height);
    context.fillStyle = this.fillStyle;
    context.fill();
    context.closePath();
}

Block.prototype.drawBlock = function (context) {
    context.beginPath();
    context.rect(this.xStart, this.yStart, this.width, this.height);
    context.fillStyle = this.fillStyle;
    context.fill();
    context.closePath();
}

Block.prototype.checkCollisionWithBlock = function (ball) {

    var ballX = ball.xCurrentPosition;
    var ballY = ball.yCurrentPosition;
    var ballRadius = ball.radius;
    var ballNorth = ballY - ballRadius;
    var ballSouth = ballY + ballRadius;
    var ballWest = ballX - ballRadius;
    var ballEast = ballX + ballRadius;
       
    var blockLower = this.yStart + this.height;
    var blockUpper = this.yStart;
    var blockLeft = this.xStart;
    var blockRight = this.xStart + this.width;

    // check sides
    if (ballY >= blockUpper && ballY <= blockLower)
    {
        // check left boundary
        if (ballEast >= blockLeft && ballEast <= blockRight) {
            ball.changeDirection(true, false);
            game.blocks.splice(game.blocks.indexOf(this), 1);
        }

        // check right boundary
        if (ballWest >= blockLeft && ballWest <= blockRight) {
            ball.changeDirection(true, false);
            game.blocks.splice(game.blocks.indexOf(this), 1);
        }
    }

    // check top and bottom
    if (ballX >= blockLeft && ballX <= blockRight)
    {
        // check top
        if (ballSouth >= blockUpper && ballSouth <= blockLower)
        {
            ball.changeDirection(false, true);
            game.blocks.splice(game.blocks.indexOf(this), 1);
        }

        // check bottom
        if (ballNorth >= blockUpper && ballNorth <= blockLower) {
            ball.changeDirection(false, true);
            game.blocks.splice(game.blocks.indexOf(this), 1);
        }
    }

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
    game.ball.xCurrentPosition = game.ball.xStartPosition;
    game.ball.yCurrentPosition = game.ball.yStartPosition;
    game.createBlocks(3, 2, 38, 10);
    game.draw();
}

Game.prototype.draw = function () {
    game.drawBlocks()
    game.ball.drawBall(game.context);
    game.paddle.drawPaddle(game.context);
}

Game.prototype.clear = function () {
    game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
}

Game.prototype.move = function () {
    this.clear();
    this.ball.moveBall();
    this.ball.checkCollisionWithWall();
    this.ball.checkCollisionWithBlocks();
    this.draw();
}

Game.prototype.start = function () {
    game.move();
    
    requestId = window.requestAnimFrame(game.start)
}

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
    Stop();
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

Stop = function () {
    window.cancelAnimFrame(requestId);
}

Clear = function () {
    Stop();
    game.clear();
    startButton.addEventListener("click", Initialise);
}

document.addEventListener("DOMContentLoaded", function (event) {
    startButton = document.getElementById('start');
    pauseButton = document.getElementById('pause');
    stopButton = document.getElementById('stop');

    game = new Game();

    startButton.addEventListener("click", Initialise);
    stopButton.addEventListener("click", Clear);
});