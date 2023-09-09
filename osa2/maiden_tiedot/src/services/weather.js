import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY
const weatherUrl = 'https://api.openweathermap.org/data/2.5'

const getWeather = (lat, lng) => {
    return axios.get(`${weatherUrl}/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`)
}

export default { getWeather }