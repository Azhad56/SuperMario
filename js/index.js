// Playing music 
let mainaudio = new Audio('./audio/super-mario.mp3');
let gameoveraudio = new Audio('./audio/angry-bird.mp3');
let myinter = setInterval(() => {
    mainaudio.play();
}, 1000);
let score = 0;
let cross = true;
// let scoreCont = document.querySelector('#scoreCont');
// if user pressed up key or space key or w key then do jump

document.onkeydown = function(e) {
        let mario = document.querySelector('.mario');
        console.log("Key Code is : ", e.keyCode);
        if (e.keyCode == 38 || e.keyCode == 32 || e.keyCode == 87) {
            // const mario = document.querySelector('.mario');
            mario.classList.add('animatemario');
            setTimeout(() => {
                mario.classList.remove('animatemario');
            }, 700);
        } else if (e.keyCode == 39 || e.keyCode == 68) {
            let marioX = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
            // check if mario does not go beyond right of the window
            if (marioX < 1200) {
                mario.style.width = "70px";
                mario.style.backgroundImage = "url('../img/mario.png')";
                mario.style.left = marioX + 100 + "px";
            }

        } else if (e.keyCode == 65 || e.keyCode == 37) {
            let marioX = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
            // check if mario does not go beyond of top of the window
            if (marioX >= 0) {
                mario.style.width = "85px";
                mario.style.backgroundImage = "url('../img/marioback.png')";
                mario.style.left = marioX - 100 + "px";
            }
        }
    }
    // check for collision in the game 
    // if both mario and pipe are intersecting then do gameover otherwise do score++
    // check this at each interval of 100ms

setInterval(() => {
    // Getting mario, gameover and oppnent element from html
    let mario = document.querySelector('.mario');
    let gameover = document.querySelector('.gameOver');
    let opponent = document.querySelector('.opponent');
    // Get current position of mario from left
    let dx = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
    // Get current position of mario from top
    let dy = parseInt(window.getComputedStyle(mario, null).getPropertyValue('top'));
    // Get current position of opponent from left
    let ox = parseInt(window.getComputedStyle(opponent, null).getPropertyValue('left'));
    // Get current position of opponent from top
    let oy = parseInt(window.getComputedStyle(opponent, null).getPropertyValue('top'));
    // check if both collapse or not
    let offsetX = Math.abs(dx - ox);
    let offsetY = Math.abs(dy - oy);
    if (offsetX < 50 && offsetY < 50) {
        gameover.style.visibility = 'visible';
        opponent.classList.remove('opponentAnimate');
        gameoveraudio.play();
        setTimeout(() => {
            gameoveraudio.pause();
            mainaudio.pause();
            clearInterval(myinter);
        }, 1000);
    } else if (cross && offsetX < 150) { // if cross is true and mario and pipe both are near then calculate score
        score += 20;
        updateScore(score);
        cross = false;
        // make cross true after 1s 
        // it means it will calculate score after 1s
        setTimeout(() => {
                cross = true;
            },
            1000)

        // now the mario has crossed the pipe here 
        // now what i am doing that, when mario crossed the pipe then after 500ms
        // i will decrease the animation duration little but by setting animationDuration 
        // property in opponent's style 
        // but i will deacrease it for certain number of amounts
        let aniDuartion = parseFloat(window.getComputedStyle(opponent, null).getPropertyValue('animation-duration'));
        console.log(aniDuartion);
        if (aniDuartion >= 3.25) {
            setTimeout(() => {
                aniDuartion -= 0.05;
                opponent.style.animationDuration = aniDuartion + 's';
            }, 500)
        }

    }

}, 10);
// it will get score as parameter and update score container div with score 
function updateScore(score) {
    document.querySelector(".scoreCont").innerHTML = "Your Score :" + score;
}