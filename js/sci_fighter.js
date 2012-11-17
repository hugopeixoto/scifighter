
function Cell () {
    this.type = undefined;
    this.walkable = function () {
        return [ Cell.types.GROUND_LAVA, Cell.types.GROUND_SWAMP, Cell.types.GROUND_STONE, Cell.types.BRIDGE ].indexOf(this.type) >= 0 && !(this.objects[0] instanceof Door);
    }
    this.objects = [];
}

function Player () {
    this.x = 16;
    this.y = 31;
    this.orientation = Player.orientations.UP;
    this.max_hp = 100;
    this.hp = this.max_hp
    this.items = [];
}

function Button (identifier) {
    this.pressed = false;
    this.identifier = identifier;

    this.actUpon = function () {
        this.pressed = !this.pressed;
    }
}

function Door (identifier) {
    this.identifier = identifier;
}

function Bitcho (type, max_hp) {
    this.type = type;
    this.max_hp = max_hp;
    this.hp = max_hp;
}

function GameKey (identifier) {
    this.identifier = identifier;
}

function Level (scifighter) {
    this.scifighter = scifighter;

    this.init = function (width, height) {
        this.width = width;
        this.height = height;
        this.scifighter = scifighter;

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

    this.popFirstOf = function (x, y, test) {
        if (this.withinBounds(x, y)) {
            for (var i = 0; i < this.grid[y][x].objects.length; i++) {
                if (test(this.grid[y][x].objects[i])) {
                    return this.grid[y][x].objects.splice(i, 1)[0];
                }
            }
        }
    }

    this.pokemon = function (x, y) {
        if (this.withinBounds(x, y)) {
            for (var i = 0; i < this.grid[y][x].objects.length; i++) {
                if (this.grid[y][x].objects[i] instanceof Button) {
                    this.grid[y][x].objects[i].actUpon();
                    this.onButtonClicked(this.grid[y][x].objects[i]);
                }
            }
        }
    }

    this.onButtonClicked = function (button) {
        console.log(button);
        switch (button.identifier) {
            case 34:
                var cells = [[13, 14],];
                if (button.pressed) {
                    for (var i = 13; i <= 17; i++) for (var j = 14; j <= 17; j++)
                        this.grid[i][j].type = Cell.types.BRIDGE;
                } else {
                    for (var i = 13; i <= 17; i++) for (var j = 14; j <= 17; j++)
                        this.grid[i][j].type = Cell.types.WATER;
                }
                break;
        }
    }

    this.popFoeAt = function (x, y) {
        return this.popFirstOf(x, y, function(obj){ return obj instanceof Bitcho; });
    }

    this.popPickUpItem = function (x, y) {
        return this.popFirstOf(x, y, function(obj){ return obj instanceof GameKey; });
    }

    this.playerMovedTo = function (x, y) {
        var bridge_openers = [[10, 15], [10, 16]];
        if (this.player.items[0] instanceof GameKey) {
            for (var i = 0; i < bridge_openers.length; i++) {
                if (bridge_openers[i][0] == y && bridge_openers[i][1] == x) {
                    this.grid[9][15].objects = [];
                    this.grid[9][16].objects = [];
                }
            }
        }
    }
}

function SciFighter () {
    this.level = new Level();
    this.state = 0;

    this.last_action = 100;

    this.selectedAnswer = 0;
    this.answered = undefined;

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
            case SciFighter.actions.ENTER:
                break;
        }

        if (action != undefined && action != SciFighter.actions.ENTER) {
            //this.level.player.orientation = action;
        }

        this.last_action -= modifier * 1000;
        if (this.last_action < 0) {
            if (action == SciFighter.actions.ENTER) {
                this.last_action = 150;
                this.level.pokemon(x, y);
            } else {
                if (action != undefined && action != SciFighter.actions.ENTER) {
                    this.level.player.orientation = action;
                }
                if (this.level.withinBounds(x, y) && this.level.grid[y][x].walkable()) {
                    this.level.player.x = x;
                    this.level.player.y = y;
                    this.last_action = 150;
                    this.level.playerMovedTo(x, y);

                    var d = [[-1, 0], [1, 0], [0, -1], [0, 1]];
                    for (var i = 0; i < 4; i++) {
                        var vx = x + d[i][0];
                        var vy = y + d[i][1];

                        var foe = this.level.popFoeAt(vx, vy);
                        if (foe) {
                            this.startBattleWith(foe);
                        }
                    }

                    var item = this.level.popPickUpItem(x, y);
                    if (item) {
                        this.level.player.items.push(item);
                    }
                }
            }
        }
    }

    this.startBattleWith = function (foe)
    {
        this.state = 1;
        this.foe = foe;

        // while HP do foe
        this.challenge = new Challenge(foe.type);
        if(this.challenge.getNextRun()) {
            console.log(this.challenge.getQuestion());
        }
        else {
            console.log("No more questions"); 
        }
    }

    this.updateBattle = function (modifier, action) {
        if (this.answered != undefined) return;
        console.log("asd");
        switch (action) {
            case SciFighter.actions.LEFT:
                if(this.selectedAnswer == 1)
                  this.selectedAnswer = 0;
                else if(this.selectedAnswer == 3)
                  this.selectedAnswer = 2;
                break;
            case SciFighter.actions.UP:
                if(this.selectedAnswer == 2)
                  this.selectedAnswer = 0;
                else if(this.selectedAnswer == 3)
                  this.selectedAnswer = 1;
                break;
            case SciFighter.actions.RIGHT:
                if(this.selectedAnswer == 0)
                  this.selectedAnswer = 1;
                else if(this.selectedAnswer == 2)
                  this.selectedAnswer = 3;
                break;
            case SciFighter.actions.DOWN:
                if(this.selectedAnswer == 0)
                  this.selectedAnswer = 2;
                else if(this.selectedAnswer == 1)
                  this.selectedAnswer = 3;
                break;
            case SciFighter.actions.ENTER:
                if(this.challenge.isAnswerCorrect(this.selectedAnswer))
                {
                  this.answered = "yes";
                } else {
                  this.answered = "no";
                }
                break;
        }
    }

    this.advanceRound = function () {
        if (this.answered == "yes") {
            this.foe.hp = Math.max(0, this.foe.hp - 20);
        } else {
            this.level.player.hp = Math.max(0, this.level.player.hp - 20);
        }

        this.answered = undefined;
        if (this.foe.hp == 0) {
            this.state = 0;
            this.challenge = undefined;
        } else {
            this.challenge.getNextRun();
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
SciFighter.actions.ENTER = 5;

Cell.types = {
    LAVA: 1,
    WATER: 2,
    WALL: 3,
    GROUND_LAVA: 41,
    GROUND_SWAMP: 42,
    GROUND_STONE: 43,
    BRIDGE: 44
}

