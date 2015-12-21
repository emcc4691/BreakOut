/* Initialise */

function Game() {
    this.canvas = document.getElementById('canvas');
}

Game.prototype.findContext = function () {
    return this.canvas.getContext('2d');
}

Game.prototype.buildBlock = function (a, b, c, d) {
    var ctx = this.findContext();
    ctx.beginPath();
    ctx.rect(a, b, c, d);
    ctx.fillStyle = "#FFF";
    ctx.fill();
    ctx.closePath();
}

document.addEventListener("DOMContentLoaded", function (event) {
    var game = new Game();

    game.buildBlock(10, 20, 30, 40);
});