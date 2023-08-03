import Form from './Form'
import { useState, useEffect } from 'react'
import DisplayMovie from './DisplayMovie'
import { HashLink } from 'react-router-hash-link'
import leftArrow from './left-arrow.png'
import rightArrow from './right-arrow.png'
import leftEnd from './left-end.png'


export default function SearchScreen(props) {
  //state that stores the information of the search result movies that is graabed via the fetch request
  const [ detMovieInfo, setDetMovieInfo ] = useState({
    results: []
  })

  // storing the page number for the api call to get a different page of movies
  const [ pageChange, setPageChange ] = useState({
    number: 1,
    searchRequest: ""
  })

  //submits what is in the nav searchbar to a fetch request then stores it in detMovieInfo
  function submitSearchValue(e, search) {
    e.preventDefault()
    fetch(`https://moviesdatabase.p.rapidapi.com/titles/search/title/${search}?info=base_info&page=${pageChange.number? pageChange.number: 1}`,
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
  }

  useEffect(() => {
    pageChange.searchRequest = props.searchValue
    setPageChange(pageChange)
  }, [detMovieInfo])

    // Function that resets page number to one. There is a check making sure the page number is not already one so an uneccessary api call is not made.
    const pageStart = (e) => {
      if(pageChange.number !== 1) {
        pageChange.number = 1;
        setPageChange(pageChange)
        submitSearchValue(e, pageChange.searchRequest)
      }
    }
  
      // Function that goes down a page number by one. There is a check making sure the page number is not one so the number cannot go to zero.
    const pageDown = (e) => {
      if(pageChange.number !== 1) {
        pageChange.number -= 1;
        setPageChange(pageChange);
        submitSearchValue(e, pageChange.searchRequest)
      }
    }
  
        // Function that goes up a page number by one. There is a check making sure the page number is not twenty so the number cannot go past 20 as the api cannot make a call for page 21.
    const pageUp = (e) => {
      if(pageChange.number !== 20) {
        pageChange.number += 1
        setPageChange(pageChange)
        submitSearchValue(e, pageChange.searchRequest)
      }
    }
    
          // Function that goes to page twenty. There is a check making sure the page number is not already twenty so an uneccessary api call is made.
    const pageEnd = (e) => {
      if(pageChange.number !== 20) {
        pageChange.number = 20
        setPageChange(pageChange)
        submitSearchValue(e, pageChange.searchRequest)
      }
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
        {detMovieInfo.results.length ? <div className='pagination'>
        <HashLink to='#'className='arrows'>
          <button
          onClick={pageStart}
          >
            <img src={leftEnd}/>
          </button>
        </HashLink>
        <HashLink to='#'className='arrows'>
          <button
          onClick={pageDown}
          >
            <img src={leftArrow}/>
          </button>
        </HashLink>
        <div className='page-number'><p>{pageChange.number}</p></div>
        {detMovieInfo.next ? <HashLink 
        to='#' 
        className='arrows'>
          <button
          onClick={pageUp}
          >
            <img src={rightArrow}/>
          </button>
        </HashLink>: <div className='hiddenArrow'></div>}
        <div className='hiddenArrow'></div>
      </div>: null }
    </div>
  )
}