const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const startBtn = document.querySelector("#start-game");
const levels = document.querySelector(".levels");
const easy = levels.querySelector("#easy");
const medium = levels.querySelector("#medium");
const high = levels.querySelector("#hard");
const highScore = document.querySelector("#highScore");
let lastHole;
let timeUp = false;
let score = 0;

// Getting Highscore from localStorage
highScore.textContent = localStorage.getItem("score");


function randomTime(max,min) {
    return Math.round( Math.random() * (max - min) + min );
}

function randomHole(holes) {
    // Getiing a random Index for hole Array b/w 0 to 5
    const idx = Math.floor( Math.random() * holes.length );
    const hole = holes[idx];

    // if lastHole is equal to hole, we again run our function  
    // (recursion ) and keep running it until we get a function where 
    // hole is different from the last one
    if(hole == lastHole){
        console.log("NAH!! That's the same one bud");
        return randomHole(holes);
    }

    // storing the currentHole as LastHole
    lastHole = hole;

    // return the currentHole
    return hole;
}

function peep(min,max) {
    // Time => random time for how much mole will be up
    const time = randomTime(min,max);

    // hole => randome hole at which mole will appear
    const hole = randomHole(holes);

    // mole shows to the hole that we picked randomly
    hole.classList.add("up");

    // After time elapsed, mole will go down
    setTimeout(() => {
        hole.classList.remove("up");
        // if time is not up, we keep running peep() function
        if(!timeUp) peep(min,max);
    },time)
}

function startGame() {

    // setting scoreboard , score and timeUp to it's initial value 
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;

    // call the peep() function to make mole appear in holes
    if(easy.checked) {
        peep(500,1200);
    } else if(medium.checked) {
        peep(200,1000);
    } else if(hard.checked) {
        peep(50,300);
    }

    // after Ten seconds, game will stop
    setTimeout(() => {
        timeUp = true;
        if( localStorage.getItem("score") == null || score > localStorage.getItem("score") ) {
            localStorage.setItem("score",score);
            highScore.textContent = localStorage.getItem("score");
        }
    }, 10000);
    
}

function bonk(e) {
    if(!e.isTrusted) return; // Cheater!! for someone who use some kind of script to click when mole appears
    score++;
    this.classList.remove("up");
    scoreBoard.textContent = score;
}

startBtn.addEventListener("click", startGame);
moles.forEach(mole => mole.addEventListener("click", bonk));
