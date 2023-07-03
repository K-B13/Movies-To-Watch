import { Link } from 'react-router-dom'


export default function DisplayMovie({ items }) {
  return (
    <div className="each-card">
      <div>
        {/*Link to the dynamic route that is rendered. Link is on the picture */}
      <Link to={`/${items.id}`}>
          <img src={items.image ? items.image: "https://imdb-api.com/images/original/nopicture.jpg"} alt={items.title} width="100px" />

      </Link>

      </div>
      {/* Displays the information on each card. The year and imdb checks if there is anything in the card before rendering as DisplayMovies is also used by the search feature which doesn't have all of the same information. */}
      <div className="card-info">
        <p>{items.title}</p>
        <p>{items.year ? `Year: ${items.year}`: null}</p>
        {items.imDbRating ? <p>imdb Rating: {items.imDbRating}</p>: null}
      </div>
    </div>
  )
}