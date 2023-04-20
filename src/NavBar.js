import { Link } from 'react-router-dom'
import Form from './Form'
export default function NavBar(props) {
  return (
    <nav>
      <Link to="/"> Home </Link>
      <Link to="/WatchList"> Movie Watch List </Link>
      <Link to="/SearchScreen">Search</Link>
      <Link to="/Misc">Misc</Link>
    </nav>
  )
}