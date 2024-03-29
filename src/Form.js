
export default function Form(props) {
  return(
    <form onSubmit={(e) =>
      props.submitSearchValue(e, props.searchValue2)
    }>
      <input 
      placeholder="Search"
      value={props.searchValue2}
      onChange={(e) => props.searchBarValue2(e.target.value)}
      ></input>
      
    </form>
  )
}