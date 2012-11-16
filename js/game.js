var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 832;
canvas.height = 704;

var board = new Board();
var renderer = new Renderer(ctx);

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
		return Board.DOWN;
	}
	if (Key.isDown(Key.UP)) {
		return Board.UP;
	}
	if (Key.isDown(Key.LEFT)) {
		return Board.LEFT;
	}
	if (Key.isDown(Key.RIGHT)) {
		return Board.RIGHT;
	}
	if (Key.isDown(Key.ENTER)) {
		return Board.ENTER;
	}
}

var main = function () {
	var now = Date.now();
	var delta = now - then;

	board.update(delta /1000, selectAction());
	renderer.render(board);

	then = now;
};


var then = Date.now();
setInterval(main, 1);
//setInterval(main, (1000/60)); 