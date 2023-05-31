import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './movieDetails.css'
import profile from '../components/user.png'
import Context from '../context/Context'
import Cards from '../components/Card'
const MovieDeatial = () => {
    const [currentMovieDetail, setmoviedetail] = useState()
    const [recomendation, setRecomendation] = useState()
    const [isshowmore, setisshowmore] = useState()
    const [review, setReview] = useState()
    const [cast, setCast] = useState()
    const { id } = useParams()
    var ismore = [];
    const cont = useContext(Context)
    useEffect(() => {
        getData()
        window.scrollTo(0, 0)
    }, [id])
    const getData = () => {

        fetch(`https://api.themoviedb.org/3/${cont.mode ? cont.mode : 'movie'}/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
            .then(val => val.json())
            .then(data => {
                setmoviedetail(data);
                fetch(`https://api.themoviedb.org/3/${cont.mode ? cont.mode : 'movie'}/${id}/recommendations?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
                    .then(val => val.json())
                    .then(data => {
                        setRecomendation(data.results);
                        fetch(`https://api.themoviedb.org/3/${cont.mode ? cont.mode : 'movie'}/${id}/reviews?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
                            .then(response => response.json())
                            .then(response => {
                                setReview(response.results)
                                fetch(`https://api.themoviedb.org/3/${cont.mode ? cont.mode : 'movie'}/${id}/credits?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
                                    .then(response => response.json())
                                    .then(response => {
                                        setCast(response.cast)
                                        // console.log(response.cast)
                                    })
                            })
                            .catch(err => console.error(err));
                    })
            })
        review && review.map(ele => ismore.push(false));
        setisshowmore(ismore)

    }
    return (
        <div className="movie">
            <div className="movie__intro">
                <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} />
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{(cont.mode == 'movie' || cont.mode == "") ?
                            currentMovieDetail ? currentMovieDetail.original_title : ""
                            :
                            currentMovieDetail ? currentMovieDetail.original_name : ""}
                        </div>
                        <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie__rating">
                            {currentMovieDetail ? currentMovieDetail.vote_average : ""} <i class="fas fa-star" />
                            <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                        </div>
                        <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className="movie__genres">
                            {
                                currentMovieDetail && currentMovieDetail.genres
                                    ?
                                    currentMovieDetail.genres.map(genre => (
                                        <><span className="movie__genre" id={genre.id}>{genre.name}</span></>
                                    ))
                                    :
                                    ""
                            }
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview.slice(0, 350) : ""}</div>
                    </div>

                    {(cont.mode == 'tv') ?
                        <div className="sep">
                            <div className="seasons"><strong>Number of Seasons:</strong>   {currentMovieDetail ? currentMovieDetail.number_of_seasons : ""}</div>
                            <div className="episode"><strong>Number of Episodes:</strong>  {currentMovieDetail ? currentMovieDetail.number_of_episodes : ""}</div>
                        </div> : <></>}
                </div>
            </div>
            <div className="movie__links">
                <div className="movie__heading">Useful Links</div>
                {
                    currentMovieDetail && currentMovieDetail.homepage && <a href={currentMovieDetail.homepage} target="_blank" style={{ textDecoration: "none" }}><p><span className="movie__homeButton movie__Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
                {
                    currentMovieDetail && currentMovieDetail.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} target="_blank" style={{ textDecoration: "none" }}><p><span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
            </div>

                <div className="cast">
                    <h1>Cast</h1>
                    <div className='card-cont'>
                    {
                       cast && cast.map((actor)=>{
                            return(
                                <div className="cardd">
                                    <img src={`https://image.tmdb.org/t/p/original${actor.profile_path}`} alt="" />
                                    <p><strong>{actor.name}</strong></p>
                                    <p> As</p>
                                    <p>"{actor.character}"</p>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>

            <h1>Production companies</h1>
            <div className="movie__production">
                {
                    currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.map(company => (
                        <>
                            {
                                company.logo_path
                                &&
                                <span className="productionCompanyImage">
                                    <img className="movie__productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                                    <span style={{ color: 'white' }}>{company.name}</span>
                                </span>
                            }
                        </>
                    ))
                }
            </div>
            {review && <div className="review">
                <h1 style={{ color: 'white' }}>Reviews</h1>
                {
                    review.map((rev, ind) => {
                        // console.log(isshowmore[ind])
                        // ismore[ind]=false
                        const orgi = rev.content.slice(0, 200)
                        var srcc = "";
                        const temp = [...isshowmore]
                        const extra = rev.content.slice(201)
                        // console.log(temp)
                        if (rev.author_details.avatar_path && rev.author_details.avatar_path.includes("http")) {
                            srcc = rev.author_details.avatar_path.slice(1);
                        }
                        else {
                            srcc = (rev.author_details.avatar_path) ? `https://image.tmdb.org/t/p/original${rev.author_details.avatar_path}` : profile
                        }
                        // setisshowmore(false);
                        return (
                            <div className='revv'>
                                <div className="auther">
                                    <div className="aa">
                                        <div className="avatars">

                                            <img src={srcc} alt="" />

                                        </div>
                                        <span><strong>{rev.author}</strong>:</span>
                                    </div>
                                    <span style={{ margin: '1px' }}> <strong>Date-</strong>{rev.updated_at.slice(0, 10)}</span>
                                </div>
                                <p>
                                    {
                                        (isshowmore[ind]) ? orgi + extra : orgi
                                    }
                                    {(rev.content.length > 200) ? <a onClick={() => {
                                        temp[ind] = !temp[ind]
                                        setisshowmore(temp)
                                    }
                                    }>
                                        {isshowmore[ind] ? '   read less' : '...read more'}</a> : ""}
                                </p>
                            </div>
                        )
                    })
                }

            </div>}
            <div className="recomendation">
                <h1 style={{ color: 'white' }}>Recommendations</h1>
                <div className="movie_reco">
                    {
                        recomendation ? recomendation.map((mov) => {
                            return (
                                <Cards movie={mov} />
                            )
                        })
                            :
                            <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default MovieDeatial
