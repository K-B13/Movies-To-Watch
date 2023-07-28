import { useState, useEffect } from 'react'
import DisplayMovie from './DisplayMovie'
import leftArrow from './left-arrow.png'
import rightArrow from './right-arrow.png'
import leftEnd from './left-end.png'
import rightEnd from './right-end.png'

export default function Home(props) {
  // Saves the top 10 movies for the start screen
  const [ startScreen, setStartScreen ] = useState({
    results: []
  })

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

  const pageStart = () => {
    if(pageNumber !== 1) {
      setPageNumber(1)
    }
  }

  const pageDown = () => {
    if(pageNumber !== 1) {
      setPageNumber(pageNumber - 1)
    }
  }

  const pageUp = () => {
    if(pageNumber !== 20) {
      setPageNumber(pageNumber + 1)
    }
  }
  
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
      <div className='arrows'><button
      onClick={pageStart}
        ><img src={leftEnd}/></button></div>
        <div className='arrows'><button
        onClick={pageDown}
        ><img src={leftArrow}/></button></div>
        <div className='page-number'><p>{pageNumber}</p></div>
        <div className='arrows'><button
        onClick={pageUp}
        ><img src={rightArrow}/></button></div>
        <div className='arrows'><button
        onClick={pageEnd}
        ><img src={rightEnd}/></button></div>
      </div>
    </div>
  
) 
}