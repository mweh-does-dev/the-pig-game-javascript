// Variabler för poäng
const score1 = document.querySelector('#score-0');
const score2 = document.querySelector('#score-1');

// Variabler för currentbox
const current1 = document.querySelector('#current-0');
const current2 = document.querySelector('#current-1');

// Variabler för spelare 
const player1 = document.querySelector('.player-0');
const player2 = document.querySelector('.player-1');


// Variabler för knapparna
const dice = document.querySelector('#dice-1');
const btnNewGame = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');

// Variabler som ges värde
let scores = [0, 0]; 
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Funktion för att starta spelet
const startGame = () => {
    scores = [0, 0]; 
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    
    score1.textContent = 0; 
    score2.textContent = 0;
    current1.textContent = 0;
    current2.textContent = 0;

    player1.classList.add('active');
    player2.classList.remove('active');
    player1.querySelector('.player-current-box').classList.remove('hidden');
    player2.querySelector('.player-current-box').classList.remove('hidden');

    player1.querySelector('.player-name').textContent = 'SPELARE 1';
    player2.querySelector('.player-name').textContent = 'SPELARE 2';

    dice.classList.add('hidden');
};
startGame();

const nextPlayer = () => {
    document.querySelector(`#current-${activePlayer}`).textContent = 0;
    currentScore = 0;
    // Bra att lära sig! Ett annat sätt för if else, får förklara för dig när vi ses. 0 = false 1 = true : = annars det innan ? = kontrollera true/false
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1.classList.toggle('active');
    player2.classList.toggle('active');
};

btnRoll.addEventListener('click', function(){
    if(playing) {
        const diceNumber = Math.trunc(Math.random() * 6) +1;
        console.log(diceNumber);
        dice.classList.remove('hidden');
        dice.src = `img/dice-${diceNumber}.png`;

        if(diceNumber !== 1) {
            currentScore += diceNumber;
            document.querySelector(`#current-${activePlayer}`).textContent = currentScore;
        } else {
            nextPlayer();
        }
    }
});

btnHold.addEventListener('click', function() {
    if(playing) {
        scores[activePlayer] += currentScore;
        document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
        if(scores[activePlayer] >= 100 ){
            if(activePlayer === 0){
                player1.querySelector('.player-name').textContent = 'WINNER!';
            } else {
                player2.querySelector('.player-name').textContent = 'WINNER';
            }
            playing = false;
            dice.classList.add('hidden');
            player1.querySelector('.player-current-box').classList.add('hidden');
            player2.querySelector('.player-current-box').classList.add('hidden');
        } else {
            nextPlayer();
        }

    }
});

btnNewGame.addEventListener('click', () => startGame());