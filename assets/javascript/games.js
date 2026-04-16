/*
* Games Class
* This class will be the parent class for all games, it will contain the common methods and properties that all games will use, 
* such as player data management, score management, and leaderboard management.
*/
class Games {
    // Declaration private variables
    #playerName;
    #score;

    /**
     * Constructor for Games class
     * @param {string} [playerName='Random Player'] - Player name to be used in game
     * 
     * This constructor will initialize the game object with the given player name, and set default values for game score and stage.
     * It will also initialize the leaderboard data structure as an empty array if it does not exist in local storage, otherwise it will retrieve the existing leaderboard data from local storage.
     */
    constructor(playerName = 'Random Player') {
        // Centralized DOM Elements
        this.CONTAINER_GAME = document.getElementById('game-container');
        this.CONTAINER_PLAY = document.getElementById('play-container');
        this.CONTAINER_TUTORIAL = document.getElementById('tutorial-container');
        this.LOADING = document.getElementById('loading');
        this.SCORE_DISPLAY = document.getElementById('playerScore');

        // Player Data
        this.#playerName = localStorage.getItem('playerName') || playerName;
        this.#score = 0;
        // this.stage = 0;

        // Leaderboard data structure, value is object that have gameType, playerName, and score
        this.leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    }

    // 😊 Player Data Management

    // Set player name and store in localStorage, also update the display
    setPlayerName(playerName) {
        this.#playerName = playerName;
        localStorage.setItem('playerName', playerName);
        document.getElementById('playerName').textContent = playerName;
    }

    // Get player name
    getPlayerName() {
        return this.#playerName;
    }

    /**
     * Update the current score by adding the given score to it, and store the new score in localStorage.
     * Also update the display of the current score.
     * @param {number} score - The score to be added to the current score.
     */
    setScore(score) {
        this.#score += score;
        localStorage.setItem('score', this.#score);

        this.SCORE_DISPLAY.innerHTML = this.#score;
    }

    // Get current score
    getScore() {
        return this.#score;
    }

    // Reset score to 0 and update display, also remove score from localStorage
    resetScore() {
        this.#score = 0;
        localStorage.removeItem('score');
        this.SCORE_DISPLAY.innerHTML = this.#score;
    }

    // Set leaderboard data, push new player data to leaderboard array and store in localStorage
    setLeaderboard(playerData) {
        this.leaderboard.push(playerData);
        localStorage.setItem('leaderboard', JSON.stringify(this.leaderboard));
    }

    // Default Methods for Games, these methods will be overridden by each game class
    play() {
        // hide title container, show tutorial container
        this.CONTAINER_PLAY.classList.add('hidden')
        this.CONTAINER_TUTORIAL.classList.toggle('hidden')
        this.CONTAINER_TUTORIAL.classList.toggle('flex')
    }


    /**
     * Starts the game by hiding the tutorial container, showing the loading animation,
     * waiting for 3 seconds, and then showing the game container and resetting the score.
     */
    start() {
        this.CONTAINER_TUTORIAL.classList.toggle('hidden')
        this.CONTAINER_TUTORIAL.classList.toggle('flex')

        this.LOADING.classList.remove('hidden')

        setTimeout(() => {
            this.LOADING.classList.add('hidden')
            this.CONTAINER_GAME.classList.toggle('hidden');
            this.CONTAINER_GAME.classList.toggle('flex');
            this.resetScore()
        }, 3000)
    }

    finish() {
        return 0;
    }

    // 📋 Other Section

    resetGame() {
        this.resetScore();
    }
}

/*
* Rock, Paper, Scissors Class
* This class will handle the logic for the Rock, Paper, Scissors game, 
* including determining the winner and updating the score accordingly.
*/
class RPS extends Games {

    constructor() {
        super();

        // RPS Choices
        this.CHOICES = [
            { value: 0, choice: '✊' }, // Rock
            { value: 1, choice: '✌️' }, // Scissor
            { value: 2, choice: '✋' }  // Paper
        ];
    }


    /**
     * Start a Rock, Paper, Scissors game
     * @param {number} playerChoice - The choice of the player (0 = Rock, 1 = Scissor, 2 = Paper)
     * @returns {void}
     */
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
        const SHUFFLE_INTERVAL = setInterval(() => {
            const COMPUTER_CHOICE = this.CHOICES[Math.floor(Math.random() * this.CHOICES.length)];
            // Show icon random
            ENEMY_CHOICE_DISPLAY.innerHTML = COMPUTER_CHOICE.choice;
            shuffleCount++;

            // Stop after shufflecount > 15
            if (shuffleCount > 15) {
                clearInterval(SHUFFLE_INTERVAL);
                PLAYER_CONTAINER.classList.remove('border-white/20')
                ENEMY_CONTAINER.classList.remove('border-white/20')
                this.determineWinner(playerChoice, COMPUTER_CHOICE.value);
            }
        }, 200); // Change after 200ms
    }

    /**
     * Determine the winner of the Rock, Paper, Scissors game
     * @param {number} playerChoice - The choice of the player (0 = Rock, 1 = Scissor, 2 = Paper)
     * @param {number} enemyChoice - The choice of the enemy (0 = Rock, 1 = Scissor, 2 = Paper)
     * @returns {void}
     * @description
     * This function determines the winner of the Rock, Paper, Scissors game by comparing the player's choice with the enemy's choice.
     * If the player wins, the player's container border turns green and the enemy's container border turns red.
     * If the player loses, the player's container border turns red and the enemy's container border turns green.
     * If it's a draw, the text "DRAW" is displayed.
     */
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


    /**
     * Finish the Rock, Paper, Scissors game and reset the game state.
     * This function resets the player and enemy choice display, hides the game container,
     * shows the play container, resets the win text, saves the player data to the leaderboard,
     * resets the score, and gives the user feedback about their score and leaderboard.
     * @description
     * This function is called when the user clicks the "Finish Game" button.
     * It resets the game state, saves the player data to the leaderboard, and gives the user feedback about their score and leaderboard.
     * @returns {void}
     */
    finish() {
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
        this.CONTAINER_GAME.classList.toggle('hidden');
        this.CONTAINER_GAME.classList.toggle('flex');
        this.CONTAINER_PLAY.classList.remove('hidden');

        // Reset Win Text
        WIN_TEXT.textContent = '';

        // Save player data to leaderboard and reset score
        const PLAYER_DATA = {
            gameType: 'rps', playerName: this.getPlayerName(), score: this.getScore()
        }

        this.setLeaderboard(PLAYER_DATA);

        this.resetScore()

        // Give user feedback about their score and leaderboard
        const RPS_LEADERBOARD = this.leaderboard
            .filter(entry => entry.gameType === 'rps')
            .map(entry => `${entry.playerName}: ${entry.score}`)
            .join('\n');
        alert(`Your Score: ${PLAYER_DATA.score}\n\nLeaderboard:\n${RPS_LEADERBOARD}`);
    }
}

/*
* Click Hero Class
* This class will handle the logic for the Click Hero game, including calculating the attack power, 
* upgrading the attack, and handling the auto click feature.
*/
class ClickHero extends Games {
    constructor() {
        super();

        // Click Hero Data
        this.clickHero = {
            atk: JSON.parse(localStorage.getItem('atk')) || 1,
            auto: JSON.parse(localStorage.getItem('auto')) || false,
            upPrice: JSON.parse(localStorage.getItem('upPrice')) || 10,
            milestones: [
                {
                    threshold: 5000,
                    text: "YOU ARE A HERO",
                    isReached: false
                },
                {
                    threshold: 2000,
                    text: "UNSTOPPABLE",
                    isReached: false
                },
                {
                    threshold: 1000,
                    text: "GODLIKE",
                    isReached: false
                },
                {
                    threshold: 500,
                    text: "AMAZING",
                    isReached: false
                },
                {
                    threshold: 100,
                    text: "NOT ENOUGH",
                    isReached: false
                }
            ]
        }
    }

    /**
     * Reset Click Hero data and show game container after 3 seconds, also reset score
     */
    start() {
        // Reset Click Hero data
        this.clickHero.atk = 1;
        this.clickHero.auto = false;
        this.clickHero.upPrice = 10
        this.clickHero.milestones.forEach(m => m.isReached = false);

        this.CONTAINER_TUTORIAL.classList.toggle('hidden')
        this.CONTAINER_TUTORIAL.classList.toggle('flex')

        this.LOADING.classList.remove('hidden')

        // Show game container after 3 seconds and reset score
        setTimeout(() => {
            this.LOADING.classList.add('hidden')
            this.CONTAINER_GAME.classList.toggle('hidden');
            this.CONTAINER_GAME.classList.toggle('flex');
            this.resetScore()
        }, 3000)
    }

    /**
     * Click Hero logic
     * Calculate ATK and add to score, also check milestone and show praise text if milestone is reached
     */
    clickHero() {
        // Calculate ATK and add to score, also check milestone and show praise text if milestone is reached
        const ATK = this.clickHero.atk;
        this.setScore(ATK);
        const PRAISE_TEXT = document.getElementById('praiseText');

        const MILESTONES = this.clickHero.milestones;
        const CURRENT_MILESTONES = MILESTONES.find(m => this.getScore() >= m.threshold && !m.isReached);

        if (CURRENT_MILESTONES) {
            CURRENT_MILESTONES.isReached = true;

            PRAISE_TEXT.textContent = CURRENT_MILESTONES.text;

            PRAISE_TEXT.classList.add('animate-praise', 'text-sub');

            setTimeout(() => {
                PRAISE_TEXT.textContent = "";
                PRAISE_TEXT.classList.remove('animate-praise', 'text-sub');
            }, 2000);
        }
    }


    /**
     * Upgrade ATK by 1, reduce score by upgrade price, and double the upgrade price.
     * Also save ATK and upgrade price to localStorage.
     * If ATK reaches max ATK, set upgrade price display to "MAX"
     */
    upgradeAtk() {
        // Check if player has enough score to upgrade, if yes then reduce score by upgrade price, 
        // increase atk by 1, and double the upgrade price, also save atk and upgrade price to localStorage
        const ATK_UP = document.getElementById('atk-max');
        const ATK_PRICE_DISPLAY = document.getElementById('atk-price');
        const MAX_ATK = 10;

        if (this.clickHero.atk < MAX_ATK && this.getScore() >= this.clickHero.upPrice) {
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
        }
    }


    /**
     * Check if player has enough score to buy auto click, if yes then reduce score by auto click price, 
     * set auto click to true, save auto click status to localStorage, 
     * and start auto click interval, also update auto click status display
     */
    addAuto() {
        // Check if player has enough score to buy auto click, if yes then reduce score by auto click price, 
        // set auto click to true, save auto click status to localStorage, 
        // and start auto click interval, also update auto click status display
        const AUTO_STATUS = document.getElementById('auto-status');
        const UP_PRICE = 200; // Price for auto click

        if (!this.clickHero.auto && this.getScore() >= UP_PRICE) {
            this.setScore(-UP_PRICE);

            this.clickHero.auto = true;
            localStorage.setItem('auto', JSON.stringify(true));

            AUTO_STATUS.innerHTML = 'ON';
            AUTO_STATUS.classList.add('text-green-500', 'font-bold');

            this.activeAuto();
        }
    }


    /**
     * If auto click is active, start an interval that clicks the hero every 500ms, 
     * and add a pressing animation to the button. The animation will be removed after 100ms.
     */
    activeAuto() {
        const HERO_BTN = document.getElementById('hero-btn');

        // If auto click is active, start an interval that clicks the hero every 500ms, 
        // also add a pressing animation to the button
        if (this.clickHero.auto) {
            setInterval(() => {
                this.clickHero();

                HERO_BTN.classList.add('auto-pressing');

                setTimeout(() => {
                    HERO_BTN.classList.remove('auto-pressing');
                }, 100);

            }, 500);
        }
    }
}

/*
* Pokemon Class
* This class will handle the logic for the Pokemon game, including fetching random Pokemon data from the PokeAPI,
* rendering the Pokemon image and name, generating type buttons for the player to guess, and checking the player's answer.
*/
class Pokemon extends Games {
    constructor() {
        super();

        // Pokemon Data
        this.pokemon = {
            maxStage: 5, currentStage: 1, currentData: null, isLoading: false, trials: 5,
        };
    }


    /**
     * Randomly selects a Pokemon type, fetches a Pokemon of that type, 
     * and returns the details of the selected Pokemon.
     * @returns {Object} Details of the selected Pokemon, including its type, name, and image.
     * @throws {Error} If there is an error while fetching the data.
     */
    async guessPokemonType() {
        try {
            // List of Pokemon types to randomly select from
            const POKEMON_TYPES = ['fire', 'water', 'grass', 'electric', 'ice', 'poison', 'ground', 'flying', 'bug', 'rock', 'ghost', 'steel', 'dragon', 'dark', 'fairy'];
            // Base API URL for PokeAPI
            const BASE_API = 'https://pokeapi.co/api/v2/';

            // Randomly select a type
            const RANDOM_TYPE = POKEMON_TYPES[Math.floor(Math.random() * POKEMON_TYPES.length)];

            // Fetch Pokemon of that type
            const TYPE_RESPONSE = await fetch(`${BASE_API}type/${RANDOM_TYPE}`);
            const TYPE_DATA = await TYPE_RESPONSE.json();

            // Randomly select a Pokemon from that type
            const RANDOM_ENTRY = TYPE_DATA.pokemon[Math.floor(Math.random() * TYPE_DATA.pokemon.length)];

            // Fetch details of the selected Pokemon
            const POKEMON_RESPONSE = await fetch(RANDOM_ENTRY.pokemon.url);
            const POKEMON_DETAIL = await POKEMON_RESPONSE.json();

            // Store current Pokemon data for game logic
            this.pokemon.currentData = {
                type: RANDOM_TYPE,
                name: POKEMON_DETAIL.name,
                image: POKEMON_DETAIL.sprites.other['official-artwork'].front_default || POKEMON_DETAIL.sprites.front_default
            };

            return this.pokemon.currentData;
        } catch (error) {
            // Error handling
            console.error("Error:", error);
        }
    }

    /**
     * Starts the Pokemon game by hiding the tutorial container, showing the loading animation,
     * resetting the game data, fetching a Pokemon of a random type, and rendering the game
     * after loading. If there is an error while fetching the data, an alert will be shown and the
     * game will be finished.
     */
    async start() {
        this.LOADING.classList.remove('hidden');
        this.CONTAINER_TUTORIAL.classList.toggle('hidden');
        this.CONTAINER_TUTORIAL.classList.toggle('flex');

        // Reset Pokemon game data
        this.pokemon.currentStage = 1;
        this.pokemon.trials = 5;
        this.resetScore();

        // Fetch Pokemon data and render game after loading
        const DATA = await this.guessPokemonType();

        // If data is successfully fetched, show game container, else show alert and return to play container
        if (DATA) {
            setTimeout(() => {
                this.LOADING.classList.add('hidden');
                this.CONTAINER_GAME.classList.toggle('hidden');
                this.CONTAINER_GAME.classList.toggle('flex');
                this.renderPokemonGame(DATA);
            }, 2000)
        } else {
            alert("Connection problem!");
            this.finishPokemonGame();
        }
    }


    /**
     * Renders the Pokemon game by rendering the Pokemon image, name, stage, and generating type buttons
     * for the player to guess the type of the Pokemon. Also updates the trials and hint text.
     * @param {Object} data - The fetched Pokemon data to be rendered.
     */
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
        const TYPES = ['fire', 'water', 'grass', 'electric', 'ice', 'poison', 'ground', 'flying', 'bug', 'rock', 'ghost', 'steel', 'dragon', 'dark', 'fairy'];

        // Clear previous button
        CHOICE_CONTAINER.innerHTML = '';

        TYPES.forEach(type => {
            const BTN = document.createElement('button');
            BTN.innerText = type.toUpperCase();

            // Styling button
            BTN.className = `btn-types`;

            // Event listener for each button
            BTN.onclick = () => this.checkAnswer(type);
            CHOICE_CONTAINER.appendChild(BTN);
        });
    }


    /**
     * Checks if the user's guess matches the current pokemon's type.
     * If correct, update the score and display a correct message.
     * If incorrect, update the trials and display a hint or game over message.
     * @param {string} userGuess - The user's guess.
     */
    checkAnswer(userGuess) {
        // Safety check if currentData is not available
        if (!this.pokemon.currentData) return;

        const POKEMON_NAME = document.getElementById('pokemonName');
        const HINT_TEXT = document.getElementById('hintText');
        const TRIAL_TEXT = document.getElementById('trialDisplay');

        // Answer Check
        if (userGuess === this.pokemon.currentData.type) {
            // Correct Answer Logic
            POKEMON_NAME.textContent = this.pokemon.currentData.name.toUpperCase();
            HINT_TEXT.textContent = "CORRECT! GET READY FOR THE NEXT POKEMON!";
            this.setScore(20);

            // Delay before next stage
            setTimeout(async () => {
                // Check if stage clear or go to next stage with currentStage and maxStage
                if (this.pokemon.currentStage < this.pokemon.maxStage) {
                    this.pokemon.currentStage++;
                    const nextData = await this.guessPokemonType();
                    this.renderPokemonGame(nextData);
                } else {
                    // Game Clear Logic
                    alert("CONGRATULATIONS! You cleared all stages!");
                    this.finish();
                }
            }, 1500);

        } else {
            // Wrong Answer Logic
            this.pokemon.trials--;
            TRIAL_TEXT.textContent = `Lives: ${this.pokemon.trials}`;

            // Give hint if trials > 0
            if (this.pokemon.trials > 0) {
                const type = this.pokemon.currentData.type;
                let hint;

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
                alert(`GAME OVER! The answer is ${this.pokemon.currentData.type}.`);
                this.finish();
            }
        }
    }


    /**
     * Finish the Pokemon game by resetting the game data, updating the leaderboard, and hiding/showing the relevant containers.
     * This function is called when the user finishes the game, either by winning or losing.
     * @description
     * This function resets the Pokemon game data, updates the leaderboard with the user's score, resets the score, and hides/shows the relevant containers.
     * @returns {void}
     */
    finish() {
        const PLAYER_DATA = {
            gameType: 'pokemon', playerName: this.getPlayerName(), score: this.getScore()
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
        this.CONTAINER_GAME.classList.toggle('hidden');
        this.CONTAINER_GAME.classList.toggle('flex');
        this.CONTAINER_PLAY.classList.remove('hidden');
    }
}

// Init Games
const LOCAL_NAME = localStorage.getItem('playerName');
const GAMES = new Games(LOCAL_NAME);
const ROCK_PAPER_SCISSORS = new RPS();
const CLICK_HERO = new ClickHero();
const POKEMON = new Pokemon();


/**
 * Initializes the game by setting the player's name and hiding/showing the edit modal.
 * If the player's name is saved in local storage, the edit modal is hidden.
 * Otherwise, the edit modal is shown.
 */
function initGames() {
    const EDIT_MODAL = document.querySelector('.edit-modal');
    const NAME_ELEMENT = document.getElementById('playerName');
    NAME_ELEMENT.textContent = LOCAL_NAME || 'Random Player';
    GAMES.resetGame();

    if (LOCAL_NAME) {
        EDIT_MODAL.classList.add('hidden');
    } else {
        EDIT_MODAL.classList.remove('hidden');
    }
}

// Event Listeners for Games Section
function clickShowNameModal() {
    const EDIT_MODAL = document.querySelector('.edit-modal');
    EDIT_MODAL.classList.toggle('hidden');
}

/**
 * Submits the user's name and saves it to local storage.
 * @description
 * This function is called when the user submits the edit name form.
 * It gets the user's input from the form, sets the player's name using the Games class,
 * hides the edit modal, and prevents the form from submitting.
 * @param {Event} e - The event object that triggered this function.
 */
function submitName(e) {
    const NAME = document.getElementById('name').value;
    GAMES.setPlayerName(NAME);
    clickShowNameModal();

    e.preventDefault();
}

// RPS Section
function playRps() {
    ROCK_PAPER_SCISSORS.play();
}

function startRps() {
    ROCK_PAPER_SCISSORS.start();
}

function rps(choice) {
    ROCK_PAPER_SCISSORS.rps(choice);
}

function finishRps() {
    ROCK_PAPER_SCISSORS.finish();
}

// Click Hero Section
function playClickHero() {
    CLICK_HERO.play();
}

function startClickHero() {
    CLICK_HERO.start();
}

function clickHero() {
    CLICK_HERO.clickHero();
}

function upgradeATK() {
    CLICK_HERO.upgradeAtk();
}

function addAuto() {
    CLICK_HERO.addAuto()
}

// Pokemon Section

function playPokemon() {
    POKEMON.play();
}

function startPokemon() {
    POKEMON.start();
}