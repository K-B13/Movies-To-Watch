import './App.css';
import { Routes, Route } from "react-router-dom"
import { useState } from 'react'
import Home from './Home'
import WatchList from './WatchList'
import NavBar from './NavBar';

function App() {
  const [ moviesToWatch, setMoviesToWatch] = useState([])

  function addToList(newMovie) {
    setMoviesToWatch([...moviesToWatch, newMovie])
  }

  function filterMovieList() {
    const newMoviesList = moviesToWatch.filter((item) => !item.removeMovie)
    setMoviesToWatch(newMoviesList)
  }
  function removeSingle(num) {
    moviesToWatch[num].removeMovie = !moviesToWatch[num].removeMovie
    console.log(moviesToWatch)
    filterMovieList()
    // const newMoviesList = moviesToWatch.filter((item) => !item.removeMovie)
    // setMoviesToWatch(newMoviesList)
  }
  function removeSelected() {
    const removeMovies = moviesToWatch.filter((str) => !str.selected)
    setMoviesToWatch(removeMovies)
  }
  function selectButton(num) {
    moviesToWatch[num].selected = !moviesToWatch[num].selected
  }
  return (
    <div className="App">
      <h1>Movie's to Watch</h1>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home moviesToWatch={moviesToWatch} addToList={addToList} />}></Route>
        <Route path="/WatchList" element={<WatchList moviesToWatch={moviesToWatch} removeSingle={removeSingle} selectButton={selectButton} removeSelected={removeSelected} />}></Route>
      </Routes>
      <main></main>
    </div>
  );
}

export default App;
