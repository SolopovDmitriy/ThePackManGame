// initialization
const canvas = document.getElementById('canvas')
const lineWidth = 1528
const lineHeight = 734
canvas.width = lineWidth
canvas.height = lineHeight
const ctx = canvas.getContext('2d')
// end of initialization

const startCoordinate = 50
const figuresAmount = 31
const startPosition = 0

const drawVerticalLines = () => {
    ctx.beginPath()

    for (let multiplier = 1; multiplier < figuresAmount; multiplier++) {
        const position = startCoordinate * multiplier
        ctx.moveTo(position, startPosition)
        ctx.lineTo(position, lineHeight)
    }
    
    ctx.stroke()
    ctx.closePath()
}

const drawHorizontalLines = () => {
    ctx.beginPath()

    for (let multiplier = 1; multiplier < figuresAmount; multiplier++) {
        const position = startCoordinate * multiplier
        ctx.moveTo(startPosition, position)
        ctx.lineTo(lineWidth, position)
    }
    
    ctx.stroke()
    ctx.closePath()
}

const drawTriangle = () => {
    ctx.beginPath()

    ctx.fillStyle = 'blue'
    ctx.moveTo(startPosition, startPosition)
    ctx.lineTo(startCoordinate, startPosition)
    ctx.lineTo(startCoordinate, startCoordinate)
    ctx.fill()

    ctx.closePath()
}

const drawDiamond = (x, y) => {
    // ctx.save()
    // ctx.beginPath()

    // ctx.fillStyle = 'green'
    // const leftX = startCoordinate
    // const rightX = startCoordinate * 2
    // const y = startCoordinate / 2

    // const moveTop = () => {
    //     ctx.moveTo(startCoordinate + startCoordinate / 2, startPosition)
    // }

    // const moveBottom = () => {
    //     ctx.moveTo(startCoordinate + startCoordinate / 2, startCoordinate)
    // }

    // moveTop()
    // ctx.lineTo(leftX, y)
    // moveTop()
    // ctx.lineTo(rightX, y)

    // moveBottom()
    // ctx.lineTo(leftX, y)
    // moveBottom()
    // ctx.lineTo(rightX, y)

    // ctx.stroke()
    // ctx.fill()
    // ctx.restore()
    // ctx.closePath()

    // version with hardcoded numbers

    // ctx.beginPath()
    // ctx.fillStyle = 'green'
    // ctx.moveTo(75, 0)
    // ctx.lineTo(50, 25)
    // ctx.lineTo(75, 50)
    // ctx.lineTo(100, 25)
    // ctx.fill()
    // ctx.closePath()

    // 75, 0
    ctx.beginPath()

    ctx.fillStyle = 'green'
    ctx.moveTo(x, y)
    ctx.lineTo(x - startCoordinate / 2, y + startCoordinate / 2)
    ctx.lineTo(x, y + startCoordinate)
    ctx.lineTo(x + startCoordinate / 2, y + startCoordinate / 2)
    ctx.fill()
    
    ctx.closePath()
}

// function drawDiamon(x, y, width, height){
//     ctx.save();
//     ctx.beginPath();
//     ctx.moveTo(x, y);
    
//     // top left edge
//     ctx.lineTo(x - width / 2, y + height / 2);
    
//     // bottom left edge
//     ctx.lineTo(x, y + height);
    
//     // bottom right edge
//     ctx.lineTo(x + width / 2, y + height / 2);
    
//     // closing the path automatically creates
//     // the top right edge
//     ctx.closePath();
    
//     ctx.fillStyle = "red";
//     ctx.fill();
//     ctx.restore();
// }

drawVerticalLines()
drawHorizontalLines()
drawTriangle()

for (let multiplier = 0; multiplier < figuresAmount; multiplier++) {
    drawDiamond(startCoordinate * multiplier + startCoordinate / 2, startPosition)
}

const bottomYposition = 700
for (let multiplier = 0; multiplier < figuresAmount; multiplier++) {
    drawDiamond(startCoordinate * multiplier + startCoordinate / 2, bottomYposition)
}

for (let multiplier = 0; multiplier < figuresAmount; multiplier++) {
    drawDiamond(startCoordinate / 2, startCoordinate * multiplier)
}

const rightXPosition = lineWidth
for (let multiplier = 0; multiplier < figuresAmount; multiplier++) {
    drawDiamond(rightXPosition, startCoordinate * multiplier)
}

// drawDiamon(75, 0, 50, 50)

(function () {
    window.addEventListener('load', function () {
        const canvas = this.document.getElementById('canvas')
        if (!canvas) {
            return
        }
        const ctx = canvas.getContext('2d')

        var DIR = {
            UP: 0,
            DOWN: 1,
            LEFT: 2,
            RIGHT: 3
        };
        var Pacman = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            r: 50,
            open: 0.3, //коэфициент открытия рта
            color: 'gold',
            speed: 0.01, //скорость работы рта
            mouth: true, //идентификатор работы рта
            moving: 3, //скорость движения
            dir: false, //направление
            currentDir: DIR.RIGHT,
        }
        Pacman.draw = function (ctx) {
            ctx.beginPath();
            ctx.clearRect(0, 0, canvas.width, canvas.height); //сброс полотна

            switch (Pacman.currentDir) {
                case DIR.RIGHT:
                    ctx.arc(Pacman.x, Pacman.y, Pacman.r, 
                        (0 + this.open) * Math.PI,
                        (2 - this.open) * Math.PI);
                    break;
                
                case DIR.LEFT:
                    ctx.arc(Pacman.x, Pacman.y, Pacman.r, 
                        (1.31 - this.open) * Math.PI,
                        (0.7 + this.open) * Math.PI);
                    break;
                default:
                    ctx.arc(Pacman.x, Pacman.y, Pacman.r,
                        (0 + this.open) * Math.PI,
                        (2 - this.open) * Math.PI, Pacman.dir);
            }
            ctx.lineTo(Pacman.x, Pacman.y);
            ctx.fillStyle = Pacman.color;
            ctx.fill();
            ctx.closePath();

            ctx.beginPath(); // нарисовать глазик, это декоративный елемент
            ctx.arc(Pacman.x, Pacman.y - 30, 0.1 * Pacman.r, 0 * Math.PI, 2 * Math.PI);
            ctx.fillStyle = 'black';
            ctx.fill();
            ctx.closePath();

            ctx.beginPath()

            // draw field
            drawVerticalLines()
            drawHorizontalLines()

            for (let multiplier = 0; multiplier < figuresAmount; multiplier++) {
                drawDiamond(startCoordinate * multiplier + startCoordinate / 2, startPosition)
            }
            
            const bottomYposition = 700
            for (let multiplier = 0; multiplier < figuresAmount; multiplier++) {
                drawDiamond(startCoordinate * multiplier + startCoordinate / 2, bottomYposition)
            }
            
            for (let multiplier = 0; multiplier < figuresAmount; multiplier++) {
                drawDiamond(startCoordinate / 2, startCoordinate * multiplier)
            }
            
            const rightXPosition = lineWidth
            for (let multiplier = 0; multiplier < figuresAmount; multiplier++) {
                drawDiamond(rightXPosition, startCoordinate * multiplier)
            }
        }
        Pacman.move = function (direction) {
            switch (direction) {
                case DIR.RIGHT: {
                    Pacman.currentDir = DIR.RIGHT
                    // Pacman.dir = true;
                    Pacman.x += Pacman.moving;
                    if (Pacman.x + Pacman.r >= canvas.width) { Pacman.x = canvas.width - Pacman.r; }
                    break;
                }
                case DIR.LEFT: {
                    Pacman.currentDir = DIR.LEFT
                    // Pacman.dir = false;
                    Pacman.x -= Pacman.moving;
                    if (Pacman.x - Pacman.r <= 0) { Pacman.x = Pacman.r; }
                    break;
                }
                case DIR.UP: {
                    Pacman.currentDir = DIR.UP
                    Pacman.y -= Pacman.moving;
                    if (Pacman.y - Pacman.r <= 0) { Pacman.y = Pacman.r; }
                    break;
                }
                case DIR.DOWN: {
                    Pacman.currentDir = DIR.DOWN
                    Pacman.y += Pacman.moving;
                    if (Pacman.y + Pacman.r >= canvas.height) { Pacman.y = canvas.height - Pacman.r; }
                    break;
                }
            }
        }
        Pacman.live = function () {
            Pacman.animID = setInterval(function () {
                if (Pacman.mouth) { //если рот открытый, закрываем его
                    Pacman.open -= Pacman.speed;
                    if (Pacman.open <= 0.0) { Pacman.mouth = false; }
                } else { //если рот закрытый, открываем его
                    Pacman.open += Pacman.speed;
                    if (Pacman.open >= 0.3) { Pacman.mouth = true; }
                }
                Pacman.draw(ctx);
            }, 800 / 24);
        }
        Pacman.live();
        this.document.addEventListener('keydown', function (e) {
            // console.log(e.keyCode);
            switch (e.keyCode) {
                case 38: {//UP
                    Pacman.move(DIR.UP);
                    break;
                }
                case 40: {//DOWN
                    Pacman.move(DIR.DOWN);
                    break;
                }
                case 37: {//LEFT
                    Pacman.move(DIR.LEFT);
                    break;
                }
                case 39: {//RIGHT
                    Pacman.move(DIR.RIGHT);
                    break;
                }
            }
        });
    });
})()
