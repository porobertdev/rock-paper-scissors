// Game Settings
// TO DO: better variable naming for weapons?
// weapons
const weaponOne = 'rock';
const weaponTwo = 'paper';
const weaponThree = 'scissors';
// rounds
const GAME_ROUNDS = 5;

// Get Computer's choice
function getComputerChoice() {

    // Get random number between min and max
    // Thanks to StackOverflow: https://stackoverflow.com/a/7228322/21600888
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Choose a weapon randomly
    const random = getRandomNumber(1, 3);

    // Get weapon's name based on the number
    switch (random) {
        case 1:
            return weaponOne;
        
        case 2:
            return weaponTwo;

        case 3:
            return weaponThree;
    }
}

// Get Player's choice
function getPlayerChoice() {

    // Ask user for weapon
    const playerChoice = prompt('Please choose your weapon:').toLowerCase();

    // Loop the function call if invalid answer
    if (playerChoice !== weaponOne &&
        playerChoice !== weaponTwo &&
        playerChoice !== weaponThree) {
            alert('Invalid weapon! Please try again!')
            getPlayerChoice();
        }
}

function playRound(computerSelection, playerSelection) {

    // Check if it's a tie
    if (computerSelection === playerSelection){
        console.log('===========')
        console.log("It's a tie!");
        console.log('===========')
        console.log('');
        return; // stop the function here

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
    )
}

function game() {

    let computerSelection;
    let playerSelection;
    
    // Track score
    let computerScore;
    let playerScore;
    let winner;
    let finalResult;

    // Loop through the game rounds
    for (i = 1; i <= GAME_ROUNDS; i++) {

        console.warn(`\n\n==========\nROUND: ${i}/${GAME_ROUNDS}\n==========\n\n`)

        // Get the weapon for both players
        computerSelection = getComputerChoice();
        playerSelection = getPlayerChoice();
        
        // Play the round
        winner = playRound(computerSelection, playerSelection);

        // Print a message based on the winner
        if (winner === 'computer') {
            computerScore++;
            console.log(`Computer wins this round: ${computerSelection} beats ${playerSelection}`);
        
        } else if (winner === 'player') { // player wins the round
            playerScore++;
            console.log(`Player wins this round: ${playerSelection} beats ${computerSelection}`);
        }
}

// start the game
game();