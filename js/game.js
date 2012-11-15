var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 832;
canvas.height = 704;

var board = new Board();
var renderer = new Renderer(ctx);

var main = function () {
	var now = Date.now();
	var delta = now - then;

	board.update(delta /1000);
	renderer.render(board);

	then = now;
};


var then = Date.now();
setInterval(main, 1);
//setInterval(main, (1000/60)); 