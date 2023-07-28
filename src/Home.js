import { useState, useEffect } from 'react'
import DisplayMovie from './DisplayMovie'
import leftArrow from './left-arrow.png'
import rightArrow from './right-arrow.png'
import leftEnd from './left-end.png'
import rightEnd from './right-end.png'
import { HashLink } from 'react-router-hash-link'

export default function Home(props) {
  // Saves the top 10 movies for the start screen
  const [ startScreen, setStartScreen ] = useState({
    results: []
  })

  // storing the page number for the api call to get a different page of movies
  const [ pageNumber, setPageNumber ] = useState(1)

  //fetch request for top 10 on page load.
  useEffect(() => {
    fetch(`https://moviesdatabase.p.rapidapi.com/titles?list=top_boxoffice_200&page=${pageNumber}&info=base_info`,
    {method: 'GET',
    headers: {
      'X-RapidAPI-Key': '5a228db667msh9299db463912126p12f305jsn6cf00c2afa46',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  }
    )
    .then((response) => response.json())
    .then((result) => {
      setStartScreen(result)
    }) 
  }, [pageNumber])

  // Function that resets page number to one. There is a check making sure the page number is not already one so an uneccessary api call is not made.
  const pageStart = () => {
    if(pageNumber !== 1) {
      setPageNumber(1)
    }
  }

    // Function that goes down a page number by one. There is a check making sure the page number is not one so the number cannot go to zero.
  const pageDown = () => {
    if(pageNumber !== 1) {
      setPageNumber(pageNumber - 1)
    }
  }

      // Function that goes up a page number by one. There is a check making sure the page number is not twenty so the number cannot go past 20 as the api cannot make a call for page 21.
  const pageUp = () => {
    if(pageNumber !== 20) {
      setPageNumber(pageNumber + 1)
    }
  }
  
        // Function that goes to page twenty. There is a check making sure the page number is not already twenty so an uneccessary api call is made.
  const pageEnd = () => {
    if(pageNumber !== 20) {
      setPageNumber(20)
    }
  }

  return (
    <div className="home-body">
    {/* Maps through the array saved in startScreen if there is something in it else it does nothing. If there is something in it the map creates a DisplayMovie component and feeds it the information for the movie the map is on in the array. */}
      <div className='selection-screen'>
        { startScreen.results.length ? 
        startScreen.results.map((items) => {
        return(<DisplayMovie 
        appendMovie={props.addToList} 
        items={items} 
        key={items.id}/>)
      }) : null
    }
      </div>
      <div className='pagination'>
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
        <div className='page-number'><p>{pageNumber}</p></div>
        <HashLink to='#'className='arrows'>
          <button
          onClick={pageUp}
          >
            <img src={rightArrow}/>
          </button>
        </HashLink>
        <HashLink to='#'className='arrows'>
          <button
          onClick={pageEnd}
          >
            <img src={rightEnd}/>
          </button>
        </HashLink>
      </div>
    </div>
  
) 
}