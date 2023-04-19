import './App.css';
import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from 'react'
import Home from './Home'
import WatchList from './WatchList'
import NavBar from './NavBar';
import MovieCard from './MovieCard';
import SearchScreen from './SearchScreen';

function App() {

  
  const [changedPlots, setChangedPlots] = useState([])
  
  

  //Value that is within the searchbar in the nav
  const [searchValue, setSearchValue] = useState("")

  // The list that will be rendered in the movie list tab. It is added to by the addToList function which is attached to the button on every MovieCard
  const [ moviesToWatch, setMoviesToWatch] = useState(JSON.parse(localStorage.getItem('moviesToWatch')))

  useEffect(() => {
    localStorage.setItem(`moviesToWatch`, JSON.stringify(moviesToWatch))
  }, [moviesToWatch])

  //Sets what is being typed in the searchbar to the value of the searchbar
  function searchBarValue(boxValue) {
    setSearchValue(boxValue)
  }

  //function for adding to the movieList
  function addToList(newMovie) {
    setMoviesToWatch([...moviesToWatch, newMovie])
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
    // const newMoviesList = moviesToWatch.filter((item) => !item.removeMovie)
    // setMoviesToWatch(newMoviesList)
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

  function handlePlotChanges(movieInfo) {
    const newPlot = changedPlots.filter((str) => str.id === movieInfo.id)
    return newPlot.length ? newPlot[0].plot: movieInfo.plot
  }

  //function to filter the movie list. It is linked to the option list on the movielist page. Currently under review.
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
      />
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
        filterForNotWatched={filterForNotWatched}
        changedPlots={changedPlots}
        />}></Route>
        <Route path="/SearchScreen" element={<SearchScreen 
        searchBarValue={searchBarValue}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handlePlotChanges={handlePlotChanges}
        />}></Route>
        {/* Code for the dynamic routes */}
        <Route path="/:idCode" element={<MovieCard 
        addToList={addToList}
        changedPlots={changedPlots}
        handlePlotChanges={handlePlotChanges}
        />}></Route>
      </Routes>
      <main></main>
    </div>
  );
}

export default App;
