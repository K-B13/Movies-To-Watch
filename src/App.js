import './App.css';
import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from 'react'
import Home from './Home'
import WatchList from './WatchList'
import NavBar from './NavBar';
import MovieCard from './MovieCard';
import SearchScreen from './SearchScreen';
import Misc from './Misc';

function App() {
  //Value that is within the searchbar in the nav
  const [searchValue, setSearchValue] = useState("")

  //state that controls what is show in the list, this will also be saved to local and will be used to check if items are already on the list. in the usestate the ternary checks if the local storage has anything if it doesnt it adds an empty array toherwise it just grabs what is in there.
  const [ moviesToWatch, setMoviesToWatch] = useState(!localStorage.getItem('moviesToWatch') ?
  localStorage.setItem(`moviesToWatch`, JSON.stringify([])):
  JSON.parse(localStorage.getItem('moviesToWatch')))

  
// whenever moviesToWatch changes it is updated in the svae file.
  useEffect(() => {
    if (moviesToWatch) localStorage.setItem(`moviesToWatch`, JSON.stringify(moviesToWatch))
  }, [moviesToWatch])


  //on load checks if movie to watch has anything if it doesn't it adds an empty array
  // this may be redundant due to changes in the useState which now do the same thing.
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
          {/* Headline across all routes  */}
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
        <Route path="/Misc" element={<Misc />}>

        </Route>
        {/* Code for the dynamic routes */}
        <Route path="/:idCode" element={<MovieCard 
        addToList={addToList}
        triggerReRender={triggerReRender}
        />}></Route>
      </Routes>
      <main></main>
    </div>
  );
}

export default App;
