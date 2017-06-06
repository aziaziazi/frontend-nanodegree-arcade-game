////////////
// Constants
////////////

// helper to match the rows/columns size/numer
// To position on the screen, use ROW_SIZE*1, ROW_SIZE*2, ROW_SIZE*3...
const ROW_SIZE = 83;
const COLUMN_SIZE = 101;

// entitie sprites offset to make the image
// appear in the center of the block
const SPRITE_Y_OFFSET = -25;

// enemies speed
const ENEMY_SPEED = 200
// Enemies creation frequency
const ENEMY_INIT_FREQUENCY = 10
// Enemies chance to appear during creation
const ENEMY_INIT_CHANCE = 0.01

// border for player movements
const PLAYER_BOARD_LIMIT = {
    LEFT: 0,
    RIGHT: COLUMN_SIZE*4,
    TOP: 0,
    BOTTOM: ROW_SIZE*4,
}

// Sprites for the player
const PLAYERS_SPRITES = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png',
]

// Sprite for the enemies
const ENEMIES_SPRITE = 'images/Rock.png';

/////////////////////
// Entitie SuperClass
/////////////////////
// A superclass handle properties shared with it's subclasses

// x and y are the position of the entitie
// sprite is the image to render
var Entitie = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
}

// render method used by the engine :
// draw the sprite on the sprite on the x/y position
Entitie.prototype.render = function() {
    x = this.x;
    y = this.y + SPRITE_Y_OFFSET;
    ctx.drawImage(Resources.get(this.sprite), x, y);
};

/////////////////
// enemy subclass
/////////////////

// ENEMY_INIT_X initialize the X position: -150 is
// a bit offset on the left side
// ENEMY_INIT_Y initialize the Y position: randomly
// row 1, 2 or 3. (use the returnRandom() helper
// Entitie.call(...) Add a lookup to Entities superclass properties.
// .call() bind the first parameter to "this" in the function called :
// Enemy's "this" will be bind to Entity's "this"
var Enemy = function() {
    const ENEMY_INIT_X = -120;
    const ENEMY_INIT_Y = returnRandom([ROW_SIZE, ROW_SIZE*2, ROW_SIZE*3])
    Entitie.call(this, ENEMY_INIT_X, ENEMY_INIT_Y, ENEMIES_SPRITE);
};

// Lookup the prototype's methods in superClass
Enemy.prototype = Object.create(Entitie.prototype);
// Reset the constructor method
Enemy.prototype.constructor = Enemy;
// Update medthod for the engine
// ENEMY_SPEED Makes the enemy move
// dt is the delta time needed to have a consistent frame speed
Enemy.prototype.update = function(dt) {
    this.x = this.x + ENEMY_SPEED * dt
};

//////////////////
// Player SubClass
//////////////////
// See Enemy SubClass for more details
// lastSide stores the last vertical side the player was ("top" or "bottom")
var Player = function() {
    const PLAYER_INIT_X = COLUMN_SIZE*2; // vertical middle
    const PLAYER_INIT_Y = -ROW_SIZE; // top line
    this.playerSprite = returnRandom(PLAYERS_SPRITES) // random avatar
    this.lastSide = "top";
    Entitie.call(this, PLAYER_INIT_X, PLAYER_INIT_Y, this.playerSprite);
};

Player.prototype = Object.create(Entitie.prototype);
Player.prototype.constructor = Enemy;
Player.prototype.update = function(dt) {
    // Prevent side escaping by reseting the player position
    if (this.x > PLAYER_BOARD_LIMIT.RIGHT) { // right side
        this.x -= COLUMN_SIZE;
    }else if (this.x < PLAYER_BOARD_LIMIT.LEFT) { // left side
        this.x += COLUMN_SIZE;
    }else if (this.y > PLAYER_BOARD_LIMIT.BOTTOM) { // downside
        this.y -= ROW_SIZE;
    }else if (this.y < PLAYER_BOARD_LIMIT.TOP) { // upside
        this.y += ROW_SIZE;;
    // call arrivedSafe() when the top or bottom is reached
    }else if (this.y == PLAYER_BOARD_LIMIT.TOP) {
        this.arrivedSafe("top")
    }else if (this.y == PLAYER_BOARD_LIMIT.BOTTOM) {
        this.arrivedSafe("bottom")
    }
};
// if the other side is reached, invert lastSide and increment the score
Player.prototype.arrivedSafe = function(side) {
    if (side != this.lastSide) {
        this.lastSide == "bottom" ? this.lastSide = "top" : this.lastSide = "bottom";
        score++
        console.log('arrivedSafe!')
    }
};
// move the player position
Player.prototype.handleInput = function(pressedKey) {
    switch(pressedKey) {
        case "left":
            this.x = this.x - COLUMN_SIZE;
            break;
        case "up":
            this.y = this.y - ROW_SIZE;
            break;
        case "right":
            this.x = this.x + COLUMN_SIZE;
            break;
        case "down":
            this.y = this.y + ROW_SIZE;
            break;
    }
};


//////////
// Helpers
//////////

// Store the score and hight scoce
var score = 0;
var higth_score = 0;

// choose a random item in an array
var returnRandom = function(arrayOfValues) {
    return arrayOfValues[Math.floor(Math.random() * arrayOfValues.length)];
}

// Check for keys events and dispatch to handleInput()
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

// Set a global Player
var player = null;
var initPlayer = function() {
    player = new Player
}

// Create random enemies
// TODO delete the ennemies objects when they're out of window
var allEnemies = [];
var initEnemies = function() {
    setInterval(function(){
        var rand = Math.random();
        if (rand < ENEMY_INIT_CHANCE){
            enemy = allEnemies.push(new Enemy)
        }
    }, ENEMY_INIT_FREQUENCY)
}

// Launch the initilization of the Player and Ennemies
initPlayer()
initEnemies()
