const API_KEY = "2d2d33872642914bc76e46101b6d665b";
const API_BASE = "https://api.themoviedb.org/3"

/*

categoris a serem exibidas:

-originais da netflix
-recomendados (trending)
-em alta (top rated)
-ação
-comédia
-terror
-romance
-documentários

*/

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();

    return json;
}

/*
IMPLEMENTAÇÕES FUTURAS: 
const filtraTrendingNetflix = async () => {

    const trendingNetflix = {
        results:[]
    }
    
    let trendingMovies;
    
    do{
        let contPage = 1
        trendingMovies = await basicFetch(`/trending/tv/week?page=${contPage}api_key=${API_KEY}`);
       console.log(trendingMovies)

    }while(trendingMovies.results < 20);
    
    if(trendingMovies.results.length > 0){ 
        
        trendingMovies.results.map(async function (movie) {
            
            
           const providers = await basicFetch(`/tv/${movie.id}/watch/providers?api_key=${API_KEY}`)
           const streaming = providers.results.BR.flatrate;
           
           streaming.map(async (streaming) => {
                   const nomeStreaming = streaming.provider_name;
                   if(nomeStreaming == "Netflix"){
                        trendingNetflix.results.push(movie)
                   }
            })
           
        })        
    }
    return trendingNetflix;
}
*/

export default {

    getHomeList: async() =>{
        return [
            {
                slug: "originals",
                title: "Originais da Netflix",
                items: await basicFetch(`/discover/tv?with_networks=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: "trending",
                title: "Recomendados para Você",
                items: await basicFetch(`/trending/all/week?api_key=${API_KEY}`)
            },
            {
                slug: "toprated",
                title: "Em Alta",
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: "Actions",
                title: "Ação",
                items: await basicFetch(`/discover/tv?with_genres=10759&with_networks=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: "Comedy",
                title: "Comédia",
                items: await basicFetch(`/discover/tv?with_genres=35&with_networks=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: "Reality",
                title: "Reality",
                items: await basicFetch(`/discover/tv?with_genres=10764&with_networks=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: "Animação",
                title: "Animação",
                items: await basicFetch(`/discover/tv?with_genres=16&with_networks=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: "Documentary",
                title: "Documentário",
                items: await basicFetch(`/discover/tv?with_genres=99&with_networks=213&language=pt-BR&api_key=${API_KEY}`)
            }
        ]

    },
    getMovieInfo: async (movieId, type) => {
        let info = {};

        if(movieId){
            switch(type){
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;
                default:
                    info = null
                break;
            }
        }

        return info;
    }
}