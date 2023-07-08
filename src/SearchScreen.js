import Form from './Form'
import { useState } from 'react'
import DisplayMovie from './DisplayMovie'

export default function SearchScreen(props) {
  //state that stores the information of the search result movies that is graabed via the fetch request
  const [ detMovieInfo, setDetMovieInfo ] = useState({
    results: []
  })

  //submits what is in the nav searchbar to a fetch request then stores it in detMovieInfo
  function submitSearchValue(e) {
    e.preventDefault()
    fetch(`https://moviesdatabase.p.rapidapi.com/titles/search/title/${props.searchValue}?info=base_info`,
    {method: 'GET',
    headers: {
      'X-RapidAPI-Key': '5a228db667msh9299db463912126p12f305jsn6cf00c2afa46',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  })
    .then((response) => response.json())
    .then((result) => {
    setDetMovieInfo(result)
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
          detMovieInfo.results.length ? 
          detMovieInfo.results.map((items) => {
            if (items.primaryImage === null) {
              items.primaryImage = 'https://img.icons8.com/?size=2x&id=j1UxMbqzPi7n&format=png'
            }
            if (items.releaseDate === null) {
              items.releaseDate = 'Not Provided'
            }
          return(<DisplayMovie  
          items={items} 
          key={items.id}/>)
        }) : null
      }
        </div>
    </div>
  )
}