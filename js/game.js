var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 832;
canvas.height = 704;

var scifighter = new SciFighter();
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
	console.log("pressed: %i", selectAction());
	renderer.render(scifighter);

	then = now;
};


var then = Date.now();
setInterval(main, 1);
//setInterval(main, (1000/60)); 