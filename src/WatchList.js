import StarRating from "./StarRating"

export default function WatchList(props) {
  const renderMovieList = props.moviesToWatch.map((item, index) => {
    return (
    <div 
    className={`movie ${item.starScore ? "watched": "not-watched-yet"}`} 
    
    key={item.items.id}
    >
      <p>{index + 1}</p>
      &nbsp; 

      <p>{item.items.title}</p>
      &nbsp;

      <button onClick={() => props.removeSingle(index)}>Remove</button>

      <button onClick={() => props.selectButton(index)}>Select</button>

      {item.hasWatched ? null: <button onClick={() => props.revealStars(item,index)}
      >Watched</button>
      }
      {item.hasWatched && <StarRating item={item} />} 
      
      <hr/>
      </div>
  )
  })
  return (
    <>
      <h2>Watch List</h2>
      <select>
        <option>All</option>
        <option>Movies to watch</option>
        <option>Rated movies</option>
      </select>
      <button onClick={props.removeSelected}>Remove Selected</button>
      <button onClick={props.removeAll}>Remove All</button>
      {renderMovieList}
    </>
  
  )
}