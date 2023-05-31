import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Card from './Card'
import './header.css'
import { useState } from 'react';
import Context from '../context/Context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate();
  const cont=useContext(Context);
  const [alignment, setAlignment] = React.useState(cont.mode);
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    cont.setMode(event.target.value);
    navigate("/")
  };

  const [movie, setmovie] = useState([])
  const Shut = () => {
    setmovie([])
  }
  const onChange = (event) => {
    fetch(`https://api.themoviedb.org/3/search/${cont.mode?cont.mode:'movie'}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&query=${event.target.value}`)
      .then(val => val.json())
      .then(data => {
        setmovie(data.results);
      })
    // console.log(event.target.value);
  };
  return (
    <>
      <div className="header">
        <div className='empty'>

        </div>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, bgcolor: 'transparent', border: '1px solid white' }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, color: 'white' }}
            placeholder="Search Movie and Series"
            inputProps={{ 'aria-label': 'search Movie and Series' }}
            aria-required='true'
            onChange={onChange}
          />
          <IconButton sx={{ p: '10px', color: 'white' }} aria-label="search" >
            <SearchIcon />
          </IconButton>
        </Paper>
        <div className="toggle">
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="movie" sx={{color:'white'}} >Movies</ToggleButton>
            <ToggleButton value="tv" sx={{color:'white'}}>TV Series</ToggleButton>
          </ToggleButtonGroup>
        </div>

      </div>
      <div className="drawer">
        {movie.map(movie => (
          <button onClick={Shut} style={{
            margin: 0,
            padding: 0,
            backgroundColor: 'transparent'
          }}><Card movie={movie} /></button>
        ))}
      </div>
    </>
  );
}

export default Header
