import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'

import PlotEdit from "./PlotEdit"

export default function MovieCard(props) {
  // for dynamic routing
  const { idCode } = useParams()
  // state for storing the rendered movies information
  const [ movieInfo, setMovieInfo ] = useState({
    titleText: {
      text: ""
    },
    primaryImage: {
      url: ""
    },
    plot: {
      plotText: {
        plainText: ""
      }
    },
    releaseDate: {
      year: ""
    },
    ratingsSummary: {
      aggregateRating: ""
    }
  })
  // boolean state which is used to store whether the movie being viewed is in the movie list
  const [ isInList, setIsInList ] = useState(false)
  // useEffect to fetch the more detailed movie information and store it in movieInfo
  useEffect(() => {
    fetch(`https://moviesdatabase.p.rapidapi.com/titles/${idCode}?info=base_info`, 
    {method: 'GET',
    headers: {
      'X-RapidAPI-Key': '5a228db667msh9299db463912126p12f305jsn6cf00c2afa46',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  }
    )
    .then((response) => response.json())
    .then((result) => {
      if (result.results.primaryImage === null) {
        result.results.primaryImage = {url: 'https://img.icons8.com/?size=2x&id=j1UxMbqzPi7n&format=png'}
      }
      if (result.results.releaseDate === null) {
        result.results.releaseDate = {year: 'Not Provided'}
      }
      if (result.results.plot === null) {
        result.results.plot = {
          plotText: {
            plainText: 'Not Provided'
          }
        }
      }
    setMovieInfo(result.results)
    // grabs the moviesToWatch list from local storage if there is something in moviesToWatch. Then checks to see if the current movie id is the same as one of the movie id's stored in the movieToWatch list. Then it stores whether it is true of false in the list within the isInList state.
    const hasLocalStorage = localStorage.getItem('moviesToWatch')
    if (hasLocalStorage){
    const movieList = JSON.parse(localStorage.getItem('moviesToWatch'))
    const movieAlreadyInList = movieList.some((movie) => movie.id === result.results.id)
    setIsInList(movieAlreadyInList)
    }

    }) 

  }, [])

  return(
    <div>
      {movieInfo ?
      <>
      {/* <IndividualMovie movieInfo={movieInfo} /> */}
      <h2 className="movie-card-heading">{movieInfo.titleText.text}</h2>
      <img src={movieInfo.primaryImage.url} alt={`${movieInfo.title} cover photo`} height="200px"/>
      <div className="movie-card-info">
      {/* Checks if movie isInList if it is then it renders a plot edit component else it just renders the og plot as text. */}
      {isInList ? 
        <PlotEdit 
        movieInfo={movieInfo}
        reRender={props.triggerReRender}
        />: 
        <p>{movieInfo.plot.plotText.plainText}</p>}

        <p>Release Date: {movieInfo.releaseDate.year}</p>

      <p>Rating: {movieInfo.ratingsSummary.aggregateRating ? movieInfo.ratingsSummary.aggregateRating: 'Not Provided'}</p>
      </div>
      </>

      : null}

      {/* Checks if movie isInList if it isn't it shows the add to list button else the button is hidden. This allows me to prevent the same movie being added multiple times. Also if the button is clicked it removes the button from being displayed by flipping the isInList */}
      {!isInList && <button onClick={() => {
      props.addToList({
          id: movieInfo.id,
          title: movieInfo.titleText.text,
          image: movieInfo.primaryImage.url, 
          rating: movieInfo.ratingsSummary.aggregateRating,
          plot: movieInfo.plot.plotText.plainText,
          genres: movieInfo.genres.genres,
          year: movieInfo.releaseDate.year,
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