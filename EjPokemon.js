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

        // Mostrar solo la imagen del Pokémon en la página
        displayPokemonImage(data);

    } catch (error) {
        // Manejar errores (como si el Pokémon no existe)
        document.getElementById('pokemonInfo').innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

// Función para mostrar solo la imagen del Pokémon en la página
function displayPokemonImage(pokemon) {
    const pokemonInfoDiv = document.getElementById('pokemonInfo');
    
    // Crear el contenido HTML con la imagen del Pokémon
    const pokemonHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    `;
    
    // Insertar la imagen en el div
    pokemonInfoDiv.innerHTML = pokemonHTML;
}

// Agregar el evento al botón de búsqueda
document.getElementById('searchBtn').addEventListener('click', fetchPokemon);
