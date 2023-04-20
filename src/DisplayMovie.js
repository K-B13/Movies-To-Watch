import { Link } from 'react-router-dom'


export default function DisplayMovie({ items }) {
  return (
    <div className="each-card">
      <div>
        {/*Link to the dynamic route that is rendered */}
      <Link to={`/${items.id}`}>
          <img src={items.image} alt={items.title} width="100px" />

      </Link>

      </div>
      <div className="card-info">
        <p>{items.title}</p>
        <p>{items.year}</p>
        {items.imDbRating ?<p>{items.imDbRating}</p>: null}
        {/* <button onClick={() => {
          appendMovie({items, 
          hasWatched: false, 
          removeMovie: false, 
          selected: false, 
          starScore: null,
          userDescription: null,
        })
        
          }
          }
          >
            Click to add to list
          </button> */}
      </div>
    </div>
  )
}