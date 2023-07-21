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