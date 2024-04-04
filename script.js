
async function fetchPokemonData(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error('Pokemon not found');
        }
        const pokemonData = await response.json();
        return pokemonData;
    } catch (error) {
        console.error('Error fetching Pokemon data:', error);
    }
}


async function displayPokemonDetails(pokemonName, cardId) {
    const pokemonData = await fetchPokemonData(pokemonName);

    const card = document.getElementById(cardId);
    card.querySelector('h3').textContent = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
    card.querySelector('img').src = pokemonData.sprites.front_default;
    card.querySelector('img').alt = pokemonData.name;
    card.querySelector('p:nth-of-type(1) span').textContent = pokemonData.height;
    card.querySelector('p:nth-of-type(2) span').textContent = pokemonData.weight;
}

async function populateDropdowns() {
    const dropdowns = document.querySelectorAll('.pokemon-select');
    dropdowns.forEach(async dropdown => {

        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const data = await response.json();
        const pokemons = data.results;

        pokemons.forEach(pokemon => {
            const option = document.createElement('option');
            option.value = pokemon.name;
            option.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); 
            dropdown.appendChild(option);
        });
    });
}


document.querySelectorAll('.pokemon-select').forEach(dropdown => {
    dropdown.addEventListener('change', function() {
        const selectedPokemon = this.value;
        if (!selectedPokemon) return;
        const cardId = this.dataset.card;
        displayPokemonDetails(selectedPokemon, cardId);
    });
});


populateDropdowns();



async function fetch150PokemonList() {

    try {
    
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=150');
    
    const data = await response.json();
    
    return data.results;
    
    } catch (error) {
    
    console.log(error);
    
    }
    
    }