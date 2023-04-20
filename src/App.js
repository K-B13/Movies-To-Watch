import './App.css';
import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from 'react'
import Home from './Home'
import WatchList from './WatchList'
import NavBar from './NavBar';
import MovieCard from './MovieCard';
import SearchScreen from './SearchScreen';

function App() {
  //Value that is within the searchbar in the nav
  const [searchValue, setSearchValue] = useState("")

  const [ moviesToWatch, setMoviesToWatch] = useState(!localStorage.getItem('moviesToWatch') ?
  localStorage.setItem(`moviesToWatch`, JSON.stringify([])):
  JSON.parse(localStorage.getItem('moviesToWatch')))

  

  useEffect(() => {
    if (moviesToWatch) localStorage.setItem(`moviesToWatch`, JSON.stringify(moviesToWatch))
  }, [moviesToWatch])

  useEffect(() => {
    const hasLocalStorage = localStorage.getItem('moviesToWatch')
    if(!hasLocalStorage) localStorage.setItem(`moviesToWatch`, JSON.stringify([]))
  }, [])

  //Sets what is being typed in the searchbar to the value of the searchbar
  function searchBarValue(boxValue) {
    setSearchValue(boxValue)
  }

  //function for adding to the movieList
  function addToList(newMovie) {
    const moviesToSpread = moviesToWatch ? moviesToWatch: ""
    setMoviesToWatch([...moviesToSpread, newMovie])
  }

  //This function filters the movieList to remove items with removeMovie as true
  function filterMovieList() {
    const newMoviesList = moviesToWatch.filter((item) => !item.removeMovie)
    setMoviesToWatch(newMoviesList)
  }

  //This function changes the targeted list item's removeMovie to true then runs the function filterMovieList(see above)
  function removeSingle(num) {
    moviesToWatch[num].removeMovie = !moviesToWatch[num].removeMovie
    console.log(moviesToWatch)
    filterMovieList()
  }

  //Function for the button that removes the selected list items. Essentially it just filters the movie that have selected as true then saves the filtered list
  function removeSelected() {
    const removeMovies = moviesToWatch.filter((str) => !str.selected)
    setMoviesToWatch(removeMovies)
  }

  //toggles a list items selected status between true and false then saves the new value down. 
  function selectButton(num) {
    moviesToWatch[num].selected = !moviesToWatch[num].selected
    setMoviesToWatch([...moviesToWatch])
  }

  //removes all items in the moviesToWatch list
  function removeAll() {
    setMoviesToWatch([])
  }

  //function for the watched movie button. It flips the hasWatched from false to true then saves it down triggering a re-render.
  function revealStars(item, index) {
    moviesToWatch[index].hasWatched = !moviesToWatch[index].hasWatched
    setMoviesToWatch([...moviesToWatch])
  }

  //this function just triggers the page to re-render useful to update values on the page. Not sure if this is bad practice to do
  function triggerReRender() {
    setMoviesToWatch([...moviesToWatch])
  }

  return (
    <div className="App">
      <header>
        <aside className="top-left"></aside>
        <div>
          <h1>Movies to Watch</h1>
          <NavBar 
          searchBarValue={searchBarValue}
          searchValue={searchValue}
          />
        </div>
        <aside className="top-right"></aside>
      </header>
      <Routes>
        <Route path="/" element={<Home moviesToWatch={moviesToWatch} addToList={addToList} 
        />}>
        </Route>
        <Route path="/WatchList" element={<WatchList 
        moviesToWatch={moviesToWatch} 
        removeSingle={removeSingle} 
        selectButton={selectButton} 
        removeSelected={removeSelected} 
        removeAll={removeAll} 
        revealStars={revealStars}
        triggerReRender={triggerReRender}
        />}></Route>
        <Route path="/SearchScreen" element={<SearchScreen 
        searchBarValue={searchBarValue}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        />}></Route>
        {/* Code for the dynamic routes */}
        <Route path="/:idCode" element={<MovieCard 
        addToList={addToList}
        />}></Route>
      </Routes>
      <main></main>
    </div>
  );
}

export default App;
