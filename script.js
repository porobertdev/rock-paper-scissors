// TO DO: declare variables for the weapons, such
// that they can be used for different game modes?

const GAME_ROUNDS = 5;
const PLAYER_ANSWERS = 3;
let tries = 0;

function getComputerChoice() {

    // Get random number between 'min' and 'max'
    // Thanks to StackOverflow: https://stackoverflow.com/a/7228322/21600888
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Use the random number to choose a weapon bcoz I don't know about arrays yet
    const randomWeapon = getRandomNumber(1, 3);

    switch (randomWeapon) {
        case 1:
            return 'rock';

        case 2:
            return 'paper';

        case 3:
            return 'scissors';
    }
}

function getPlayerChoice() {

    const playerChoice = prompt('Please choose your weapon:').toLowerCase();

    // Loop the function call if invalid answer
    // .indexOf() method returns number '-1' if it can't find the array's element
    if (['rock', 'paper', 'scissors'].indexOf(playerChoice) == -1) {
            
            tries++;

            if (tries < PLAYER_ANSWERS) {
                alert('Invalid weapon! Please try again!')
                getPlayerChoice();
            } else {
                alert('BYE!');
                // reset tries
                tries = 0;
                thisJustStopsTheProgramLol();
            }
        }
    
    // reset the tries if user answered a valid weapon
    tries = 0;

    return playerChoice;
}

function playRound(computerSelection, playerSelection) {

    if (computerSelection === playerSelection){
        return 'tie';

    } else if (
        // computer win cases
        computerSelection === 'rock' && playerSelection === 'scissors' ||
        computerSelection === 'paper' && playerSelection === 'rock' ||
        computerSelection === 'scissors' && playerSelection === 'paper') {
            return 'computer';

    } else if (
        // player win cases
        playerSelection === 'rock' && computerSelection === 'scissors' ||
        playerSelection === 'paper' && computerSelection === 'rock' ||
        playerSelection === 'scissors' && computerSelection === 'paper') {
            return 'player';
        }
}

function game() {

    let computerSelection;
    let playerSelection;

    let computerScore = 0;
    let playerScore = 0;
    
    let roundWinner;
    let gameResult;

    // Loop to play all the rounds
    for (i = 1; i <= GAME_ROUNDS; i++) {

        console.warn(`\n\n==========\nROUND: ${i}/${GAME_ROUNDS}\n==========\n\n`)

        // Get the weapon for both players
        computerSelection = getComputerChoice();
        playerSelection = getPlayerChoice();
        
        // Play the round
        roundWinner = playRound(computerSelection, playerSelection);

        if (roundWinner === 'computer') {
            computerScore++;
            console.log(`Computer wins this round: ${computerSelection} beats ${playerSelection}`);
        
        } else if (roundWinner === 'player') {
            playerScore++;
            console.log(`Player wins this round: ${playerSelection} beats ${computerSelection}`);
        
        } else if (roundWinner === 'tie') {
            console.log('===========')
            console.log("It's a tie!");
            console.log('===========')
            console.log('');
        }

        // Display the score after each round in the console somewhat nice.
        console.log('');
        console.log('-----------------------');
        console.log('CURRENT SCORE');
        console.log('-----------------------');
        console.log(`Computer: ${computerScore}`);
        console.log(`Player: ${playerScore}`);
        console.log('-----------------------');
        console.log('')
    }

    // Get the final winner
    if (computerScore > playerScore) {
        gameResult = 'YOU HAVE LOST! SHAME ON YOU!'
    
    } else if (playerScore > computerScore) {
        gameResult = 'YOU WON! CONGRATULATIONS!!!'
    
    } else {
        gameResult = "THAT'S UNFORTUNATE! IT'S A DAMN TIE!"
    }

    console.log('');
    console.log('-/-/-/-/-/-/-/-/-/-/-/-/-/-/-')
    console.log(gameResult);
    console.log('-/-/-/-/-/-/-/-/-/-/-/-/-/-/-')
    console.log('');
}

// alert player about console because the game take place there
alert('Please open DevTools console before playing :)');

const startGameBtn = document.querySelector('.start-game');
startGameBtn.addEventListener('click', game);