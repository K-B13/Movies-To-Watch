import { useState } from 'react'

export default function Misc() {
  const [store, setStore ] = useState("")
  return(
    <>
    <h2>Extra Functions</h2>
    <div className='misc-buttons'>
      <p>If you need an excuse to get out of an event to watch your favorite move click Get Excuse.</p>
      <button onClick={() =>
      fetch("https://excuser-three.vercel.app/v1/excuse")
      .then((response)=> response.json())
      .then((result) => setStore(result[0].excuse))
    } 
      >Get Excuse</button>
      <button onClick={() =>
      fetch("https://api.chucknorris.io/jokes/random")
      .then((response) => response.json())
      .then((result) => setStore(result.value))
      }
      >Chuck Norris</button>
    <button onClick={() =>
      fetch("https://api.kanye.rest")
      .then((response) => response.json())
      .then((result) => setStore(result.quote))
      }
      >Quotes</button>
      {store ? <p>{store}</p>: null}
    </div>
    
    </>
  )
}