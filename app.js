let pagina = 1;

const btnAnterior = document.getElementById('anterior');
const btnSiguiente = document.getElementById('siguiente');

btnSiguiente.addEventListener('click', () => {
    if( pagina < 1000 ){ 
        pagina += 1;
        cargarPeliculas();
    }
});
btnAnterior.addEventListener('click', ()=>{
    if(pagina > 1){
    pagina -= 1;
    cargarPeliculas();
    }
});



// mi llave
// https://api.themoviedb.org/3/movie/550?api_key=bdca47f471cc599ed2ebc1b112b36f96

const cargarPeliculas = async () => {
    // cuando se trabaja con funciones asincronas lo recomendable es envolver el codigo en try catch
    try{
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=bdca47f471cc599ed2ebc1b112b36f96&language=es-CO&page=${pagina}`);
        console.log(respuesta);

        // si la respuesta es correcta
        if (respuesta.status === 200){
            // en datos almacena el json  creado desde la variable respuesta 
            const datos = await respuesta.json();
            // console.log(datos.title); muestra solo el titulo
            console.log('populares')
            console.log(datos.results); //results es 1 de los 4 querys de la app
        
            // ESTEES ES EL CODIGO QUE VA A IMPRIMIR LOS RESULTADOS
            // texto vacio que tendra las imagenes
            let peliculas ='';
            // ciclo para todas recorrer el array con las peliculas
            datos.results.forEach(pelicula => {
                peliculas += `
                    <div class="pelicula">
                        <img class=poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}"/>
                        <h3 class="titulo" >${pelicula.title}</h3>
                    </div>
                `;
            });
            // impresion en html del ciclo
            document.getElementById('contenedor').innerHTML = peliculas;
        
            // 

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