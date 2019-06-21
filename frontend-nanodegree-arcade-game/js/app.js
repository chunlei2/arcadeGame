// Enemies our player must avoid

var Enemy = function(x, y, speed) { //x, y is x coordinate, speed is the speed of the bug
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // change position
    this.x = this.x + this.speed * dt;
    // if move out of canvas, start again
    this.offScreenX = 505;
    this.startingX = -100;
    if (this.x >= this.offScreenX) {
        this.x = this.startingX;
    }
    // after each update, check whether there is collision
    this.checkCollision();

};

// check whether there is collision between bug and player
Enemy.prototype.checkCollision = function() {
    // Set hitboxes for collision detection
    var playerBox = {x: player.x, y: player.y, width: 50, height: 40};
    var enemyBox = {x: this.x, y: this.y, width: 60, height: 70};
    // Check for collisions, if playerBox intersects enemyBox, we have one
    if (playerBox.x < enemyBox.x + enemyBox.width &&
        playerBox.x + playerBox.width > enemyBox.x &&
        playerBox.y < enemyBox.y + enemyBox.height &&
        playerBox.height + playerBox.y > enemyBox.y) {
        // Collision detected, call collisionDetected function
        player.x = 200;
        player.y = 400;
    }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor () {
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    update() {

    }
    success() {
        alert('Congratulations! You win!')
        this.x = 200;
        this.y = 400;
    }
    handleInput(allowedKey) {
        switch (allowedKey) {
        case "left":
            // check for left wall, otherwise move
            if (this.x > 0) {
                this.x -= 101
            }
            break;
        case "right":
            // check for right wall, otherwise move
            if (this.x < 401) {
                this.x += 101
            }
            break;
        case "up":
            //check if player reached top of water, if so call success function,
            // otherwise move up
            if (this.y < 0) {
                this.success();
            } else {
                this.y -= 83;
            }
            break;
        case "down":
            //check for bottom, otherwise move down
            if (this.y < 400) {
                this.y += 83;
            }
            break;

    }
    }

}






// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Instantiate player
var player = new Player();

// Empty allEnemies array
var allEnemies = [];

// Instantiate all enemies, set to 3, push to allEnemies array
for (var i = 0; i < 3; i++) {
    var startSpeed = 50*Math.floor(Math.random() * 10 + 1);
    //enemys start off canvas (x = -100) at the following Y positions: 60, 145, 230
    allEnemies.push(new Enemy(-100, 60 + (85 * i), startSpeed));
}



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

