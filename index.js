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