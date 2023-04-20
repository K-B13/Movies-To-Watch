import StarRating from "./StarRating"
import { useState, useEffect } from 'react'
import PlotEdit from "./PlotEdit"
import { Link } from 'react-router-dom'
import CloseIcon from './icons8-xbox-x-32.png'

export default function WatchList(props) {
  const [ revealPlot, setrevealPlot ] = useState(false)

  const [filteredList, setFilteredList] = useState([])
  function filterTheList(e) {
    if(e.target.value === "1"){
      setFilteredList(props.moviesToWatch)
    } else if(e.target.value === "2"){
      setFilteredList(props.moviesToWatch.filter((str) => str.starScore === 0))
    } else{
      setFilteredList(props.moviesToWatch.filter((str) => str.starScore !== 0))
    }
  }

  useEffect(() => {
    const moviesToSpread = props.moviesToWatch ? props.moviesToWatch: ""
    setFilteredList([...moviesToSpread])}
  ,[props.moviesToWatch])


  const renderMovieList = filteredList.map((item, index) => {
    return (
    <div key={item.id}>
    <div 
    className={`movie ${item.starScore ? "watched": "not-watched-yet"} ${item.selected ? "currently-selected": "not-selected"}`} 
    >
      <div className="movie-cards">
      <p className="list-image"><img src={item.image} height="180px" width="160px"></img></p>
      &nbsp; 
      <div className="list-info">
      <Link to={`/${item.id}`}>
        <p >{item.title}</p>
        </Link>
        <p>Year: {item.year}</p>
        <p>IMDB rating: {item.rating}</p>
        <p>Content Rating: {item.contentRating}</p>
        <p>Genres: {item.genres}</p>
      </div>
      
      
      &nbsp;
      <div className="list-buttons">
        <button 
        className="close-single-button"
        onClick={() => props.removeSingle(index)}>
          <img src={CloseIcon} alt="an Icon" />
          </button>

        <button onClick={() => props.selectButton(index)}>Select</button>

      <button onClick={() => props.revealStars(item,index)}
      >Watched</button>
      
      
      </div>
      </div>
      {item.hasWatched && <StarRating item={item} reRender={props.triggerReRender} />} 
      {item.starScore !== 0 && <button 
      onClick={() => {
        item.revealPlot = !item.revealPlot
        props.triggerReRender()
        }}
      >
        {!item.revealPlot ? "Reveal": "Reset"}
      </button>}
      <br />
      {item.revealPlot && item.starScore !== 0 && <PlotEdit 
      movieInfo={item} 
      />}
      </div>
      <hr/>
      </div>
  )
  })
  return (
    <div className="list-background">
      <h2>Watch List</h2>
      <div><select onChange={(e)=> filterTheList(e)}>
        <option value={1}>All</option>
        <option value={2}>Movies to watch</option>
        <option value={3}>Rated movies</option>
      </select>
        <button className="watchList-button" onClick={props.removeSelected}>Remove Selected</button>
        <button className="watchList-button" onClick={props.removeAll}>Remove All</button>
      </div>
      {renderMovieList}
    </div>
  
  )
}