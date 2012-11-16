var Renderer = function(canvas, ctx)
{
	this.ctx = ctx;
	this.canvas = canvas;

	this.render = function (scifighter) {
		/*if (bgReady) {
			ctx.drawImage(bgImage, 0, 0);
		}*/



		this.ctx.clearRect( 0 , 0 , canvas.width , canvas.height );

		this.drawLevel(scifighter);

		// Test text
		this.ctx.fillStyle = "rgb(250, 250, 250)";
		this.ctx.font = "24px Helvetica";
		this.ctx.textAlign = "left";
		this.ctx.textBaseline = "top";
		this.ctx.fillText("I HAZ ZE TEXT!!!1!!!", canvas.width/2-100, canvas.width/2-50);
	};

	this.drawLevel = function (board)
	{

	}

}


