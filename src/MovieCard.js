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
    const movieList = JSON.parse(localStorage.getItem('moviesToWatch'))
    console.log(movieInfo)
    const movieAlreadyInList = movieList.some((movie) => movie.id === result.id)
    setIsInList(movieAlreadyInList)
    }).catch(() => console.log("caught problem in moviecard use effect"))

  }, [])

  return(
    <div>
      {movieInfo ?
      <>
      {/* <IndividualMovie movieInfo={movieInfo} /> */}
      <h2>{movieInfo.title}</h2>
      <img src={movieInfo.image} alt={`${movieInfo.title} cover photo`} height="200px"/>
      {movieInfo.directors ? <p>Director: {movieInfo.directors}</p>: null}
      <p>Stars: {movieInfo.stars}</p>
      {isInList ? 
      <PlotEdit 
      movieInfo={movieInfo}
      editedPlots={props.changedPlots}
      handlePlotChanges2={props.handlePlotChanges}
      />: <p>{movieInfo.plot}</p>}
      {/* <AutosizeInput className="plot-value" value={`Plot: ${movieInfo.plot}`}></AutosizeInput> */}
      <p>Release Date: {movieInfo.releaseDate} Content Rating: {movieInfo.contentRating}</p>
      <p>IMDB Rating: {movieInfo.imDbRating}</p>
      <p>Awards: {movieInfo.awards}</p>
      </>
      : null}
      {!isInList && <button onClick={() => {
      props.addToList({
          id: movieInfo.id,
          title: movieInfo.title,
          image: movieInfo.image, 
          rating: movieInfo.imDbRating,
          plot: movieInfo.plot,
          hasWatched: false, 
          removeMovie: false, 
          selected: false, 
          starScore: 0,
          userDescription: null,
          revealPlot: false
        })
      setIsInList(!isInList)}
      }>
            Add to Movie List
            </button>}

    </div>
  )
}