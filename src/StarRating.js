import { useState } from 'react'
export default function StarRating(props) {
  const [rating, setRating] = useState(props.item.starScore);
  const [hover, setHover] = useState(0)
  return (
    <div className="star-rating">
    {[...Array(5)].map((star, index) => {
      index +=1
      return (
        <button
        type="button"
        key={index}
        className={index <= (hover || rating ) ? "rating-on": "rating-off"}
        onClick={() => {
          return(
            setRating(index)
          )
        }
        }
        onMouseEnter={() => setHover(index)}
        onMouseLeave={() => setHover(rating)}
        onDoubleClick={() => {
          setRating(0);
        }}
        >
        <span className='star'> &#9733;</span>
        </button>
      );
    })}
      <button 
      className="submit-stars"
      onClick={() => {
        props.item.starScore = rating
        props.reRender()
        console.log(props.item)
      }}>Submit</button>
    </div>
  )
}