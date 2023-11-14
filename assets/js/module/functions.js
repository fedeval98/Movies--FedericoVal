
//Creacion de elementos
// img, h3, h4, p y a
function crearImg (movie){
  const img = document.createElement("img")
  img.src = movie.image
  img.alt = movie.title
  return img
}

function crearH3 (movie){
  const h3 = document.createElement("h3")
  h3.textContent = movie.title
  return h3
}

function crearH4(movie){
  const h4 = document.createElement("h4")
  h4.textContent = movie.tagline
  return h4
}

function crearP(movie){
  const p = document.createElement("p")
  p.textContent = movie.overview
  return p
}

function crearA(movie){
    const a = document.createElement("a")
    a.textContent = "Ver más"
    a.href = `./details.html?id=${movie.id}`
    a.id = "anchor"
    return a
}

// Dar clase a los elementos creados
function darClaseElementosCard(article, img, h3, h4, p, a){
  article.classList.add("bg-gray-900","border-2", "border-dashed", "border-gray-400", "rounded-2xl", "p-4", "m-2", "flex", "flex-col", "md:w-1/3", "md:flex-wrap","lg:w-auto","lg:ml-auto", "lg:mr-auto","justify-between")
  img.classList.add("mb-3")
  h3.classList.add("mb-1", "font-bold", "text-2xl")
  h4.classList.add("mb-3","italic")
  p.classList.add("mb-3","line-clamp-5","md:line-clamp-3","lg:line-clamp-2")
  a.classList.add("text-blue-400", "cursor-pointer", "border","w-1/3","text-center","bg-black","rounded-xl","self-end")
}

//Incrustar los elementos en el Article utilizando el parametro movie (tomado de introducirCard)
export function crearElementosDelCard(movie){
  const article = document.createElement("article")
  const img = crearImg(movie)
  const h3 = crearH3(movie)
  const h4 = crearH4(movie)
  const p = crearP(movie)
  const a = crearA(movie)

  article.appendChild(img)
  article.appendChild(h3)
  article.appendChild(h4)
  article.appendChild(p)
  article.appendChild(a)

  darClaseElementosCard(article, img, h3, h4, p, a)
  return article
}

// Evento ver mas
function eventoVerMas(a, p){
  a.addEventListener("click",()=>{
      p.style.display = "block"
      a.style.display = "none"
  })
}

// Introducir cards al contenedor
export function introducirCard(moviesArray, contenedor, fn) {
  const verificacion = Array.isArray(moviesArray) ? moviesArray : [moviesArray]
  for (const movie of verificacion) {
    const cardContenedor = fn(movie)
    contenedor.appendChild(cardContenedor)
  }
}

//Reutilizar for para Details

//Crear option del select utilizando parametro genre
function crearOption (genre){
  const option = document.createElement("option")
  option.value = genre
  option.textContent = genre
  return option
}
//Bucle para iterar cada genero (genreList) y darle su (contenedor) option
export function crearOptions(genresList, contenedor) {
  for (const genre of genresList) {
      const option = crearOption(genre)
      contenedor.appendChild(option)
  }
}


// Inicio de busqueda por input
export function filtrarPorTituloCaseInsensitive(arrayMovie, titulo) {
  const filtroTitulo = arrayMovie.filter(movie =>
    movie.title.toLowerCase().includes(titulo.toLowerCase())
  );
  return filtroTitulo;
}


//.toLowerCase() lo que hace es transformar a minusculas el texto 
// Al aplicarlo en movie.title hacemos que el titulo de la pelicula 
// Se transforme a minusculas

// Función para limpiar el contenido de un contenedor
export function limpiarContenedor(contenedor) {
  contenedor.innerHTML = ""
}

// // Función para introducir películas en el contenedor
export function introducirPeliculasEnContenedor(moviesFiltradas, contenedor) {
  introducirCard(moviesFiltradas, contenedor, crearElementosDelCard)
}

// Desestructurando el array movies para obtener los generos
// Luego armar un nuevo array
// Luego eliminar repetidos
export function destructureMovies (arrayMovie){
  const genresRepeat = arrayMovie.map (genre => genre.genres)
  const genresDestructured =[]
  for(let i = 0; i < genresRepeat.length; i++){
    genresDestructured.push(...genresRepeat[i])
  }
return genresDestructured
}

// Funcion para filtrar la lista de generos y que no se repitan los generos
export function genresList(genres){
  return [...new Set(genres)]
}
// Funcion para filtrar peliculas por genero
function filterMoviesByGenre (moviesArray, genre){
  return moviesArray.filter(movie => movie.genres.includes(genre))
}
// Funcion para controlar que se muestre las peliculas
// Segun el genero seleccionado
export function manejarCambioSelect(moviesArray, option, input, contenedor) {
  const selectGenre = option.value
  const selectNombre = input.value.trim().toLowerCase()
  const filtroPorGenero = filterMoviesByGenre(moviesArray, selectGenre)

  // Filtrar por género si se selecciona un género
  const resultadoPorGenero = selectGenre !== ""
    ? filterMoviesByGenre(moviesArray, selectGenre)
    : [...moviesArray]

  // Filtrar por nombre si hay una búsqueda
  const resultadoPorNombre = selectNombre !== ""
    ? filtrarPorTituloCaseInsensitive(moviesArray, selectNombre)
    : [...moviesArray]

  // Obtener la intersección de ambos resultados
  const resultadoFiltrado = resultadoPorGenero.filter(movie =>
    resultadoPorNombre.includes(movie)
  )

  limpiarContenedor(contenedor)
  if (resultadoFiltrado.length > 0) {
    introducirPeliculasEnContenedor(resultadoFiltrado, contenedor)
  } else {
    // Mostrar mensaje cuando no hay resultados
    const mensajeNoResultados = document.createElement("p")
    mensajeNoResultados.textContent = "No se encontraron resultados"
    contenedor.appendChild(mensajeNoResultados)
  }

  searchInput.addEventListener('keyup', () => {
    manejarCambioSelect(moviesArray, option, input, contenedor)
  })
}

//Crear pagina de Details
function generosDetails(movie){
  const genresDetails = document.createElement("p")
  genresDetails.textContent = movie.genres
  return genresDetails
}

export function crearElementosDetails (movie){
  const articleDetails = document.createElement("article")
  const picture = document.createElement ("picture")
  const div = document.createElement("div")
  const img = crearImg(movie)
  const h3 = crearH3(movie)
  const h4 = crearH4(movie)
  const p = crearP(movie)
  const pD = generosDetails(movie) 
  picture.appendChild(img)
  articleDetails.appendChild(picture)
  div.appendChild(h3)
  div.appendChild(h4)
  div.appendChild(pD)
  div.appendChild(p)
  articleDetails.appendChild(div)
  
  darClaseElementosDetails(articleDetails, picture, div, img, h3, h4, p, pD)

  return articleDetails
}

function darClaseElementosDetails(articleDetails, picture, div, img, h3, h4, p, pD){
  articleDetails.classList.add("flex", "flex-col","text-white","gap-2","m-2","md:flex-row","mt-10","lg:text-2xl")
  div.classList.add("flex", "flex-col","gap-4","md:w-1/3","lg:justify-around")
  picture.classList.add("md:w-2/3","lg:grow")
  img.classList.add("mb-3","object-cover","lg:w-full")
  h3.classList.add("mb-1", "font-bold", "text-2xl","uppercase","lg:text-4xl")
  h4.classList.add("mb-3")
  p.classList.add("mb-3")
  pD.classList.add("italic")
}

//Creacion de la tabla
export function crearTablaDetails(moviesArray, propiedades, tablaId) {
    const row = crearFila(moviesArray, propiedades)
    tablaId.appendChild(row)
}

// Función para crear una fila de la tabla y darle clases
function crearFila(movie, propiedades) {
  const row = document.createElement("tr")

  for (const propiedad of propiedades) {
    const cell = document.createElement("td")
    const strong = document.createElement("strong")
    row.classList.add("flex","flex-col","gap-4","lg:text-2xl")
    cell.classList.add("border")
    strong.textContent = propiedad.charAt(0).toUpperCase() + propiedad.slice(1).replace(/_/g,' ')

  
    const text = document.createTextNode(`: ${movie[propiedad]}`)

    // Agregar los nodos al elemento td
    cell.appendChild(strong)
    cell.appendChild(text)
    row.appendChild(cell)
  }

  return row
}
