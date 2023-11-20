//Captura de elementos del HTML
const selectGenres = document.getElementById("selectgenres")
const moviesContenedor = document.getElementById("divMovies")
const searchInput = document.getElementById("searchInput")
const buttonClear = document.getElementById("clear")

//Importando las variables para ejecutar la funcion
import {
  introducirCard, 
  crearOptions, 
  crearElementosDelCard,
  destructureMovies,
  genresList,
  manejarCambioSelect,
  sortArray,

}from '../js/module/functions.js'
//Key de la API por headers
const requestOptions = {
  headers:{
    "x-api-key": '0ff70d54-dc0b-4262-9c3d-776cb0f34dbd'
  }
}
let moviesData = {}
fetch ("https://moviestack.onrender.com/api/movies", requestOptions)
  .then(response => response.json())
  .then (data => {
    moviesData = data
    const movie = moviesData.movies

    const movies = sortArray(movie)

    const favMovies = JSON.parse(localStorage.getItem('likes'))

    console.log ('favrmovies',favMovies)
    
    console.log (Object.keys(localStorage).length)
    if(favMovies.length == 0 || Object.keys(localStorage).length === 0){
      moviesContenedor.classList.add ("text-center")
      moviesContenedor.innerHTML = "NO FAVORITE MOVIES FOUND"
    } else if (Object.keys(localStorage).length !== 0 || favMovies.length >= 1){

      const favMoviesFiltered = movies.filter(movie =>favMovies.some(favMovie => favMovie.id === movie.id))
      
      introducirCard(favMoviesFiltered, moviesContenedor, crearElementosDelCard)

      const listOfGenres = genresList(destructureMovies(favMoviesFiltered))
      
      crearOptions(listOfGenres, selectGenres)

      selectGenres.addEventListener('change', () => {
        manejarCambioSelect(favMoviesFiltered, selectGenres, searchInput, moviesContenedor)
      })
      
      searchInput.addEventListener('keyup', () => {
          manejarCambioSelect(favMoviesFiltered, selectGenres, searchInput, moviesContenedor)
        })
      
      buttonClear.addEventListener('click',()=>{
        selectGenres.value = ""
        searchInput.value = ""
        manejarCambioSelect(favMoviesFiltered, selectGenres, searchInput, moviesContenedor)
      })
    }
  })
  .catch (error => console.log ("error:",error))