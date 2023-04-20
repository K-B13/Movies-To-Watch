import { useState, useEffect } from 'react'
import DisplayMovie from './DisplayMovie'

export default function Home(props) {
  //Saves the top 250 movies for the start screen
  const [ startScreen, setStartScreen ] = useState([])
  //fetch request for top 250 on page load.
  useEffect(() => {
    fetch("https://imdb-api.com/en/API/Top250Movies/k_sn8009mj")
    .then((response) => response.json())
    .then((result) => {
      setStartScreen(result.items)
      console.log(result)
    }) 
  }, [])
  //button for testing purposes so I can see what is in the movielist array.
  function test() {
    console.log(props.moviesToWatch)
  }
  
  return (
    <div className="home-body">
    {/* The test button */}
      <button onClick={test}>Click</button>
    {/* Maps through the array saved in startScreen if there is something in it else it does nothing */}
      <div className='selection-screen'>
        { startScreen.length ? 
        startScreen.map((items) => {
        //  props.moviesToWatch.find((check)=> 
        // console.log(check.items.id === items.id))? null:
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