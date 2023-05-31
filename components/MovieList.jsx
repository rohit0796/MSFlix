import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Cards from './Card';
import'./movieList.css'
import Context from '../context/Context';
import { Navigate } from 'react-router-dom';
const MovieList = () => {
    const [MovieList, setMovieList] = useState([])
    const { type } = useParams();
    const cont = useContext(Context)
    useEffect(() => {
        getData();
    }, [])
    useEffect(() => {
        getData();
    }, [type])
    useEffect(() => {
        getData();
    }, [cont.mode])

    const getData = () => {
    
            fetch(`https://api.themoviedb.org/3/${cont.mode?cont.mode:'movie'}/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
            .then(val => val.json())
            .then(data => {
                setMovieList(data.results);
            })
        }
    
    return (
        <div className='movie__list'>
            <h2 className='list__title'>{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className="list__cards">
                {
                    (cont.mode=='tv' && type =='upcoming')
                    ?
                    <Navigate to="/"/>
                    :
                    MovieList.map(movie => (
                    <Cards movie={movie}/>
                ))}
            </div>
        </div>
    )
}

export default MovieList
