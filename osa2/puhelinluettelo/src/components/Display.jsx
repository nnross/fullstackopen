const Display = ({ persons, newFilter }) => {
    const list = [];
    if(newFilter == undefined || newFilter == ''){
      for(let i = 0; i < persons.length; i++) {
        list.push(<div key={persons[i].name}> {persons[i].name} {persons[i].number}</div>)
      }
    }
    else{
      for(let i = 0; i < persons.length; i++) {
        if(persons[i].name.toLowerCase().includes(newFilter.toLowerCase())){
          list.push(<div key={persons[i].name}> {persons[i].name} {persons[i].number}</div>)
        }
      }
    }
    return(
      <div>
        {list}
      </div>
    ) 
  }

export default Display