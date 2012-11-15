var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1280;
canvas.height = 720;


var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta /1000);
	render();

	then = now;
};


var then = Date.now();
setInterval(main, 1);
//setInterval(main, (1000/60)); 