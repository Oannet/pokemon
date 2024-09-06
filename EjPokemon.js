// Función asincrónica para obtener los datos del Pokémon
async function fetchPokemon() {
    // Obtener el valor del campo de entrada
    const pokemonNameOrId = document.getElementById('pokemonInput').value.toLowerCase().trim();

    // Verificar que el campo no esté vacío
    if (!pokemonNameOrId) {
        alert('Por favor, ingresa un nombre o ID válido.');
        return;
    }

    try {
        // Realizar la solicitud a la API de Pokémon
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`);
        
        // Verificar si la solicitud fue exitosa
        if (!response.ok) {
            throw new Error('Pokémon no encontrado');
        }

        // Convertir la respuesta en JSON
        const data = await response.json();

        // Mostrar el nombre, ID, tipos y la imagen del Pokémon en la página
        displayPokemonInfo(data); // Modifiqué para usar displayPokemonInfo en lugar de displayPokemonImage

    } catch (error) {
        // Manejar errores (como si el Pokémon no existe)
        document.getElementById('pokemonInfo').innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

// Función para mostrar el nombre, ID, tipos y la imagen del Pokémon en la página
function displayPokemonInfo(pokemon) {
    const pokemonInfoDiv = document.getElementById('pokemonInfo');

    // Actualizo los elementos directamente para nombre, ID, tipos e imagen
    document.getElementById('pokemonName').textContent = pokemon.name; // Modifique para mostrar el nombre
    document.getElementById('pokemonId').textContent = `ID: ${pokemon.id}`; // Modifiqué para mostrar el ID
    document.getElementById('pokemonImage').src = pokemon.sprites.front_default; // Modifiqué para usar src para la imagen
    document.getElementById('pokemonImage').alt = pokemon.name; // Modifiqué para agregar un alt con el nombre del Pokémon

    // Añadir tipos de Pokémon
    const types = pokemon.types.map(type => type.type.name).join(', '); // Agregue para obtener los tipos
    document.getElementById('pokemonTypes').textContent = `Types: ${types}`; // Agregue para mostrar los tipos
}

// Agregar el evento al botón de búsqueda
document.getElementById('searchBtn').addEventListener('click', fetchPokemon);
