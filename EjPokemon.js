let searchHistory = []; // Arreglo para almacenar el historial de búsquedas

// Función asincrónica para obtener los datos del Pokémon y limpiar la información antes de la nueva búsqueda
async function fetchPokemon(pokemonNameOrId = null) {
    const inputElement = document.getElementById('pokemonInput');
    pokemonNameOrId = pokemonNameOrId || inputElement.value.toLowerCase().trim();
    if (!pokemonNameOrId) {
        alert('Por favor, ingresa un nombre o ID válido.');
        return;
    }

    // Mostrar mensaje de carga antes de la nueva búsqueda
    document.getElementById('pokemonName').textContent = 'Cargando...';
    document.getElementById('pokemonId').textContent = '';
    document.getElementById('pokemonTypes').textContent = '';
    document.getElementById('pokemonAbilities').textContent = '';
    document.getElementById('pokemonImage').src = ''; // Limpiar imagen

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`);
        if (!response.ok) {
            throw new Error('Pokémon no encontrado');
        }
        const data = await response.json();
        displayPokemonInfo(data); // Mostrar la información del nuevo Pokémon Modifiqué para usar displayPokemonInfo en lugar de displayPokemonImage
        updateSearchHistory(pokemonNameOrId); // Actualiza el historial de búsqueda
    } catch (error) {
        document.getElementById('pokemonName').textContent = `Error: ${error.message}`;
    }
}

// Función para mostrar el nombre, ID, tipos, habilidades y la imagen del Pokémon
function displayPokemonInfo(pokemon) {
    document.getElementById('pokemonName').textContent = pokemon.name;
    document.getElementById('pokemonId').textContent = `ID: ${pokemon.id}`;
    document.getElementById('pokemonImage').src = pokemon.sprites.front_default;
    document.getElementById('pokemonImage').alt = pokemon.name;

    const types = pokemon.types.map(type => type.type.name).join(', ');
    document.getElementById('pokemonTypes').textContent = `Types: ${types}`;

    const abilities = pokemon.abilities.map(ability => ability.ability.name).join(', ');
    document.getElementById('pokemonAbilities').textContent = `Abilities: ${abilities}`;
}

// Función para actualizar el historial de búsquedas
function updateSearchHistory(pokemonName) {
    if (!searchHistory.includes(pokemonName)) { // Evitar duplicados en el historial
        searchHistory.unshift(pokemonName); // Agregar al inicio del array
        if (searchHistory.length > 5) {
            searchHistory.pop(); // Mantener solo las últimas 5 búsquedas
        }
        displaySearchHistory();
    }
}

// Función para mostrar el historial de búsquedas
function displaySearchHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = searchHistory.map(item =>
        `<li onclick="fetchPokemon('${item}')">${item}</li>`
    ).join(''); // Generar elementos interactivos de historial
}

// Función para limpiar la información del Pokémon y el historial
function clearAll() {
    // Limpiar la información del Pokémon
    document.getElementById('pokemonName').textContent = '';
    document.getElementById('pokemonId').textContent = '';
    document.getElementById('pokemonTypes').textContent = '';
    document.getElementById('pokemonAbilities').textContent = '';
    document.getElementById('pokemonImage').src = ''; // Limpiar imagen

    // Limpiar el historial de búsquedas
    searchHistory = [];
    displaySearchHistory(); // Refrescar el historial vacío
}

// Agregar el evento al botón de búsqueda
document.getElementById('searchBtn').addEventListener('click', () => fetchPokemon());
