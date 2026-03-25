const btnBuscar = document.getElementById('btnBuscar');
const inputNombrePokemon = document.getElementById('pokemonName');
const sectionInfoPokemon = document.getElementById('infoPokemon');

btnBuscar.addEventListener('click', () => {
    buscarPokemon(inputNombrePokemon.value.toLowerCase());
});

async function buscarPokemon(nombre) {
    sectionInfoPokemon.innerHTML = '<p>Buscando Pokémon...</p>';
    document.body.removeAttribute('data-tipo');

    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        if (!respuesta.ok) {
            throw new Error('Pokémon no encontrado');
        }
        const datos = await respuesta.json();
        mostrarInfoPokemon(datos);
    } catch (error) {
        sectionInfoPokemon.innerHTML = '<p>Ocurrió un error al buscar el Pokémon.</p>';
    }
}

function mostrarInfoPokemon(datos) {
    const tipo = datos.types[0].type.name;

    document.body.setAttribute('data-tipo', tipo);

    sectionInfoPokemon.innerHTML = `
        <div>
            <img src="${datos.sprites.other['official-artwork'].front_default}" alt="${datos.name}">
            <h2>${datos.name}</h2>
            <h2>Tipo: ${datos.types.map(tipo => tipo.type.name).join(', ')}</h2>
            <h3>Atributos:</h3>
            <h3>${datos.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ')}</h3>
        </div>
    `
} // Las funciones NO terminan en ;

