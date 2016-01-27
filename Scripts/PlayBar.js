function PlayBar(cavasWidth, canvasHeight) {
    this.height = 3;
    this.width = 50;
    this.xPosition = this.xStartPostion;
    this.yPosition = canvasHeight * 0.95;
    this.fillStyle = "#099";
}

PlayBar.prototype.drawPlayBar = function (context) {
    context.beginPath();
    context.rect(this.xPosition, this.yPosition, this.width, this.height);
    context.fillStyle = this.fillStyle;
    context.fill();
    context.closePath();
}