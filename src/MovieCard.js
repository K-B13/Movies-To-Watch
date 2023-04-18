import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import IndividualMovie from "./IndividualMovie"

export default function MovieCard(props) {
  const { idCode } = useParams()
  const [ movieInfo, setMovieInfo ] = useState([])
  useEffect(() => {
    fetch(`https://imdb-api.com/en/API/Title/k_sn8009mj/${idCode}`)
    .then((response) => response.json())
    .then((result) => {
    setMovieInfo(result)
    console.log(result)
    }) 
  }, [])
  return(
    <div>
      {movieInfo ?
      <>
      {/* <IndividualMovie movieInfo={movieInfo} /> */}
      <h2>{movieInfo.title}</h2>
      <img src={movieInfo.image} alt={`${movieInfo.title} cover photo`} height="200px"/>
      <p>Director: {movieInfo.directors}</p>
      <p>Stars: {movieInfo.stars}</p>
      <p>Plot: {movieInfo.plot}</p>
      <p>Release Date: {movieInfo.releaseDate}</p>
      <p>IMDB Rating: {movieInfo.imDbRating}</p>
      <p>Awards: {movieInfo.awards}</p>
      </>
      : null}
      <button onClick={() => 
      props.addToList({
          id: movieInfo.id,
          title: movieInfo.title, 
          rating: movieInfo.imDbRating,
          hasWatched: false, 
          removeMovie: false, 
          selected: false, 
          starScore: null,
          userDescription: null,})}>
            Add to Movie List
            </button>

    </div>
  )
}