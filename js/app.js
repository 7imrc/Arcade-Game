// Enemies our player must avoid
/*
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

*/
//ES6 version of Enemy Class
class Enemy{
  constructor(x, y, speed) {
    this.sprite = 'images/enemy-bug-edited.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 98;
    this.height = 20;
  }

  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // When enemy gets to right hand edge of screen, reset it
    // to re-appear from the lefthand side.
    if (this.x >= 500) {
      this.x = -100;
    }

    //Determine if the player icon gets too close to the enemy
    //icon
    /*
    if (Math.abs(player.x - this.x) <= 80 && Math.abs(player.y - this.y) <=40) {
      //Collision detected! Reload the page
      console.log("Collision!");
      console.log("player x postn:" + player.x);
      console.log("enemy x postn:" + this.x);
      //window.location.reload();
    }
*/
    if (this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y < (player.y + player.height) &&
        this.height + this.y > player.y
    ) {
          /*console.log("Collision!");
          console.log("player x: " + player.x);
          console.log("player y: " + player.y);
          console.log("bug x: " + this.x);
          console.log("bug y: " + this.y);
          console.log("player x plus width: " + (player.x + player.width));
          console.log("player y plus height: " + (player.y + player.height));
          console.log("bug x plus width: " + (this.x + this.width));
          console.log("bug y plus height: " + (this.y + this.height));
          */
          window.location.reload();
    }
/*
  collision() {
    //Determines if the player collides with one of the enemies
    //const PlayerColl = {x: 5, y: 5, width: 50, height: 50}
    //const EnemyColl = {x: 20, y: 10, width: 10, height: 10}

    //Check each enemy in turn to determine if collided with player
      //allEnemies.forEach(enemy => {
        if (player.x - this.x <= 20 && player.y - this.y) {
          console.log("Collision!");
        }
      //})

    /*
    if (Enemy.x < Player.x + Player.width &&
        Enemy.x + Enemy.width > Player.x &&
        Enemy.y < Player.y + Player.height &&
        Enemy.height + Enemy.y > Player.y) {
    }
*/
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x, y) {
    this.sprite = 'images/char-boy-edited.png';
    this.x = x;
    this.y = y;
    this.width = 68;
    this.height = 78;
  }
  update() {
      console.log(this.x);
      //Prevent player icon from disappearing off the edge of the game
      if (this.x > 420) {
        this.x = 420;
      } else if (this.x < 20) {
        this.x = 20;
      } else if (this.y > 465) {
        this.y = 465;
      } else if (this.y < 50) {
        this.y = 50;
      }

      //Player wins if reaches the water
      if (this.y <= 50) {
        console.log("you win!");
        window.alert("You win!");
      }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  handleInput(keyDirection) {

    //Moves the player character when using the keyboard arrow keys
    if (keyDirection === 'right') {
        this.x += 100;
    } else if (keyDirection === 'left') {
      this.x -= 100;
    } else if (keyDirection === 'up') {
      this.y -= 83;
    } else if (keyDirection === 'down') {
      this.y += 83;
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [];
const enemyOne = new Enemy(-100, 140, 25);
const enemyTwo = new Enemy(-100, 220, 50);
const enemyThree = new Enemy(-100, 305, 35);
allEnemies.push(enemyOne, enemyTwo, enemyThree);
// Place the player object in a variable called player
const player = new Player(220,465);

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
