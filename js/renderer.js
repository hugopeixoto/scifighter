var renderer = function(ctx)
{
	this.ctx = ctx;

	this.render = function (board, ctx) {
		/*if (bgReady) {
			ctx.drawImage(bgImage, 0, 0);
		}*/



		ctx.clearRect ( 0 , 0 , canvas.width , canvas.height );

		drawBoard(board, ctx);

		// Score
		/*ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);*/
	};

	this.drawBoard = function (board, ctx)
	{

	}

}


