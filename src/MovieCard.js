import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'

import PlotEdit from "./PlotEdit"

export default function MovieCard(props) {
  const { idCode } = useParams()

  const [ movieInfo, setMovieInfo ] = useState([])

  const [ isInList, setIsInList ] = useState(false)

  useEffect(() => {
    fetch(`https://imdb-api.com/en/API/Title/k_sn8009mj/${idCode}`)
    .then((response) => response.json())
    .then((result) => {
    setMovieInfo(result)

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