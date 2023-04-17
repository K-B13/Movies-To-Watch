export default function WatchList(props) {
  function test(index) {
    console.log(index)
  }
  const renderMovieList = props.moviesToWatch.map((item, index) => {
    return (
    <div 
    className={"movie"} 
    key={item.items.id}
    >
      <p>{index + 1}</p>
      &nbsp; 
      <p>{item.items.title}</p>
      &nbsp;
      <button onClick={() => /*test({index})}*/ props.removeSingle(index)}>Remove</button>
      <button onClick={() => props.selectButton(index)}>Select</button>
      <hr/>
      </div>
  )
  })
  return (
    <>
      <h2>Watch List</h2>
      <button onClick={props.removeSelected}>Remove Selected</button>
      {renderMovieList}
    </>
  
  )
}