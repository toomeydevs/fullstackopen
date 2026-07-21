import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = import.meta.env.VITE_WEATHER_KEY

const getWeatherByCity = city => {
  const requestUrl = `${baseUrl}?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`

  return axios
    .get(requestUrl)
    .then(response => response.data)
}

export default {
  getWeatherByCity
}