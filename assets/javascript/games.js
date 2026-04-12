class Games {
    constructor(playerName) {
        // Centralized DOM Elements
        this.CONTAINER_GAME = document.getElementById('game-container');
        this.CONTAINER_PLAY = document.getElementById('play-container');
        this.LOADING = document.getElementById('loading');
        this.SCORE_DISPLAY = document.getElementById('playerScore');

        // Player Data
        this.playerName = localStorage.getItem('playerName') || playerName;
        this.score = 0;
        // this.stage = 0;

        // Leaderboard data structure, value is object that have gameType, playerName, and score
        this.leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

        // RPS Choices
        this.CHOICES = [{value: 0, choice: '✊'}, // Rock
            {value: 1, choice: '✌️'}, // Scissor
            {value: 2, choice: '✋'}  // Paper
        ];

        // Click Hero Data
        this.clickHero = {
            atk: JSON.parse(localStorage.getItem('atk')) || 1,
            auto: JSON.parse(localStorage.getItem('auto')) || false,
            upPrice: JSON.parse(localStorage.getItem('upPrice')) || 10,
            milestones: [{threshold: 5000, text: "YOU ARE A HERO", isReached: false}, {
                threshold: 2000,
                text: "UNSTOPPABLE",
                isReached: false
            }, {threshold: 1000, text: "GODLIKE", isReached: false}, {
                threshold: 500,
                text: "AMAZING",
                isReached: false
            }, {threshold: 100, text: "NOT ENOUGH", isReached: false}]
        }

        // Pokemon Data
        this.pokemon = {
            maxStage: 5, currentStage: 1, currentData: null, isLoading: false, score: 0, trials: 5,
        };
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

        // Show Player Choice
        PLAYER_CHOICE_DISPLAY.innerHTML = this.CHOICES[playerChoice].choice;
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
            const COMPUTER_CHOICE = this.CHOICES[Math.floor(Math.random() * this.CHOICES.length)];
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
        } else if ((playerChoice === 0 && enemyChoice === 1) || // Rock (0) vs Scissor (1)
            (playerChoice === 1 && enemyChoice === 2) || // Scissor (1) vs Paper (2)
            (playerChoice === 2 && enemyChoice === 0)    // Paper (2) vs Rock (0)
        ) {
            // CASE: PLAYER WIN
            PLAYER_CONTAINER.classList.add("border-green-600");
            ENEMY_CONTAINER.classList.add("border-red-600");
            this.setScore(100);
            WIN_TEXT.textContent = "YOU WIN🎉";
        } else {
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
            gameType: 'rps', playerName: this.playerName, score: this.score
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

    // Fetch random Pokemon type and data from PokeAPI
    async guessPokemonType() {
        try {
            const pokemonTypes = ['fire', 'water', 'grass', 'electric', 'ice', 'poison', 'ground', 'flying', 'bug', 'rock', 'ghost', 'steel', 'dragon', 'dark', 'fairy'];
            const baseApi = 'https://pokeapi.co/api/v2/';

            // Randomly select a type
            const randomType = pokemonTypes[Math.floor(Math.random() * pokemonTypes.length)];

            // Fetch Pokemon of that type
            const typeResponse = await fetch(`${baseApi}type/${randomType}`);
            const typeData = await typeResponse.json();

            // Randomly select a Pokemon from that type
            const randomEntry = typeData.pokemon[Math.floor(Math.random() * typeData.pokemon.length)];

            // Fetch details of the selected Pokemon
            const pokemonResponse = await fetch(randomEntry.pokemon.url);
            const pokemonDetail = await pokemonResponse.json();

            // Store current Pokemon data for game logic
            this.pokemon.currentData = {
                type: randomType,
                name: pokemonDetail.name,
                image: pokemonDetail.sprites.other['official-artwork'].front_default || pokemonDetail.sprites.front_default
            };

            return this.pokemon.currentData;
        } catch (error) {
            // Error handling
            console.error("Error:", error);
        }
    }

    // Pokemon game container manage function
    async playPokemon() {
        this.CONTAINER_PLAY.classList.add('hidden');
        this.LOADING.classList.remove('hidden');

        this.pokemon.currentStage = 1;
        this.pokemon.trials = 5;
        this.resetScore();

        const data = await this.guessPokemonType();

        if (data) {
            setTimeout(() => {
                this.LOADING.classList.add('hidden');
                this.CONTAINER_GAME.classList.remove('hidden');
                this.renderPokemonGame(data);
            }, 2000)
        } else {
            alert("Connection problem!");
            this.finishPokemonGame();
        }
    }

    // Render Pokemon data and game interface
    renderPokemonGame(data) {
        const POKEMON_IMG = document.getElementById('pokemonImage');
        const POKEMON_NAME = document.getElementById('pokemonName');
        const STAGE_TEXT = document.getElementById('stageDisplay');
        const CHOICE_CONTAINER = document.getElementById('playerChoiceContainer');
        const TRIAL_TEXT = document.getElementById('trialDisplay');
        const HINT_TEXT = document.getElementById('hintText');

        // Pokemon render
        POKEMON_IMG.src = data.image;
        POKEMON_IMG.classList.add('animate-pop');
        POKEMON_NAME.textContent = data.name;

        // Update stage
        STAGE_TEXT.textContent = `Stage: ${this.pokemon.currentStage} / ${this.pokemon.maxStage}`;

        // Show trials
        if (TRIAL_TEXT) TRIAL_TEXT.textContent = `Lives: ${this.pokemon.trials}`;

        // Empty the hint
        if (HINT_TEXT) HINT_TEXT.textContent = "";

        // Generate types button
        const types = ['fire', 'water', 'grass', 'electric', 'ice', 'poison', 'ground', 'flying', 'bug', 'rock', 'ghost', 'steel', 'dragon', 'dark', 'fairy'];

        CHOICE_CONTAINER.innerHTML = ''; // Clear previous button

        types.forEach(type => {
            const btn = document.createElement('button');
            btn.innerText = type.toUpperCase();

            // Styling button
            btn.className = `
                bg-main hover:bg-yellow-400 text-white font-title text-xs py-3 rounded-xl 
                border-b-4 border-black/20 active:border-b-0 active:translate-y-1 transition-all
            `;

            // Event listener for each button
            btn.onclick = () => this.checkAnswer(type);
            CHOICE_CONTAINER.appendChild(btn);
        });
    }

    // Check answer logic
    checkAnswer(userGuess) {
        if (!this.pokemon.currentData) return;

        const POKEMON_NAME = document.getElementById('pokemonName');
        const HINT_TEXT = document.getElementById('hintText');
        const TRIAL_TEXT = document.getElementById('trialDisplay');

        // Answer Check
        if (userGuess === this.pokemon.currentData.type) {
            // Correct Answer Logic
            POKEMON_NAME.textContent = this.pokemon.currentData.name.toUpperCase();
            this.setScore(20);

            // Delay before next stage
            setTimeout(async () => {
                if (this.pokemon.currentStage < this.pokemon.maxStage) {
                    this.pokemon.currentStage++;
                    const nextData = await this.guessPokemonType();
                    this.renderPokemonGame(nextData);
                } else {
                    // Game Clear Logic
                    alert("CONGRATULATIONS! You cleared all stages!");
                    this.finishPokemonGame();
                }
            }, 1500);

        } else {
            // Wrong Answer Logic
            this.pokemon.trials--;
            TRIAL_TEXT.textContent = `Lives: ${this.pokemon.trials}`;

            // Give hint if trials
            if (this.pokemon.trials > 0) {
                HINT_TEXT.classList.add('text-yellow-400', 'animate-pulse');
                const type = this.pokemon.currentData.type;
                let hint = "";

                // Hint
                switch (type) {
                    case 'fire':
                        hint = "HINT: This type is very effective against Grass! 🔥";
                        break;
                    case 'water':
                        hint = "HINT: This type is very effective against Fire! 💧";
                        break;
                    case 'electric':
                        hint = "HINT: Be careful, this type is very effective against Flying! ⚡";
                        break;
                    case 'grass':
                        hint = "HINT: This type is weak against Fire and Flying attacks! 🌿";
                        break;
                    case 'ice':
                        hint = "HINT: This type is the ultimate nightmare for Dragon types! ❄️";
                        break;
                    case 'poison':
                        hint = "HINT: This type can easily weaken Fairy and Grass types! 🧪";
                        break;
                    case 'ground':
                        hint = "HINT: This type is completely immune to Electric attacks! ⛰️";
                        break;
                    case 'flying':
                        hint = "HINT: This type has the high ground over Bug and Fighting! 🦅";
                        break;
                    case 'bug':
                        hint = "HINT: This type is surprisingly effective against Psychic and Dark! 🐛";
                        break;
                    case 'rock':
                        hint = "HINT: This type is strong against Flying, Fire, and Bug! 🪨";
                        break;
                    case 'ghost':
                        hint = "HINT: Normal and Fighting attacks can't even touch this type! 👻";
                        break;
                    case 'steel':
                        hint = "HINT: This type has the best defense and is immune to Poison! ⚙️";
                        break;
                    case 'dragon':
                        hint = "HINT: Only Ice, Fairy, and other Dragons can truly scare this type! 🐲";
                        break;
                    case 'dark':
                        hint = "HINT: This type is the ultimate predator for Psychic types! 🌙";
                        break;
                    case 'fairy':
                        hint = "HINT: This magical type is completely immune to Dragon moves! ✨";
                        break;
                    default:
                        hint = `HINT: This type usually appears in ${type}-related areas!`;
                        break;
                }

                HINT_TEXT.textContent = hint;
            } else {
                // Game Over Logic
                alert(`GAME OVER! Jawabannya adalah ${this.pokemon.currentData.type}.`);
                this.finishPokemonGame();
            }
        }
    }

    // Reset Pokemon game data and return to play container
    finishPokemonGame() {
        const PLAYER_DATA = {
            gameType: 'pokemon', playerName: this.playerName, score: this.score
        };
        this.setLeaderboard(PLAYER_DATA);

        // Reset Pokemon game data
        this.pokemon.currentStage = 1;
        this.pokemon.currentData = null;
        this.resetScore();

        // Reset Pokemon image and name
        const POKEMON_IMG = document.getElementById('pokemonImage');
        if (POKEMON_IMG) POKEMON_IMG.src = '';

        // Hide Game Container, Show Play Container
        this.CONTAINER_GAME.classList.add('hidden');
        this.CONTAINER_PLAY.classList.remove('hidden');
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

// Pokemon Section

function playPokemon() {
    games.playPokemon();
}