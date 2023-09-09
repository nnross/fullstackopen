import Country from './Country'

const Display = ({ countries, filteredList, newFilter }) => {
    if (filteredList.length < 10 && filteredList.length > 1) {
        return(
            <div>
                {filteredList}
            </div>
        )
        }
    if (filteredList.length == 1) {
        return(
        <Country list={filteredList[0].key} countries={countries} />
        )
    }
    if (filteredList.length >= 10 && newFilter != '') {
        return(
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    else{
        return null;
    }
}

export default Display