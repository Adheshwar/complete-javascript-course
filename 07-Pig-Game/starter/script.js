'use strict';

// Selecting elements 
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
let cur0El = document.getElementById('current--0');
let cur1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let activePlayer, scores, currentScore,playing;
function init() {
    scores = [0, 0];
    diceEl.classList.add('hidden');
    for (let iter = 0; iter < scores.length; iter++) {
        document.getElementById(`score--${iter}`).textContent = 0;
        document.getElementById(`current--${iter}`).textContent = 0;
    }
    activePlayer = 0;
    currentScore = 0;
    playing = true;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

init();

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function () {
    if (playing) {
        // Generate random number between 1 and 6
        const dice = Math.trunc(Math.random() * 6) + 1;

        //Display Dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //If rolled dice is 1 switch player else add score
        if (dice !== 1) {
            // Add to the current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else {
            //scores[activePlayer] += currentScore;
            //document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
            switchPlayer();
        }
    }

})

btnHold.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 100) {
            playing = false;
            diceEl.classList.add('hidden')
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else {
            switchPlayer();
        }
    }
})

btnNew.addEventListener('click', function () {
    init();
})

