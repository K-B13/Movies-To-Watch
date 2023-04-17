import { useState, useEffect } from 'react'
import DisplayMovie from './DisplayMovie'

export default function Home(props) {
  const [ startScreen, setStartScreen ] = useState([])
  useEffect(() => {
    fetch("https://imdb-api.com/en/API/Top250Movies/k_sn8009mj")
    .then((response) => response.json())
    .then((result) => {
      console.log(result.items)
      setStartScreen(result.items)
    }) 
  }, [])
  
  function test() {
    console.log(startScreen)
    console.log(props.moviesToWatch)
  }
  
  return (
    <>
      <button onClick={test}>Click</button>
  
      <div className='selection-screen'>
        { startScreen.length ? 
        startScreen.map((items) => {
        return <DisplayMovie appendMovie={props.addToList} items={items} key={items.id}/>
      }) : null
    }
      </div>
    </>
  
) 
}