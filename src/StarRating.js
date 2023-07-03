import { useState } from 'react'
export default function StarRating(props) {
  //state to store the locked(clicked) star rating, initially set to the value of that movie (in case already been rated, will be zero if not set.)
  const [rating, setRating] = useState(props.item.starScore);
  // stores the hover value.
  const [hover, setHover] = useState(0)
  return (
    <div className="star-rating">
      {/* creates a 5 item array with each having an index number which is +1 to usual. */}
    {[...Array(5)].map((star, index) => {
      index +=1
      return (
        <button
        type="button"
        key={index}
        /* if the star rating or star hover is greater than or equal to the index it is given the className rating-on else it is given className rating-off */
        className={index <= (hover || rating ) ? "rating-on": "rating-off"}
        onClick={() => {
          return(
            /*when a star is clicked the rating state is set to that stars index value. Which will also make all smaller index's also be given therating on className. */
            setRating(index)
          )
        }
        }
        /*on mouseover the hover rating is set to the index of the star then when it leaves the hover is set to the rating so when the hover is overthe stars remain how they were before the hover */
        onMouseEnter={() => setHover(index)}
        onMouseLeave={() => setHover(rating)}
        /*A way to reset the stars, when you doubleClick on them they go back to zero */
        onDoubleClick={() => {
          setRating(0);
        }}
        >
        <span className='star'> &#9733;</span>
        </button>
      );
    })}
    {/* button that sends the star information to the moviesToWatch and stores the value in that movies object */}
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