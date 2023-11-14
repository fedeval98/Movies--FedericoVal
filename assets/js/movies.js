//Captura de elementos del HTML
const selectGenres = document.getElementById("selectgenres")
const moviesContenedor = document.getElementById("divMovies")
const verMas = "Ver más"
const detailsContainer = document.getElementById("movieDetails")
const searchInput = document.getElementById("searchInput")
const buttonClear = document.getElementById("clear")


//Importando las variables para ejecutar la funcion
import {movies} from './data.js'
import {
  introducirCard, 
  crearOptions, 
  crearElementosDelCard,
  filtrarPorTituloCaseInsensitive,
  limpiarContenedor,
  introducirPeliculasEnContenedor,
  destructureMovies,
  genresList,
  manejarCambioSelect,
}from '../js/module/functions.js'
//Ejecucion de la funcion para darle valores por argumento a las cards y que las cree
introducirCard(movies, moviesContenedor, crearElementosDelCard)

const listOfGenres = genresList(destructureMovies(movies))
crearOptions(listOfGenres, selectGenres)

selectGenres.addEventListener('change', () => {
  manejarCambioSelect(movies, selectGenres, searchInput, moviesContenedor)
})
searchInput.addEventListener('keyup', () => {
    const filtroTitulo = filtrarPorTituloCaseInsensitive(movies, searchInput.value)
    limpiarContenedor(moviesContenedor)
    introducirPeliculasEnContenedor(filtroTitulo, moviesContenedor)
  })

buttonClear.addEventListener('click',()=>{
  selectGenres.value = ""
  searchInput.value = ""
  limpiarContenedor(moviesContenedor)
  introducirCard(movies, moviesContenedor, crearElementosDelCard)
})

