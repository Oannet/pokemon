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
    document.getElementById('pokemonInfo').innerHTML = '<p>Cargando...</p>'; // Mostrar mensaje de carga

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`);
        if (!response.ok) {
            throw new Error('Pokémon no encontrado');
        }
        const data = await response.json();
        displayPokemonInfo(data); // Mostrar la información del nuevo Pokémon
        updateSearchHistory(pokemonNameOrId); // Actualiza el historial de búsqueda
    } catch (error) {
        document.getElementById('pokemonInfo').innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

// Función para mostrar toda la información del Pokémon en un único <div>
function displayPokemonInfo(pokemon) {
    const pokemonContent = `
        <h2>${pokemon.name} (ID: ${pokemon.id})</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p>Types: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
        <p>Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
    `;
    document.getElementById('pokemonInfo').innerHTML = pokemonContent;
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
    document.getElementById('pokemonInfo').innerHTML = '';

    // Limpiar el historial de búsquedas
    searchHistory = [];
    displaySearchHistory(); // Refrescar el historial vacío
}

// Agregar el evento al botón de búsqueda
document.getElementById('searchBtn').addEventListener('click', () => fetchPokemon());
