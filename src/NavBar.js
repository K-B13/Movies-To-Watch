import { Link } from 'react-router-dom'
import Form from './Form'
export default function NavBar(props) {
  return (
    <nav>
      <Link to="/"> Home </Link>
      <Link to="/WatchList"> Movie Watch List </Link>
      <Form 
      searchBarValue2={props.searchBarValue}
      searchValue2={props.searchValue}
      submitSearchValue2={props.submitSearchValue}
      />
    </nav>
  )
}