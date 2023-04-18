export default function Form(props) {
  return(
    <form onSubmit={(e) => {
      props.submitSearchValue2(e)
    }}>
      <input 
      placeholder="Search"
      value={props.searchValue2}
      onChange={(e) => props.searchBarValue2(e.target.value)}
      ></input>
    </form>
  )
}