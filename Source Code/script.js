const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280/'

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main=document.getElementById('main');
const form=document.getElementById('form');
const search=document.getElementById('search');

getmovies(API_URL)

async function getmovies(url){
    const res=await fetch(url)
    const data=await res.json()
    showmovies(data.results);
}

function showmovies(movies){
    main.innerHTML=''
    movies.forEach((movie) => {
        const {title,poster_path,vote_average,overview}=movie
        const movieE1=document.createElement('div');
        movieE1.classList.add('movie')

        movieE1.innerHTML=`
            <img src="${IMG_PATH + poster_path}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">${overview}</div>
        `
        main.appendChild(movieE1)
    });
}
function getClassByRate(vote){
     if(vote>=8){
        return 'green'
     }else if(vote>=5){
        return 'orange'
     }else{
        return 'red'
     }
}
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const searchterm=search.value 

    if(searchterm && searchterm!=''){
        getmovies(SEARCH_API + searchterm)
        search.value=''
    }else{
        window.location.reload()
    }
})