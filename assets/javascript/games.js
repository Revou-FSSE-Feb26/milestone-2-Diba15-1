class Games {
    // Declaration private variables
    #playerName;
    #score;

    constructor(playerName) {
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

        // RPS Choices
        this.CHOICES = [
            { value: 0, choice: '✊' }, // Rock
            { value: 1, choice: '✌️' }, // Scissor
            { value: 2, choice: '✋' }  // Paper
        ];

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

        // Pokemon Data
        this.pokemon = {
            maxStage: 5, currentStage: 1, currentData: null, isLoading: false, trials: 5,
        };

        this.vn = {
            currentSceneId: 'start',
            isTyping: false,
            typingTween: null,
            script: {
                "start": {
                    text: "Hari pertama di Akademi Revofun. Langit mendung dan aku sudah tersesat.",
                    background: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000",
                    name: "Aku",
                    next: "meet_girl"
                },
                "meet_girl": {
                    text: "BRUKK! Tiba-tiba seseorang menabrakku dari belakang dengan cukup keras.",
                    background: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000",
                    character: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia&baseColor=f5c2b1&clothing=blazerAndShirt&hair=longButNotTooLong&mouth=surprise",
                    name: "???",
                    shake: true, // Layar akan bergetar
                    next: "choice_1"
                },
                "choice_1": {
                    text: "Aduh, maaf! Aku sangat terburu-buru!",
                    character: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia&baseColor=f5c2b1&clothing=blazerAndShirt&hair=longButNotTooLong&mouth=smile",
                    name: "Gadis Misterius",
                    options: [
                        { text: "Tidak apa-apa, kamu mau kemana?", next: "friendly" },
                        { text: "Hati-hati dong kalau jalan!", next: "angry" }
                    ]
                },
                "friendly": {
                    text: "Terima kasih! Aku sedang mencari ruang pendaftaran. Ngomong-ngomong, namaku Mia. Salam kenal!",
                    character: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia&baseColor=f5c2b1&clothing=blazerAndShirt&hair=longButNotTooLong&mouth=grin",
                    name: "Mia",
                    next: "end"
                },
                "angry": {
                    text: "Uhh.. maafkan aku. Aku benar-benar panik karena terlambat.",
                    character: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia&baseColor=f5c2b1&clothing=blazerAndShirt&hair=longButNotTooLong&mouth=sad",
                    name: "Mia",
                    next: "end"
                },
                "end": {
                    text: "Begitulah pertemuan pertama kami di akademi ini... (Demo Visual Novel Selesai)",
                    background: "https://images.unsplash.com/photo-1497626485854-8c7647d6d1b2?auto=format&fit=crop&q=80&w=1000",
                    character: "",
                    name: "Sistem",
                    next: "start"
                }
            }
        };
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

    // Score Management, setScore will add score and update display, getScore will return current score, resetScore will reset score to 0 and update display
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

    // ✌️ Rock Paper Scissors Game Section

    // Rock Paper Scissors container manage function
    playRps() {
        // hide title container, show tutorial container
        this.CONTAINER_PLAY.classList.add('hidden')
        this.CONTAINER_TUTORIAL.classList.toggle('hidden')
        this.CONTAINER_TUTORIAL.classList.toggle('flex')

        // this.LOADING.classList.remove('hidden')

        // setTimeout(() => {
        // this.LOADING.classList.add('hidden')
        // this.CONTAINER_GAME.classList.toggle('hidden');
        // this.CONTAINER_GAME.classList.toggle('flex');
        // this.resetScore()
        // }, 3000)
    }

    startRps() {
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
        }, 200); // Change after 200ms
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

    // Finish RPS game
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
        const rpsLeaderboard = this.leaderboard
            .filter(entry => entry.gameType === 'rps')
            .map(entry => `${entry.playerName}: ${entry.score}`)
            .join('\n');
        alert(`Your Score: ${PLAYER_DATA.score}\n\nLeaderboard:\n${rpsLeaderboard}`);

    }

    // 👆 Click Hero Game Section

    // Click Hero container manage function
    playClickHero() {
        // Hide play container, show tutorial container
        this.CONTAINER_PLAY.classList.add('hidden')
        this.CONTAINER_TUTORIAL.classList.toggle('hidden')
        this.CONTAINER_TUTORIAL.classList.toggle('flex')


        // Show game container after 3 seconds and reset score
        // setTimeout(() => {
        //     this.LOADING.classList.add('hidden')
        //     this.CONTAINER_GAME.classList.toggle('hidden');
        //     this.CONTAINER_GAME.classList.toggle('flex');
        //     this.resetScore()
        // }, 3000)
    }

    startClickHero() {
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


    // Click Hero
    clickedHero() {
        // Calculate ATK and add to score, also check milestone and show praise text if milestone is reached
        const ATK = this.clickHero.atk;
        this.setScore(ATK);
        const PRAISE_TEXT = document.getElementById('praiseText');

        const milestones = this.clickHero.milestones;
        const currentMilestone = milestones.find(m => this.getScore() >= m.threshold && !m.isReached);

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

    // Add Auto Click logic
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

    // Activate auto click functionality
    activeAuto() {
        const HERO_BTN = document.getElementById('hero-btn');

        // If auto click is active, start an interval that clicks the hero every 500ms, 
        // also add a pressing animation to the button
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

    // 🐉 Pokemon Game Section

    // Fetch random Pokemon type and data from PokeAPI
    async guessPokemonType() {
        try {
            // List of Pokemon types to randomly select from
            const pokemonTypes = ['fire', 'water', 'grass', 'electric', 'ice', 'poison', 'ground', 'flying', 'bug', 'rock', 'ghost', 'steel', 'dragon', 'dark', 'fairy'];
            // Base API URL for PokeAPI
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
    playPokemon() {
        // Hide play container, show tutorial container
        this.CONTAINER_PLAY.classList.add('hidden');
        this.CONTAINER_TUTORIAL.classList.toggle('hidden');
        this.CONTAINER_TUTORIAL.classList.toggle('flex');
    }

    // Start the Pokemon game
    async startPokemon() {
        this.LOADING.classList.remove('hidden');
        this.CONTAINER_TUTORIAL.classList.toggle('hidden');
        this.CONTAINER_TUTORIAL.classList.toggle('flex');

        // Reset Pokemon game data
        this.pokemon.currentStage = 1;
        this.pokemon.trials = 5;
        this.resetScore();

        // Fetch Pokemon data and render game after loading
        const data = await this.guessPokemonType();

        // If data is successfully fetched, show game container, else show alert and return to play container
        if (data) {
            setTimeout(() => {
                this.LOADING.classList.add('hidden');
                this.CONTAINER_GAME.classList.toggle('hidden');
                this.CONTAINER_GAME.classList.toggle('flex');
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

        // Clear previous button
        CHOICE_CONTAINER.innerHTML = '';

        types.forEach(type => {
            const btn = document.createElement('button');
            btn.innerText = type.toUpperCase();

            // Styling button
            btn.className = `btn-types`;

            // Event listener for each button
            btn.onclick = () => this.checkAnswer(type);
            CHOICE_CONTAINER.appendChild(btn);
        });
    }

    // Check answer logic when player clicks type button
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
                    this.finishPokemonGame();
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
                this.finishPokemonGame();
            }
        }
    }

    // Reset Pokemon game data and return to play container
    finishPokemonGame() {
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

    // ==========================================
    // 📖 VISUAL NOVEL GAME SECTION
    // ==========================================

    playVn() {
        this.CONTAINER_PLAY.classList.add('hidden');
        this.CONTAINER_TUTORIAL.classList.remove('hidden');
        this.CONTAINER_TUTORIAL.classList.add('flex');
        gsap.from(this.CONTAINER_TUTORIAL.children, { opacity: 1, y: 20, stagger: 0.1, duration: 0.5 });
    }

    startVn() {
        this.CONTAINER_TUTORIAL.classList.add('hidden');
        this.CONTAINER_TUTORIAL.classList.remove('flex');
        this.LOADING.classList.remove('hidden');
        this.LOADING.classList.add('flex');

        setTimeout(() => {
            this.LOADING.classList.add('hidden');
            this.LOADING.classList.remove('flex');
            this.CONTAINER_GAME.classList.remove('hidden');
            this.CONTAINER_GAME.classList.add('flex');

            this.initVnUI();
            this.renderVnScene('start');
        }, 1500);
    }

    initVnUI() {
        // Membuat struktur layout UI VN di dalam container game
        this.CONTAINER_GAME.innerHTML = `
                        <div id="vn-screen" class="relative w-full h-[450px] md:h-[500px] overflow-hidden rounded-[2rem] bg-black shadow-2xl border-2 border-white/10 select-none group">
                            <!-- Background Layer -->
                            <div id="vn-bg" class="absolute inset-0 bg-cover bg-center transition-all duration-1000 opacity-60"></div>
                            
                            <!-- Character Layer -->
                            <div class="absolute inset-0 flex items-end justify-center pointer-events-none z-10 pb-16">
                                <img id="vn-char" src="" alt="" class="h-4/5 object-contain opacity-0 transform translate-y-10 transition-all">
                            </div>
                            
                            <!-- UI Overlay -->
                            <div class="absolute inset-0 z-20 flex flex-col justify-end p-4 md:p-8 pointer-events-none">
                                
                                <!-- Choices Box -->
                                <div id="vn-choices" class="mb-6 flex flex-col gap-3 items-center pointer-events-auto"></div>
                                
                                <!-- Dialogue Box -->
                                <div id="vn-dialogue" onclick="vnNext()" class="bg-dark-bg/80 backdrop-blur-md border-t-2 border-white/20 rounded-[1.5rem] p-6 pt-8 relative min-h-[130px] pointer-events-auto cursor-pointer hover:bg-dark-bg/90 transition-colors shadow-2xl">
                                    <div id="vn-name" class="absolute -top-5 left-6 bg-main text-white px-6 py-1.5 rounded-xl font-bold font-title shadow-lg text-lg border border-white/20 tracking-wider">
                                        Name
                                    </div>
                                    <div id="vn-text" class="text-white md:text-xl font-default leading-relaxed pr-8"></div>
                                    <div id="vn-prompt" class="absolute bottom-4 right-5 text-sub animate-bounce opacity-0">
                                        <i class="fa-solid fa-caret-down text-2xl"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
    }

    renderVnScene(sceneId) {
        const scene = this.vn.script[sceneId];
        this.vn.currentSceneId = sceneId;

        const bg = document.getElementById('vn-bg');
        const charImg = document.getElementById('vn-char');
        const nameTag = document.getElementById('vn-name');
        const choicesDiv = document.getElementById('vn-choices');
        const prompt = document.getElementById('vn-prompt');
        const vnScreen = document.getElementById('vn-screen');

        // Ganti Nama (Ganti dengan nama player jika diset "Aku")
        nameTag.innerText = scene.name === "Aku" ? this.getPlayerName() : scene.name;

        // Transisi Background
        if (scene.background) {
            bg.style.backgroundImage = `url('${scene.background}')`;
        }

        // Transisi Karakter dengan GSAP
        if (scene.character) {
            const isSameChar = charImg.src === scene.character;
            charImg.src = scene.character;
            if (!isSameChar) {
                gsap.fromTo(charImg,
                    { opacity: 0, scale: 0.9, y: 30 },
                    { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.5)" }
                );
                gsap.to(charImg, { y: "-=10", duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" }); // Idle Breathe
            }
        } else {
            gsap.to(charImg, { opacity: 0, y: 20, duration: 0.4 });
        }

        // Efek Shake Layar
        if (scene.shake) {
            gsap.fromTo(vnScreen,
                { x: -10 },
                { x: 10, duration: 0.05, repeat: 10, yoyo: true, onComplete: () => gsap.set(vnScreen, { x: 0 }) }
            );
        }

        // Reset UI
        choicesDiv.innerHTML = '';
        gsap.set(prompt, { opacity: 0 });

        // Mulai ngetik
        this.startVnTypewriter(scene.text);
    }

    startVnTypewriter(text) {
        this.vn.isTyping = true;
        const textDisplay = document.getElementById('vn-text');
        textDisplay.innerHTML = "";

        const textObj = { val: 0 };
        this.vn.typingTween = gsap.to(textObj, {
            val: text.length,
            duration: text.length * 0.03, // Kecepatan ngetik
            ease: "none",
            onUpdate: () => {
                textDisplay.innerHTML = text.substr(0, Math.ceil(textObj.val));
            },
            onComplete: () => {
                this.vn.isTyping = false;
                this.showVnNextActions();
            }
        });
    }

    showVnNextActions() {
        const scene = this.vn.script[this.vn.currentSceneId];
        const choicesDiv = document.getElementById('vn-choices');
        const prompt = document.getElementById('vn-prompt');

        if (scene.options) {
            // Tampilkan Pilihan
            scene.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = "btn-sub w-full max-w-md bg-dark-bg/80 backdrop-blur-md opacity-0 transform translate-y-4 hover:bg-sub hover:text-dark-bg border-white/20";
                btn.innerText = opt.text;
                btn.onclick = (e) => {
                    e.stopPropagation(); // Cegah klik tembus ke kotak dialog
                    this.renderVnScene(opt.next);
                };
                choicesDiv.appendChild(btn);
            });
            // Animasi tombol muncul satu per satu
            gsap.to("#vn-choices button", { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: "power2.out" });
        } else {
            // Tampilkan panah kedip-kedip
            gsap.to(prompt, { opacity: 1, duration: 0.3 });
        }
    }

    handleVnClick() {
        const scene = this.vn.script[this.vn.currentSceneId];

        // Kalau masih ngetik, langsung skip sampai beres
        if (this.vn.isTyping) {
            this.vn.typingTween.progress(1);
            return;
        }

        // Lanjut kalau bukan layar pilihan
        if (!scene.options && scene.next) {
            this.renderVnScene(scene.next);
        }
    }

    finishVn() {
        // Reset VN game data
        this.vn.currentSceneId = 'start';
        this.vn.isTyping = false;
        this.vn.typingTween = null;

        // Hide Game Container, Show Play Container
        this.CONTAINER_GAME.classList.toggle('hidden');
        this.CONTAINER_GAME.classList.toggle('flex');
        this.CONTAINER_PLAY.classList.remove('hidden');


    }

    // 📋 Other Section

    resetGame() {
        this.resetScore();
    }
}

// Init Games section include function and elements
const NAME_ELEMENT = document.getElementById('playerName');
NAME_ELEMENT.textContent = localStorage.getItem('playerName') || 'Random Player';
let games = new Games(localStorage.getItem('playerName') || 'Random Player');

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

function submitName(e) {
    const name = document.getElementById('name').value;
    games.setPlayerName(name);
    clickShowNameModal();

    e.preventDefault();
}

//RPS Section
function playRps() {
    games.playRps();
}

function startRps() {
    games.startRps();
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

function startClickHero() {
    games.startClickHero();
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

function startPokemon() {
    games.startPokemon();
}

// VN Global Wrappers
function playVn() { games.playVn(); }
function startVn() { games.startVn(); }
function vnNext() { games.handleVnClick(); }