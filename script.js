// TO DO: declare variables for the weapons, such
// that they can be used for different game modes?

const SCORE = 5;
let computerScore = 0;
let playerScore = 0;
let currentRound = 0;
const keys = ['click', 'r', 'p', 's'];

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

function getPlayerChoice(event) {

    let text;
    let playerSelection;

    if ( keys.includes(event.key || event.type) ) { 

        /*
        check if player pressed a keyboard button instead clicking.

        It's a workaround, because the event listener for keys
        is added to the body element, and it doesn't due
        currentTarget (which refers to body element) unless
        a button is clicked first.

        And if I add the event listener on the buttons, then they
        won't work if they're not clicked firstly too.
        */
        if (!!event.key) {
            switch(true) {
                case (event.key == 'r'):
                    playerSelection = 'rock';
                    break;

                case (event.key == 'p'):
                    playerSelection = 'paper';
                    break;

                case (event.key == 's'):
                    playerSelection = 'scissors';
            }
        } else {
            // it's a click and event.target refers to the button element
            text = event.currentTarget.textContent;
            playerSelection = (text[1] + text.slice(3)).toLowerCase();
        }
        // play the game
        game(playerSelection);
    }
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

function setWeaponDamage() {
    
    /*
        Function to set the damage for the weapons.
        
        Each score does some damage to the loser of the round.
        Thus, we need to get the current width of the HP bar,
        and calculate the damage based on how many hits (SCORE)
        would take to get width 0px.

        Basically, the damage is the reduction of the width of .dmg
        bar hidden behind the .hp bar, which gets revealed when
        changing its width.
    */

    const bar = document.querySelector('.bar');

    // Get value of bar's 'width' CSS property
    // Thanks to StackOverflow: https://stackoverflow.com/a/6338234/21600888
    const barStyles = window.getComputedStyle(bar);
    const width = +(barStyles.getPropertyValue('width').replace('px', ''));
    let weaponDmg = width / SCORE;

    return [width, weaponDmg];
}

function dealDamage(player) {

    /*
        This function deals damage to the 'player' (loser of the round).
        It's invoked each from game() each time there's a round winner.
    */

    const damage = setWeaponDamage();

    const bar = document.querySelector(`.${player} .stats .dmg`);
    const styles = window.getComputedStyle(bar);

    if (styles.getPropertyValue('width').includes(damage[0])) {
        bar.style.width = (damage[0] - damage[1]) + 'px';
    } else {
        const currentWidth = bar.style.width;
        bar.style.width = +(currentWidth.replace('px', '')) - damage[1] + 'px';
    }
}

function game(playerSelection) {

    // The choice of each player
    let computerSelection;

    // Game stats
    let roundWinner;
    let gameResult;
    currentRound ++;
    const p = document.querySelector('.round-text');
    p.textContent = `ROUND: ${currentRound}`

        console.warn(`\n\n==========\nROUND: ${currentRound}\n==========\n\n`)

        // Get the weapon for both players
        computerSelection = getComputerChoice();
        
        // Play the round
        roundWinner = playRound(computerSelection, playerSelection);

        if (roundWinner === 'computer') {
            computerScore++;
            dealDamage('player');
            console.log(`Computer wins this round: ${computerSelection} beats ${playerSelection}`);
        
        } else if (roundWinner === 'player') {
            playerScore++;
            dealDamage('computer');
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

    // check if score was reached
    if (playerScore == 5 || computerScore == 5) {

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

        endGame(gameResult);
    }
}

function endGame(result) {
    
    // remove btn-container to prevent player for playing more
    const container = document.querySelector('.game-container');
    const buttons = document.querySelector('.btn-container');
    container.removeChild(buttons);
    document.body.removeEventListener('keydown', getPlayerChoice);
}

function createGameUI(playerName) {

    // main game container
    const gameContainer = document.createElement('div');
    const playersContainer = document.createElement('div');

    gameContainer.classList.add('game-container');
    playersContainer.classList.add('players-container');
    
    document.body.appendChild(gameContainer);
    gameContainer.appendChild(playersContainer);

    // create two divs for both players
    const players = ['player', 'computer'];

    for (player of players) {
        // main div for each player
        // each has name, HP bar, and weapon rectangle
        const div = document.createElement('div');
        div.classList.add(player);
        playersContainer.append(div);

        // div for stats, holding name and HP bar
        const stats = document.createElement('div');
        stats.classList.add('stats');
        // name above HP bar
        const p = document.createElement('p');
        p.classList.add('name');

        if (player == 'player') {
            player = playerName;
        } else {
            // loop created the div container for 'computer' in this iteration
            // so, create the paragraph for ROUND text and append it before '.computer'
            const pRound = document.createElement('p');
            pRound.classList.add('round-text');
            playersContainer.insertBefore(pRound, div);
        }

        p.textContent = player.toUpperCase();
        
        // HP bar
        const hpBar = document.createElement('div');
        hpBar.classList.add('hp', 'bar');

        // Damage bar
        const dmgBar = document.createElement('div');
        dmgBar.classList.add('dmg', 'bar');

        // weapon
        const weapon = document.createElement('div');
        weapon.classList.add('weapon', 'rectangle');

        div.appendChild(stats);
        stats.appendChild(p);
        stats.appendChild(hpBar);
        hpBar.appendChild(dmgBar);
        div.appendChild(weapon);
    }

    // create the buttons
    const buttons = ['(R)OCK', '(P)APER', '(S)CISSORS'];

    // main container for buttons
    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');
    gameContainer.appendChild(btnContainer);

    for (btn of buttons) {
        const btnDiv = document.createElement('button');
        btnDiv.classList.add( (btn[1] + btn.slice(3)).toLowerCase() );
        btnDiv.textContent = btn;
        btnContainer.appendChild(btnDiv);

        btnDiv.addEventListener('click', getPlayerChoice);

        // key presses
        document.body.addEventListener('keydown', getPlayerChoice);
    }
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
            
            let name = event.currentTarget.value.toUpperCase();

            if (!name) {
                name = 'PLAYER'
            }
            
            createGameUI(name);
        }
    })
}

const playButton = document.querySelector('.play-btn');
playButton.addEventListener('click', getPlayerName);