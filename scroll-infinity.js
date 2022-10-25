let pagina = 1;
// muevo la variable afuera de la funcion para que no se ejecute cuando llamo la variable sino solo al inicio
let peliculas ='';
let ultimaPelicula;


// observador
let observador = new IntersectionObserver((entradas, observador) => {
    console.log(entradas);

    entradas.forEach((entrada) => {
        if(entrada.isIntersecting){
            pagina++;
            cargarPeliculas();
        }
    });
},{
    // ese margen de 200 es para que cargue antes que llegue toda la imagen
    rootMargin: '0px 0px 200px 0px',
    threshold: 1.0
});
// mi llave
// https://api.themoviedb.org/3/movie/550?api_key=bdca47f471cc599ed2ebc1b112b36f96

const cargarPeliculas = async () => {
    try{
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=bdca47f471cc599ed2ebc1b112b36f96&language=es-CO&page=${pagina}`);
        console.log(respuesta);
        if (respuesta.status === 200){
            const datos = await respuesta.json();
            console.log('populares')
            console.log(datos.results); 
            datos.results.forEach(pelicula => {
                peliculas += `
                    <div class="pelicula">
                        <img class=poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}"/>
                        <h3 class="titulo" >${pelicula.title}</h3>
                    </div>
                `;
            });
            // escribe los nodos en el html
            document.getElementById('contenedor').innerHTML = peliculas;

            // para que solo sean 1000 paginas
            if(pagina < 1000){
                // condicional para que no sean muchos observadores sino que elimine el anterior si es que lo hay
                if(ultimaPelicula){
                    observador.unobserve(ultimaPelicula);
                }
                // selecciono todas las peliculas que estan en pantalla
                const peliculasEnPantalla = document.querySelectorAll('.contenedor .pelicula');
                // selecciono ultima pelicula
                ultimaPelicula = peliculasEnPantalla[peliculasEnPantalla.length - 1];
                // aplico el metodo de observador
                observador.observe(ultimaPelicula);
                // presentamos una dificultad que se soluciona con css que es que muestra la imagen al inicio pero al definirle un minimo de height se soluciona el error
            }
        }else if(respuesta.status === 401){
            console.log('pusiste tu llave mal')
        }else if(respuesta.status === 404){
            console.log('la pelicula ya no esta')
        }else{
            console.log('algo paso vuelve pronto mientras lo solucionamos')
        }
    }catch(error){
        console.log(error);
    }
}
cargarPeliculas();