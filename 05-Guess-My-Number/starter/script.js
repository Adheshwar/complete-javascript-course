'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

let message = document.querySelector('.message').textContent;
let sr_msg = document.querySelector('.score').textContent;

/* Action to be taken when Check button is clicked */
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    setMessage('⛔ No number!');
  }
  // When Player wins
  else if (guess == secretNumber) {
    if(score > highScore){
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
    document.querySelector('.number').textContent = secretNumber;
    setMessage('🥳 Correct Number!');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = "30rem";
  }
  else if( guess != secretNumber){
    if (score > 1) {
      setMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      setMessage('💥 You lost the game');
      document.querySelector('.score').textContent = 0;
    }
  }
});

/* Action to be taken when again button is clicked */
document.querySelector('.again').addEventListener('click', function () {
  document.querySelector('body').style.backgroundColor = '#222';
  setMessage('Start guessing...');
  score = 20;
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').style.width = "15rem";
  document.querySelector('.number').textContent = "?";
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.guess').value = '';
})

function setMessage(message){
  document.querySelector('.message').textContent = message;
}
