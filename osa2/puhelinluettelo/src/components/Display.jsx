import Person from './Person'

const Display = ({ persons, newFilter, onDelete }) => {
    const list = [];
    if(newFilter == undefined || newFilter == ''){
      for(let i = 0; i < persons.length; i++) {
        list.push(
          <Person key={persons[i].id} id={persons[i].id} name={persons[i].name} number={persons[i].number} onClick={onDelete}/>
        )
      }
    }
    else{
      for(let i = 0; i < persons.length; i++) {
        if(persons[i].name.toLowerCase().includes(newFilter.toLowerCase())){
          list.push(
            <Person key={persons[i].id} id={persons[i].id} name={persons[i].name} number={persons[i].number} onClick={onDelete}/>
          )
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