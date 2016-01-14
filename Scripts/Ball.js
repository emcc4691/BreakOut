function Ball(canvasWidth, canvasHeight) {
    this.speed = 0.5;
    this.radius = 3;
    this.xStartPosition = 150;
    this.yStartPosition = canvasHeight * 0.95 - this.radius;
    this.xCurrentPosition = this.xStartPosition;
    this.yCurrentPosition = this.yStartPosition;
    this.dx = this.speed * 3;
    this.dy = -this.speed;
    this.fillStyle = "#099";
}

Ball.prototype.drawBall = function (context) {
    context.beginPath();
    context.arc(this.xCurrentPosition, this.yCurrentPosition, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.fillStyle;
    context.fill();
    context.closePath();
}

Ball.prototype.moveBall = function () {
    this.xCurrentPosition += this.dx;
    this.yCurrentPosition += this.dy;
}

Ball.prototype.checkCollisionWithWall = function () {

    var width = game.context.canvas.width;
    var height = game.context.canvas.height;
    var ballX = this.xCurrentPosition;
    var ballY = this.yCurrentPosition;
    var ballRadius = this.radius;
    var ballNorth = ballY - ballRadius;
    var ballSouth = ballY + ballRadius;
    var ballWest = ballX - ballRadius;
    var ballEast = ballX + ballRadius;

    // check left boundary
    if (ballWest - this.radius <= 0)
        this.changeDirection(true, false);

    // check right boundary
    if (ballEast >= width)
        this.changeDirection(true, false);

    // check top boundary
    if (ballNorth <= 0)
        this.changeDirection(false, true);

    // check bottom boundary
    if (ballSouth >= height)
        this.changeDirection(false, true);
}

Ball.prototype.checkBottomBoundary = function () {
    var ballSouth = this.yCurrentPosition + this.radius;
    if (ballSouth >= height) game.GameOver;
}

Ball.prototype.checkCollisionWithBlocks = function () {
    for (var i = 0; i < game.blocks.length; i++) {
        var block = game.blocks[i];
        block.checkCollisionWithBlock(this);
    }
}

Ball.prototype.checkCollisionWithPaddle = function (paddle) {
    var ballX = this.xCurrentPosition;
    var ballY = this.yCurrentPosition;
    var ballRadius = this.radius;
    var ballSouth = ballY + ballRadius;
    var ballWest = ballX - ballRadius;
    var ballEast = ballX + ballRadius;

    var paddleLeft = paddle.xPosition;
    var paddleRight = paddle.xPosition + paddle.width;
    var paddleTop = paddle.yPosition;
    var paddleBottom = paddle.yPosition + paddle.height;

    // check top of paddle
    if (ballX >= paddleLeft && ballX <= paddleRight && ballSouth >= paddleTop) {
        this.changeDirection(false, true);
    }

    // check sides
    if(ballY >= paddleTop && ballY <= paddleBottom)
    {
        if (ballWest >= paddleLeft && ballWest <= paddleRight) {
            this.changeDirection(true, false);
        }
        else if (ballEast >= paddleLeft && ballEast <= paddleRight) {
            this.changeDirection(true, false);
        }
    }
}

Ball.prototype.changeDirection = function (changeX, changeY) {
    if (changeX == true)
        this.dx = -this.dx;

    if (changeY == true)
        this.dy = -this.dy;
}