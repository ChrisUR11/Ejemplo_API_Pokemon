import { EjemploGuardar } from './js/data/EjemploGuardar.js';


const btnBuscar = document.getElementById('btnBuscar');
const btnGuardar = document.getElementById('btnGuardar');
const btnLeer = document.getElementById('btnLeer');
const inputNombrePokemon = document.getElementById('pokemonName');
const sectionInfoPokemon = document.getElementById('infoPokemon');

btnBuscar.addEventListener('click', () => {
    buscarPokemon(inputNombrePokemon.value.toLowerCase());
});

btnGuardar.addEventListener('click', () => {
    const pokemones = [{ nombre: 'Pikachu', nivel: 10 }, { nombre: 'Charmander', nivel: 15 }];
    EjemploGuardar.guardarPokemones(pokemones);
    alert('Pokemones guardados');
});

btnLeer.addEventListener('click', () => {
    const pokemones = EjemploGuardar.obtenerPokemones(); // Aqui tenemos JSON
    alert(pokemones[0].nombre); // Pikachu
    let datos_pokemones = '';
    pokemones.forEach(p => {
        datos_pokemones += `Nombre: ${p.nombre}, Nivel: ${p.nivel}\n`;
    });
    alert(datos_pokemones);
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
            <h3>Atributos: \n ${datos.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ')}</h3>
        </div>
    `
} // Las funciones NO terminan en ;

