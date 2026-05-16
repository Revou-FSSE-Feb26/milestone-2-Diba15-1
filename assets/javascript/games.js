
// Array for put some html
const GAME_TEMPLATES = {
    modal: `<div class="edit-modal hidden">
            <form onsubmit="submitName(event)">
                <div class="flex justify-between">
                    <h2 class="text-white text-lg font-bold">Edit Player
                        Name</h2>
                    <button onclick="clickShowNameModal()" title="Close Button"
                        type="button"
                        class="text-white text-md text-end cursor-pointer"><i
                            class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <label class="text-white" for="name">Player Name</label>
                <input type="text" name="playerName" id="name"
                    placeholder="Input Player Name" required>
                <button class="btn-sub" type="submit">Save</button>
            </form>
        </div>`,
    rps: `<div id="play-container"
                    class="flex flex-col items-center justify-center gap-4">
                    <h3
                        class="text-2xl font-title font-bold text-center text-white">Rock
                        Paper Scissor</h3>
                    <p
                        class="text-gray-300 text-center text-lg font-semibold">🖥️
                        Recommended play in desktop for best experience!</p>
                    <button onclick="play()" class="btn cursor-pointer">Play
                        Now!</button>
                </div>
                <!--Loading-->
                <div
                    class="font-default font-semibold text-2xl text-white hidden"
                    id="loading">
                    <div class="animate-bounce">✌️ 🤚 ✊</div>
                    <p>Loading...</p>
                </div>

                <!-- Tutorial Container -->
                <div id="tutorial-container"
                    class="flex-col items-center justify-center gap-4 w-full max-w-xl text-center text-white hidden">
                    <h3 class="text-2xl font-title font-bold">How to Play?</h3>
                    <p class="text-gray-300 text-lg/relaxed text-justify">Click the hand icons to
                        choose your move. The computer will randomly select its
                        move, and the winner will be determined based on the
                        classic rules of Rock, Paper, Scissors.</p>
                    <button onclick="start()" class="btn cursor-pointer">Start Game</button>
                </div>

                <!--Game Container-->
                <div id="game-container"
                    class="flex-col justify-center items-center gap-8 w-full hidden">
                    <!--Header Like Score and stage-->
                    <div id="gameHeaderContainer"
                        class="flex justify-between w-full">
                        <div class="font-title text-xl text-white">Score: <span
                                id="playerScore">0</span></div>
                    </div>
                    <!--Game winner determine display-->
                    <h3 id="determineWin"
                        class="font-title font-bold text-2xl text-center text-white"></h3>
                    <!--Game Display-->
                    <div id="gameDisplayContainer"
                        class="flex flex-col md:flex-row justify-around gap-4 w-full">
                        <!--Player Container-->
                        <div id="playerContainer"
                            class="bg-transparent w-full max-w-full md:max-w-sm border-2 border-white/20 hover:border-sub text-white px-8 py-4 rounded-2xl
                            font-bold font-title transition-all flex flex-col items-center gap-4">
                            <h3 class="text-xl md:text-2xl">Player</h3>
                            <div id="playerChoiceDisplay"
                                class="text-6xl">??</div>
                        </div>
                        <!--Pemisah-->
                        <div
                            class="max-h-2 h-0.5 md:h-auto md:max-h-full bg-sub max-w-full md:w-0.5 rounded-full"></div>
                        <!--Enemy Container-->
                        <div id="enemyContainer"
                            class="bg-transparent w-full max-w-full md:max-w-sm border-2 border-white/20 hover:border-sub text-white px-8 py-4 rounded-2xl
                            font-bold font-title transition-all flex flex-col items-center gap-4">
                            <h3 class="text-xl md:text-2xl">Computer</h3>
                            <div id="enemyChoiceDisplay"
                                class="text-6xl">??
                            </div>
                        </div>
                    </div>
                    <!--Choice Container-->
                    <div
                        class="w-full flex flex-col sm:flex-row justify-center sm:justify-evenly items-center gap-4 sm:gap-4">
                        <div id="playerChoiceContainer"
                            class="flex flex-wrap gap-4 justify-center items-center">
                            <div onclick="rps(2)"
                                class="btn-sub text-xl md:text-2xl cursor-pointer">🤚</div>
                            <div onclick="rps(1)"
                                class="btn-sub text-xl md:text-2xl cursor-pointer">✌️</div>
                            <div onclick="rps(0)"
                                class="btn-sub text-xl md:text-2xl cursor-pointer">✊</div>
                        </div>
                        <button onclick="finish('rps')" class="btn">Finish
                            Game</button>
                    </div>
                </div>`,
    click_hero: `<!-- Title -->
                <div id="play-container"
                    class="flex flex-col items-center justify-center gap-4">
                    <h3
                        class="text-2xl font-title font-bold text-center text-white">Click
                        Hero</h3>
                    <p
                        class="text-gray-300 text-center text-lg font-semibold">🖥️
                        Recommended play in desktop for best experience!</p>
                    <button onclick="play()"
                        class="btn cursor-pointer">Play Now!</button>
                </div>
                <!-- Loading -->
                <div
                    class="font-default font-semibold text-2xl text-white text-center hidden"
                    id="loading">
                    <div class="animate-bounce">️⚔️ 👆</div>
                    <p>Loading...</p>
                </div>

                <!-- Tutorial Container -->
                <div id="tutorial-container"
                    class="flex-col justify-center items-center gap-8 w-full hidden">
                    <h2 class="font-title text-white text-2xl font-bold">Welcome
                        to Click Hero!</h2>
                    <p
                        class="text-gray-300 text-lg/relaxed text-justify font-semibold">In
                        this game, your objective is to defeat the monster by
                        clicking the "ATTACK" button. Each click will
                        increase your score, and you can use your points to
                        upgrade your attack or enable auto-clicking. Upgrade
                        your attack to deal more damage with each click, or turn
                        on auto-clicking to automatically earn points over time.
                        Can you defeat the monster and reach the highest score?
                        Click now and start your adventure!</p>
                    <button onclick="start()"
                        class="btn cursor-pointer">Start Game</button>
                </div>

                <div id="game-container"
                    class="flex-col justify-center items-center gap-8 w-full hidden">
                    <!--Header Like Score and stage-->
                    <div id="gameHeaderContainer"
                        class="flex justify-center w-full">
                        <div
                            class="font-title text-2xl text-white text-center font-bold"><span
                                id="playerScore">0
                            </span></div>
                    </div>
                    <!-- Game Display -->
                    <div id="gameDisplayContainer"
                        class="flex flex-col justify-around items-center gap-4">
                        <h2 id="praiseText"
                            class="font-title text-white text-2xl font-bold"></h2>
                        <button onclick="clickHero()" id="hero-btn"
                            class="hero-button">👹 ATTACK</button>
                    </div>
                    <!--Choice Container-->
                    <div id="playerChoiceContainer"
                        class="flex flex-col md:flex-row gap-4 w-full">
                        <div onclick="upgradeATK()"
                            class="btn-sub w-full text-xl md:text-2xl cursor-pointer flex flex-col gap-2 items-center text-center">
                            <h2 id="atk-price">10</h2>
                            <h3>⚔️</h3>
                            <h4>Upgrade ATK <span id="atk-max">1/10</span></h4>
                        </div>
                        <div onclick="addAuto()"
                            class="btn-sub w-full text-xl md:text-2xl cursor-pointer flex flex-col gap-2 items-center">
                            <h2 id="auto-price">1000</h2>
                            <h3>👆</h3>
                            <h4>Auto Click <span
                                    id="auto-status">OFF</span></h4>
                        </div>
                    </div>

                    <!-- Finish Button -->
                    <div onclick="finish('click_hero')" id="finishBtn"
                        class="btn w-full text-xl md:text-2xl cursor-pointer flex-col gap-2 items-center text-center hidden">
                        <h2 id="finish">Finish Game</h2>
                    </div>
                </div>`,
    pokemon: `<!-- Title -->
                <div id="play-container"
                    class="flex flex-col items-center justify-center gap-4">
                    <h3
                        class="text-2xl font-title font-bold text-center text-white">Pokemon
                        Type Guess</h3>
                    <p
                        class="text-gray-300 text-center text-lg font-semibold">🖥️
                        Recommended play in desktop for best experience!</p>
                    <button onclick="play()"
                        class="btn cursor-pointer">Play Now!</button>
                </div>

                <!-- Loading -->
                <div
                    class="font-default font-semibold text-2xl text-white hidden"
                    id="loading">
                    <div class="animate-bounce">
                        <img src="./assets/images/pikachu.png" alt
                            class="w-32 h-32">
                    </div>
                    <p>Loading...</p>
                </div>

                <!-- Tutorial Container -->
                <div id="tutorial-container"
                    class="flex-col items-center justify-center gap-4 w-full max-w-xl text-center text-white hidden">
                    <h3 class="text-2xl font-title font-bold">How to Play?</h3>
                    <p class="text-gray-300 text-lg/relaxed text-justify">Guess
                        the type of the Pokemon shown. You have 5 lives and 5
                        stages to get as many correct as possible!</p>
                    <button onclick="start()"
                        class="btn cursor-pointer">Start Game</button>
                </div>

                <!-- Game Container -->
                <div id="game-container"
                    class="flex-col justify-center items-center gap-8 w-full hidden">
                    <div id="gameHeaderContainer"
                        class="flex flex-wrap items-center justify-between w-full px-4">
                        <div
                            class="font-title text-lg sm:text-xl text-white">Score:
                            <span id="playerScore">0</span></div>
                        <div
                            class="font-title text-lg sm:text-xl text-white"><span
                                id="stageDisplay">Stage: 1 / 5</span></div>
                        <div
                            class="font-title text-lg sm:text-xl text-white"><span
                                id="trialDisplay">Lives: 5</span>
                        </div>
                    </div>

                    <div id="hintText"
                        class="font-body text-sm text-center min-h-[20px] italic text-sub animate-pulse"></div>

                    <div id="gameDisplayContainer"
                        class="flex flex-col items-center gap-4 w-full bg-white/10 p-8 rounded-3xl border-4 border-white/20">
                        <div id="pokemonContainer"
                            class="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                            <img id="pokemonImage" src alt="Pokemon"
                                class="w-full h-full max-w-lg md:max-w-full object-contain transition-all duration-500">
                        </div>
                        <h2 id="pokemonName"
                            class="font-title text-xl md:text-3xl text-white tracking-widest uppercase">???</h2>
                    </div>

                    <div id="pokemonQuestionContainer">
                        <p class="text-white text-lg font-semibold">What type is this Pokemon?</p>
                    </div>

                    <div id="playerChoiceContainer"
                        class="grid grid-cols-3 md:grid-cols-5 gap-3 w-full max-w-2xl">
                    </div>
                </div>`,
    tetris: `<!-- Play Screen -->
                <div id="play-container" class="flex flex-col items-center justify-center gap-4">
                    <h3 class="text-2xl font-title font-bold text-center text-white">Tetris Hero</h3>
                    <p class="text-gray-300 text-center text-lg font-semibold">🖥️
                        Recommended play in desktop for best experience!</p>
                    <button onclick="play()" class="btn cursor-pointer">Play Now!</button>
                </div>

                <!-- Loading -->
                <div class="font-default font-semibold text-2xl text-white hidden text-center" id="loading">
                    <div class="animate-bounce mb-2">🧱 ⬛ 🧱</div>
                    <p>Loading...</p>
                </div>

                <!-- Tutorial Screen -->
                <div id="tutorial-container"
                     class="flex-col items-center justify-center gap-4 w-full max-w-xl text-center hidden">
                    <h3 class="text-2xl font-title font-bold text-sub">How to Play</h3>
                    <div class="text-gray-300 text-lg/relaxed space-y-2">
                        <p>1. Use <b>W</b> for rotate the block.</p>
                        <p>2. <b>A/D</b> for change position block.</p>
                        <p>3. <b>S</b> for make block drop faster.</p>
                        <p>4. <b>Space</b> for instant drop.</p>
                        <p>Clear the row for get the score!</p>
                    </div>
                    <button onclick="start()" class="btn cursor-pointer mt-4">Start Game!</button>
                </div>

                <!-- Game Active Screen -->
                <div id="game-container" class="flex-col md:flex-row justify-center items-start gap-8 w-full hidden">

                    <!-- Left: Info -->
                    <div class="flex flex-col gap-4 w-full md:w-48 order-2 md:order-1">
                        <div class="bg-white/10 p-4 rounded-2xl border border-white/5">
                            <p class="text-gray-400 text-sm font-bold uppercase">Score</p>
                            <p id="playerScore" class="text-3xl font-title font-bold text-sub">0</p>
                        </div>
                        <div class="bg-white/10 p-4 rounded-2xl border border-white/5">
                            <p class="text-gray-400 text-sm font-bold uppercase">Rows</p>
                            <p id="linesDisplay" class="text-3xl font-title font-bold text-white">0</p>
                        </div>
                        <div class="bg-white/10 p-4 rounded-2xl border border-white/5 text-center">
                            <p class="text-gray-400 text-sm font-bold uppercase mb-2">Next</p>
                            <canvas id="next-canvas" width="80" height="80"
                                    class="mx-auto bg-black/40 rounded-lg border border-white/10"
                                    style="image-rendering: pixelated;"></canvas>
                        </div>
                        <button onclick="finish('tetris')"
                                class="btn-sub bg-red-500/20 hover:bg-red-500/40 border-red-500/50">
                            End
                        </button>
                    </div>

                    <!-- Center: Board -->
                    <div class="relative order-1 md:order-2 mx-auto">
                        <canvas id="tetris-canvas" width="240" height="480"></canvas>

                        <!-- Game Over Overlay (Inside Canvas Container) -->
                        <div id="game-over-overlay"
                             class="absolute inset-0 bg-black/80 hidden flex-col items-center justify-center text-center p-4 rounded-xl">
                            <h2 class="text-3xl font-title font-bold text-red-500">GAME OVER</h2>
                            <p class="mb-4">Last Score: <span id="finalScore">0</span></p>
                            <button onclick="startTetris()" class="btn py-2 px-6">Play Again</button>
                        </div>
                    </div>

                    <!-- Right: Controls (Desktop Only) -->
                    <div class="hidden md:grid grid-cols-3 gap-2 w-auto order-3">
                        <div class="col-start-2">
                            <button onmousedown="handleTetrisControl('w')" class="control-btn w-full font-bold font-title">W</button>
                        </div>
                        <div class="col-start-1 row-start-2">
                            <button onmousedown="handleTetrisControl('a')" class="control-btn w-full font-bold font-title">A</button>
                        </div>
                        <div class="col-start-2 row-start-2">
                            <button onmousedown="handleTetrisControl('s')" class="control-btn w-full font-bold font-title">S</button>
                        </div>
                        <div class="col-start-3 row-start-2">
                            <button onmousedown="handleTetrisControl('d')" class="control-btn w-full font-bold font-title">D</button>
                        </div>
                        <div class="col-span-3 row-start-3 mt-1">
                            <button onmousedown="handleTetrisControl('space')"
                                    class="control-btn-main w-full font-bold font-title tracking-widest text-lg">
                                SPACE
                            </button>
                        </div>
                    </div>

                    <!-- FLOATING CONTROLS (Mobile Only) -->
                    <div class="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-sm z-[60] flex md:hidden flex-col gap-2">
                        <!-- W A S D Grid -->
                        <div class="grid grid-cols-3 gap-2">
                            <div class="col-start-2">
                                <button onmousedown="handleTetrisControl('w')" ontouchstart="handleTetrisControl('w'); event.preventDefault()" class="control-btn w-full font-bold font-title bg-white/10 backdrop-blur-md shadow-lg border border-white/20">W</button>
                            </div>
                            <div class="col-start-1 row-start-2">
                                <button onmousedown="handleTetrisControl('a')" ontouchstart="handleTetrisControl('a'); event.preventDefault()" class="control-btn w-full font-bold font-title bg-white/10 backdrop-blur-md shadow-lg border border-white/20">A</button>
                            </div>
                            <div class="col-start-2 row-start-2">
                                <button onmousedown="handleTetrisControl('s')" ontouchstart="handleTetrisControl('s'); event.preventDefault()" class="control-btn w-full font-bold font-title bg-white/10 backdrop-blur-md shadow-lg border border-white/20">S</button>
                            </div>
                            <div class="col-start-3 row-start-2">
                                <button onmousedown="handleTetrisControl('d')" ontouchstart="handleTetrisControl('d'); event.preventDefault()" class="control-btn w-full font-bold font-title bg-white/10 backdrop-blur-md shadow-lg border border-white/20">D</button>
                            </div>
                        </div>
                        <!-- Space Hard Drop -->
                        <button onmousedown="handleTetrisControl('space')" ontouchstart="handleTetrisControl('space'); event.preventDefault()" class="bg-main/90 hover:bg-main text-white w-full py-4 rounded-2xl shadow-lg shadow-main/30 font-bold font-title tracking-widest text-xl border-t border-white/20 active:scale-95 transition-all backdrop-blur-md">
                            SPACE (HARD DROP)
                        </button>
                    </div>
                </div>` ,
}

/*
* AppLayout Class
* This class will be responsible for rendering the common layout of the games, such as the header, sidebar, and modals.
*/
class AppLayout {

    #playerName;
    #activeGame;
    #gameName;

    constructor(playerName = 'Random Player') {
        this.#playerName = localStorage.getItem('playerName') || playerName;
        this.#activeGame = document.body.dataset.game;
        this.#gameName = "Rock Paper Scissors";

        this.renderTemplate();
    }

    renderTemplate() {
        const HEADER = document.getElementById('header-shared');
        const MODAL_NAME = document.getElementById('modal-shared');

        HEADER.innerHTML = `<div class="flex items-center gap-4 text-md md:text-xl">
                <div class="hamburger-btn" onclick="toggleSidebar('${this.#activeGame}')">
                    <i class="fa-solid fa-angles-right text-lg text-white"></i>
                </div>
            </div>

            <div id="sidebar"
                 class="fixed top-0 left-0 w-full md:w-64 h-screen bg-dark-bg border border-white/10 p-4 z-50 transform
                -translate-x-96 transition-all duration-300 ease-in-out">
                <div class="flex justify-between items-center">
                    <a href="./index.html" title="Home"
                       class="close-btn"><i
                            class="fa-solid fa-house"></i></a>
                    <div class="close-btn" onclick="toggleSidebar('${this.#activeGame}')">
                        <i class="fa-solid fa-angles-left text-lg text-white"></i>
                    </div>
                </div>
                <div id="sidebar-header" class="flex flex-col gap-2">
                    <!--List of Games and Player Names-->
                    <div onclick="clickShowNameModal()" class="flex justify-between gap-2 items-center text-xl cursor-pointer">
                        <h1 class="font-title font-bold cursor-pointer" id="playerName">Random Player</h1>
                        <i class="fa-solid fa-pencil"></i>
                    </div>

                    <div id="gamesList" class="flex flex-col gap-2">
                        <h2 class="text-lg font-title font-bold text-white">List Games</h2>
                        <div class="game-box">
                            <button id="nav-rps" onclick="navigateTo('rps')">✌️ RPS</button>
                            <button id="nav-click_hero" onclick="navigateTo('click_hero')">👆 Click Hero</button>
                            <button id="nav-pokemon" onclick="navigateTo('pokemon')">👹 Pokemon</button>
                            <button id="nav-tetris" onclick="navigateTo('tetris')">🟥 Tetris</button>
                        </div>
                    </div>
                </div>
                <div id="sidebar-content" class="flex flex-col mt-5">
                    <!--Leaderboard top 3-->
                    <div
                            class="flex items-center gap-2 font-bold text-yellow-500 text-[17px]">
                        <i class="fa-solid fa-trophy text-yellow-300"></i>
                        Leaderboards
                    </div>
                    <p id="gameName" class="text-[11px] text-yellow-500/70 font-semibold">'${this.#gameName}' · Top Players</p>

                    <div>
                        <!-- Rank List -->
                        <div id="lb-list"
                             class="max-h-48 overflow-y-auto divide-y divide-white/[0.04] p-4 list-none"></div>

                        <!-- Footer -->
                        <div class="px-4 py-3 border-t border-white/[0.06] text-center">
                            <p class="text-[11px] text-gray-500 font-semibold" id="latestRankInfo">

                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        MODAL_NAME.innerHTML = GAME_TEMPLATES['modal'];
    }

    // Set player name and store in localStorage, also update the display
    setPlayerName(playerName) {
        this.#playerName = playerName;
        localStorage.setItem('playerName', playerName);
        document.getElementById('playerName').textContent = playerName;
    }

    // Get player name
    getPlayerName() {
        return localStorage.getItem('playerName') || this.#playerName;
    }

    updateActiveLink(activeGameId) {
        // Hapus kelas aktif dari semua tombol navigasi
        document.querySelectorAll('.game-box button').forEach(btn => {
            btn.classList.remove('active-game');
        });

        this.#gameName = activeGameId === 'rps' ? 'Rock Paper Scissors' : activeGameId === 'click_hero' ? 'Click Hero' : activeGameId === 'pokemon' ? 'Pokemon Type Guess' : activeGameId === 'tetris' ? 'Tetris Hero' : 'Games';

        document.getElementById('gameName').textContent = `${this.#gameName} · Top Players`;

        // Tambahkan kelas aktif hanya ke game yang sedang dimainkan
        const activeBtn = document.getElementById(`nav-${activeGameId}`);
        if (activeBtn) {
            activeBtn.classList.add('active-game');
        }
    }
}

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

    getPlayerName() {
        return localStorage.getItem('playerName') || this.#playerName;
    }

    /**
     * Update the current score by adding the given score to it, and store the new score in localStorage.
     * Also update the display of the current score.
     * @param {number} score - The score to be added to the current score.
     */
    setScore(score) {
        this.#score += score;
        localStorage.setItem('score', this.#score);

        this.scoreDisplay.textContent = this.#score;
    }

    // Get current score
    getScore() {
        return this.#score;
    }

    // Reset score to 0 and update display, also remove score from localStorage
    resetScore() {
        this.#score = 0;
        localStorage.removeItem('score');
        this.scoreDisplay.textContent = this.#score;
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
        return this.leaderboard
            .filter(entry => entry.gameType === type)
            .sort((a, b) => b.score - a.score)
            .map(entry => `${entry.playerName}: ${entry.score}`)
            .join('\n');
    }


    /**
     * Retrieves and returns the leaderboard entries for a specific game type, sorted in descending order by score.
     * @param {string} type - The type of game for which to retrieve the leaderboard entries.
     * @returns {Array} An array of leaderboard entries for the specified game type, sorted by score in descending order.
     */
    getLeaderboardEntries(type) {
        const LEADERBOARD_ENTRIES = JSON.parse(localStorage.getItem('leaderboard')) || [];

        return LEADERBOARD_ENTRIES
            .filter(entry => entry.gameType === type)
            .sort((a, b) => b.score - a.score);
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
        LIST_CONTAINER.textContent = '';

        // Fetch leaderboard data
        const LB_DATA = this.getLeaderboardEntries(gameType);

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
            const NAME = this.escapeHTML(entry.playerName);
            const SCORE = this.escapeHTML(String(entry.score));

            const DIVISION = document.createElement('div');
            DIVISION.className = 'flex justify-between items-center gap-4 border-b border-white/20 py-2';
            DIVISION.innerHTML = `
                <span class="font-bold ${numberLb === 1 ? 'text-sub' : 'text-gray-400'}">${RANK}.</span>
                <div class="flex flex-col w-full">
                    <span class="text-md text-white font-bold">${NAME}</span>
                    <span class="text-sm font-semibold text-gray-400">${SCORE} pts</span>
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

    escapeHTML(str) {
        if (!str) return "";

        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    triggerConfetti() {
        const colors = ['#FF5733', '#FFC300', '#2ECC71', '#3498DB', '#9B59B6', '#E74C3C'];
        const count = 40;

        for (let i = 0; i < count; i++) {
            this.#createConfettiPiece(true, colors[Math.floor(Math.random() * colors.length)]);
            this.#createConfettiPiece(false, colors[Math.floor(Math.random() * colors.length)]);
        }
    }

    #createConfettiPiece(isLeft, color) {
        const piece = document.createElement('div');
        piece.className = 'confetti';
        piece.style.backgroundColor = color;
        piece.style.left = isLeft ? '0' : 'auto';
        piece.style.right = isLeft ? 'auto' : '0';
        piece.style.bottom = '0';

        // Variasi bentuk dan rotasi
        const isSquare = Math.random() > 0.5;
        piece.style.borderRadius = isSquare ? '2px' : '50%';
        piece.style.width = (Math.random() * 8 + 6) + 'px';
        piece.style.height = (Math.random() * 12 + 8) + 'px';

        // Animasi
        const duration = Math.random() * 2 + 2;
        piece.style.animation = `${isLeft ? 'confetti-fall-left' : 'confetti-fall-right'} ${duration}s ease-out forwards`;
        piece.style.animationDelay = (Math.random() * 0.5) + 's';

        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), (duration + 1) * 1000);
    }

    screenShake() {
        const target = this.containerGame || document.body;
        target.classList.add('animate-shake');
        setTimeout(() => target.classList.remove('animate-shake'), 500);
    }

    flashEffect(colorClass = 'bg-white') {
        const flash = document.createElement('div');
        flash.className = `fixed inset-0 ${colorClass} z-[100] pointer-events-none opacity-0 transition-opacity duration-150`;
        document.body.appendChild(flash);

        requestAnimationFrame(() => {
            flash.style.opacity = '0.4';
            setTimeout(() => {
                flash.style.opacity = '0';
                setTimeout(() => flash.remove(), 200);
            }, 100);
        });
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
        this.playerChoiceDisplay.textContent = this.CHOICES[playerChoice].choice;
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
            this.enemyChoiceDisplay.textContent = COMPUTER_CHOICE.choice;
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
            this.triggerConfetti();
            this.flashEffect();
        } else {
            // CASE: PLAYER LOSE
            this.playerContainer.classList.add("border-red-600");
            this.enemyContainer.classList.add("border-green-600");
            this.determineWin.textContent = "YOU LOSE😢";
            this.screenShake();
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
        this.enemyChoiceDisplay.textContent = '??';
        this.playerChoiceDisplay.textContent = '??';

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

            this.triggerConfetti(); // Efek milestone
            this.flashEffect();

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
            this.clickHero.currentAtkUp++;
            this.flashEffect('bg-yellow-400');

            localStorage.setItem('atk', JSON.stringify(this.clickHero.atk));
            localStorage.setItem('upPrice', JSON.stringify(this.clickHero.upPrice));

            this.atkUp.textContent = `${this.clickHero.currentAtkUp}/${MAX_ATK}`;

            if (this.clickHero.currentAtkUp >= MAX_ATK) {
                this.atkPriceDisplay.textContent = "MAX";
            } else {
                this.atkPriceDisplay.textContent = this.clickHero.upPrice;
            }
        } else {
            this.screenShake();
        }
    }


    /**
     * Check if player has enough score to buy auto click, if yes then reduce score by auto click price,
     * set auto click to true, save auto click status to localStorage,
     * and start auto click interval, also update auto click status display
     */
    addAuto() {
        const UP_PRICE = 1000; // Price for auto click

        if (!this.clickHero.auto && this.getScore() >= UP_PRICE) {
            this.setScore(-UP_PRICE);

            this.clickHero.auto = true;
            localStorage.setItem('auto', JSON.stringify(true));

            this.autoStatus.textContent = 'ON';
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

        this.atkUp.textContent = `${this.clickHero.atk}/10`;
        this.atkPriceDisplay.textContent = this.clickHero.upPrice;
        this.autoStatus.textContent = 'OFF';
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
            this.finish();
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
        this.choiceContainer.textContent = '';

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
            this.flashEffect('bg-green-400');

            // Delay before next stage
            setTimeout(async () => {
                // Check if stage clear or go to next stage with currentStage and maxStage
                if (this.pokemon.currentStage < this.pokemon.maxStage) {
                    this.pokemon.currentStage++;
                    const nextData = await this.guessPokemonType();
                    this.renderPokemonGame(nextData);
                } else {
                    // Game Clear Logic
                    this.triggerConfetti();
                    alert("CONGRATULATIONS! You cleared all stages!");
                    this.finish();
                }
            }, 1500);

        } else {
            // Wrong Answer Logic
            this.pokemon.trials--;
            this.screenShake();
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
        this.renderLeaderboard('pokemon');

        // Reset Pokemon game data
        this.pokemon.currentStage = 1;
        this.pokemon.currentData = null;
        this.resetScore();

        // Reset Pokemon image and name
        if (this.pokemonImg) {
            this.pokemonImg.src = '';
        }

        // Hide Game Container, Show Play Container
        this.containerGame.classList.toggle('hidden');
        this.containerGame.classList.toggle('flex');
        this.containerPlay.classList.remove('hidden');
    }
}

/*
* Tetris Class
* Implementasi logika game Tetris yang mewarisi class Games.
*/
class Tetris extends Games {
    constructor() {
        super();
        this.canvas = document.getElementById('tetris-canvas');
        if (this.canvas) {
            this.ctx = this.canvas.getContext('2d');
            this.ctx.scale(20, 20); // Scale up for 12x24 grid (240x480)
        }

        this.linesDisplay = document.getElementById('linesDisplay');
        this.gameOverOverlay = document.getElementById('game-over-overlay');

        this.nextCanvas = document.getElementById('next-canvas');
        if (this.nextCanvas) {
            this.nextCtx = this.nextCanvas.getContext('2d');
            this.nextCtx.scale(20, 20); // Scale up for 4x4 grid (80x80)
        }
        this.nextPiece = null;

        this.colors = [
            null,
            '#FF0D72', '#0DC2FF', '#0DFF72', '#F538FF', '#FF8E0D', '#FFE138', '#3877FF'
        ];

        this.player = {
            pos: { x: 0, y: 0 },
            matrix: null,
            score: 0,
            lines: 0
        };

        // Diperbarui dari createMatrix(12, 20) menjadi createMatrix(12, 24)
        // agar proporsi arena menyentuh bawah canvas berukuran 240x480
        this.arena = this.createMatrix(12, 24);
        this.dropCounter = 0;
        this.dropInterval = 1000;
        this.lastTime = 0;
        this.isPaused = false;
        this.gameId = null;
    }

    createMatrix(w, h) {
        const matrix = [];
        while (h--) {
            matrix.push(new Array(w).fill(0));
        }
        return matrix;
    }

    createPiece(type) {
        if (type === 'T') {
            return [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0],
            ];
        } else if (type === 'O') {
            return [
                [2, 2],
                [2, 2],
            ];
        } else if (type === 'L') {
            return [
                [0, 3, 0],
                [0, 3, 0],
                [0, 3, 3],
            ];
        } else if (type === 'J') {
            return [
                [0, 4, 0],
                [0, 4, 0],
                [4, 4, 0],
            ];
        } else if (type === 'I') {
            return [
                [0, 5, 0, 0],
                [0, 5, 0, 0],
                [0, 5, 0, 0],
                [0, 5, 0, 0],
            ];
        } else if (type === 'S') {
            return [
                [0, 6, 6],
                [6, 6, 0],
                [0, 0, 0],
            ];
        } else if (type === 'Z') {
            return [
                [7, 7, 0],
                [0, 7, 7],
                [0, 0, 0],
            ];
        }
    }

    // Hitung posisi bayangan (titik terendah block bisa turun)
    getGhostPos() {
        const ghost = {
            matrix: this.player.matrix,
            pos: { x: this.player.pos.x, y: this.player.pos.y }
        };
        // Turunkan bayangan sampai menabrak sesuatu
        while (!this.collide(this.arena, ghost)) {
            ghost.pos.y++;
        }
        // Naikkan satu langkah karena loop berhenti setelah menabrak
        ghost.pos.y--;
        return ghost.pos;
    }

    draw() {
        this.ctx.fillStyle = '#000'; // Latar belakang hitam dengan sedikit transparansi
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawMatrix(this.arena, { x: 0, y: 0 }, this.ctx);

        // Gambar bayangan putih transparan
        if (this.player.matrix) {
            const ghostPos = this.getGhostPos();
            this.drawGhost(this.player.matrix, ghostPos, this.ctx);
        }

        // Gambar pemain sesungguhnya
        this.drawMatrix(this.player.matrix, this.player.pos, this.ctx);
    }

    drawNext() {
        if (!this.nextCtx) return;
        this.nextCtx.fillStyle = '#000';
        this.nextCtx.fillRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);

        if (this.nextPiece) {
            const offset = {
                x: 2 - Math.floor(this.nextPiece[0].length / 2),
                y: 2 - Math.floor(this.nextPiece.length / 2)
            };
            this.drawMatrix(this.nextPiece, offset, this.nextCtx);
        }
    }

    drawMatrix(matrix, offset, context = this.ctx) {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    context.fillStyle = this.colors[value];
                    context.fillRect(x + offset.x, y + offset.y, 1, 1);
                    // Add subtle border to blocks
                    context.strokeStyle = 'rgba(0,0,0,0.3)';
                    context.lineWidth = 0.05;
                    context.strokeRect(x + offset.x, y + offset.y, 1, 1);
                }
            });
        });
    }

    // Logika gambar khusus untuk ghost piece
    drawGhost(matrix, offset, context = this.ctx) {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    // Warna putih transparan
                    context.fillStyle = 'rgba(255, 255, 255, 0.15)';
                    context.fillRect(x + offset.x, y + offset.y, 1, 1);
                    // Border sedikit lebih terang untuk memperjelas bentuknya
                    context.strokeStyle = 'rgba(255, 255, 255, 0.4)';
                    context.lineWidth = 0.05;
                    context.strokeRect(x + offset.x, y + offset.y, 1, 1);
                }
            });
        });
    }

    merge(arena, player) {
        player.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    arena[y + player.pos.y][x + player.pos.x] = value;
                }
            });
        });
    }

    collide(arena, player) {
        const [m, o] = [player.matrix, player.pos];
        for (let y = 0; y < m.length; ++y) {
            for (let x = 0; x < m[y].length; ++x) {
                if (m[y][x] !== 0 &&
                    (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
                    return true;
                }
            }
        }
        return false;
    }

    arenaSweep() {
        let swept = false;
        outer: for (let y = this.arena.length - 1; y > 0; --y) {
            for (let x = 0; x < this.arena[y].length; ++x) {
                if (this.arena[y][x] === 0) continue outer;
            }
            const row = this.arena.splice(y, 1)[0].fill(0);
            this.arena.unshift(row);
            ++y;
            this.player.score += 10;
            swept = true;
        }
        if (swept) {
            this.setScore(this.player.score - this.getScore());
            this.updateDifficulty();
            this.screenShake();
        }
    }

    updateDifficulty() {
        const score = this.getScore();
        // Tingkatkan kecepatan (kurangi interval turun) setiap kelipatan 50 skor.
        // Batas maksimal kecepatan (interval minimal) adalah 300ms.
        const speedIncrease = Math.floor(score / 50) * 50;
        this.dropInterval = Math.max(300, 1000 - speedIncrease);
    }

    playerDrop() {
        this.player.pos.y++;
        if (this.collide(this.arena, this.player)) {
            this.player.pos.y--;
            this.merge(this.arena, this.player);
            this.playerReset();
            this.arenaSweep();
        }
        this.dropCounter = 0;
    }

    // Menjatuhkan block langsung ke dasar (Hard Drop)
    playerHardDrop() {
        const ghostPos = this.getGhostPos();
        this.player.pos.y = ghostPos.y; // Pindahkan block ke posisi bayangan terbawah
        this.merge(this.arena, this.player);
        this.playerReset();
        this.arenaSweep();
        this.dropCounter = 0;
    }

    playerMove(dir) {
        this.player.pos.x += dir;
        if (this.collide(this.arena, this.player)) {
            this.player.pos.x -= dir;
        }
    }

    playerReset() {
        const pieces = 'ILJOTSZ';

        if (!this.nextPiece) {
            this.nextPiece = this.createPiece(pieces[pieces.length * Math.random() | 0]);
        }

        this.player.matrix = this.nextPiece;
        this.nextPiece = this.createPiece(pieces[pieces.length * Math.random() | 0]);
        this.drawNext();

        this.player.pos.y = 0;
        this.player.pos.x = (this.arena[0].length / 2 | 0) -
            (this.player.matrix[0].length / 2 | 0);

        if (this.collide(this.arena, this.player)) {
            this.gameOver();
        }
    }

    playerRotate(dir) {
        const pos = this.player.pos.x;
        let offset = 1;
        this.rotate(this.player.matrix, dir);
        while (this.collide(this.arena, this.player)) {
            this.player.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > this.player.matrix[0].length) {
                this.rotate(this.player.matrix, -dir);
                this.player.pos.x = pos;
                return;
            }
        }
    }

    rotate(matrix, dir) {
        for (let y = 0; y < matrix.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [
                    matrix[x][y],
                    matrix[y][x],
                ] = [
                        matrix[y][x],
                        matrix[x][y],
                    ];
            }
        }
        if (dir > 0) {
            matrix.forEach(row => row.reverse());
        } else {
            matrix.reverse();
        }
    }

    update(time = 0) {
        if (this.isPaused) return;

        const deltaTime = time - this.lastTime;
        this.lastTime = time;

        this.dropCounter += deltaTime;
        if (this.dropCounter > this.dropInterval) {
            this.playerDrop();
        }

        this.draw();
        this.gameId = requestAnimationFrame(this.update.bind(this));
    }

    start() {
        if (this.gameOverOverlay) this.gameOverOverlay.classList.add('hidden');
        this.arena.forEach(row => row.fill(0));
        this.player.score = 0;
        this.player.lines = 0;
        this.dropInterval = 1000;
        this.nextPiece = null;
        if (this.linesDisplay) this.linesDisplay.textContent = '0';
        this.isPaused = false;

        // Setup control event listener if it doesn't exist
        if (!this.keyboardInit) {
            document.addEventListener('keydown', event => {
                if (!this.containerGame.classList.contains('flex')) return;

                // Mencegah spasi melakukan scroll ke bawah pada halaman
                if (event.keyCode === 32) event.preventDefault();

                const key = event.key.toLowerCase();
                if (event.keyCode === 37 || key === 'a') this.playerMove(-1);
                else if (event.keyCode === 39 || key === 'd') this.playerMove(1);
                else if (event.keyCode === 40 || key === 's') this.playerDrop();
                else if (event.keyCode === 38 || key === 'w') this.playerRotate(1);
                else if (event.keyCode === 32 || key === ' ') this.playerHardDrop(); // Deteksi spasi
            });
            this.keyboardInit = true;
        }

        super.start();
        setTimeout(() => {
            this.playerReset();
            this.update();
        }, 2100);
    }

    gameOver() {
        this.isPaused = true;
        cancelAnimationFrame(this.gameId);

        const score = this.getScore();
        if (this.gameOverOverlay) {
            this.gameOverOverlay.classList.remove('hidden');
            this.gameOverOverlay.classList.add('flex');
            document.getElementById('finalScore').textContent = score;
        }

        const data = {
            gameType: 'tetris',
            playerName: this.getPlayerName(),
            score: score
        };
        this.setLeaderboard(data);
    }

    finish() {
        this.isPaused = true;
        cancelAnimationFrame(this.gameId);

        const data = {
            gameType: 'tetris',
            playerName: this.getPlayerName(),
            score: this.getScore()
        };
        this.setLeaderboard(data);

        if (this.containerGame) {
            this.containerGame.classList.remove('flex');
            this.containerGame.classList.add('hidden');
        }
        if (this.containerPlay) this.containerPlay.classList.remove('hidden');

        this.resetScore();
    }
}

// Render Layout
let layoutEngine;
let viewport;
let gameInstance;

// Init Games
const LOCAL_NAME = localStorage.getItem('playerName');

/**
 * Initializes the game by setting the player's name and hiding/showing the edit modal.
 * If the player's name is saved in local storage, the edit modal is hidden.
 * Otherwise, the edit modal is shown.
 */
function initGames() {
    const EDIT_MODAL = document.querySelector('.edit-modal');
    layoutEngine.setPlayerName(LOCAL_NAME || "Random Player");
    gameInstance.resetGame();

    if (LOCAL_NAME) {
        EDIT_MODAL.classList.add('hidden');
    } else {
        EDIT_MODAL.classList.remove('hidden');
    }
}

window.navigateTo = function (gameType) {
    document.body.dataset.game = gameType;
    viewport.innerHTML = GAME_TEMPLATES[gameType] || "<p>Coming Soon!</p>";
    switch (gameType) {
        case 'rps':
            gameInstance = new RPS(LOCAL_NAME);
            layoutEngine.updateActiveLink('rps');
            gameInstance.renderLeaderboard('rps');
            break;
        case 'click_hero':
            gameInstance = new ClickHero(LOCAL_NAME);
            layoutEngine.updateActiveLink('click_hero');
            gameInstance.renderLeaderboard('click_hero');
            break;
        case 'pokemon':
            gameInstance = new Pokemon(LOCAL_NAME);
            layoutEngine.updateActiveLink('pokemon');
            gameInstance.renderLeaderboard('pokemon');
            break;
        case 'tetris':
            gameInstance = new Tetris(LOCAL_NAME);
            layoutEngine.updateActiveLink('tetris');
            gameInstance.renderLeaderboard('tetris');
            break;
        default:
            gameInstance = new RPS(LOCAL_NAME);
            layoutEngine.updateActiveLink('rps');
            gameInstance.renderLeaderboard('rps');
            break;
    }
}

window.onload = () => {
    viewport = document.getElementById('game-viewport');
    layoutEngine = new AppLayout(LOCAL_NAME);
    navigateTo('rps');
    initGames();

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

    if (!NAME || NAME.trim() === '') {
        alert('Please enter a valid name');
        return;
    }

    layoutEngine.setPlayerName(NAME);
    clickShowNameModal();

    e.preventDefault();
}

function toggleSidebar(gameType) {
    const SIDEBAR = document.getElementById('sidebar');
    const MAIN_CONTENT = document.getElementById('main-content');
    const FOOTER = document.getElementById('footer');

    SIDEBAR.classList.toggle('-translate-x-96');
    // SIDEBAR.classList.toggle('hidden');
    SIDEBAR.classList.toggle('translate-x-0');

    if (MAIN_CONTENT) {
        if (SIDEBAR.classList.contains('translate-x-0')) {
            MAIN_CONTENT.classList.add('md:ms-64');
            FOOTER.classList.add('md:ms-64');
        } else {
            MAIN_CONTENT.classList.remove('md:ms-64');
            FOOTER.classList.remove('md:ms-64');
        }
    }

    gameInstance.renderLeaderboard(gameType);
}

// Games Trigger Section

function play() {
    gameInstance.play();
}

function start() {
    gameInstance.start();
}

function finish(gameType) {
    gameInstance.finish();
    gameInstance.renderLeaderboard(gameType);
}

// RPS Section

function rps(choice) {
    gameInstance.rps(choice);
}

// Click Hero

function clickHero() {
    gameInstance.clicked();
}

function upgradeATK() {
    gameInstance.upgradeAtk();
}

function addAuto() {
    gameInstance.addAuto();
}

// Tetris Section

function handleTetrisControl(action) {
    if (action === 'a') gameInstance.playerMove(-1);
    if (action === 'd') gameInstance.playerMove(1);
    if (action === 's') gameInstance.playerDrop();
    if (action === 'w') gameInstance.playerRotate(1);
    if (action === 'space') gameInstance.playerHardDrop();
}