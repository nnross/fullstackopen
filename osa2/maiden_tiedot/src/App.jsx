import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import Filter from './components/Filter'
import Display from './components/Display'
import ListCountry from './components/ListCountry'

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredList, setFilteredList] = useState([])

  useEffect(() => {
    countriesService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const showCountry = (name) => {
    setFilteredList([<ListCountry key={name} name={name} onClick={showCountry} />])
  }

  const handleFilterChange = (event) => {
    const newList = []
    const filter = event.target.value;
    for(let i=0; i < countries.length; i++){
        if(countries[i].name.common.toLowerCase().includes(filter.toLowerCase())){
            newList.push(
                <ListCountry key={countries[i].name.common} name={countries[i].name.common} onClick={showCountry}> </ListCountry>
            )
        }
    }
    setNewFilter(filter)
    setFilteredList(newList);
  }

  return(
    <div>
      <h2>filter countries</h2>
      <Filter value={newFilter} onChange={(e) => handleFilterChange(e)} />
      <Display countries={countries} newFilter={newFilter} filteredList={filteredList}/>
    </div>
  )
}

export default App