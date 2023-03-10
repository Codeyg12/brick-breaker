const playArea = document.querySelector(".play-area");
const scoreBoard = document.getElementById("score");
const restart = document.querySelector(".restart");
const brickWidth = 100;
const brickHeight = 20;
const areaWidth = 560;
const areaHeight = 300;
const ballDiameter = 20;
const playerStart = [230, 10];
let currentPosition = playerStart;
const ballStart = [270, 30];
let ballCurrent = ballStart;
let xDir = 5;
let yDir = 5;
let gameInterval;
let gamePlaying = true;

// class Brick {
//   constructor(x, y) {
//     this.bottomLeft = [x, y];
//     this.bottomRight = [x + brickWidth, y];
//     this.topLeft = [x, y + brickHeight];
//     this.topRight = [x + brickWidth, y + brickHeight];
//   }
// }

// let bricks = [
//   new Brick(10, 270),
//   new Brick(120, 270),
//   new Brick(230, 270),
//   new Brick(340, 270),
//   new Brick(450, 270),
//   new Brick(10, 245),
//   new Brick(120, 245),
//   new Brick(230, 245),
//   new Brick(340, 245),
//   new Brick(450, 245),
//   new Brick(10, 220),
//   new Brick(120, 220),
//   new Brick(230, 220),
//   new Brick(340, 220),
//   new Brick(450, 220),
// ];

// function addBricks() {
//   for (let i = 0; i < bricks.length; i++) {
//     const brick = document.createElement("div");
//     brick.classList.add("brick");
//     brick.style.left = `${bricks[i].bottomLeft[0]}px`;
//     brick.style.bottom = `${bricks[i].bottomLeft[1]}px`;
//     playArea.appendChild(brick);
//   }
// }

// addBricks();

const player = document.createElement("div");
player.classList.add("player");
drawPlayer();
playArea.appendChild(player);

function drawPlayer() {
  player.style.left = `${currentPosition[0]}px`;
  player.style.bottom = `${currentPosition[1]}px`;
}

function movePlayer(e) {
  // console.log(e.key);
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 5;
        drawPlayer();
      }
      break;
    case "ArrowRight":
      if (currentPosition[0] < areaWidth - brickWidth) {
        currentPosition[0] += 5;
        drawPlayer();
      }
      break;
    default:
      // console.log(gamePlaying);
      if (!gamePlaying) {
        window.location.reload();
      }
      break;
  }
}

document.addEventListener("keydown", movePlayer);

const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
playArea.appendChild(ball);

function drawBall() {
  ball.style.left = `${ballCurrent[0]}px`;
  ball.style.bottom = `${ballCurrent[1]}px`;
}

function moveBall() {
  ballCurrent[0] += xDir;
  ballCurrent[1] += yDir;
  drawBall();
  checkCollisions();
}
gameInterval = setInterval(moveBall, 50);

function checkCollisions() {
  if (
    ballCurrent[0] >= areaWidth - ballDiameter ||
    ballCurrent[1] >= areaHeight - ballDiameter ||
    ballCurrent[0] < 0
  ) {
    changeDirection();
  }

  if (ballCurrent[1] < 0) {
    gameOver();
  }

  if (
    ballCurrent[0] > currentPosition[0] &&
    ballCurrent[0] < currentPosition[0] + brickWidth &&
    ballCurrent[1] > currentPosition[1] &&
    ballCurrent[1] < currentPosition[1] + brickHeight
  ) {
    changeDirection();
  }

  // for (let i = 0; i < bricks.length; i++) {
  //   if (
  //     ballCurrent[0] > bricks[i].bottomLeft[0] &&
  //     ballCurrent[0] < bricks[i].bottomRight[0] &&
  //     ballCurrent[1] + ballDiameter > bricks[i].bottomLeft[1] &&
  //     ballCurrent[1] < bricks[i].topLeft[1]
  //   ) {
  //     const allBricks = Array.from(document.querySelectorAll(".brick"));
  //     allBricks[i].classList.remove("brick");
  //     bricks.splice(i, 1);
  //     changeDirection();
  //     scoreBoard.innerHTML++;
  //   }
  // }
}

function changeDirection() {
  if (xDir == 5 && yDir == 5) {
    yDir = -5;
  } else if (xDir == 5 && yDir == -5) {
    xDir = -5;
  } else if (xDir == -5 && yDir == -5) {
    yDir = 5;
  } else if ((xDir = -5 && yDir == 5)) {
    xDir = 5;
  }
}

function gameOver() {
  gamePlaying = false;
  clearInterval(gameInterval);
  playArea.innerHTML = "You Lost";
  restart.innerHTML = "Click any button to play again";
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 560;
canvas.height = 300;

let lastTime = 0;

class InputHandler {
  constructor(game) {
    this.game = game;
    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "ArrowLeft" || e.key === "ArrowRight") &&
        !this.game.keys.includes(e.key)
      ) {
        this.game.keys.push(e.key);
      }
      if (this.game.gameOver && e.key === "Enter") {
        this.game.keys.push(e.key);
      }
    });

    window.addEventListener("keyup", (e) => {
      if (this.game.keys.includes(e.key)) {
        this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
      }
    });
  }
}

class Brick {
  constructor(multiple) {
    this.width = 100;
    this.height = 20;
    this.color = "greenyellow";
    this.gap = 100;
    this.multiple = multiple;
    this.x = 110 * this.multiple;
    this.markedForDeletion = false;
  }
  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x - this.gap, this.y, this.width, this.height);
    context.fillStyle = "black";
    context.strokeRect(this.x - this.gap, this.y, this.width, this.height);
  }
}
class Row1 extends Brick {
  constructor(multiple) {
    super(multiple);
    this.y = 10;
  }
}
class Row2 extends Brick {
  constructor(multiple) {
    super(multiple);
    this.y = 40;
  }
}
class Row3 extends Brick {
  constructor(multiple) {
    super(multiple);
    this.y = 70;
  }
}

class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 20;
    this.x = 230;
    this.y = 270;
    this.speedX = 0;
    this.color = "orangered";
  }

  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    if (this.game.keys.includes("ArrowRight")) {
      this.speedX = 5;
    } else if (this.game.keys.includes("ArrowLeft")) {
      this.speedX = -5;
    } else {
      this.speedX = 0;
    }
    this.x += this.speedX;

    if (this.x > this.game.width - this.width) {
      this.x = this.game.width - this.width;
    } else if (this.x < 0) {
      this.x = 0;
    }
  }
}

class Ball {
  constructor(game) {
    this.game = game;
    this.x = 280;
    this.y = 260;
    this.speedX = -2;
    this.speedY = -2;
    this.diameter = 10;
    this.color = "darkmagenta";
    this.score = 0;
    this.lost = false;
  }
  draw(context) {
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x, this.y, this.diameter, 0, 2 * Math.PI);
    context.fill();
    // context.beginPath()
    // context.strokeRect(this.x - this.diameter, this.y - this.diameter, this.diameter * 2, this.diameter * 2)
  }
  update() {
    // Play area border
    if (this.x < 0 + this.diameter) {
      this.speedX = 2;
    } else if (this.x > this.game.width - this.diameter) {
      this.speedX = -2;
    } else if (this.y < 0 + this.diameter) {
      this.speedY = 2;
    } else if (this.y > this.game.height - this.diameter) {
      this.speedY = -2;
      this.lost = true;
    }
    // Player area
    if (
      this.x > this.game.player.x &&
      this.y + this.diameter > this.game.player.y &&
      this.x < this.game.player.x + this.game.player.width
    ) {
      this.changeDirection();
    }
    // brick detection
    for (let i = 0; i < this.game.bricks.length; i++) {
      if (
        this.x - this.diameter * 2 < this.game.bricks[i].x &&
        this.y - this.diameter * 2 < this.game.bricks[i].y &&
        this.x - this.diameter * 2 >
          this.game.bricks[i].x - this.game.bricks[i].width &&
        this.y - this.diameter * 2 >
          this.game.bricks[i].y - this.game.bricks[i].height
      ) {
        this.game.bricks[i].markedForDeletion = true;
        // this.speedY = 2
        this.score++;
        this.changeDirection();
      }
    }
    this.y += this.speedY;
    this.x += this.speedX;
  }
  changeDirection() {
    if (this.speedX == 2 && this.speedY == 2) {
      this.speedY = -2;
    } else if (this.speedX == 2 && this.speedY == -2) {
      this.speedX = -2;
    } else if (this.speedX == -2 && this.speedY == -2) {
      this.speedY = 2;
    } else if ((this.speedX = -2 && this.speedY == 2)) {
      this.speedX = 2;
    }
  }
}

class UI {
  constructor(game, ball) {
    this.game = game;
    this.ball = ball;
    this.fontFamily = 20;
    this.color = "black";
  }
  draw(context) {
    context.save();
    context.fillStyle = this.color;
    context.fillText(`Score: ${this.ball.score}`, 20, 10);
    if (this.game.gameOver) {
      context.textAlign = "center";
      context.font = "50px Helvetica";
      let restartMessage = "To restart press Enter";
      if (!this.ball.lost) {
        context.fillText(
          "You broke all bricks",
          this.game.width * 0.5,
          this.game.height * 0.5 - 40
        );
        context.font = "30px Helvetica";
        context.fillText(
          restartMessage,
          this.game.width * 0.5,
          this.game.height * 0.5 + 40
        );
      } else {
        context.fillText(
          "You lost your ball",
          this.game.width * 0.5,
          this.game.height * 0.5 - 40
        );
        context.font = "30px Helvetica";
        context.fillText(
          restartMessage,
          this.game.width * 0.5,
          this.game.height * 0.5 + 40
        );
      }
    }
    context.restore();
  }
}

class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.ball = new Ball(this);
    this.ui = new UI(this, this.ball);
    this.gameStart = true;
    this.gameOver = false;
    this.keys = [];
    this.bricks = [];
    this.maxBricks = 15;
  }

  draw(context) {
    this.player.draw(context);
    if (this.gameStart) {
      this.gameStart = !this.gameStart;
      for (let i = 1; i <= 5; i++) {
        this.bricks.push(new Row1(i));
        this.bricks.push(new Row2(i));
        this.bricks.push(new Row3(i));
      }
    }
    this.bricks.forEach((brick) => {
      brick.draw(context);
    });
    this.ball.draw(context);
    this.ui.draw(context);
  }

  update() {
    if (!this.gameOver) {
      this.player.update();
      this.ball.update();
    }
    this.bricks = this.bricks.filter((brick) => !brick.markedForDeletion);
    if (this.bricks.length == 0 || this.ball.lost) {
      this.gameOver = true;
    }
    if (this.keys.includes("Enter")) {
      window.location.reload();
    }
  }
}
const game = new Game(canvas.width, canvas.height);
function animate(timestamp) {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.draw(ctx);
  game.update(deltaTime);
  requestAnimationFrame(animate);
}
animate(0);

// Fix ball bouncing off bricks and player
