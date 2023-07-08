import { Link } from 'react-router-dom'


export default function DisplayMovie({ items }) {
  return (
    <div className="each-card">
      <div>
        {/*Link to the dynamic route that is rendered. Link is on the picture */}
      <Link to={`/${items.id}`}>
          <img src={items.primaryImage.url !== null ? items.primaryImage.url: "https://img.icons8.com/?size=2x&id=j1UxMbqzPi7n&format=png"} alt={items.titleText.text} width="100px" />

      </Link>

      </div>
      {/* Displays the information on each card. The year and imdb checks if there is anything in the card before rendering as DisplayMovies is also used by the search feature which doesn't have all of the same information. */}
      <div className="card-info">
        <p>{items.titleText.text}</p>
        <p>{items.releaseDate.year ? `Year: ${items.releaseDate.year}`: null}</p>
        {items.ratingsSummary.aggregateRating ? <p> Rating: {items.ratingsSummary.aggregateRating}</p>: null}
      </div>
    </div>
  )
}