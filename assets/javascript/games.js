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
        this.containerGame = document.getElementById('game-container');
        this.containerPlay = document.getElementById('play-container');
        this.containerTutorial = document.getElementById('tutorial-container');
        this.loading = document.getElementById('loading');
        this.scoreDisplay = document.getElementById('playerScore');

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
        const playerName = localStorage.getItem('playerName') || this.#playerName;

        return playerName;
    }

    /**
     * Update the current score by adding the given score to it, and store the new score in localStorage.
     * Also update the display of the current score.
     * @param {number} score - The score to be added to the current score.
     */
    setScore(score) {
        this.#score += score;
        localStorage.setItem('score', this.#score);

        this.scoreDisplay.innerHTML = this.#score;
    }

    // Get current score
    getScore() {
        return this.#score;
    }

    // Reset score to 0 and update display, also remove score from localStorage
    resetScore() {
        this.#score = 0;
        localStorage.removeItem('score');
        this.scoreDisplay.innerHTML = this.#score;
    }

    // Set leaderboard data, push new player data to leaderboard array and store in localStorage
    setLeaderboard(playerData) {
        this.leaderboard.push(playerData);
        localStorage.setItem('leaderboard', JSON.stringify(this.leaderboard));
    }

    /**
     * Retrieves and returns the leaderboard for a specific game type, sorted in descending order by score.
     * The leaderboard is formatted as a string with each entry on a new line, displaying the player's name and score.
     * @param {string} type - The type of game for which to retrieve the leaderboard.
     * @returns {string} A formatted string representing the leaderboard for the specified game type, sorted by score in descending order.
     */
    getLeaderboard(type) {
        const LEADERBOARD = this.leaderboard
            .filter(entry => entry.gameType === type)
            .sort((a, b) => b.score - a.score)
            .map(entry => `${entry.playerName}: ${entry.score}`)
            .join('\n');

        return LEADERBOARD;
    }


    /** 
     * Retrieves and returns the leaderboard entries for a specific game type, sorted in descending order by score.
     * @param {string} type - The type of game for which to retrieve the leaderboard entries.
     * @returns {Array} An array of leaderboard entries for the specified game type, sorted by score in descending order.
    */
    getLeaderboardEntries(type) {
        const LEADERBOARD_ENTRIES = JSON.parse(localStorage.getItem('leaderboard')) || [];

        const filter = LEADERBOARD_ENTRIES
            .filter(entry => entry.gameType === type)
            .sort((a, b) => b.score - a.score);

        return filter;
    }

    /**
     * Renders the leaderboard for a specific game type by fetching the leaderboard entries, determining the player's best score and rank, 
     * and displaying the top 3 entries in the leaderboard. If the player has not played the game yet, 
     * a message is displayed to encourage them to play. If there are no entries in the leaderboard, 
     * a message is displayed to encourage players to play and get on the leaderboard.
     * @param {string} gameType - The type of game for which to render the leaderboard.
     */
    renderLeaderboard(gameType) {
        const LIST_CONTAINER = document.getElementById('lb-list');
        const BEST_RANK = document.getElementById('latestRankInfo');
        LIST_CONTAINER.innerHTML = '';

        // Fetch leaderboard data
        const LB_DATA = GAMES.getLeaderboardEntries(gameType);

        // Find player's best score and rank in the leaderboard
        const PLAYER_SCORE = LB_DATA.find(entry => entry.playerName === this.getPlayerName());
        const BEST_SCORE = Math.max(PLAYER_SCORE ? PLAYER_SCORE.score : 0, 0);

        // Display player's best rank and score, if player hasn't played yet, display a message to encourage them to play
        if (!PLAYER_SCORE) {
            BEST_RANK.textContent = "You haven't played this game yet! Play now and get on the leaderboard!";
        } else {
            BEST_RANK.textContent = `You are currently ranked #${LB_DATA.indexOf(PLAYER_SCORE) + 1} with ${PLAYER_SCORE.score} pts. Your best score is ${BEST_SCORE} pts.`;
        }

        // If there is no data in the leaderboard, display a message to encourage players to play and get on the leaderboard
        if (LB_DATA.length === 0) {
            const NO_DATA = document.createElement('p');
            NO_DATA.textContent = "No data yet!";
            NO_DATA.className = 'text-md text-white font-bold';
            LIST_CONTAINER.appendChild(NO_DATA);
        }

        // Generate TOP 3 leaderboard list append into LIST_CONTAINER
        LB_DATA.slice(0, 3).forEach((entry, index) => {
            const numberLb = index + 1;
            const RANK = numberLb < 10 ? `0${numberLb}` : numberLb;

            const DIVISION = document.createElement('div');
            DIVISION.className = 'flex justify-between items-center gap-4 border-b border-white/20 py-2';
            DIVISION.innerHTML = `
                <span class="font-bold ${numberLb === 1 ? 'text-sub' : 'text-gray-400'}">${RANK}.</span>
                <div class="flex flex-col w-full">
                    <span class="text-md text-white font-bold">${entry.playerName}</span>
                    <span class="text-sm font-semibold text-gray-400">${entry.score} pts</span>
                </div>
                ${numberLb === 1 ? '<span>👑</span>' : ''}
            `;
            LIST_CONTAINER.appendChild(DIVISION);
        });
    }

    // Default Methods for Games, these methods will be overridden by each game class
    play() {
        // hide title container, show tutorial container
        this.containerPlay.classList.add('hidden')
        this.containerTutorial.classList.toggle('hidden')
        this.containerTutorial.classList.toggle('flex')
    }


    /**
     * Starts the game by hiding the tutorial container, showing the loading animation,
     * waiting for 3 seconds, and then showing the game container and resetting the score.
     */
    start() {
        this.containerTutorial.classList.toggle('hidden')
        this.containerTutorial.classList.toggle('flex')

        this.loading.classList.remove('hidden')

        setTimeout(() => {
            this.loading.classList.add('hidden')
            this.containerGame.classList.toggle('hidden');
            this.containerGame.classList.toggle('flex');
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

        this.enemyChoiceDisplay = document.getElementById('enemyChoiceDisplay');
        this.playerChoiceDisplay = document.getElementById('playerChoiceDisplay');
        this.determineWin = document.getElementById('determineWin');
        this.playerContainer = document.getElementById('playerContainer');
        this.enemyContainer = document.getElementById('enemyContainer');

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
        // Show Player Choice
        this.playerChoiceDisplay.innerHTML = this.CHOICES[playerChoice].choice;
        // Reset Border Determine
        this.playerContainer.classList.remove('border-green-600')
        this.playerContainer.classList.remove('border-red-600')
        this.enemyContainer.classList.remove('border-green-600')
        this.enemyContainer.classList.remove('border-red-600')
        this.playerContainer.classList.add('border-white/20')
        this.enemyContainer.classList.add('border-white/20')

        // Reset Win Text
        this.determineWin.textContent = '';

        let shuffleCount = 0;
        const SHUFFLE_INTERVAL = setInterval(() => {
            const COMPUTER_CHOICE = this.CHOICES[Math.floor(Math.random() * this.CHOICES.length)];
            // Show icon random
            this.enemyChoiceDisplay.innerHTML = COMPUTER_CHOICE.choice;
            shuffleCount++;

            // Stop after shufflecount > 15
            if (shuffleCount > 15) {
                clearInterval(SHUFFLE_INTERVAL);
                this.playerContainer.classList.remove('border-white/20')
                this.enemyContainer.classList.remove('border-white/20')
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
        if (playerChoice === enemyChoice) {
            this.determineWin.textContent = "DRAW";
        } else if ((playerChoice === 0 && enemyChoice === 1) || // Rock (0) vs Scissor (1)
            (playerChoice === 1 && enemyChoice === 2) || // Scissor (1) vs Paper (2)
            (playerChoice === 2 && enemyChoice === 0)    // Paper (2) vs Rock (0)
        ) {
            // CASE: PLAYER WIN
            this.playerContainer.classList.add("border-green-600");
            this.enemyContainer.classList.add("border-red-600");
            this.setScore(100);
            this.determineWin.textContent = "YOU WIN🎉";
        } else {
            // CASE: PLAYER LOSE
            this.playerContainer.classList.add("border-red-600");
            this.enemyContainer.classList.add("border-green-600");
            this.determineWin.textContent = "YOU LOSE😢";
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
        // Reset Border Determine
        this.playerContainer.classList.remove('border-green-600');
        this.playerContainer.classList.remove('border-red-600');
        this.enemyContainer.classList.remove('border-green-600');
        this.enemyContainer.classList.remove('border-red-600');
        this.playerContainer.classList.add('border-white/20');
        this.enemyContainer.classList.add('border-white/20');

        // Reset Player and Enemy Display
        this.enemyChoiceDisplay.innerHTML = '??';
        this.playerChoiceDisplay.innerHTML = '??';

        // Hide Game Container, Show Play Container
        this.containerGame.classList.toggle('hidden');
        this.containerGame.classList.toggle('flex');
        this.containerPlay.classList.remove('hidden');

        // Reset Win Text
        this.determineWin.textContent = '';

        // Save player data to leaderboard and reset score
        const PLAYER_DATA = {
            gameType: 'rps', playerName: this.getPlayerName(), score: this.getScore()
        }

        this.setLeaderboard(PLAYER_DATA);

        this.resetScore()

        // Give user feedback about their score and leaderboard
        const RPS_LEADERBOARD = this.getLeaderboard('rps');
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

        // Centralized DOM Elements
        this.finishBtn = document.getElementById('finishBtn');
        this.praiseText = document.getElementById('praiseText');
        this.atkUp = document.getElementById('atk-max');
        this.atkPriceDisplay = document.getElementById('atk-price');
        this.autoStatus = document.getElementById('auto-status');
        this.heroBtn = document.getElementById('hero-btn');

        this.autoInterval = null;

        // Click Hero Data
        this.clickHero = {
            atk: JSON.parse(localStorage.getItem('atk')) || 1,
            currentAtkUp: 1,
            auto: JSON.parse(localStorage.getItem('auto')) || false,
            upPrice: JSON.parse(localStorage.getItem('upPrice')) || 10,
            reachFinish: false,
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

        this.containerTutorial.classList.toggle('hidden')
        this.containerTutorial.classList.toggle('flex')
        this.finishBtn.classList.add('hidden')
        this.finishBtn.classList.remove('flex')
        this.loading.classList.remove('hidden')

        // Reset Click Hero data
        this.resetGame();

        // Show game container after 3 seconds and reset score
        setTimeout(() => {
            this.loading.classList.add('hidden')
            this.containerGame.classList.toggle('hidden');
            this.containerGame.classList.toggle('flex');
            this.resetScore()
        }, 3000)
    }

    /**
     * Click Hero logic
     * Calculate ATK and add to score, also check milestone and show praise text if milestone is reached
     */
    clicked() {
        // Calculate ATK and add to score, also check milestone and show praise text if milestone is reached
        const ATK = this.clickHero.atk;
        this.setScore(ATK);

        const MILESTONES = this.clickHero.milestones;
        const CURRENT_MILESTONES = MILESTONES.find(m => this.getScore() >= m.threshold && !m.isReached);

        if (CURRENT_MILESTONES) {
            CURRENT_MILESTONES.isReached = true;

            this.praiseText.textContent = CURRENT_MILESTONES.text;

            this.praiseText.classList.add('animate-praise', 'text-sub');

            setTimeout(() => {
                this.praiseText.textContent = "";
                this.praiseText.classList.remove('animate-praise', 'text-sub');
            }, 2000);
        }

        if (this.getScore() >= MILESTONES[0].threshold) {
            this.clickHero.reachFinish = true;
        }

        if (this.clickHero.reachFinish) {
            this.finishBtn.classList.remove('hidden');
            this.finishBtn.classList.add('flex');
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
        const MAX_ATK = 10;

        if (this.clickHero.currentAtkUp < MAX_ATK && this.getScore() >= this.clickHero.upPrice) {
            this.setScore(-this.clickHero.upPrice);

            // Attack Data 2^10
            this.clickHero.atk *= 2;
            this.clickHero.upPrice *= 2;
            this.clickHero.currentAtkUp += 1;

            localStorage.setItem('atk', JSON.stringify(this.clickHero.atk));
            localStorage.setItem('upPrice', JSON.stringify(this.clickHero.upPrice));

            this.atkUp.innerHTML = `${this.clickHero.currentAtkUp}/${MAX_ATK}`;

            if (this.clickHero.currentAtkUp >= MAX_ATK) {
                this.atkPriceDisplay.innerHTML = "MAX";
            } else {
                this.atkPriceDisplay.innerHTML = this.clickHero.upPrice;
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
        const UP_PRICE = 1000; // Price for auto click

        if (!this.clickHero.auto && this.getScore() >= UP_PRICE) {
            this.setScore(-UP_PRICE);

            this.clickHero.auto = true;
            localStorage.setItem('auto', JSON.stringify(true));

            this.autoStatus.innerHTML = 'ON';
            this.autoStatus.classList.add('text-green-500', 'font-bold');

            this.activeAuto();
        }
    }


    /**
     * If auto click is active, start an interval that clicks the hero every 500ms, 
     * and add a pressing animation to the button. The animation will be removed after 100ms.
     */
    activeAuto() {
        // If auto click is active, start an interval that clicks the hero every 500ms, 
        // also add a pressing animation to the button
        if (this.clickHero.auto) {
            this.autoInterval = setInterval(() => {
                this.clicked();

                this.heroBtn.classList.add('auto-pressing');

                setTimeout(() => {
                    this.heroBtn.classList.remove('auto-pressing');
                }, 100);

            }, 500);
        }
    }

    /**
     * Finish the Click Hero game by resetting the game data, updating the leaderboard, and hiding/showing the relevant containers.
     * This function is called when the user finishes the game, either by winning or losing.
     * @description
     * This function resets the Click Hero game data, updates the leaderboard with the user's score, resets the score, and hides/shows the relevant containers.
     */
    finish() {
        const PLAYER_DATA = {
            gameType: 'click_hero', playerName: this.getPlayerName(), score: this.getScore()
        }

        this.setLeaderboard(PLAYER_DATA);

        // Hide Game Container, Show Play Container
        this.containerGame.classList.toggle('hidden');
        this.containerGame.classList.toggle('flex');
        this.containerPlay.classList.remove('hidden');

        // Give user feedback about their score and leaderboard
        const CLICK_LEADERBOARD = this.getLeaderboard('click_hero');
        alert(`Your Score: ${PLAYER_DATA.score}\n\nLeaderboard:\n${CLICK_LEADERBOARD}`);

        // Reset Game Data
        this.resetGame();
    }

    /**
     * Reset the Click Hero game data, such as score, ATK, up price, auto click, and milestones.
     * This function is called when the user start the game, and it resets all the game data to its default values.
     * @description
     * This function resets the Click Hero game data, and it is called when the user start the game.
     */
    resetGame() {
        // Reset ALL
        this.resetScore();
        this.clickHero.atk = 1;
        this.clickHero.upPrice = 10;
        this.clickHero.currentAtkUp = 1;
        this.clickHero.auto = false;
        this.clickHero.reachFinish = false;
        this.clickHero.milestones.forEach(m => m.isReached = false);

        clearInterval(this.autoInterval);

        this.atkUp.innerHTML = `${this.clickHero.atk}/10`;
        this.atkPriceDisplay.innerHTML = this.clickHero.upPrice;
        this.autoStatus.innerHTML = 'OFF';
        this.autoStatus.classList.remove('text-green-500', 'font-bold');

        localStorage.removeItem('score');
        localStorage.removeItem('atk');
        localStorage.removeItem('upPrice');
        localStorage.removeItem('auto');
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

        // Centralized DOM Elements
        this.pokemonImg = document.getElementById('pokemonImage');
        this.pokemonName = document.getElementById('pokemonName');
        this.stageText = document.getElementById('stageDisplay');
        this.choiceContainer = document.getElementById('playerChoiceContainer');
        this.trialText = document.getElementById('trialDisplay');
        this.hintText = document.getElementById('hintText');

        // Pokemon Data
        this.pokemon = {
            maxStage: 5, currentStage: 1, currentData: null, isLoading: false, trials: 5,
        };
        this.pokemonTypes = ['fire', 'water', 'grass', 'electric', 'ice', 'poison', 'ground', 'flying', 'bug', 'rock', 'ghost', 'steel', 'dragon', 'dark', 'fairy'];
    }


    /**
     * Randomly selects a Pokemon type, fetches a Pokemon of that type, 
     * and returns the details of the selected Pokemon.
     * @returns {Object} Details of the selected Pokemon, including its type, name, and image.
     * @throws {Error} If there is an error while fetching the data.
     */
    async guessPokemonType() {
        try {
            // Base API URL for PokeAPI
            const BASE_API = 'https://pokeapi.co/api/v2/';

            // Randomly select a type
            const RANDOM_TYPE = this.pokemonTypes[Math.floor(Math.random() * this.pokemonTypes.length)];

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
        this.loading.classList.remove('hidden');
        this.containerTutorial.classList.toggle('hidden');
        this.containerTutorial.classList.toggle('flex');

        // Reset Pokemon game data
        this.pokemon.currentStage = 1;
        this.pokemon.trials = 5;
        this.resetScore();

        // Fetch Pokemon data and render game after loading
        const DATA = await this.guessPokemonType();

        // If data is successfully fetched, show game container, else show alert and return to play container
        if (DATA) {
            setTimeout(() => {
                this.loading.classList.add('hidden');
                this.containerGame.classList.toggle('hidden');
                this.containerGame.classList.toggle('flex');
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
        // Pokemon render
        this.pokemonImg.src = data.image;
        this.pokemonImg.classList.add('animate-pop');
        this.pokemonName.textContent = data.name;

        // Update stage
        this.stageText.textContent = `Stage: ${this.pokemon.currentStage} / ${this.pokemon.maxStage}`;

        // Show trials
        if (this.trialText) this.trialText.textContent = `Lives: ${this.pokemon.trials}`;

        // Empty the hint
        if (this.hintText) this.hintText.textContent = "";

        // Clear previous button
        this.choiceContainer.innerHTML = '';

        this.pokemonTypes.forEach(type => {
            const BTN = document.createElement('button');
            BTN.innerText = type.toUpperCase();

            // Styling button
            BTN.className = `btn-types`;

            // Event listener for each button
            BTN.onclick = () => this.checkAnswer(type);
            this.choiceContainer.appendChild(BTN);
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

        // Answer Check
        if (userGuess === this.pokemon.currentData.type) {
            // Correct Answer Logic
            this.pokemonName.textContent = this.pokemon.currentData.name.toUpperCase();
            this.hintText.textContent = "CORRECT! GET READY FOR THE NEXT POKEMON!";
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
            this.trialText.textContent = `Lives: ${this.pokemon.trials}`;

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

                this.hintText.textContent = hint;
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
        if (this.pokemonImage) {
            this.pokemonImage.src = '';
        }

        // Hide Game Container, Show Play Container
        this.containerGame.classList.toggle('hidden');
        this.containerGame.classList.toggle('flex');
        this.containerPlay.classList.remove('hidden');
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
    GAMES.setPlayerName(LOCAL_NAME || "Random Player");
    GAMES.resetGame();

    if (LOCAL_NAME) {
        EDIT_MODAL.classList.add('hidden');
    } else {
        EDIT_MODAL.classList.remove('hidden');
    }
}

window.onLoad = initGames();

// Event Listeners for Games Section
function clickShowNameModal() {
    const EDIT_MODAL = document.querySelector('.edit-modal');
    EDIT_MODAL.classList.toggle('hidden');
}


/**
 * Opens the leaderboard modal and populates it with entries for the specified game type.
 * Retrieves leaderboard data from the games instance, generates a ranked list of players,
 * and displays it in the modal. Special styling is applied for the top rank.
 * If no data is available, displays a "No data yet!" message.
 * @param {string} gameType - The type of game for which to display the leaderboard (e.g., 'clicker', 'pokemon').
 */
function openLeaderboard(gameType) {
    const LEADERBOARD_MODAL = document.getElementById('leaderBoard_modal');
    LEADERBOARD_MODAL.classList.toggle('hidden');
    LEADERBOARD_MODAL.classList.toggle('flex');

    GAMES.renderLeaderboard(gameType);
}

/**
 * Closes the leaderboard modal and clears the leaderboard list.
 * This function is called when the user clicks the close button on the leaderboard modal.
 * It toggles the visibility of the modal and clears the contents of the leaderboard list container.
 */
function closeLeaderboard() {
    const LEADERBOARD_MODAL = document.getElementById('leaderBoard_modal');
    LEADERBOARD_MODAL.classList.toggle('hidden');
    LEADERBOARD_MODAL.classList.toggle('flex');

    const LIST_CONTAINER = document.getElementById('lb-list');
    // Clear previous leaderboard list
    LIST_CONTAINER.innerHTML = '';
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
    CLICK_HERO.clicked();
}

function upgradeATK() {
    CLICK_HERO.upgradeAtk();
}

function addAuto() {
    CLICK_HERO.addAuto();
}

function finishClick() {
    CLICK_HERO.finish();
}

// Pokemon Section

function playPokemon() {
    POKEMON.play();
}

function startPokemon() {
    POKEMON.start();
}