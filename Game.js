/* Initialise */

function Game() {
    this.canvas = document.getElementById('canvas');
}

Game.prototype.findContext = function () {
    return this.canvas.getContext('2d');
}

Game.prototype.buildBlock = function (x, y, width, height) {
    var ctx = this.findContext();
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = "#999";
    ctx.fill();
    ctx.closePath();
}

document.addEventListener("DOMContentLoaded", function (event) {
    var game = new Game();
    var xMargin = 3;
    var yMargin = 2;
    var width = 38;
    var height = 10;

    for (var j = 0; j <= 4; j++)
    {
        rowHeight = (j + 1) * yMargin + j * height;
        for (var i = 0; i <= 6; i++)
        {
            game.buildBlock((i + 1) * xMargin + i * width + (j % 2 == 0 ? 0 : 10), rowHeight, width, height);
        }
    }
});