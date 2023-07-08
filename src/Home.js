import { useState, useEffect } from 'react'
import DisplayMovie from './DisplayMovie'

export default function Home(props) {
  //Saves the top 250 movies for the start screen
  const [ startScreen, setStartScreen ] = useState({
    results: []
  })
  //fetch request for top 250 on page load.
  useEffect(() => {
    fetch("https://moviesdatabase.p.rapidapi.com/titles?list=top_boxoffice_200&page=1&info=base_info",
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
  }, [])
  
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
    </div>
  
) 
}