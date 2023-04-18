import StarRating from "./StarRating"

export default function WatchList(props) {
  const renderMovieList = props.moviesToWatch.map((item, index) => {
    return (
    <>
    <div 
    className={`movie ${item.starScore ? "watched": "not-watched-yet"} ${item.selected ? "currently-selected": "not-selected"}`} 
    
    key={item.id}
    >
      <p>{index + 1}</p>
      &nbsp; 

      <p>{item.title}</p>
      &nbsp;

      <button onClick={() => props.removeSingle(index)}>Remove</button>

      <button onClick={() => props.selectButton(index)}>Select</button>

      {item.hasWatched ? null: <button onClick={() => props.revealStars(item,index)}
      >Watched</button>
      }
      {item.hasWatched && <StarRating item={item} reRender={props.triggerReRender} />} 
      
      
      </div>
      <hr/>
      </>
  )
  })
  return (
    <>
      <h2>Watch List</h2>
      <select onChange={(e)=> props.filterForNotWatched(e)}>
        <option value={1}>All</option>
        <option value={2}>Movies to watch</option>
        <option value={3}>Rated movies</option>
      </select>
      <button onClick={props.removeSelected}>Remove Selected</button>
      <button onClick={props.removeAll}>Remove All</button>
      {renderMovieList}
    </>
  
  )
}