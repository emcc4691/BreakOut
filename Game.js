/* Initialise */

function Game() {
    this.canvas = document.getElementById('canvas');
    this.rowNumber = 5;
    this.dx = 2;
    this.dy = -2;
    this.xStartBall = 150;
    this.yStartBall = 140;
    this.radiusBall = 3;
}

Game.prototype.findContext = function () {
    return this.canvas.getContext('2d');
}

Game.prototype.drawBlock = function (x, y, width, height) {
    var ctx = this.findContext();
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = "#999";
    ctx.fill();
    ctx.closePath();
}

Game.prototype.drawBall = function () {
    var ctx = this.findContext();
    ctx.beginPath();
    ctx.arc(this.xStartBall, this.yStartBall, this.radiusBall, 0, Math.PI * 2);
    ctx.fillStyle = "#099";
    ctx.fill();
    ctx.closePath();

    this.xStartBall += this.dx;
    this.yStartBall += this.dy;
}

Game.prototype.setUpBlocks = function(xMargin, yMargin, width, height) {
    for (var j = 0; j <= this.rowNumber - 1; j++) {
        var rowHeight = (j + 1) * yMargin + j * height;
        for (var i = 0; i <= 6; i++) {
            this.drawBlock((i + 1) * xMargin + i * width + (j % 2 == 0 ? 0 : 10), rowHeight, width, height);
        }
    }
}

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();

// Let's play the game

document.addEventListener("DOMContentLoaded", function (event) {
    var game = new Game();

    game.setUpBlocks(3, 2, 38, 10);
    game.drawBall();
});