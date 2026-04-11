class Games {
    constructor(playerName) {
        this.playerName = playerName;
        this.playerName = localStorage.getItem('playerName') || this.playerName;
        this.score = 0;
    }

    setPlayerName(playerName) {
        this.playerName = playerName;
        localStorage.setItem('playerName', playerName);
        document.getElementById('playerName').textContent = playerName;
    }

    // Rock Paper Scissors Game Section
    rps(playerChoice) {
        const choices = ['rock', 'paper', 'scissors'];
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    }

    playRps() {
        const CONTAINER_RPS = document.getElementById('rps-container');
        CONTAINER_RPS.innerHTML = `
                <div class="font-default font-semibold text-2xl text-white" id="loading">
                    <div class="animate-bounce">✌️ 🤚 ✊</div>
                    <p>Loading...</p>
                </div>
            `
    }

    // Click Hero Game Section
    clickHero() {

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
        this.score++;
        localStorage.setItem('score', this.score);
    }

    // Other Section
    finishGame() {
        this.score = 0;
        localStorage.removeItem('score');
    }
}

let games;

if (localStorage.getItem('playerName'))  {
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

//Play Function
function playRps() {
    games.playRps();
}