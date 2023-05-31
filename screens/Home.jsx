import { useContext, useEffect, useState } from 'react'
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './home.css'
import { Link } from 'react-router-dom';
import MovieList from '../components/MovieList';
import Context from '../context/Context';
const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8'; const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + '/discover/movie?' + API_KEY + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate';
const Home = () => {
  const [Popular, setPopular] = useState([])
  const cont = useContext(Context);
  //   const getdata = (API_URL)=>
  //   {
  //     const options = {
  //     method: 'GET',
  //     url:API_URL,
  //     headers: {
  //       'X-RapidAPI-Key': 'cbabe543eemsh756ddaa92af54d5p194de3jsn3575ffff3f6f',
  //       'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
  //     }
  //   };
  //   getmovies(API_URL)
  // }
  //   
  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/${cont.mode?cont.mode:'movie'}/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
      .then(val => val.json())
      .then(data => {
        setPopular(data.results);
      })

  }, [])
  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/${cont.mode?cont.mode:'movie'}/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
      .then(val => val.json())
      .then(data => {
        setPopular(data.results);
      })

  }, [cont.mode])
  // console.log(Discover)
  return (
    <>
      <div className="poster">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
          width={'100%'}
        >
          {
            Popular.map(movies => (
              <Link style={{ textDecoration: 'none', color: 'white' }} to={`/${cont.mode?cont.mode:'movie'}/${movies.id}`}>

                <div className="posterimages">
                  <img src={`https://image.tmdb.org/t/p/original${movies && movies.backdrop_path}`} />
                </div>
                <div className="posterimage_overlay">
                  <div className="posterimage_title">
                    {
                      (cont.mode==='tv')?
                      movies ? movies.original_name : ""
                      :
                      movies ? movies.original_title : ""
                    }
                  </div>
                  <div className="posterimage_runtime">{movies ? movies.release_date : ""}
                    <span className='posterimage_rating' > {movies ? movies.vote_average : ""}
                      <i className='fas fa-star' />{" "}
                    </span>
                  </div>
                  <div className="posterimage_description">
                    {movies? movies.overview:" "}
                  </div>
                </div>
              </Link>
            ))
          }
        </Carousel>
      </div>
      <MovieList />
    </>
  )
}
export default Home
