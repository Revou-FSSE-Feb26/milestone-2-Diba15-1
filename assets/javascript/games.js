class Games {
    constructor(playerName) {
        // Centralized DOM Elements
        this.CONTAINER_GAME = document.getElementById('game-container');
        this.CONTAINER_PLAY = document.getElementById('play-container');
        this.LOADING = document.getElementById('loading');
        this.SCORE_DISPLAY = document.getElementById('playerScore');

        this.playerName = localStorage.getItem('playerName') || playerName;
        this.score = 0;
        // this.stage = 0;

        // Leaderboard data structure, value is object that have gameType, playerName, and score
        this.leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

        // Click Hero Data
        this.clickHero = {
            atk: JSON.parse(localStorage.getItem('atk')) || 1,
            auto: JSON.parse(localStorage.getItem('auto')) || false,
            upPrice: JSON.parse(localStorage.getItem('upPrice')) || 10,
            milestones: [
                { threshold: 5000, text: "YOU ARE A HERO", isReached: false },
                { threshold: 2000, text: "UNSTOPPABLE", isReached: false },
                { threshold: 1000, text: "GODLIKE", isReached: false },
                { threshold: 500, text: "AMAZING", isReached: false },
                { threshold: 100, text: "NOT ENOUGH", isReached: false }
            ]
        }
    }

    // Player Data Management

    setPlayerName(playerName) {
        this.playerName = playerName;
        localStorage.setItem('playerName', playerName);
        document.getElementById('playerName').textContent = playerName;
    }

    setScore(score) {

        this.score += score;
        localStorage.setItem('score', this.score);
        console.log("Test Score: ", this.score)

        this.SCORE_DISPLAY.innerHTML = this.score;
    }

    resetScore() {
        this.score = 0;
        localStorage.removeItem('score');
        this.SCORE_DISPLAY.innerHTML = this.score;
    }

    setLeaderboard(playerData) {
        this.leaderboard.push(playerData);
        localStorage.setItem('leaderboard', JSON.stringify(this.leaderboard));
    }

    // Rock Paper Scissors Game Section

    // Rock Paper Scissors container manage function
    playRps() {
        const CONTAINER_RPS = document.getElementById('rps-container');

        this.CONTAINER_PLAY.classList.add('hidden')
        this.LOADING.classList.remove('hidden')

        setTimeout(() => {
            this.LOADING.classList.add('hidden')
            this.CONTAINER_GAME.classList.remove('hidden');
            this.resetScore()
        }, 3000)
    }

    // Rock Paper Scissors logic
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
        this.CONTAINER_GAME.classList.add('hidden');
        this.CONTAINER_PLAY.classList.remove('hidden');

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

    // Click Hero container manage function
    playClickHero() {
        const CONTAINER_CLICKER = document.getElementById('clicker-container');
        this.clickHero.atk = 1;
        this.clickHero.auto = false;
        this.clickHero.upPrice = 10

        this.CONTAINER_PLAY.classList.add('hidden')
        this.LOADING.classList.remove('hidden')

        setTimeout(() => {
            this.LOADING.classList.add('hidden')
            this.CONTAINER_GAME.classList.remove('hidden');
            this.resetScore()
        }, 3000)
    }

    // Click Hero
    clickedHero() {
        const ATK = this.clickHero.atk;
        this.setScore(ATK);
        const PRAISE_TEXT = document.getElementById('praiseText');

        const milestones = this.clickHero.milestones;
        const currentMilestone = milestones.find(m => this.score >= m.threshold && !m.isReached);

        if (currentMilestone) {
            currentMilestone.isReached = true;

            PRAISE_TEXT.textContent = currentMilestone.text;

            PRAISE_TEXT.classList.add('animate-praise', 'text-sub');

            setTimeout(() => {
                PRAISE_TEXT.textContent = "";
                PRAISE_TEXT.classList.remove('animate-praise', 'text-sub');
            }, 2000);
        }
    }

    // Upgrade ATK logic
    upgradeAtk() {
        const ATK_UP = document.getElementById('atk-max');
        const ATK_PRICE_DISPLAY = document.getElementById('atk-price');
        const MAX_ATK = 10;

        if (this.clickHero.atk < MAX_ATK && this.score >= this.clickHero.upPrice) {
            this.setScore(-this.clickHero.upPrice);

            this.clickHero.atk += 1;
            this.clickHero.upPrice *= 2;

            localStorage.setItem('atk', JSON.stringify(this.clickHero.atk));
            localStorage.setItem('upPrice', JSON.stringify(this.clickHero.upPrice));

            ATK_UP.innerHTML = `${this.clickHero.atk}/${MAX_ATK}`;

            if (this.clickHero.atk >= MAX_ATK) {
                ATK_PRICE_DISPLAY.innerHTML = "MAX";
            } else {
                ATK_PRICE_DISPLAY.innerHTML = this.clickHero.upPrice;
            }

            console.log(`Upgrade Berhasil! ATK sekarang: ${this.clickHero.atk}`);
        } else {
            console.log("Skor tidak cukup atau sudah level MAX!");
        }
    }

    // Add Auto Click logic
    addAuto() {
        const AUTO_STATUS = document.getElementById('auto-status');
        const UP_PRICE = 200; // Harga tetap untuk Auto Click

        if (!this.clickHero.auto && this.score >= UP_PRICE) {
            this.setScore(-UP_PRICE);

            this.clickHero.auto = true;
            localStorage.setItem('auto', JSON.stringify(true));

            AUTO_STATUS.innerHTML = 'ON';
            AUTO_STATUS.classList.add('text-green-500', 'font-bold'); // Sentuhan visual

            this.activeAuto();
            console.log("Auto Clicker Aktif!");
        }
    }

    activeAuto() {
        const HERO_BTN = document.getElementById('hero-btn');

        if (this.clickHero.auto) {
            setInterval(() => {
                this.clickedHero();

                HERO_BTN.classList.add('auto-pressing');

                setTimeout(() => {
                    HERO_BTN.classList.remove('auto-pressing');
                }, 100);

            }, 500);
        }
    }

    // Reset Click Hero Data
    resetClickHero() {
        localStorage.removeItem('atk');
        localStorage.removeItem('auto');
        localStorage.removeItem('upPrice');
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

    resetGame() {
        this.resetScore();
    }
}

let games;

if (localStorage.getItem('playerName')) {
    games = new Games(localStorage.getItem('playerName'));
} else {
    games = new Games('Random Player');
}

function initGames() {
    const editModal = document.querySelector('.edit-modal');
    games.resetGame();

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

// Click Hero Section
function playClickHero() {
    games.playClickHero();
}

function clickHero() {
    games.clickedHero()
}

function upgradeATK() {
    games.upgradeAtk()
}

function addAuto() {
    games.addAuto()
}

function finishClickHero() {

}