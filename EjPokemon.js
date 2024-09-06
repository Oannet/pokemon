let searchHistory = []; // Agregue: Arreglo para almacenar las últimas 5 búsquedas

// Función asincrónica para obtener los datos del Pokémon
async function fetchPokemon() {
    const pokemonNameOrId = document.getElementById('pokemonInput').value.toLowerCase().trim();
    if (!pokemonNameOrId) {
        alert('Por favor, ingresa un nombre o ID válido.');
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`);
        if (!response.ok) {
            throw new Error('Pokémon no encontrado');
        }
        const data = await response.json();
        displayPokemonInfo(data);
        updateSearchHistory(pokemonNameOrId); // Agregue: Actualiza el historial con la nueva búsqueda
    } catch (error) {
        document.getElementById('pokemonInfo').innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

// Función para mostrar el nombre, ID, tipos, habilidades y la imagen del Pokémon en la página
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
function updateSearchHistory(searchTerm) {
    searchHistory.unshift(searchTerm); // Agregue: Añadir la nueva búsqueda al inicio del historial
    if (searchHistory.length > 5) {
        searchHistory.pop(); // Agregue: Mantener solo las últimas 5 búsquedas
    }
    displaySearchHistory();
}

// Función para mostrar el historial de búsquedas
function displaySearchHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = ''; // Modifique: Limpiar el contenido actual
    searchHistory.forEach(item => {
        let listItem = document.createElement('li');
        listItem.textContent = item;
        historyList.appendChild(listItem); // Modifique: Añadir cada búsqueda al historial
    });
}

// Agregar el evento al botón de búsqueda
document.getElementById('searchBtn').addEventListener('click', fetchPokemon);
