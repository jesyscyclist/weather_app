import { currentWeatherDataOpenWeather as weatherApiData } from './js/Api/weatherApi.js'
import { currentWeatherDataOpenWeather as openWeatherMapData } from './js/Api/openWeatherMap.js'
import { currentWeatherOpenMeteo as openMeteoData } from './js/Api/meteostatApi.js'

import { currentGeoPositionRequest } from './js/currentGeo.js'

async function log() {
  const forecastHour = 14
  const needlessTime = { year: 2023, month: 4, day: 27, hour: 14 }
  const currentPosition = await currentGeoPositionRequest()

  const weatherData = await Promise.allSettled([
    openWeatherMapData(currentPosition, forecastHour),
    weatherApiData(currentPosition, forecastHour),
    openMeteoData(currentPosition, needlessTime),
  ])
  console.log(weatherData)
}

log()
