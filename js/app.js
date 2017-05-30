const ROW_SIZE = 83;
const COLUMN_SIZE = 101;

const ROW_NUMBER = 5;
const COLUMN_NUMBER = 5;

const ENTITIE_Y_OFFSET = -25;

const ENEMY_SPEED = 200
const ENEMY_INIT_CHANCE = 0.3
const ENEMY_INIT_SPEED = 300
const PLAYER_BOARD_LIMIT = {
    LEFT: 0,
    RIGHT: COLUMN_SIZE*(COLUMN_NUMBER-1),
    TOP: ROW_SIZE,
    BOTTOM: ROW_SIZE*(ROW_NUMBER-1),
}

const PLAYERS_SPRITES = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png',
]

const ENEMIES_SPRITE = 'images/Rock.png';

// const ENTITIE_SIZE = {
//     WIDTH: 101,
//     HEIGHT: 171,
// };

// const ENTITIE_CENTER = {
//     X: 50.5,
//     Y: 124,
// };

var returnRandom = function(arrayOfValues) {
    return arrayOfValues[Math.floor(Math.random() * arrayOfValues.length)];
}

var Entitie = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
}

Entitie.prototype.render = function() {
    x = this.x;
    y = this.y + ENTITIE_Y_OFFSET;
    ctx.drawImage(Resources.get(this.sprite), x, y);
};

var Enemy = function() {
    const ENEMY_INIT_X = -150;
    const ENEMY_INIT_Y = returnRandom([ROW_SIZE, ROW_SIZE*2, ROW_SIZE*3])
    Entitie.call(this, ENEMY_INIT_X, ENEMY_INIT_Y, ENEMIES_SPRITE);
};

Enemy.prototype = Object.create(Entitie.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = function(dt) {
    this.x = this.x + ENEMY_SPEED * dt
};

var Player = function() {
    const PLAYER_INIT_X = COLUMN_SIZE*2; // vertical middle
    const PLAYER_INIT_Y = ROW_SIZE*4; // bottom line
    const PLAYERSPRITE = returnRandom(PLAYERS_SPRITES) // random avatar

    Entitie.call(this, PLAYER_INIT_X, PLAYER_INIT_Y, PLAYERSPRITE);
};

Player.prototype = Object.create(Entitie.prototype);
Player.prototype.constructor = Enemy;
Player.prototype.update = function(dt) {
    if (this.x > PLAYER_BOARD_LIMIT.RIGHT) { // Prevent right side escape
        this.x -= COLUMN_SIZE;
    }else if (this.x < PLAYER_BOARD_LIMIT.LEFT) { // Prevent left side escape
        this.x += COLUMN_SIZE;
    }else if (this.y > PLAYER_BOARD_LIMIT.BOTTOM) { // Prevent downside escape
        this.y -= ROW_SIZE;
    }else if (this.y < PLAYER_BOARD_LIMIT.TOP) { // Win on upside escape
        winLevel();
    };
    // console.log('Player','x:', this.x, 'y:', this.y);
};

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

document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

var winLevel = function(){
    console.log('winLevel!')
    score++

    player = new Player()
}

var player = null;

var allEnemies = [];

var initPlayer = function() {
    player = new Player
}

var initEnemies = function() {

    setInterval(function(){
        var rand = Math.random();
        if (rand < ENEMY_INIT_CHANCE){
            enemy = allEnemies.push(new Enemy)
        }
    }, ENEMY_INIT_SPEED)
}

initPlayer()
initEnemies()
var score = 0;
var higth_score = 0;
