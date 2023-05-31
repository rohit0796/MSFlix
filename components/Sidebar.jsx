import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import'./sidebar.css'
import logo from '../components/icon.png'
import Context from '../context/Context'
import { Navigate } from 'react-router-dom'
const Sidebar = () => {
  const cont=useContext(Context)
  return (
    <div className='sidebar'>
      <Link to='/' className="cont-logo">
      <img src={logo} alt="" srcset="" className='logo'/>
      <span>MSFlix</span>
      </Link>
      <div className="list">
      <Link to='/'>Home</Link>
      <Link to='/movies/popular'>Popular</Link>
      <Link to='/genere'>Genere</Link>
      <Link to='/movies/top_rated'>Top Rated</Link>
      {(cont.mode=='movie' | cont.mode=='')? <Link to='/movies/upcoming'>Upcoming</Link>
      :<></>}
      </div>
    </div>
  )
}

export default Sidebar
