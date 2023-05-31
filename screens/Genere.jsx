import React, { useContext, useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import Cards from '../components/Card';
import'./genere.css'
import Context from '../context/Context';
const options = [
  { value: 27, label: 'Horror' },
  { value: 9648, label: 'Mystery' },
  { value: 10749, label: 'Romantic' },
  {value:878,label:'Sci-fi'},
  {value:53,label:'Thriller'},
  {value:35,label:'Comedy'},
  {value:12,label:'Adventure'},
  {value:28,label:'Action'},
  {value:16,label:'Animation'},
  {value:80,label:'Crime'},
]
const animatedComponents = makeAnimated();
const Genere = () => {
// const selected=[];
const [MovieList, setMovieList] = useState([])
const cont=useContext(Context)
const handleChange=(e)=>{
    var g=[];
    // selected.push(e);
    // selected.map((gen)=>{
    //     g.push(gen.value)
    // })
    // setGenere(g);
    e.map((gen)=>{
        g.push(gen.value)
    })
    fetch(`https://api.themoviedb.org/3/discover/${cont.mode?cont.mode:'movie'}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&with_genres=${g}`)
            .then(val => val.json())
            .then(data => {
                setMovieList(data.results);
            })
}
  return (
    <div className='genere'>
        <div className="select">
 <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={options}
      onChange={handleChange}
      styles={{
          control: (baseStyles, state) => ({
              ...baseStyles,
              background: 'rgba(33, 33, 72, 0.123)',
              borderRadius: '16px',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              backdrop: 'blur(8.8px)',
              border:'none',
              width:'85vw',
              height:'40px',
        })
    }}
    />    
    </div>
    
        <div className='movie__list'>
            <h2 className='list__title'>GENERE</h2>
            {
        MovieList.length ?
            <div className="list__cards">
                {
                    MovieList.map(movie => (
                        <Cards movie={movie}/>
                        ))}
            </div>
            :
            <div className="msg">
            <h2>Please Select a Genere</h2>
            </div>
        }
        </div>
        

    </div>
  )
}

export default Genere
