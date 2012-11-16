var Renderer = function(canvas, ctx)
{
	this.ctx = ctx;
	this.canvas = canvas;

	this.render = function (board, ctx) {
		/*if (bgReady) {
			ctx.drawImage(bgImage, 0, 0);
		}*/



		ctx.clearRect ( 0 , 0 , canvas.width , canvas.height );

		drawBoard(board, ctx);

		// Test text
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("I HAZ ZE TEXT!!!1!!!");
	};

	this.drawBoard = function (board, ctx)
	{

	}

}


