function Block(xStart, yStart, width, height) {
    this.xStart = xStart;
    this.yStart = yStart;
    this.width = width;
    this.height = height;
    this.fillStyle = "#999";
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
    if (ballY >= blockUpper && ballY <= blockLower) {
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
    if (ballX >= blockLeft && ballX <= blockRight) {
        // check top
        if (ballSouth >= blockUpper && ballSouth <= blockLower) {
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