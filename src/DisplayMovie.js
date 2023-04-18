import { Link } from 'react-router-dom'


export default function DisplayMovie({ appendMovie, items }) {
  return (
    <div>
      <div>
      <Link to={`/${items.id}`}>
          
          <img src={items.image} alt={items.title} width="100px" />

      </Link>

      </div>
      <div>
        <p>{items.title}</p>
        <p>{items.year}</p>
        <p>{items.imDbRating}</p>
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