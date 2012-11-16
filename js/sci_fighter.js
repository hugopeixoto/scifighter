
function Cell () {
    this.type = undefined;
    this.walkable = function () {
        return [ Cell.types.GROUND_LAVA, Cell.types.GROUND_SWAMP, Cell.types.GROUND_STONE ].indexOf(this.type) >= 0;
    }
    this.objects = [];
}

function Player () {
    this.x = 16;
    this.y = 31;
    this.orientation = Player.orientations.NORTH;
}

function Level () {
    this.init = function (width, height) {
        this.width = width;
        this.height = height;

        this.grid = [];
        this.player = new Player();

        for (var i = 0; i < this.width; i++) {
            this.grid[i] = [];
            for (var j = 0; j < this.height; j++) {
                this.grid[i][j] = new Cell();
            }
        }
    }

    this.withinBounds = function (x, y) {
        return x >= 0 && y >= 0 && x < this.width && y < this.height;
    }
}

function SciFighter () {
    this.level = new Level();
    this.last_action = 150;

    this.update = function (modifier, action) {
        this.level.player.orientation = action;

        var x = this.level.player.x;
        var y = this.level.player.y;
        switch (action) {
            case SciFighter.actions.LEFT:
              x--;
              break;
            case SciFighter.actions.UP:
              y--;
              break;
            case SciFighter.actions.RIGHT:
              x++;
              break;
            case SciFighter.actions.DOWN:
              y++;
              break;
        }

        this.last_action -= modifier * 1000;
        if (this.last_action < 0 && this.level.withinBounds(x, y) && this.level.grid[y][x].walkable()) {
            this.level.player.x = x;
            this.level.player.y = y;
            this.last_action = 150;
        }
    }
}

Player.orientations = {
  LEFT: 1,
  UP: 2,
  RIGHT: 3,
  DOWN: 4
}

SciFighter.actions = Player.orientations;

Cell.types = {
    LAVA: 1,
    WATER: 2,
    WALL: 3,
    GROUND_LAVA: 41,
    GROUND_SWAMP: 42,
    GROUND_STONE: 43
}

