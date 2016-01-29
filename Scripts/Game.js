function Game() {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.rowNumber = 5;
    this.isPlaying = false;
    this.blocks = [];
    this.blockWidth = 38;
    this.blockHeight = 10;
    this.ball = new Ball(this.canvas.width, this.canvas.height);
    this.paddle = new Paddle(this.canvas.width, this.canvas.height);
    this.playBar = new PlayBar(this.canvas.width, this.canvas.height);
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

Game.prototype.drawGameOver = function () {
    this.context.font = "bold 30px Verdana";
    this.context.textAlign = "center";
    this.context.fillText("GAME OVER", this.canvas.width / 2, this.canvas.height * 0.7);
}

Game.prototype.initialise = function () {
    game.ball.xCurrentPosition = game.ball.xStartPosition;
    game.ball.yCurrentPosition = game.ball.yStartPosition;
    game.createBlocks(3, 2, 38, 10);
    game.draw();
    game.playBar.drawPlayBar(game.context);
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
    var gameOver = this.ball.checkBottomBoundary();

    if (gameOver) {
        TriggerGameOver();
    }

}

Game.prototype.start = function () {
    game.isPlaying = true;
    game.animationLoop();
}

Game.prototype.animationLoop = function () {
    if (!game.isPlaying)
        return;

    game.move();

    requestId = window.requestAnimFrame(game.animationLoop);
}

TriggerGameOver = function () {
    var event = new Event("GameOver");
    document.dispatchEvent(event);
}

GameOver = function () {
    window.cancelAnimFrame(requestId);
    game.isPlaying = false;
    game.draw();
    game.drawGameOver();
}