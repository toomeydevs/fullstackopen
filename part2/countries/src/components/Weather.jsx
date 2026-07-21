import { useEffect, useState } from 'react'
import weatherService from '../services/weather'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    setWeather(null)
    setError(null)

    weatherService
      .getWeatherByCity(capital)
      .then(weatherData => {
        setWeather(weatherData)
      })
      .catch(error => {
        console.error('Error fetching weather data:', error)
        setError('Weather information is currently unavailable')
      })
  }, [capital])

  if (error) {
    return <p>{error}</p>
  }

  if (!weather) {
    return <p>Loading weather...</p>
  }

  const currentCondition = weather.weather[0]
  const iconUrl = `https://openweathermap.org/img/wn/${currentCondition.icon}@2x.png`

  return (
    <div>
      <h2>Weather in {capital}</h2>

      <p>temperature {weather.main.temp} °C</p>

      <img
        src={iconUrl}
        alt={currentCondition.description}
      />

      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather