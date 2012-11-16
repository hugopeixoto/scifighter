var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 832;
canvas.height = 704;

var scifighter = new SciFighter();
loadLevel(scifighter.level);
var renderer = new Renderer(canvas, ctx);

var Key = {
  _pressed: {},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  ENTER: 13,
  
  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },
  
  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },
  
  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};

var selectAction = function()
{
	if (Key.isDown(Key.DOWN)) {
		return SciFighter.actions.DOWN;
	}
	if (Key.isDown(Key.UP)) {
		return SciFighter.actions.UP;
	}
	if (Key.isDown(Key.LEFT)) {
		return SciFighter.actions.LEFT;
	}
	if (Key.isDown(Key.RIGHT)) {
		return SciFighter.actions.RIGHT;
	}
	if (Key.isDown(Key.ENTER)) {
		return SciFighter.actions.ENTER;
	}
}

var main = function () {
	var now = Date.now();
	var delta = now - then;

	scifighter.update(delta /1000, selectAction());
	renderer.render(scifighter);

	then = now;
};


var then = Date.now();
setInterval(main, 1);
//setInterval(main, (1000/60));


function loadLevel(level) {
	var levelGrid = [
		"@@@@@@....######################",
		"@@,,,,....##........#.....######",
		"@@,,,,....##........#.....######",
		"@@,,@@....##........6666..######",
		"@@,,@@....##........666655######",
		"@@,,@@....##........666655######",
		"@@,,@@....##........6666..######",
		"@@,,@@....##........#.....######",
		"@@,,@@....##........#.....######",
		"@@,,@@....####2222##############",
		"@@,,@@....####2222##############",
		"@,,,,@....####....~~~~~~~~~~~~~~",
		"@,BB,@....####1111~~~~~~~~~~~~~~",
		"@,BB,@....####~~~~~...~....~....",
		"@@@@@@....####~~~~~.0.~....~....",
		"..........####~~~~~...~.....G...",
		"..........####~~~~~...~....~....",
		"..........####~~~~~...~~~.~~~~.~",
		"..........####....~...~....~....",
		"....##########....~...~....~....",
		"....##########....~....F...~....",
		"....##########....~...~....~....",
		"....##########....~~~~~~~~~~~~.~",
		"....##########....~........~....",
		"....#####...##....~........~....",
		"....#####.C.##....~.......E.....",
		"....#####...##....~........~....",
		"....######4####..~~~.~~~~~~~~~.~",
		"....77.......#....~........~..D.",
		"....77.......3.............~....",
		"....77.......3.............~....",
		"....77.......#....~........~....",
	];

	level.init(level.width, level.height);

	for(var i = 0; i < level.height; i++) {
		for(var j = 0; j < level.width; j++) {
			switch(levelGrid[i][j]) {
				case "@": // lava
					level.grid[i][j].type = Cell.types.LAVA;
					break;
				case ".": //wall
					level.grid[i][j].type = Cell.types.WALL;
					break;
				case "#": //floor
					level.grid[i][j].type = Cell.types.GROUND_STONE;
					break;
				case ",": //floor lava
					level.grid[i][j].type = Cell.types.GROUND_LAVA;
					break; 
				case "~": //water
					level.grid[i][j].type = Cell.types.WATER;
					break;
				default:
					level.grid[i][j].type = Cell.types.GROUND_SWAMP;
			}
		}
	}
}