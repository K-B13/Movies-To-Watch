export default function WatchList(props) {
  const test = props.moviesToWatch.map((item) => {
    return <div key={item.id}>{item.title}</div>
  })
  return (
    <>
      <h2>Watch List</h2>
      {test}
    </>
  
  )
}