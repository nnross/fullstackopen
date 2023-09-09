const ListCountry = ( { name, onClick } ) => {
    return(
        <div key={name}>
            {name}
            <button type="button" onClick={() => onClick(name)}> show </button>
        </div>
    )
}

export default ListCountry