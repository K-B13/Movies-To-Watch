import StarRating from "./StarRating"
import { useState, useEffect, useRef } from 'react'
import PlotEdit from "./PlotEdit"
import { Link } from 'react-router-dom'
import CloseIcon from './icons8-xbox-x-32.png'

export default function WatchList(props) {

  // help locate the item that is being dragged 
  const dragItem = useRef();
  const dragOverItem = useRef();
  // used to filter through the moviesToWatch list and only show the movies that match the search criteria.
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

  const dragStart = (e, position) => {
    dragItem.current = position
  }
  
  const dragEnter = (e, position) => {
    dragOverItem.current = position
  }

  const drop = (e) => {
    const copyMovieList = [...props.moviesToWatch];
    const dragItemContent = copyMovieList[dragItem.current];
    copyMovieList.splice(dragItem.current, 1)
    copyMovieList.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    props.setMoviesToWatch(copyMovieList)
  }
  // on load checks to see if the moviesToWatch is empty if it isn't then setFilteredList to the contents of moviesToWatch else set it to an empty string filteredList will be what is used to render the page.
  useEffect(() => {
    const moviesToSpread = props.moviesToWatch ? props.moviesToWatch: ""
    setFilteredList([...moviesToSpread])}
  ,[props.moviesToWatch])

  //maps over the filtered list and for each one displays information from each array item: title, image, genres, content rating and imdb rating. Also reveals some buttons on the side that can remove select and set a movie as watched.
  const renderMovieList = filteredList.map((item, index) => {
    return (
    <div key={item.id}
    onDragStart = {(e) => dragStart(e, index)}
    onDragEnter = {(e) => dragEnter(e, index)}
    onDragEnd = {drop}
    >
    <div 
    className={`movie ${item.starScore ? "watched": "not-watched-yet"} ${item.selected ? "currently-selected": "not-selected"}`} 
    >
      <div className="movie-cards">

        <p className="list-image"><img src={item.image} height="180px" width="160px"></img></p>

        &nbsp; 

        <div className="list-info">
        {/* Makes the title a link to the dynamic route.*/}
          <Link to={`/${item.id}`}>
            <p >{item.title}</p>
          </Link>

          <p>Year: {item.year}</p>
          <p>Rating: {item.rating}</p>
          <p>
          {item.genres.map((genre, index) => {
            return  <span key={index}>&nbsp; {genre.text} &nbsp;</span>
          })}
          </p>
        </div>
      
        &nbsp;

        <div className="list-buttons">
          {/*The button which when clicked triggers the function remove single which is in the app.js file. The index of the movie item is passed as a parameter so remove single can locate the movie in the moviesToWatch array. */}
          <button 
          className="close-single-button"
          onClick={() => props.removeSingle(index)}>
            <img src={CloseIcon} alt="an Icon" />
          </button>

          {/*Passes the movie index into a function called select button which is in app.js. This function locates the movie in moviesToWatch and toggles the key selected of the movie in question. */}
          <button onClick={() => props.selectButton(index)}>Select</button>

          {/*This button triggers a function in app.js that will change the seleceted movies key called hasWatched from either false to true or viceversa. */}
          <button onClick={() => props.revealStars(item,index)}
          >Watched</button>
      
      
        </div>

      </div>
      {/*if the movie's hasWatched is true then the starRating component is show and passed some information about the movie. */}
      {item.hasWatched && <StarRating item={item} reRender={props.triggerReRender} />} 
      {/*if the movie has a star score then the button to view the plot to edit it will be revealed. */}
      {item.starScore !== 0 && item.hasWatched && <button 
      onClick={() => {
        item.revealPlot = !item.revealPlot
        props.triggerReRender()
        }}
      >

        {!item.revealPlot ? "Reveal": "Hide"}
      </button>}

      <br />
      {/*if reveal plot has been turned to true and there is a star score then the component plotEdit will shown and will be passed the movies information. */}
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