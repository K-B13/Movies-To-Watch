export default function IndividualMovie(props) {
  <>
    <h2>{props.movieInfo.title}</h2>
    <img src={props.movieInfo.image} />
  </>
}