var Renderer = function(canvas, ctx)
{
	this.ctx = ctx;
	this.canvas = canvas;

	var gridWidth = this.canvas.width / 64;
	var gridHeight = this.canvas.height / 64;

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

	this.drawLevel = function (scifighter)
	{
		var drawX = 0;
		var drawY = 0;
		for(var i = scifighter.level.player.x - (gridWidth-1)/2; i < scifighter.level.player.x + (gridWidth-1)/2; i++)
		{
			for(var j = scifighter.level.player.y - (gridHeight-1)/2; i < scifighter.level.player.y + (gridHeight-1)/2; i++)
			{
				if(i >= 0 && i < scifighter.level.grid.length && j >= 0 && j < scifighter.level.grid[0].length)
				{
					var spriteReady = false;
					var spriteImage = new Image();
					spriteImage.onload = function () {
						spriteReady = true;
					};
					spriteImage.src = "sprites/"+filenameFromCell(scifighter.level.grid, i, j);

					if (spriteReady) {
						ctx.drawImage(spriteImage, drawX, drawY);
					}

					if(i == scifighter.level.player.x && j == scifighter.level.player.y)
					{
						drawPlayer(drawX, drawY);
					}

				}
				else
				{
					//leave black, out of grid
				}
				drawY += 64;
			}
			drawX += 64;
		}
	}
}

var drawPlayer = function(x, y)
{
	var playerReady = false;
	var playerImage = new Image();
	playerage.onload = function () {
		playerReady = true;
	};
	playerImage.src = "sprites/joao.png";
	if (playerReady) {
		ctx.drawImage(playerReady, x, y);
	}
}

var filenameFromCell = function(grid, x, y)
{
	switch(grid[x][y].type)
	{
		case Cell.types.LAVA:
		
			return "lava0.png";
		break;

		case Cell.types.WATER:
		
			return "water0.png"
		break;

		case Cell.types.WALL:
		
			return "wall_side.png";
		break;

		case Cell.types.GROUND_LAVA:
		
			return "ground_lava.png";
		break;

		case Cell.types.GROUND_SWAMP:
		
			return "ground_swamp.png";
		break;

		case Cell.types.GROUND_STONE:
		
			return "ground_stone.png";
		break;
	}
}


