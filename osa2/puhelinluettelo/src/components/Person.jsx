const Person = ({ name, number, id, onClick }) => {
    return(
        <div key={name}> 
            {name} {number}
            <button type="button" onClick={(e) => onClick(id, name)}> delete</button>
        </div>
    )

}
export default Person