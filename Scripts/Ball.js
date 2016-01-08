function Ball(canvasWidth, canvasHeight) {
    this.speed = 0.5;
    this.radius = 3;
    this.xStartPosition = 150;
    this.yStartPosition = canvasHeight * 0.9 - this.radius;
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

    // check left boundary
    if (this.xCurrentPosition - this.radius <= 0)
        this.changeDirection(true, false);

    // check right boundary
    if (this.xCurrentPosition + this.radius >= width)
        this.changeDirection(true, false);

    // check top boundary
    if (this.yCurrentPosition - this.radius <= 0)
        this.changeDirection(false, true);

    // check bottom boundary
    if (this.yCurrentPosition + this.radius >= height)
        this.changeDirection(false, true);
}

Ball.prototype.checkCollisionWithBlocks = function () {
    for (var i = 0; i < game.blocks.length; i++) {
        var block = game.blocks[i];
        block.checkCollisionWithBlock(this);
    }
}

Ball.prototype.changeDirection = function (changeX, changeY) {
    if (changeX == true)
        this.dx = -this.dx;

    if (changeY == true)
        this.dy = -this.dy;
}
