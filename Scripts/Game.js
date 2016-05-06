function Game(difficulty) {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.rowNumber = GetRowNumber(difficulty);
    this.isMoving = false;
    this.isPlaying = false;
    this.blocks = [];
    this.blockWidth = GetBlockWidth(difficulty);
    this.blockHeight = GetBlockHeight(difficulty);
    this.ball = new Ball(this.canvas.width, this.canvas.height, difficulty);
    this.paddle = new Paddle(this.canvas.width, this.canvas.height, difficulty);
    this.numberOfBlocksInARow = GetNumberOfBlocks(difficulty);
    this.xMargin = 3;
    this.yMargin = 2;
    this.blockDisplacement = GetBlockDisplacement(difficulty);
}

Game.prototype.createBlocks = function () {
    for (var j = 0; j <= this.rowNumber - 1; j++) {
        var yStart = (j + 1) * this.yMargin + j * this.blockHeight;
        for (var i = 0; i <= this.numberOfBlocksInARow - 1; i++) {
            var xStart = (i + 1) * this.xMargin + i * this.blockWidth + (j % 2 == 0 ? 0 : this.blockDisplacement)
            if (xStart + this.blockWidth < this.canvas.width) {
                var block = new Block(xStart, yStart, this.blockWidth, this.blockHeight);
                this.blocks.push(block);
            }
        }
    }
}

Game.prototype.drawBlocks = function () {
    for (var i = 0; i < this.blocks.length; i++) {
        this.blocks[i].drawBlock(this.context);
    }
}

Game.prototype.countRemainingBlocks = function () {
    return this.blocks.length;
}

Game.prototype.drawPlayIcon = function () {
    game.context.drawImage(playIcon, game.canvas.width / 2 - iconSize / 2, game.canvas.height / 2 - iconSize / 2, iconSize, iconSize);
}

Game.prototype.drawPauseIcon = function () {
    game.context.drawImage(pauseIcon, game.canvas.width / 2 - iconSize / 2, game.canvas.height / 2 - iconSize / 2, iconSize, iconSize);
}

Game.prototype.drawRestartIcon = function () {
    game.context.drawImage(restartIcon, game.canvas.width / 2 - iconSize / 2, game.canvas.height / 2 - iconSize / 2, iconSize, iconSize);
}

Game.prototype.initialise = function () {
    game.clear();
    game.ball.xCurrentPosition = game.ball.xStartPosition;
    game.ball.yCurrentPosition = game.ball.yStartPosition;
    game.paddle.xPosition = game.paddle.xStartPosition;
    game.createBlocks();
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

    if (game.countRemainingBlocks() === 0) {
        gameOver = true;
        TriggerGameWon();
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