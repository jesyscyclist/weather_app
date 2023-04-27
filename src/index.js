import { currentWeatherDataOpenWeather as weatherApiData } from './js/ApiFromWeatherService/weatherApi.js'
import { currentWeatherDataOpenWeather as openWeatherMapData } from './js/ApiFromWeatherService/openWeatherMap.js'
import { currentWeatherOpenMeteo as openMeteoData } from './js/ApiFromWeatherService/tomorrowIo.js'

import { currentGeoPositionRequest } from './js/currentGeo.js'

async function log() {
  const forecastHour = 14
  const needlessTime = { year: 2023, month: 4, day: 28, hour: 14 }
  const currentPosition = await currentGeoPositionRequest()

  const weatherData = await Promise.allSettled([
    openWeatherMapData(currentPosition, needlessTime),
    weatherApiData(currentPosition, needlessTime),
    openMeteoData(currentPosition, needlessTime),
  ])
  weatherData.forEach((item) => console.log(item.value.currentObjData))
  weatherData.forEach((item) => console.log(item.value.forecastObjData))
}

//log()
