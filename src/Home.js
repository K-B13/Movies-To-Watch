import { useState, useEffect } from 'react'
import DisplayMovie from './DisplayMovie'

export default function Home(props) {
  const [ startScreen, setStartScreen ] = useState([])
  useEffect(() => {
    fetch("https://imdb-api.com/en/API/Top250Movies/k_sn8009mj")
    .then((response) => response.json())
    .then((result) => {
      setStartScreen(result.items)
      console.log(result)
    }) 
  }, [])
  
  function test() {
    console.log(props.moviesToWatch)
  }
  
  return (
    <>
      <button onClick={test}>Click</button>
  
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
    </>
  
) 
}