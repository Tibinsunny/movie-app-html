let movieList=[];
const btnClick=document.querySelector(".btn");
btnClick.addEventListener("click",(event)=>{
  document.querySelector(".row").innerHTML=""
  event.preventDefault()
    const movieSearchKey=document.querySelector(".form-control");
    fetchMovies(movieSearchKey.value);
})

//Fetch Movie From API KEY
const API_URL="http://www.omdbapi.com/?apikey=e009df47&s=";
//I am leaving the API Key Public intentionally. It is a just free api key.
async function fetchMovies(movieSearchKey){
   // fetch(API_URL+movieSearchKey).then(response => response.json()).then(movieData => console.log(movieData))
   const response=await fetch(API_URL+movieSearchKey);
   const movieData=await response.json();;

movieTemplate(movieData)
}

//Adding Movie list to the UI

function movieTemplate(movieData)
{
  let templateInject="";
  if(movieData.Error)
  {
    templateInject=`<div class="alert alert-danger" role="alert">
    Movie Not Found
  </div>`

    let movieInject=document.querySelector(".row");
    movieInject.innerHTML=movieInject.innerHTML+templateInject 
  }

  else
  {

 
    movieData.Search.forEach(elements=>{
        console.log(elements)
     templateInject=`

<div id="${elements.imdbID}" class="col-sm-4">
<div class="card" style="width: 18rem;">
  <img src="${elements.Poster}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title" >${elements.Title}</h5>
    <p class="card-text">Type : ${elements.Type}<br>Year : ${elements.Year}</p>
    <a href="#"  onclick="buttonClicked(event)" data-set=${elements.imdbID} class="btn watch-btn btn-primary">Add to Wath</a>
  </div>
</div>
</div>


`
let movieInject=document.querySelector(".row");
movieInject.innerHTML=movieInject.innerHTML+templateInject
})
}
}

function buttonClicked(event){ 
 let movieSet=(document.getElementById(event.target.dataset.set))
 movieList.push(movieSet)
}

document.querySelector(".watch-later").addEventListener("click",() => {
  document.querySelector(".row").innerHTML=""
 
  movieList.forEach(movies => {
    console.log(movies)
    document.querySelector(".row").appendChild(movies)
  })
})