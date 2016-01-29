function PlayBar(canvasWidth, canvasHeight) {
    this.height = canvasHeight * 0.3;
    this.width = canvasWidth * 0.5;
    this.xPosition = canvasWidth * 0.25;
    this.yPosition = canvasHeight * 0.5;
    this.fillStyle = "#099";
}

PlayBar.prototype.drawPlayBar = function (context) {
    context.beginPath();
    context.rect(this.xPosition, this.yPosition, this.width, this.height);
    context.fillStyle = this.fillStyle;
    context.fill();
    context.closePath();
}