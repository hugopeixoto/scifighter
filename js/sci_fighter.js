
function Cell () {
    this.type = undefined;
    this.walkable = function () {
        return [ Cell.types.GROUND_LAVA, Cell.types.GROUND_SWAMP, Cell.types.GROUND_STONE, Cell.types.BRIDGE ].indexOf(this.type) >= 0;
    }
    this.objects = [];
}

function Player () {
    this.x = 16;
    this.y = 31;
    this.orientation = Player.orientations.UP;
    this.max_hp = 100;
    this.hp = this.max_hp
}

function Bitcho (type, max_hp) {
    this.type = type;
    this.max_hp = max_hp;
    this.hp = max_hp;
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
    this.state = 0;

    this.last_action = 100;

    this.update = function (modifier, action) {
        if (this.state == 0) this.updateBoard(modifier, action);
        if (this.state == 1) this.updateBattle(modifier, action);
    }

    this.updateBoard = function (modifier, action) {
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

        if (action != undefined) {
            this.level.player.orientation = action;
        }

        this.last_action -= modifier * 1000;
        if (this.last_action < 0 && this.level.withinBounds(x, y) && this.level.grid[y][x].walkable()) {
            this.level.player.x = x;
            this.level.player.y = y;
            this.last_action = 150;

            var d = [[-1, 0], [1, 0], [0, -1], [0, 1]];
            for (var i = 0; i < 4; i++) {
                var vx = x + d[i][0];
                var vy = y + d[i][1];

                if (this.level.withinBounds(vx, vy) && this.level.grid[vy][vx].objects.length > 0) {
                    var edgar_alan_foe = this.level.grid[vy][vx].objects.pop();
                    this.startBattleWith(edgar_alan_foe);
                }
            }
        }
    }

    this.startBattleWith = function (foe)
    {
        this.state = 1;
        this.foe = foe;
        this.challenge = new Challenge(foe.type);
        console.log(this.challenge.question); 
    }

    this.updateBattle = function (modifier, action) {
        // console.log("pokemon");
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
    GROUND_STONE: 43,
    BRIDGE: 44
}

