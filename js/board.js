
function Level () {
    this.width = 32;
    this.height = 32;
    
}

function Board () {
    this.level = new Level();
    this.update = function (modifier, action) {
    }
}

Board.actions = {
  LEFT: 1,
  UP: 2,
  RIGHT: 3,
  DOWN: 4
}

