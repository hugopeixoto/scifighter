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

	this.stepRenderTime = 250;

	var gridWidth = this.canvas.width / 64;
	var gridHeight = this.canvas.height / 64;

	this.fourFrameAnimationStep = 0;
	this.now = Date.now();

	this.spriteBatch = { }
	this.spriteBatch[Cell.types.LAVA] = []
	this.spriteBatch[Cell.types.LAVA][0] = new Sprite("lava/lava0.png");
	this.spriteBatch[Cell.types.LAVA][1] = new Sprite("lava/lava1.png");
	this.spriteBatch[Cell.types.WATER] = []
	this.spriteBatch[Cell.types.WATER][0] = new Sprite("water/water0.png"),
	this.spriteBatch[Cell.types.WATER][1] = new Sprite("water/water1.png"),
	this.spriteBatch[Cell.types.WATER][2] = new Sprite("water/water2.png"),
	this.spriteBatch[Cell.types.WATER][3] = new Sprite("water/water3.png"),
	this.spriteBatch[Cell.types.WALL] = []
	this.spriteBatch[Cell.types.WALL][0] = new Sprite("wall/wall_bottom.png"),
	this.spriteBatch[Cell.types.WALL][1] = new Sprite("wall/wall_side.png"),
	this.spriteBatch[Cell.types.WALL][2] = new Sprite("wall/wall_bottom_left.png"),
	this.spriteBatch[Cell.types.WALL][3] = new Sprite("wall/wall_top_left.png"),
	this.spriteBatch[Cell.types.WALL][4] = new Sprite("wall/wall_top_right.png"),
	this.spriteBatch[Cell.types.WALL][5] = new Sprite("wall/wall_bottom_right.png"),
	this.spriteBatch[Cell.types.WALL][6] = new Sprite("wall/wall_top_half.png"),
	this.spriteBatch[Cell.types.GROUND_STONE] = new Sprite("ground_stone.png"),
	this.spriteBatch[Cell.types.GROUND_SWAMP] = new Sprite("ground_swamp.png"),
	this.spriteBatch[Cell.types.GROUND_LAVA] = new Sprite("ground_lava.png"),
	this.spriteBatch[Cell.types.BRIDGE] = {};
	this.spriteBatch[Cell.types.BRIDGE]["middle"] = new Sprite("bridge/middle.png"),
	this.spriteBatch[Cell.types.BRIDGE]["left"] = new Sprite("bridge/left.png"),
	this.spriteBatch[Cell.types.BRIDGE]["right"] = new Sprite("bridge/right.png"),
	this.spriteBatch["player"] = {}
    this.spriteBatch["player"][Player.orientations.UP] = new Sprite("joao/up.png");
    this.spriteBatch["player"][Player.orientations.LEFT] = new Sprite("joao/left.png");
    this.spriteBatch["player"][Player.orientations.DOWN] = new Sprite("joao/down.png");
    this.spriteBatch["player"][Player.orientations.RIGHT] = new Sprite("joao/right.png");
    this.spriteBatch["bitcho"] = {};
    this.spriteBatch["bitcho"][0] = new Sprite("bitcho/green.png");
    this.spriteBatch["bitcho"][1] = new Sprite("bitcho/purple.png");
    this.spriteBatch["bitcho"][2] = new Sprite("bitcho/red.png");

	this.render = function (scifighter) {
		/*if (bgReady) {
			ctx.drawImage(bgImage, 0, 0);
		}*/



		this.ctx.clearRect( 0 , 0 , canvas.width , canvas.height );

		this.drawLevel(scifighter);

		// Test text
		//this.ctx.fillStyle = "rgb(250, 250, 250)";
		//this.ctx.font = "24px Helvetica";
		//this.ctx.textAlign = "left";
		//this.ctx.textBaseline = "top";
		//this.ctx.fillText("I HAZ ZE TEXT!!!1!!!", canvas.width/2-100, canvas.width/2-50);
	};

	this.drawLevel = function (scifighter)
	{
		var drawX = 0;
		var drawY = 0;

		var then = this.now;
		this.now = Date.now();

		this.stepRenderTime -= (this.now - then);
		if(this.stepRenderTime <= 0)
		{
			this.fourFrameAnimationStep++;
			if(this.fourFrameAnimationStep >= 4)
			{
				this.fourFrameAnimationStep = 0;
			}
			this.stepRenderTime = 250;
		}


		for(var i = scifighter.level.player.x - (gridWidth-1)/2; i <= scifighter.level.player.x + (gridWidth-1)/2; i++)
		{
			for(var j = scifighter.level.player.y - (gridHeight-1)/2; j <= scifighter.level.player.y + (gridHeight-1)/2; j++)
			{
				if(i >= 0 && i < scifighter.level.grid.length && j >= 0 && j < scifighter.level.grid[0].length)
				{
					var sprite = this.spriteFromCell(scifighter.level.grid, i, j);

					if(sprite.image.ready) {
						if(sprite.image.height == 128)
							this.ctx.drawImage(sprite.image, drawX, drawY - 64);
						else
							this.ctx.drawImage(sprite.image, drawX, drawY);

					}

					if(i == scifighter.level.player.x && j == scifighter.level.player.y)
					{
						this.drawPlayer(scifighter.level.player, drawX, drawY);
					}

                    for (var k = 0; k < scifighter.level.grid[j][i].objects.length; k++) {
                        this.drawObject(scifighter.level.grid[j][i].objects[k], drawX, drawY);    
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

	this.drawPlayer = function(player, x, y)
	{
		var playerSprite = this.spriteBatch["player"][player.orientation];
		if (playerSprite.image.ready) {
			this.ctx.drawImage(playerSprite.image, x, y);
		}
	}

    this.drawObject = function (object, x, y)
    {
        var sprite = this.spriteBatch["bitcho"][object.type];
        if (sprite.image.ready) {
            this.ctx.drawImage(sprite.image, x, y);
        }
    }

	this.spriteFromCell = function(grid, x, y)
	{
		var type = grid[y][x].type;

        switch (type) {
            case Cell.types.WALL:
                if(scifighter.level.withinBounds(x, y+1) && grid[y+1][x].type != Cell.types.WALL && 
                	(!scifighter.level.withinBounds(x, y-1) || grid[y-1][x].type != Cell.types.WALL || 
                		(scifighter.level.withinBounds(x, y-1) && grid[y-1][x].type == Cell.types.WALL && 
                		scifighter.level.withinBounds(x-1, y) && grid[y][x-1].type == Cell.types.WALL && 
                		scifighter.level.withinBounds(x+1, y) && grid[y][x+1].type == Cell.types.WALL)))
                {
                	return this.spriteBatch[type][0]; //wall_bottom
                }
                else if(scifighter.level.withinBounds(x, y-1) && grid[y-1][x].type == Cell.types.WALL &&
                		scifighter.level.withinBounds(x+1, y) && grid[y][x+1].type == Cell.types.WALL &&
                		(!scifighter.level.withinBounds(x-1, y) || grid[y][x-1].type != Cell.types.WALL) &&
                		(!scifighter.level.withinBounds(x, y+1) || grid[y+1][x].type != Cell.types.WALL))
                {
                	return this.spriteBatch[type][2]; //wall_bottom_left
                }
                else if(scifighter.level.withinBounds(x, y+1) && grid[y+1][x].type == Cell.types.WALL &&
                		scifighter.level.withinBounds(x+1, y) && grid[y][x+1].type == Cell.types.WALL &&
                		(!scifighter.level.withinBounds(x-1, y) || grid[y][x-1].type != Cell.types.WALL) &&
                		(!scifighter.level.withinBounds(x, y-1) || grid[y-1][x].type != Cell.types.WALL))
                {
                	return this.spriteBatch[type][3]; //wall_top_left
                }
                else if(scifighter.level.withinBounds(x, y+1) && grid[y+1][x].type == Cell.types.WALL &&
                		scifighter.level.withinBounds(x-1, y) && grid[y][x-1].type == Cell.types.WALL &&
                		(!scifighter.level.withinBounds(x+1, y) || grid[y][x+1].type != Cell.types.WALL) &&
                		(!scifighter.level.withinBounds(x, y-1) || grid[y-1][x].type != Cell.types.WALL))
                {
                	return this.spriteBatch[type][4]; //wall_top_right
                }
                else if(scifighter.level.withinBounds(x, y-1) && grid[y-1][x].type == Cell.types.WALL &&
                		scifighter.level.withinBounds(x-1, y) && grid[y][x-1].type == Cell.types.WALL &&
                		(!scifighter.level.withinBounds(x+1, y) || grid[y][x+1].type != Cell.types.WALL) &&
                		(!scifighter.level.withinBounds(x, y+1) || grid[y+1][x].type != Cell.types.WALL))
                {
                	return this.spriteBatch[type][5]; //wall_bottom_right
                }
                else if(scifighter.level.withinBounds(x, y+1) && grid[y+1][x].type == Cell.types.WALL &&
                		scifighter.level.withinBounds(x+1, y) && grid[y][x+1].type == Cell.types.WALL &&
                		scifighter.level.withinBounds(x-1, y) && grid[y][x+1].type == Cell.types.WALL)
                {
                	return this.spriteBatch[type][6]; //wall_top_half
                }
                else
                {
                	return this.spriteBatch[type][1]; //wall side
                }
                break;
            case Cell.types.BRIDGE:
                var herp = "middle";
                if (grid[y][x - 1].type != Cell.types.BRIDGE) herp = "left";
                if (grid[y][x + 1].type != Cell.types.BRIDGE) herp = "right";
                return this.spriteBatch[type][herp];
            case Cell.types.WATER:
                return this.spriteBatch[type][this.fourFrameAnimationStep];
            case Cell.types.LAVA:
                return this.spriteBatch[type][Math.floor(this.fourFrameAnimationStep/2)];
            default:
                return this.spriteBatch[type];
        }

		//return this.spriteBatch[type];
	}
}






