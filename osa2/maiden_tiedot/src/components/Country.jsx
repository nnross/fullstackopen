import weatherService from '../services/weather'
import { useState, useEffect } from 'react'

const Country = ( { list, countries }) => {
    const index = countries.findIndex(country => country.name.common === list)
    const name = countries[index].name.common
    const capital = countries[index].capital
    const area = countries[index].area
    const languages = []
    for (const [key, value] of Object.entries(countries[index].languages)){
        languages.push(<li key={value}>{value}</li>)
    }
    const flag = countries[index].flags.png
    const lat = countries[index].capitalInfo.latlng[0]
    const lng = countries[index].capitalInfo.latlng[1]
    const [temperature, setTemperature] = useState('')
    const [wind, setWind] = useState('')
    const [icon, setIcon] = useState('')

    useEffect(() => {
        weatherService
            .getWeather(lat,lng)
            .then(weather => {
                setTemperature(weather.data.main.temp)
                setWind(weather.data.wind.speed)
                setIcon(`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`)
                
            })
      }, [])
    return(
        <div>
            <h1>{name}</h1>
            <p>capital: {capital}</p>
            <p>area: {area}</p>
            <b>languages:</b>
            <ul>{languages}</ul>
            <img src={flag} />
            <h2>Weather in {capital}</h2>
            <p>temperature {temperature} Celcius</p>
            <img src={icon} />
            <p>wind {wind} m/s</p>
        </div>
    )
}

export default Country