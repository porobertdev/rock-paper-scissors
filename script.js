// TO DO: declare variables for the weapons, such
// that they can be used for different game modes?

const SCORE = 5;

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

function game(playerName) {

    // The choice of each player
    let computerSelection;
    let playerSelection;

    // Default Score
    let computerScore = 0;
    let playerScore = 0;
    
    // Game stats
    let roundWinner;
    let gameResult;
    let currentRound = 1;

    // get player's name
    console.log(playerName);

    computerSelection = getComputerChoice();
    playerSelection = getPlayerChoice();

    // Loop to play until a player reaches SCORE
   // while (computerScore < SCORE && playerScore < SCORE) {

        console.warn(`\n\n==========\nROUND: ${currentRound}\n==========\n\n`)

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
    //}

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


function getPlayerName() {
    document.body.removeChild(playButton);
    
    // main container for input box
    const nameContainer = document.createElement('div');
    nameContainer.classList.add('name-container', 'rectangle');
    document.body.appendChild(nameContainer);

    // input box nested
    const input = document.createElement('input');
    input.setAttribute('autofocus', '');
    input.setAttribute('placeholder', 'YOUR NAME');
    nameContainer.appendChild(input);

    input.addEventListener('keydown', (event) => {
        if (event.key == 'Enter') {
            document.body.removeChild(nameContainer);
            game(input.value.toUpperCase());
        }
    })
}

const playButton = document.querySelector('.play-btn');
playButton.addEventListener('click', getPlayerName);