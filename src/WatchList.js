import StarRating from "./StarRating"
import { useState, useEffect } from 'react'
import PlotEdit from "./PlotEdit"
import { Link } from 'react-router-dom'
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

  useEffect(() =>
    setFilteredList([...props.moviesToWatch])
  ,[props.moviesToWatch])

  const renderMovieList = filteredList.map((item, index) => {
    return (
    <div key={item.id}>
    <div 
    className={`movie ${item.starScore ? "watched": "not-watched-yet"} ${item.selected ? "currently-selected": "not-selected"}`} 
    >
      <div className="movie-cards">
      <p>{index + 1}</p>
      &nbsp; 

      <Link to={`/${item.id}`}><p>{item.title}</p></Link>
      &nbsp;
      <div className="list-buttons">
        <button onClick={() => props.removeSingle(index)}>Remove</button>

        <button onClick={() => props.selectButton(index)}>Select</button>

      {/*{item.hasWatched ? null:*/} <button onClick={() => props.revealStars(item,index)}
      >Watched</button>
      
      {/* } */}
      </div>
      </div>
      {item.hasWatched && <StarRating item={item} reRender={props.triggerReRender} />} 
      {item.starScore ? 
      <button 
      onClick={() => {
        setrevealPlot(!revealPlot)
        }}
      >
        Click
      </button>
      : null}
      <br />
      {revealPlot && item.starScore !== 0 && <PlotEdit 
      movieInfo={item} 
      editedPlots={props.changedPlots}
      // handlePlotChanges2={props.handlePlotChanges}
      />}
      </div>
      <hr/>
      </div>
  )
  })
  return (
    <>
      <h2>Watch List</h2>
      <div><select onChange={(e)=> filterTheList(e)}>
        <option value={1}>All</option>
        <option value={2}>Movies to watch</option>
        <option value={3}>Rated movies</option>
      </select>
        <button onClick={props.removeSelected}>Remove Selected</button>
        <button onClick={props.removeAll}>Remove All</button>
      </div>
      {renderMovieList}
    </>
  
  )
}