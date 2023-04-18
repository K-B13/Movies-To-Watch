import './App.css';
import { Routes, Route, useParams } from "react-router-dom"
import { useState } from 'react'
import Home from './Home'
import WatchList from './WatchList'
import NavBar from './NavBar';
import MovieCard from './MovieCard';

function App() {
  const [searchValue, setSearchValue] = useState("")
  
  const [ moviesToWatch, setMoviesToWatch] = useState([])

  function searchBarValue(boxValue) {
    setSearchValue(boxValue)
    console.log(searchValue)
  }
  function submitSearchValue(e) {
    e.preventDefault()
    console.log(searchValue)
    setSearchValue("")
  }

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
    setMoviesToWatch([...moviesToWatch])
  }
  function removeAll() {
    setMoviesToWatch([])
  }
  function revealStars(item, index) {
    moviesToWatch[index].hasWatched = !moviesToWatch[index].hasWatched
    setMoviesToWatch([...moviesToWatch])
  }
  function triggerReRender() {
    setMoviesToWatch([...moviesToWatch])
  }
  function filterForNotWatched(e) {
    console.log(e.target.value)
    const notWatchedMovies = moviesToWatch.filter((str) => !str.starScore)
    setMoviesToWatch(notWatchedMovies)
  }
  return (
    <div className="App">
      <h1>Movie's to Watch</h1>
      <NavBar 
      searchBarValue={searchBarValue}
      searchValue={searchValue}
      submitSearchValue={submitSearchValue}
      />
      <Routes>
        <Route path="/" element={<Home moviesToWatch={moviesToWatch} addToList={addToList} 
        />}>
        </Route>
        <Route path="/WatchList" element={<WatchList moviesToWatch={moviesToWatch} 
        removeSingle={removeSingle} 
        selectButton={selectButton} 
        removeSelected={removeSelected} 
        removeAll={removeAll} 
        revealStars={revealStars}
        triggerReRender={triggerReRender}
        filterForNotWatched={filterForNotWatched}
        />}></Route>
        <Route path="/:idCode" element={<MovieCard addToList={addToList} />}></Route>
      </Routes>
      <main></main>
    </div>
  );
}

export default App;
