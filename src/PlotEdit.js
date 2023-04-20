import AutosizeInput from 'react-input-autosize'
import { useState, useEffect } from 'react'
export default function PlotEdit(props) {
  const [inputValue, setInputValue] = useState(
    // const test = props.editedPlots.filter((str) => str.id === props.movieInfo.id) ?
    // test[0].id:
    ""
    // props.handlePlotChanges2(props.movieInfo)
  )
  useEffect(() =>{
    const hasLocalStorage = localStorage.getItem('moviesToWatch')
    if (hasLocalStorage){
    const movieList = JSON.parse(localStorage.getItem('moviesToWatch'))
    const movieHasUserPlot = movieList.filter((movie) => movie.userDescription && (movie.id === props.movieInfo.id))
    setInputValue(movieHasUserPlot.length ? movieHasUserPlot[0].userDescription: props.movieInfo.plot)
    }
    else setInputValue(props.movieInfo.plot)
  },[])
  
  /*`${props.editedPlots.filter((str) => str.id === props.movieInfo.id)}`*/ 
  
    // useEffect(() => {
    //   props.editedPlots.filter((str) => 
    //     str.id === props.movieInfo.id
    //   )}, [])/* ? setInputValue(`${props.editedPlots[0].plot}`): setInputValue(`${props.movieInfo.plot}`)
    // }, [])
  function changePlot(e, plotText) {
    e.preventDefault()
    const movieList = JSON.parse(localStorage.getItem('moviesToWatch'))
    const updatedMovieList = movieList.map((movie) =>  {
      if(movie.id === props.movieInfo.id) movie.userDescription = plotText
      return movie 
    })
    
    localStorage.setItem(`moviesToWatch`, JSON.stringify(updatedMovieList))
    
    setInputValue(plotText)
    
  }
  
  return(
    <>
    <form onSubmit={(e) => {
      console.log(inputValue)
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