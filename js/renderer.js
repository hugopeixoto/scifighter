var Sprite = function(filename)
{
	this.ready = false;
	this.image = new Image();
	this.image.onload = function ()
	{
		this.ready = true;
	}
	this.image.src = "sprites/"+filename;
}

var Renderer = function(canvas, ctx)
{
	this.canvas = canvas;
	this.ctx = ctx;

	var gridWidth = this.canvas.width / 64;
	var gridHeight = this.canvas.height / 64;

	this.spriteBatch = { }
	this.spriteBatch[Cell.types.LAVA] = new Sprite("lava0.png");
	this.spriteBatch[Cell.types.WATER] = new Sprite("water0.png"),
	this.spriteBatch[Cell.types.WALL] = new Sprite("wall_side.png"),
	this.spriteBatch[Cell.types.GROUND_STONE] = new Sprite("ground_stone.png"),
	this.spriteBatch[Cell.types.GROUND_SWAMP] = new Sprite("ground_swamp.png"),
	this.spriteBatch[Cell.types.GROUND_LAVA] = new Sprite("ground_lava.png"),
	this.spriteBatch["player"] = new Sprite("joao.png")

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
			for(var j = scifighter.level.player.y - (gridHeight-1)/2; j < scifighter.level.player.y + (gridHeight-1)/2; j++)
			{
				if(i >= 0 && i < scifighter.level.grid.length && j >= 0 && j < scifighter.level.grid[0].length)
				{
					var sprite = this.spriteFromCell(scifighter.level.grid, i, j);

					if(sprite.image.ready) {
						this.ctx.drawImage(sprite.image, drawX, drawY);

					}

					if(i == scifighter.level.player.x && j == scifighter.level.player.y)
					{
						this.drawPlayer(drawX, drawY);
					}

				}
				else
				{
					//leave black, out of grid
				}
				drawY += 64;
			}
			drawX += 64;
			drawY = 0;
		}
	}

	this.drawPlayer = function(x, y)
	{
		var playerSprite = this.spriteBatch["player"];
		if (playerSprite.image.ready) {
			this.ctx.drawImage(playerSprite.image, x, y);
		}
	}

	this.spriteFromCell = function(grid, x, y)
	{
		var type = grid[y][x].type;
		return this.spriteBatch[type];
	}
}






