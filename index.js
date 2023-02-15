const playArea = document.querySelector('.play-area')
const scoreBoard = document.getElementById('score')
const blockWidth = 100
const blockHeight = 20
const playerStart = [230, 10]
let currentPosition = playerStart

class Brick {
    constructor(x, y) {
        this.bottomLeft = [x, y]
        this.bottomRight = [x + blockWidth, y]
        this.topLeft = [x, y + blockHeight]
        this.topRight = [x + blockWidth, y + blockHeight]
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
    new Brick(450, 220)
]

function addBricks() {
    for (let i = 0; i < bricks.length; i++) {
        const brick = document.createElement('div')
        brick.classList.add('brick')
        brick.style.left = `${bricks[i].bottomLeft[0]}px`
        brick.style.bottom = `${bricks[i].bottomLeft[1]}px`
        playArea.appendChild(brick)
    }
}

addBricks()

const player = document.createElement('div')
player.classList.add('player')
player.style.left = `${currentPosition[0]}px`
player.style.bottom = `${currentPosition[1]}px`
playArea.appendChild(player)

function movePlayer(e) {
    switch (e.key) {
        case 'ArrowLeft':
            player.style.left = `${currentPosition[0]++}px`
            break;
        case 'ArrowRight':
            break;
        default:
            break;
    }
}