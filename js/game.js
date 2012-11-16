var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 832;
canvas.height = 704;

var scifighter = new SciFighter();
var renderer = new Renderer(canvas, ctx);

scifighter.level.init(32, 32);
loadLevel(scifighter.level);

var Key = {
  _pressed: {},

  LEFT: 65,
  UP: 87,
  RIGHT: 68,
  DOWN: 83,
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

window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

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

function loadLevel(level) {
	var levelGrid = [
		"@@@@@@....######################",
		"@@,,,,....##........#.....#eeee#",
		"@@,,,,....##........#.....#eeee#",
		"@@,,@@....##..............#eeee#",
		"@@,,@@....##..............#eeee#",
		"@@,,@@....##..............#eeee#",
		"@@,,@@....##..............#eeee#",
		"@@,,@@....##........#.....#eeee#",
		"@@,,@@....##........#.....#eeee#",
		"@@,,@@....####....#####+########",
		"@@,,@@....#ee#....~~~~~+~~~~~~~~",
		"@,,,,@....#ee#....~~~~~+~~~~~~~~",
		"@,,,,@....#ee#====~~~~~+~~~~~~~~",
		"@,,,,@....#ee#~~~~~+++~++++~++++",
		"@@@@@@....#ee#~~~~~+++~++++~++++",
		"..........#ee#~~~~~+++~+++++++++",
		"..........#ee#~~~~~+++~++++~++++",
		"..........#ee#~~~~~+++~~~+~~~~+~",
		"..........#ee#....~+++~++++~++++",
		"....#######ee#....~+++~++++~++++",
		"....#eeeeeeee#....~++++++++~++++",
		"....#eeeeeeee#....~+++~++++~++++",
		"....#eeeeeeee#....~~~~~~~~~~~~+~",
		"....#eee######....~++++++++~++++",
		"....#eee#....#....~++++++++~++++",
		"....#eee#....#....~+++++++++++++",
		"....#eee#....#....~++++++++~++++",
		"....######.####..~~~+~~~~~~~~~+~",
		".............#....~++++++++~++++",
		"..................+++++++++~++++",
		"..................+++++++++~++++",
		".............#....~++++++++~++++",
	];

	for(var i = 0; i < level.height; i++) {
		for(var j = 0; j < level.width; j++) {
			switch(levelGrid[i][j]) {
				case "@": // lava
					level.grid[i][j].type = Cell.types.LAVA;
					break;
				case "#": //wall
					level.grid[i][j].type = Cell.types.WALL;
					break;
				case ".": //floor
					level.grid[i][j].type = Cell.types.GROUND_STONE;
					break;
				case ",": //floor lava
					level.grid[i][j].type = Cell.types.GROUND_LAVA;
					break;
				case "+": //floor lava
					level.grid[i][j].type = Cell.types.GROUND_SWAMP;
					break; 
				case "~": //water
					level.grid[i][j].type = Cell.types.WATER;
					break;
				case "=": //water
					level.grid[i][j].type = Cell.types.BRIDGE;
					break;
				default:
					level.grid[i][j].type = Cell.types.LAVA;
			}
		}
	}

    level.grid[2][2].objects.push(new Bitcho(2, 2, 2));
    level.grid[6][2].objects.push(new Bitcho(2, 23, 50));
}
