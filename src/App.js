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
  return (
    <div className="App">
      <h1>Movie's to Watch</h1>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home moviesToWatch={moviesToWatch} addToList={addToList} />}></Route>
        <Route path="/WatchList" element={<WatchList moviesToWatch={moviesToWatch} />}></Route>
      </Routes>
      <main></main>
    </div>
  );
}

export default App;
