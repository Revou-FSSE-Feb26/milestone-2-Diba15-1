class Games {
    constructor(playerName) {
        this.playerName = localStorage.getItem('playerName') || playerName;
        this.score = 0;
        // this.stage = 0;

        // Leaderboard data structure, value is object that have gameType, playerName, and score
        this.leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    }

    setPlayerName(playerName) {
        this.playerName = playerName;
        localStorage.setItem('playerName', playerName);
        document.getElementById('playerName').textContent = playerName;
    }

    setScore(score) {
        const SCORE_DISPLAY = document.getElementById('playerScore');

        this.score += score;
        localStorage.setItem('score', this.score);
        console.log("Test Score: ", this.score)

        SCORE_DISPLAY.innerHTML = this.score;
    }

    resetScore() {
        const SCORE_DISPLAY = document.getElementById('playerScore');

        this.score = 0;
        localStorage.removeItem('score');
        SCORE_DISPLAY.innerHTML = this.score;
    }

    setLeaderboard(playerData) {
        this.leaderboard.push(playerData);
        localStorage.setItem('leaderboard', JSON.stringify(this.leaderboard));
    }

    // Rock Paper Scissors container manage function
    playRps() {
        const CONTAINER_RPS = document.getElementById('rps-container');
        const CONTAINER_GAME = document.getElementById('game-container');
        const CONTAINER_PLAY = document.getElementById('play-container');
        const LOADING = document.getElementById('loading');

        CONTAINER_PLAY.classList.add('hidden')
        LOADING.classList.remove('hidden')

        setTimeout(() => {
            LOADING.classList.add('hidden')
            CONTAINER_GAME.classList.remove('hidden');
            this.resetScore()
        }, 3000)
    }

    // Rock Paper Scissors Game Section
    async rps(playerChoice) {
        const ENEMY_CHOICE_DISPLAY = document.getElementById('enemyChoiceDisplay');
        const PLAYER_CHOICE_DISPLAY = document.getElementById('playerChoiceDisplay');
        const PLAYER_CONTAINER = document.getElementById('playerContainer');
        const ENEMY_CONTAINER = document.getElementById('enemyContainer');
        const WIN_TEXT = document.getElementById('determineWin');
        const CHOICES = [
            {
                value: 0,
                'choice': '✊',
            },
            {
                value: 1,
                'choice': '✌️'
            },
            {
                value: 2,
                'choice': '🤚',
            }
        ];

        // Show Player Choice
        PLAYER_CHOICE_DISPLAY.innerHTML = CHOICES[playerChoice].choice;
        // Reset Border Determine
        PLAYER_CONTAINER.classList.remove('border-green-600')
        PLAYER_CONTAINER.classList.remove('border-red-600')
        ENEMY_CONTAINER.classList.remove('border-green-600')
        ENEMY_CONTAINER.classList.remove('border-red-600')
        PLAYER_CONTAINER.classList.add('border-white/20')
        ENEMY_CONTAINER.classList.add('border-white/20')

        // Reset Win Text
        WIN_TEXT.textContent = '';

        let shuffleCount = 0;
        const shuffleInterval = setInterval(() => {
            const COMPUTER_CHOICE = CHOICES[Math.floor(Math.random() * CHOICES.length)];
            // Show icon random
            ENEMY_CHOICE_DISPLAY.innerHTML = COMPUTER_CHOICE.choice;
            shuffleCount++;

            // Stop after shufflecount > 15
            if (shuffleCount > 15) {
                clearInterval(shuffleInterval);
                PLAYER_CONTAINER.classList.remove('border-white/20')
                ENEMY_CONTAINER.classList.remove('border-white/20')
                this.determineWinner(playerChoice, COMPUTER_CHOICE.value);
            }
        }, 200); // Berganti setiap 100ms
    }

    // Determine RPS winner function
    determineWinner(playerChoice, enemyChoice) {
        const PLAYER_CONTAINER = document.getElementById('playerContainer');
        const ENEMY_CONTAINER = document.getElementById('enemyContainer');
        const WIN_TEXT = document.getElementById('determineWin');

        if (playerChoice === enemyChoice) {
            WIN_TEXT.textContent = "DRAW";
        }
        else if (
            (playerChoice === 0 && enemyChoice === 1) || // Rock (0) vs Scissor (1)
            (playerChoice === 1 && enemyChoice === 2) || // Scissor (1) vs Paper (2)
            (playerChoice === 2 && enemyChoice === 0)    // Paper (2) vs Rock (0)
        ) {
            // CASE: PLAYER WIN
            PLAYER_CONTAINER.classList.add("border-green-600");
            ENEMY_CONTAINER.classList.add("border-red-600");
            this.setScore(100);
            WIN_TEXT.textContent = "YOU WIN🎉";
        }
        else {
            // CASE: PLAYER LOSE
            PLAYER_CONTAINER.classList.add("border-red-600");
            ENEMY_CONTAINER.classList.add("border-green-600");
            WIN_TEXT.textContent = "YOU LOSE😢";
        }
    }

    finishRps() {
        const CONTAINER_GAME = document.getElementById('game-container');
        const CONTAINER_PLAY = document.getElementById('play-container');
        const PLAYER_CONTAINER = document.getElementById('playerContainer');
        const ENEMY_CONTAINER = document.getElementById('enemyContainer');
        const ENEMY_CHOICE_DISPLAY = document.getElementById('enemyChoiceDisplay');
        const PLAYER_CHOICE_DISPLAY = document.getElementById('playerChoiceDisplay');
        const WIN_TEXT = document.getElementById('determineWin');

        // Reset Border Determine
        PLAYER_CONTAINER.classList.remove('border-green-600');
        PLAYER_CONTAINER.classList.remove('border-red-600');
        ENEMY_CONTAINER.classList.remove('border-green-600');
        ENEMY_CONTAINER.classList.remove('border-red-600');
        PLAYER_CONTAINER.classList.add('border-white/20');
        ENEMY_CONTAINER.classList.add('border-white/20');

        // Reset Player and Enemy Display
        ENEMY_CHOICE_DISPLAY.innerHTML = '??';
        PLAYER_CHOICE_DISPLAY.innerHTML = '??';

        // Hide Game Container, Show Play Container
        CONTAINER_GAME.classList.add('hidden');
        CONTAINER_PLAY.classList.remove('hidden');

        // Reset Win Text
        WIN_TEXT.textContent = '';

        const PLAYER_DATA = {
            gameType: 'rps',
            playerName: this.playerName,
            score: this.score
        }

        this.setLeaderboard(PLAYER_DATA);

        this.resetScore()

    }

    // Click Hero Game Section
    clickHero() {

    }

    playClickHero() {

    }

    // Pokemon Game Section
    async guessPokemonType() {
        const pokemonTypes = ['fire', 'water', 'grass', 'electric', 'ice', 'poison', 'ground', 'flying', 'bug', 'rock', 'ghost', 'steel', 'dragon', 'dark', 'fairy'];
        const baseApi = 'https://pokeapi.co/api/v2/';
        const pokemonType = pokemonTypes[Math.floor(Math.random() * pokemonTypes.length)];
        const pokemonApi = `${baseApi}type/${pokemonType}`;
        const pokemon = await fetch(pokemonApi)
            .then(response => response.json())
            .then(data => data.pokemon[Math.floor(Math.random() * data.pokemon.length)])
            .catch(error => console.error(error));
        const pokemonData = await fetch(pokemon.pokemon.url)
            .then(response => response.json())
            .catch(error => console.error(error));

        const data = {
            type: pokemonType,
            pokemonName: pokemon.pokemon.name,
            pokemonImage: pokemonData.sprites.other['official-artwork'].front_default,
        }

        return data;
    }

    playPokemon() {

    }

    correctPokemon() {
        this.setScore()
    }

    // Other Section
    finishGame() {
        this.resetScore();
    }
}

let games;

if (localStorage.getItem('playerName')) {
    games = new Games(localStorage.getItem('playerName'));
} else {
    games = new Games('Random Player');
}

function showNameModal() {
    const editModal = document.querySelector('.edit-modal');

    if (localStorage.getItem('playerName')) {
        editModal.classList.add('hidden');
    } else {
        editModal.classList.remove('hidden');
    }
}

function clickShowNameModal() {
    const editModal = document.querySelector('.edit-modal');
    editModal.classList.toggle('hidden');
}

function submitName() {
    const name = document.getElementById('name').value;
    const event = window.event;
    games.setPlayerName(name);
    showNameModal();

    event.preventDefault();
}

const playerName = document.getElementById('playerName');
playerName.textContent = games.playerName;

console.log(games.guessPokemonType());

//RPS Section
function playRps() {
    games.playRps();
}

function rps(choice) {
    games.rps(choice);
}

function finishRps() {
    games.finishRps();
}