function Paddle(canvasWidth, canvasHeight, difficulty) {
    this.height = 3;
    this.width = GetPaddleWidth(difficulty);
    this.yPosition = canvasHeight * 0.95;
    this.xStartPosition = (canvasWidth / 2 - this.width / 2);
    this.xPosition = this.xStartPosition;
    this.fillStyle = "#444";
    this.velocity = 0;
    this.rateOfChange = 0.3;
    this.framesWithoutMovement = 0;
}

Paddle.prototype.drawPaddle = function (context) {
    context.beginPath();
    context.rect(this.xPosition, this.yPosition, this.width, this.height);
    context.fillStyle = this.fillStyle;
    context.fill();
    context.closePath();
}

Paddle.prototype.move = function () {
    if (!game.isMoving)
        return;

    if (this.velocity < 0 && this.xPosition < Magnitude(this.velocity)) {
        return;
    }

    if (this.velocity > 0 && this.xPosition + this.width > game.canvas.width - Magnitude(this.velocity)) {
        return;
    }

    this.xPosition += this.velocity;
    this.framesWithoutMovement = 0;
}

Paddle.prototype.movePaddleLeft = function () {
    var paddle = game.paddle;

    if (paddle.velocity > 0 || paddle.framesWithoutMovement > 10) paddle.velocity = 0;

    paddle.velocity -= paddle.rateOfChange;

    paddle.move();
}

Paddle.prototype.movePaddleRight = function () {
    var paddle = game.paddle;

    if (paddle.velocity < 0 || paddle.framesWithoutMovement > 10 || !game.isMoving) paddle.velocity = 0;

    paddle.velocity += paddle.rateOfChange;

    paddle.move();
}

MovePaddle = function (e) {
    e = e || window.event;

    if (e.keyCode == '37') {
        game.paddle.movePaddleLeft();
        game.framesWithoutMovement = 0;

    }
    else if (e.keyCode == '39') {
        game.paddle.movePaddleRight();
        game.framesWithoutMovement = 0;
    }
}
