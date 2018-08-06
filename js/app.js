// Enemies our player must avoid

//ES6 version of Enemy Class
class Enemy{
  constructor(x, y, speed) {

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug-edited.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 98;
    this.height = 20;
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
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

    // Determine if the player icon collides with an enemy
    // icon.
    if (this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y < (player.y + player.height) &&
        this.height + this.y > player.y
    ) {
        player.reset();
    }
  }

  render() {
    // Draw the enemy on the screen, required method for game
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
    this.score = 0;
  }

  update() {
      // Prevent player icon from disappearing off the edge of the game.
      if (this.x > 420) {
        this.x = 420;
      } else if (this.x < 20) {
          this.x = 20;
      } else if (this.y > 465) {
          this.y = 465;
      } else if (this.y <= 50) {
          this.success();
      }
  }

  reset() {
    // Reset the player to the initial position.
    this.x = 220;
    this.y = 465;
  }

  success() {
    // Add 1 to score if player reaches water.
    // Reset player to original position.
    this.score += 1;
    this.reset();
  }

  win() {

    // Display winner text on the canvas
    ctx.font = "30px Arial";
    ctx.fillText("Congratulations, you are a winner!", 20, 450);

    // Stop all the enemies from moving
    for (const enemy of allEnemies) {
      enemy.speed = 0;
    }

    // After 3 second delay showing winner message, reset the
    // game.
    setTimeout(function() {
      window.location.reload();
      }, 3000
    );
  }



  render() {
    // Draw the player icon on the screen.
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    //Score details at top of canvas.
    ctx.font = "30px Arial";
    ctx.fillText("You have got "+ this.score + " times across out of 5", 10, 40);

    // Player wins if reach the water.
    if (this.score == 5) {
      this.win();
    }
  }

  handleInput(keyDirection) {

    // Moves the player character when using the keyboard arrow keys.
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
