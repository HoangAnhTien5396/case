var canvas = document.getElementById('gamezone');
var context = canvas.getContext('2d');
var birdImg = new Image();
var nenchinh = new Image();
var Ball = new Image();
var pipe1 = new Image();
var pipe2 = new Image();
var Xu = new Image();
var gameImage = new Image();
var gameOver = new Image();
var hit = new Audio("hit.ogg")
var point = new Audio("point.ogg")
var swoosh = new Audio("swoosh.ogg")
var wing = new Audio("wing.ogg")
Ball.src = "2103.png"
nenchinh.src = "nenchinh.png"
birdImg.src = "bird.png"
gameImage.src = "bg.png"
pipe1.src = "ongtren.png"
pipe2.src = "ongduoi.png"
Xu.src = "2102.png"
gameOver.src = "sliver.png"
var score = 0
var hole = 150
var pipe2Legth
var bird = {
    x: 50,
    y: gameImage.height / 2
}
var pipe = []
pipe[0] = {
    x: canvas.width,
    y: 0
}
var dongtien = []
dongtien[0] = {
    x: 750,
    y: 100
}
var ball = []
ball[0] = {
    x: 750,
    y: 100
}
nenchinh.onload =

    function draw() {
        context.drawImage(nenchinh, 0, 0)
        context.font = "20px Arial"
        context.fillText("FLAPPY BIRD", 383, 380)
    }


function start(abc) {
    context.drawImage(gameImage, 0, 0)
    context.drawImage(birdImg, bird.x, bird.y)
    context.font = "20px Arial"
    context.fillStyle = "red"
    context.fillText("SCORE :" + score, 780, 20)
    for (var i = 0; i < pipe.length; i++) {
        pipe2Legth = pipe1.height + hole
        context.drawImage(pipe1, pipe[i].x, pipe[i].y)
        context.drawImage(pipe2, pipe[i].x, pipe[i].y + pipe2Legth)
        pipe[i].x -= 5
        if (pipe[i].x == canvas.width / 2) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipe1.height) - pipe1.height
            })
        }
        if (pipe[i].x == 0)
            pipe.splice(0, 1)
        if (pipe[i].x == bird.x) {
            point.play()
            score++
        }
        if (bird.y + birdImg.height == canvas.height ||
            bird.x + birdImg.width >= pipe[i].x && bird.x <= pipe[i].x + pipe1.width &&
            (bird.y <= pipe[i].y + pipe1.height ||
                bird.y + birdImg.height >= pipe[i].y + pipe2Legth)
        ) {
            hit.play()
            context.drawImage(gameOver, 340, 200)
            return;
        }
    }
    for (var j = 0; j < dongtien.length; j++) {
        context.drawImage(Xu, dongtien[j].x, dongtien[j].y)
        dongtien[j].x -= 2
            //dongtien[j].y += 2
        if (dongtien[j].x == canvas.width / 2) {
            dongtien.push({
                x: canvas.width,
                y: Math.floor(Math.random() * 500)
            })
        }
        if (dongtien[j].x == 0) {
            dongtien.splice(0, 1)
        }
        if (((bird.x > dongtien[j].x + dongtien.width) || (bird.x + birdImg.width < dongtien[j].x)) || ((bird.y > dongtien[j].y + Xu.height) || (bird.y + birdImg.height < dongtien[j].y))) { //((bird.x + birdImg.width == dongtien[j].x) && ((dongtien[j].y >= bird.y && dongtien[j].y <= bird.y + birdImg.height) || (dongtien[j].y + Xu.height >= bird.y && dongtien[j].y + Xu.height <= bird.y + birdImg.height))) {

        } else {
            birdImg = Xu
            setTimeout(function() {
                Xu = birdImg
            }, 5000)
            dongtien.splice(0, 1)
            score += 1

        }
    }
    for (var k = 0; k < ball.length; k++) {
        context.drawImage(Ball, ball[k].x, ball[k].y)
        ball[k].x -= 5
            //ball[k].y += 2
        if (ball[k].x == canvas.width / 2) {
            ball.push({
                x: canvas.width,
                y: Math.floor(Math.random() * 500)
            })
        }
        if (ball[k].x == 0) {
            ball.splice(0, 1)
        }
        if (((bird.x > ball[k].x + Ball.width) || (bird.x + birdImg.width < ball[k].x)) || ((bird.y > ball[k].y + Ball.height) || (bird.y + birdImg.height < ball[k].y))) { //((bird.x + birdImg.width == dongtien[j].x) && ((dongtien[j].y >= bird.y && dongtien[j].y <= bird.y + birdImg.height) || (dongtien[j].y + Xu.height >= bird.y && dongtien[j].y + Xu.height <= bird.y + birdImg.height))) {

        } else {
            birdImg = Ball
            setTimeout(function() {
                Ball = birdImg
            }, 2000)
            ball.splice(0, 1)
            score += 1

        }
    }
    requestAnimationFrame(start)
    bird.y += 3
    swoosh.play()
}

document.addEventListener("mousedown", function() {
    bird.y -= 60
    wing.play();

})


function batdau(abc) {
    document.getElementById("batdau")
    start()
}

function choilai() {
    document.getElementById("choilai")
    location.reload()
}