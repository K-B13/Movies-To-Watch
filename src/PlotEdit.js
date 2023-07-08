import AutosizeInput from 'react-input-autosize'
import { useState, useEffect } from 'react'
export default function PlotEdit(props) {
  const [inputValue, setInputValue] = useState(
    ""
  )
  useEffect(() =>{
    const hasLocalStorage = localStorage.getItem('moviesToWatch')
    if (hasLocalStorage){
    const movieList = JSON.parse(localStorage.getItem('moviesToWatch'))
    const movieHasUserPlot = movieList.filter((movie) => movie.userDescription && (movie.id === props.movieInfo.id))
    setInputValue(movieHasUserPlot.length ? movieHasUserPlot[0].userDescription:
      props.movieInfo.plot.plotText ?
      props.movieInfo.plot.plotText.plainText
      :props.movieInfo.plot
    )
    }
    else setInputValue(props.movieInfo.plot.plotText.plainText)
  },[])
  
  function changePlot(e, plotText) {
    e.preventDefault()
    const movieList = JSON.parse(localStorage.getItem('moviesToWatch'))
    const updatedMovieList = movieList.map((movie) =>  {
      if(movie.id === props.movieInfo.id) {movie.userDescription = plotText}
      return movie 
    })
    
    localStorage.setItem(`moviesToWatch`, JSON.stringify(updatedMovieList))
    setInputValue(plotText)
  }
  
  return(
    <>
    <form onSubmit={(e) => {
      changePlot(e, inputValue)
      }}>
      <AutosizeInput 
      type="text"
      onChange={(e) => setInputValue(e.target.value)}
      className="plot-value"
      value={inputValue}>

      </AutosizeInput>
    </form>
    </>
  )
}