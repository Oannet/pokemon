let searchHistory = []; // Arreglo para almacenar el historial de búsquedas

/**
 * Función asincrónica para obtener los datos del Pokémon desde la API de PokeAPI.
 * Limpia la información mostrada antes de realizar una nueva búsqueda.
 * @param string pokemonNameOrId - Nombre o ID del Pokémon a buscar. 
 */
async function fetchPokemon(pokemonNameOrId = null) {
    const inputElement = document.getElementById('pokemonInput');
    pokemonNameOrId = pokemonNameOrId || inputElement.value.toLowerCase().trim();
    if (!pokemonNameOrId) {
        alert('Por favor, ingresa un nombre o ID válido.');
        return;
    }

    document.getElementById('pokemonInfo').innerHTML = '<p>Cargando...</p>'; 

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

/**
 * Muestra la información completa del Pokémon en el contenedor designado.
 * @param {Object} pokemon - Objeto que contiene los datos del Pokémon obtenidos de la API.
 */
function displayPokemonInfo(pokemon) {
    const pokemonContent = `
        <h2>${pokemon.name} (ID: ${pokemon.id})</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p>Types: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
        <p>Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
    `;
    document.getElementById('pokemonInfo').innerHTML = pokemonContent;
}

/**
 * Actualiza el historial de búsquedas con el nombre o ID del Pokémon buscado.
 * Si el Pokémon ya está en el historial, no se añade de nuevo.
 * Se limita a mantener solo las últimas 5 búsquedas.
 * @param string pokemonName - Nombre o ID del Pokémon buscado.
 */
function updateSearchHistory(pokemonName) {
    if (!searchHistory.includes(pokemonName)) { // Evitar duplicados en el historial
        searchHistory.unshift(pokemonName); 
        if (searchHistory.length > 5) {
            searchHistory.pop(); // Mantener solo las últimas 5 búsquedas
        }
        displaySearchHistory();
    }
}

/**
 * Muestra el historial de búsquedas en una lista interactiva.
 * Cada elemento del historial es clickable y permite realizar nuevamente la búsqueda del Pokémon.
 */
function displaySearchHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = searchHistory.map(item =>
        `<li onclick="fetchPokemon('${item}')">${item}</li>`
    ).join(''); // Generar elementos interactivos de historial
}

/**
 * Limpia toda la información mostrada del Pokémon y vacía el historial de búsquedas.
 */
function clearAll() {
    // Limpiar la información del Pokémon
    document.getElementById('pokemonInfo').innerHTML = '';

    // Limpiar el historial de búsquedas
    searchHistory = [];
    displaySearchHistory(); 
}

document.getElementById('searchBtn').addEventListener('click', () => fetchPokemon());
