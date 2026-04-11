class Games {
    constructor(playerName) {
        this.playerName = playerName;
        this.playerName = localStorage.getItem('playerName') || this.playerName;
        this.score = 0;
    }

    rps(playerChoice) {
        const choices = ['rock', 'paper', 'scissors'];
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    }

    clickHero() {

    }

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
}

let games;

if (localStorage.getItem('playerName'))  {
    games = new Games(localStorage.getItem('playerName'));
} else {
    games = new Games('Random Player');
}

const playerName = document.getElementById('playerName');
playerName.textContent = games.playerName;

console.log(games.guessPokemonType());