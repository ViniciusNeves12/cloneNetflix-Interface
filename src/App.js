import React, { useEffect, useState } from 'react';
import './App.css';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Tmdb from './Tmdb';
import Header from './components/Header';


function App() {

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeaturedData] = useState()
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //pegando o Featured
      let originals = list.filter(i=> i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1)); 
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

      setFeaturedData(chosenInfo);
    }

    loadAll();

  }, [])

  useEffect(()=>{

    const scrollListener = ()=>{
      if (window.scrollY > 10){
        setBlackHeader(true)
      }else{
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () =>{
      window.removeEventListener('scroll', scrollListener)
    }

}, [])

  return (

    

    <div className='page'>
      <Header black={blackHeader}/>

      {
        featureData &&
        <FeaturedMovie item = {featureData}/>
      }


      <section className='lists'>
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      <footer>
        Feito com <span role ='img' aria-label = 'coração'>🧡</span> por <a href='https://github.com/ViniciusNeves12'> Vinicius Neves </a><br />
        Direitos de imagem para <a href='https://www.netflix.com/br/'>Netflix</a> <br />
        Dados pegos através da API do site <a href='https://www.themoviedb.org/'> ThemovieDb.org </a>
      </footer>


      { movieList <= 0 &&
          <div className='loading'>
                <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="" />
          </div>
      }

    </div>
  );
}

export default App;
