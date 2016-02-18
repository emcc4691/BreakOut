function Game() {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.rowNumber = 5;
    this.isMoving = false;
    this.isPlaying = false;
    this.blocks = [];
    this.blockWidth = 38;
    this.blockHeight = 10;
    this.ball = new Ball(this.canvas.width, this.canvas.height);
    this.paddle = new Paddle(this.canvas.width, this.canvas.height);
}

Game.prototype.createBlocks = function (xMargin, yMargin, width, height) {
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
    for (var i = 0; i < this.blocks.length; i++) {
        this.blocks[i].drawBlock(this.context);
    }
}

Game.prototype.drawPlayIcon = function () {
    game.context.drawImage(playIcon, game.canvas.width / 2 - 20, game.canvas.height / 2 - 20, 40, 40);
}

Game.prototype.drawRestartIcon = function () {
    game.context.drawImage(restartIcon, game.canvas.width / 2 - 20, game.canvas.height / 2 - 20, 40, 40);
}

Game.prototype.initialise = function () {
    game.clear();
    game.ball.xCurrentPosition = game.ball.xStartPosition;
    game.ball.yCurrentPosition = game.ball.yStartPosition;
    game.paddle.xPosition = game.paddle.xStartPosition;
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
    this.paddle.framesWithoutMovement += 1;
    this.ball.moveBall();
    this.ball.checkCollisionWithWall();
    this.ball.checkCollisionWithBlocks();
    this.ball.checkCollisionWithPaddle(this.paddle);
    this.draw();
    gameOver = this.ball.checkBottomBoundary();

    if (gameOver) {
        TriggerGameOver();
    }

}

Game.prototype.start = function () {
    game.isMoving = true;
    game.animationLoop();
}

Game.prototype.animationLoop = function () {
    if (!game.isPlaying)
        return;

    game.move();

    requestId = window.requestAnimFrame(game.animationLoop);
}