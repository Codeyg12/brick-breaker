const playArea = document.querySelector(".play-area");
const scoreBoard = document.getElementById("score");
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
let gameInterval

class Brick {
  constructor(x, y) {
    this.bottomLeft = [x, y];
    this.bottomRight = [x + brickWidth, y];
    this.topLeft = [x, y + brickHeight];
    this.topRight = [x + brickWidth, y + brickHeight];
  }
}

let bricks = [
  new Brick(10, 270),
  new Brick(120, 270),
  new Brick(230, 270),
  new Brick(340, 270),
  new Brick(450, 270),
  new Brick(10, 245),
  new Brick(120, 245),
  new Brick(230, 245),
  new Brick(340, 245),
  new Brick(450, 245),
  new Brick(10, 220),
  new Brick(120, 220),
  new Brick(230, 220),
  new Brick(340, 220),
  new Brick(450, 220),
];

function addBricks() {
  for (let i = 0; i < bricks.length; i++) {
    const brick = document.createElement("div");
    brick.classList.add("brick");
    brick.style.left = `${bricks[i].bottomLeft[0]}px`;
    brick.style.bottom = `${bricks[i].bottomLeft[1]}px`;
    playArea.appendChild(brick);
  }
}

addBricks();

const player = document.createElement("div");
player.classList.add("player");
drawPlayer();
playArea.appendChild(player);

function drawPlayer() {
  player.style.left = `${currentPosition[0]}px`;
  player.style.bottom = `${currentPosition[1]}px`;
}

function movePlayer(e) {
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
    clearInterval(gameInterval)
  }

  if (
    ballCurrent[0] > currentPosition[0] &&
    ballCurrent[0] < currentPosition[0] + brickWidth &&
    ballCurrent[1] > currentPosition[1] &&
    ballCurrent[1] < currentPosition[1] + brickHeight
  ) {
    changeDirection();
  }

  for (let i = 0; i < bricks.length; i++) {
    if (
      ballCurrent[0] > bricks[i].bottomLeft[0] &&
      ballCurrent[0] < bricks[i].bottomRight[0] &&
      ballCurrent[1] + ballDiameter > bricks[i].bottomLeft[1] &&
      ballCurrent[1] < bricks[i].topLeft[1]
    ) {
      const allBricks = Array.from(document.querySelectorAll(".brick"));
      allBricks[i].classList.remove("brick");
      bricks.splice(i, 1);
      changeDirection();
      scoreBoard.innerHTML++
    }
  }
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

// Scoring system
// ? classes for ball and player?