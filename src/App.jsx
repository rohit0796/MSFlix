
import Home from '../screens/Home'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import MovieList from '../components/MovieList'
import Header from '../components/Header'
import Genere from '../screens/Genere'
import MovieDeatial from '../screens/MovieDeatial'
import ContextHolder from '../context/ContextHolder'
function App() {
  return (
    <ContextHolder>
    <div className="App">
      <Router>
        <div className="routes">
          <div className="side">
            <Sidebar />
          </div>
          <div className="right">
            <Header/>
            <Routes>
              <Route index element={<Home />}></Route>
              <Route path='movie/:id' element={<MovieDeatial/>}></Route>
              <Route path='tv/:id' element={<MovieDeatial/>}></Route>
              <Route path='movies/:type' element={<MovieList />}></Route>
              <Route path='/genere' element={<Genere/>}></Route>
              <Route path='/*' element={<h1>Error Page</h1>}></Route>
            </Routes>
          </div>
        </div>
      </Router>
    </div>
    </ContextHolder>
  )
}

export default App