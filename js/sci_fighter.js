
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

Cell.types = {
    LAVA = 1,
    WATER = 2,
    WALL = 3,
    GROUND_LAVA = 41,
    GROUND_SWAMP = 42,
    GROUND_STONE = 43
}

