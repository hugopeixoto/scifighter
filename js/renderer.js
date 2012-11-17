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
    this.spriteBatch["player"]["battle"] = new Sprite("joao/up_large.png");
    this.spriteBatch["bitcho"] = {};
    this.spriteBatch["bitcho"][0] = new Sprite("bitcho/green.png");
    this.spriteBatch["bitcho"][1] = new Sprite("bitcho/purple.png");
    this.spriteBatch["bitcho"][2] = new Sprite("bitcho/red.png");
    this.spriteBatch["bitcho"][3] = new Sprite("bitcho/red_large.png");

	this.render = function (scifighter) {


		this.ctx.clearRect( 0 , 0 , canvas.width , canvas.height );

		if(scifighter.state == 0)
		{
			this.drawLevel(scifighter);
		}
		else if(scifighter.state == 1)
		{
			this.drawBattle(scifighter);
		}

		
	};

	this.drawBattle = function(scifighter)
	{
		this.drawPlayersAndHealth(scifighter);

		this.drawQuestion(scifighter);
	}

	this.drawPlayersAndHealth = function(scifighter)
	{
		this.ctx.fillStyle = "rgb(216, 216, 190)";
		this.ctx.fillRect(0, 0, this.canvas.width, 4 * 64);

		switch(scifighter.foe.type)
		{
			case 2:
				if(this.spriteBatch["bitcho"][3].image.ready) {
					this.ctx.drawImage(this.spriteBatch["bitcho"][3].image, canvas.width - this.spriteBatch["bitcho"][3].image.width , 0);
				}
			break;
		}

		this.drawHPBar(this.canvas.width - 256 - 16, 208, scifighter.foe.hp, scifighter.foe.max_hp);

		var playerSprite = this.spriteBatch["player"]["battle"];
		if (playerSprite.image.ready) {
			this.ctx.drawImage(playerSprite.image, 0, 1 * 64);
		}

		this.drawHPBar(16, 16, scifighter.level.player.hp, scifighter.level.player.max_hp);
	}

	this.drawHPBar = function(x, y, hp, max_hp)
	{
		var healthBarWidth = 256;
		var healthBarHeight = 32;

		hp *= 0.1; //TODO: TIRAR ISTO DAQUI!

		this.ctx.strokeStyle = "rgb(0, 0, 0)";
		this.ctx.lineWidth = 4;
		this.ctx.strokeRect(x + 3, y + 3, healthBarWidth, healthBarHeight);

		this.ctx.fillStyle = "#a9da8b";
		this.ctx.fillRect(x, y, (hp/max_hp)*healthBarWidth, healthBarHeight);

		this.ctx.fillStyle = "#d7958e";
		this.ctx.fillRect(x+(hp/max_hp)*healthBarWidth, y, (1 - hp/max_hp)*healthBarWidth, healthBarHeight);

		this.ctx.strokeStyle = "rgb(154, 154, 178)";
		this.ctx.lineWidth = 4;
		this.ctx.strokeRect(x, y, healthBarWidth, healthBarHeight);

		
		this.ctx.fillStyle = "rgb(50, 50, 70)";
		this.ctx.font = "Bold 24px Courier New";
		this.ctx.textAlign = "left";
		this.ctx.textBaseline = "top";
		this.ctx.fillText(hp + "/" + max_hp, x + 4, y + 4);

		//this.ctx.strokeStyle = "rgb(71, 71, 89)";
		//this.ctx.lineWidth = 1.5;
		//this.ctx.strokeText(hp + "/" + max_hp, x + 4, y + healthBarHeight/2);
	}

	this.drawQuestion = function(scifighter)
	{
		this.ctx.fillStyle = "rgb(203, 203, 164)";
		this.ctx.fillRect(0, 4 * 64, this.canvas.width, 3 * 64);

		this.ctx.fillStyle = "rgb(0, 0, 0)";
		this.ctx.font = "Bold 24px Courier New";
		this.ctx.textAlign = "left";
		this.ctx.textBaseline = "top";

		this.ctx.strokeStyle = "rgb(50, 50, 70)";
		this.ctx.lineWidth = 6;
		this.ctx.strokeRect(0 + 3, 4 * 64 + 3, this.canvas.width - 6, 3 * 64 - 6);

		
        var question = scifighter.challenge.getQuestion();

		question = question.split("\n");

		startY = 4 * 64 + 32;

		for(var ermahgerd = 0; ermahgerd < question.length; ermahgerd++)
		{
			this.ctx.fillText(question[ermahgerd], 32, startY);
			startY += 32;
		}
        
		this.ctx.fillStyle = "rgb(154, 154, 178)";
		this.ctx.fillRect(0, 7 * 64, this.canvas.width, 4 * 64);

		var answers = scifighter.challenge.getMultipleChoice();

		for(var ermahgerd = 0; ermahgerd < answers.length; ermahgerd++)
		{
			this.drawAnswer(scifighter, ermahgerd, answers[ermahgerd]);
		}
		
	}

	this.drawAnswer = function(scifighter, index, answer)
	{

		var answerButtonWidth = (this.canvas.width - (32*3))/2;
		var answerButtonHeight = ((4*64)-(32*3))/2;

		var x = 32;
		var y = 7 * 64 + 32;

		if(index >= 2)
		{
			y += answerButtonHeight + 32;
		}

		if(index%2 == 1)
		{
			x += answerButtonWidth + 32;
		}


		this.ctx.fillStyle = "rgb(255, 255, 0)";
		if(index == scifighter.selectedQuestion)
		{
			this.ctx.fillStyle = "rgb(0, 0, 255)";
		}
		this.ctx.fillRect(x, y, answerButtonWidth, answerButtonHeight);

		this.ctx.fillStyle = "rgb(0, 0, 0)";
		this.ctx.font = "Bold 24px Courier New";
		this.ctx.textAlign = "left";
		this.ctx.textBaseline = "top";

		this.ctx.fillText(answer, x, y);


	}

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
                if(scifighter.level.withinBounds(x, y+1) && scifighter.level.withinBounds(x, y-1) &&
                	grid[y+1][x].type == Cell.types.WALL && grid[y-1][x].type == Cell.types.WALL)
                {
                	return this.spriteBatch[type][1]; //wall_bottom
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
                else if((scifighter.level.withinBounds(x, y+1) && grid[y+1][x].type == Cell.types.WALL &&
                		scifighter.level.withinBounds(x+1, y) && grid[y][x+1].type == Cell.types.WALL &&
                		scifighter.level.withinBounds(x-1, y) && grid[y][x+1].type == Cell.types.WALL) ||
                		(!scifighter.level.withinBounds(x, y+1) || grid[y+1][x].type == Cell.types.WALL))
                {
                	return this.spriteBatch[type][6]; //wall_top_half
                }
                else
                {
                	return this.spriteBatch[type][0]; //wall side
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






