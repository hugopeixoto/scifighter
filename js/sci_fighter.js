
function Cell () {
    this.type = undefined;
    this.walkable = false;
    this.objects = [];
}

function Player () {
    this.x = 16;
    this.y = 0;
}

function Level () {
    this.width = 32;
    this.height = 32;
    
    this.grid = [];
    this.player = new Player();

    for (var i = 0; i < this.width; i++) {
        this.grid[i] = [];
        for (var j = 0; j < this.height; j++) {
            this.grid[i][j] = new Cell();
        }
    }
}


function SciFighter () {
    this.level = new Level();
    this.update = function (modifier, action) {
    }
}

SciFighter.actions = {
  LEFT: 1,
  UP: 2,
  RIGHT: 3,
  DOWN: 4
}

