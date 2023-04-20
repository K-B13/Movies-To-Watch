import Form from './Form'
import { useState } from 'react'
import DisplayMovie from './DisplayMovie'

export default function SearchScreen(props) {
  const [ detMovieInfo, setDetMovieInfo ] = useState([])

  //submits what is in the nav searchbar
  function submitSearchValue(e) {
    e.preventDefault()
    console.log(props.searchValue)
    fetch(`https://imdb-api.com/en/API/SearchMovie/k_sn8009mj/${props.searchValue}`)
    .then((response) => response.json())
    .then((result) => {
    console.log(result.results)
    setDetMovieInfo(result.results)
    // result.results.map((items) => {
    // return(<DisplayMovie 
    // items={items} 
    // key={items.id} />)})
  })
    props.setSearchValue("")
  }
  return(
    <div className="search-body">
      <Form 
      searchBarValue2={props.searchBarValue}
      searchValue2={props.searchValue}
      submitSearchValue={submitSearchValue}
      />
      <div className='selection-screen'>{
          detMovieInfo.length ? 
          detMovieInfo.map((items) => {
          //  props.moviesToWatch.find((check)=> 
          // console.log(check.items.id === items.id))? null:
          return(<DisplayMovie  
          items={items} 
          key={items.id}/>)
        }) : null
      }
        </div>
    </div>
  )
}