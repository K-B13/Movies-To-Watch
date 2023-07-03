import Form from './Form'
import { useState } from 'react'
import DisplayMovie from './DisplayMovie'

export default function SearchScreen(props) {
  //state that stores the information of the search result movies that is graabed via the fetch request
  const [ detMovieInfo, setDetMovieInfo ] = useState([])

  //submits what is in the nav searchbar to a fetch request then stores it in detMovieInfo
  function submitSearchValue(e) {
    e.preventDefault()
    console.log(props.searchValue)
    fetch(`https://imdb-api.com/en/API/SearchMovie/k_sn8009mj/${props.searchValue}`)
    .then((response) => response.json())
    .then((result) => {
    console.log(result.results)
    setDetMovieInfo(result.results)
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
      {/* if there is anything in the detMovieInfo it will be mapped creating a DisplayMovie component each iteration and passing it down the information from each iteration. */}
      <div className='selection-screen'>{
          detMovieInfo.length ? 
          detMovieInfo.map((items) => {
          return(<DisplayMovie  
          items={items} 
          key={items.id}/>)
        }) : null
      }
        </div>
    </div>
  )
}