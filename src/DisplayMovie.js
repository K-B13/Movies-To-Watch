export default function DisplayMovie({ appendMovie, items }) {
  return (
    <>
      <div><img src={items.image} alt={items.title} width="100px" /></div>
      <div>
        <p>{items.title}</p>
        <p>{items.year}</p>
        <p>{items.imDbRating}</p>
        <button onClick={() => appendMovie({items, hasWatched: false, removeMovie: false, selected: false, starScore: null})}>Click to add to list</button>
      </div>
    </>
  )
}