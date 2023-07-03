import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'

import PlotEdit from "./PlotEdit"

export default function MovieCard(props) {
  // for dynamic routing
  const { idCode } = useParams()
  // state for storing the rendered movies information
  const [ movieInfo, setMovieInfo ] = useState([])
  // boolean state which is used to store whether the movie being viewed is in the movie list
  const [ isInList, setIsInList ] = useState(false)
  // useEffect to fetch the more detailed movie information and store it in movieInfo
  useEffect(() => {
    fetch(`https://imdb-api.com/en/API/Title/k_sn8009mj/${idCode}`)
    .then((response) => response.json())
    .then((result) => {
    setMovieInfo(result)
    // grabs the moviesToWatch list from local storage if there is something in moviesToWatch. Then checks to see if the current movie id is the same as one of the movie id's stored in the movieToWatch list. Then it stores whether it is true of false in the list within the isInList state.
    const hasLocalStorage = localStorage.getItem('moviesToWatch')
    if (hasLocalStorage){
    const movieList = JSON.parse(localStorage.getItem('moviesToWatch'))
    const movieAlreadyInList = movieList.some((movie) => movie.id === result.id)
    setIsInList(movieAlreadyInList)
    }

    }) 

  }, [])

  return(
    <div>
      {movieInfo ?
      <>
      {/* <IndividualMovie movieInfo={movieInfo} /> */}
      <h2 className="movie-card-heading">{movieInfo.title}</h2>
      <img src={movieInfo.image} alt={`${movieInfo.title} cover photo`} height="200px"/>
      <div className="movie-card-info">
      {movieInfo.directors ? 
      <p>Director: {movieInfo.directors}</p>:
      null}
      <p>Stars: {movieInfo.stars}</p>
      {/* Checks if movie isInList if it is then it renders a plot edit component else it just renders the og plot as text. */}
      {isInList ? 
        <PlotEdit 
        movieInfo={movieInfo}
        reRender={props.triggerReRender}
        />: 
        <p>{movieInfo.plot}</p>}

        <p>Release Date: {movieInfo.releaseDate} &nbsp; Content Rating: {movieInfo.contentRating}</p>

      <p>IMDB Rating: {movieInfo.imDbRating}</p>

      <p>Awards: {movieInfo.awards}</p>
      </div>
      </>

      : null}

      {/* Checks if movie isInList if it isn't it shows the add to list button else the button is hidden. This allows me to prevent the same movie being added multiple times. Also if the button is clicked it removes the button from being displayed by flipping the isInList */}
      {!isInList && <button onClick={() => {
      props.addToList({
          id: movieInfo.id,
          title: movieInfo.title,
          image: movieInfo.image, 
          rating: movieInfo.imDbRating,
          plot: movieInfo.plot,
          genres: movieInfo.genres,
          year: movieInfo.year,
          contentRating: movieInfo.contentRating,
          hasWatched: false, 
          removeMovie: false, 
          selected: false, 
          starScore: 0,
          userDescription: null,
          revealPlot: false
        })

      setIsInList(!isInList)}
        
      }
      className="add-to-list-button">

            Add to Movie List
          </button>}

    </div>
  )
    }