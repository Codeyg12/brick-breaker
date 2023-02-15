const playArea = document.querySelector('.play-area')
const scoreBoard = document.getElementById('score')
const blockWidth = 100
const blockHeight = 20

class Brick {
    constructor(x, y) {
        this.bottomLeft = [x, y]
        this.bottomRight = [x + blockWidth, y]
        this.topLeft = [x, y + blockHeight]
        this.topRight = [x + blockWidth, y + blockHeight]
    }
}

let bricks = [
    new Brick(10, 270)
]

function addBricks() {
    for (let i = 0; i < bricks.length; i++) {
        const brick = document.createElement('div')
        brick.classList.add('brick')
        brick.style.left = bricks[i].bottomLeft[0] + 'px'
        brick.style.bottom = bricks[i].bottomLeft[1] + 'px'
        playArea.appendChild(brick)
    }
}

addBricks()