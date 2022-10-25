// metodo con PROMSESAS

// axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=bdca47f471cc599ed2ebc1b112b36f96&language=es-CO`)
//     .then((res) =>{
        // res es la respuesta de la peticion, pero ahora el agregar el data solo basta con hacer el .data y para ver cualquier elemento interno solo es agregar el atributo con el punto, ejmp res.data.result
    //     console.log(res.data)
    // })
    // .catch(err => console.log(err))

// ahora con ASYNC
let pagina = 1;
let peliculas ='';
let ultimaPelicula;
// observador
let observador = new IntersectionObserver((entradas, observador) => {
    console.log(entradas);

    entradas.forEach((entrada) => {
        if(entrada.isIntersecting){
            pagina++;
            obtenerPeliculas();
        }
    });
},{
    rootMargin: '0px 0px 200px 0px',
    threshold: 1.0
});

const obtenerPeliculas = async () => {
    try{
        const respuesta = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
            params:{
                // api_key: 'bdca47f471cc599ed2ebc1b112b36f96',
                language: 'es-CO',
                page: pagina
            },
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZGNhNDdmNDcxY2M1OTllZDJlYmMxYjExMmIzNmY5NiIsInN1YiI6IjYzMDE1MDE4MWRhN2E2MDBhNGNlMTM2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D8rKIWXP9p4EJxYdtOV3jR3TN-tFEMFGApIbtDumNm8',
            },
        });
        console.log(respuesta);
        if (respuesta.status === 200){

            // ya esta linea no es necesaria sino que se omite este paso y se entiende que ya respuesta contiene a datos, y de una vez se agrega respuesta en el forEach
            // const datos = await respuesta.json();
            console.log('populares')
            console.log(respuesta.data.results); 
            // llamo aqui a respuesta.data !!!atencion que ya no es datos porque esa variable nunca se definio ya que no se hizo el paso anterior
            respuesta.data.results.forEach(pelicula => {
                peliculas += `
                    <div class="pelicula">
                        <img class=poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}"/>
                        <h3 class="titulo" >${pelicula.title}</h3>
                    </div>
                `;
            });
            document.getElementById('contenedor').innerHTML = peliculas;
            if(pagina < 1000){
                if(ultimaPelicula){
                    observador.unobserve(ultimaPelicula);
                }
                const peliculasEnPantalla = document.querySelectorAll('.contenedor .pelicula');
                ultimaPelicula = peliculasEnPantalla[peliculasEnPantalla.length - 1];
                observador.observe(ultimaPelicula);
            }
        }else if(respuesta.status === 401){
            console.log('pusiste tu llave mal')
        }else if(respuesta.status === 404){
            console.log('la pelicula ya no esta')
        }else{
            console.log('algo paso vuelve pronto mientras lo solucionamos')
        }
    } catch(error){
        console.log(error);
    }
}
obtenerPeliculas();
