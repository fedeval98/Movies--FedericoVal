import {movies} from './data.js'
import { 
  introducirCard,
  crearElementosDelCard,
  crearTablaDetails,
  crearElementosDetails,
} from './module/functions.js'
const search = location.search

const params = new URLSearchParams(search)

const id = params.get('id')

const movieid =  movies.find(movie => movie.id == id)

// Contenedor de las peliculas
const detailsContainer = document.getElementById("movieDetails")
const tabla1 = document.getElementById("datos1")
const tabla2 = document.getElementById("datos2")
// Tabla 1
const propiedadesTabla1 = ["original_language", "release_date", "runtime", "status"]
introducirCard(movieid, detailsContainer,crearElementosDetails)
crearTablaDetails(movieid, propiedadesTabla1, tabla1)


// Tabla 2
const propiedadesTabla2 = ["vote_average", "budget", "revenue"]
crearTablaDetails(movieid, propiedadesTabla2, tabla2)