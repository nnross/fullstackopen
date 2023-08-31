const Course = ({ courses }) => {
    const list = [];
    for (let i = 0; i < courses.length; i++) {
      list.push(
        <div key={courses[i].id}>
          <Header name={courses[i].name} />
          <Content courses={courses[i]} />
          <Total parts={courses[i].parts} />
        </div>
      )
    }
    return(
      <div>
        {list}
      </div>
    )
  }

  const Header = ({ name }) => {
    return(
      <h2>{name}</h2>
    )
  }
  
  const Part = ({ part }) => {
    return(
      <div>
        <p> {part.name} {part.exercises} </p>
      </div>
    )
  }
  
  const Content = ({ courses }) => {
    return(
      <div>
        {courses.parts.map(part => 
            <Part key={part.id} part={part} />
          )}
      </div>
    )
  }
  
  const Total = ({ parts }) => {
    const exercises = parts.map(part => 
      part.exercises
    )
  
    const initialValue = 0;
    const total = 
      exercises.reduce( (accumulator, currentValue) => accumulator + currentValue, initialValue )
  
    return(
      <div>
        <b> total of {total} exercises </b>
      </div>
    )
  }
    export default Course