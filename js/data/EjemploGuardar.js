export class EjemploGuardar {
    // Para almacenamiento local.

    // Atributo estatico para guardar la clave de localStorage, asi no tenemos que escribirla cada vez
    static KEY = "mis_pokemon";

    // Metodo estatico para no tener que estar instansiando la clase cada vez que queramos usarlo
    // Tipo patron de diseño singleton, solo una instancia de la clase
    static guardarPokemones(pokemones) {
        // Hay que asegurarse que lo de pokemones sea texto>
        localStorage.setItem(this.KEY, JSON.stringify(pokemones)); // JSON.stringify convierte un objeto o array a un string.
    }

    static obtenerPokemones() {
        // Aqui lo que recupera es un String
        const datos = localStorage.getItem(this.KEY);
        return datos ? JSON.parse(datos) : [] // Si no hay datos, devuelve un array vacio
    }; // fin metodo

} // fin clase