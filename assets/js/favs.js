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
  limpiarContenedor,
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

    let favMovies = JSON.parse(localStorage.getItem('likes'))
    
    if(Object.keys(localStorage).length === 0){
      moviesContenedor.className = ""
      moviesContenedor.classList.add ("text-center", "items-center","w-full")
      moviesContenedor.innerHTML = "NO FAVORITE MOVIES FOUND"
    } else if (Object.keys(localStorage).length !== 0 || favMovies.length !== 0){

      let favMoviesFiltered = movies.filter(movie =>favMovies.some(favMovie => favMovie.id === movie.id))
      
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

      moviesContenedor.addEventListener ('click', (event)=>{
        const target = event.target
  
        if (target.classList.contains("picture")){
          favMovies = JSON.parse(localStorage.getItem('likes'))
          favMoviesFiltered = movies.filter(movie =>favMovies.some(favMovie => favMovie.id === movie.id))
          limpiarContenedor(moviesContenedor)
          introducirCard(favMoviesFiltered, moviesContenedor, crearElementosDelCard)
          const listOfGenres = genresList(destructureMovies(favMoviesFiltered))
          crearOptions(listOfGenres, selectGenres)
        }
        if (favMovies.length == 0 || Object.keys(localStorage).length === 0){
          moviesContenedor.className = ""
          moviesContenedor.classList.add ("text-center", "items-center","w-full")
          moviesContenedor.innerHTML = "NO FAVORITE MOVIES FOUND"
        }
      })
    }
  })
  .catch (error => console.log ("error:",error))