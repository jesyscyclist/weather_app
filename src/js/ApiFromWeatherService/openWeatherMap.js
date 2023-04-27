import {
  roundData,
  forecastTimeString,
  currentTimeString,
} from './generalFunctionsApi.js'

//url for Api call
function urlInstall(coord) {
  const link = 'https://api.openweathermap.org/data/2.5/'
  const appiKey = '2baa06e0c482aa255b85406c646badf4'
  const urlCurrent = `${link}weather?lat=${coord.latitude}&lon=${coord.longitude}&units=metric&appid=${appiKey}`
  //5 day forecast with a 3-hour step!!!
  const urlForecast = `${link}forecast?lat=${coord.latitude}&lon=${coord.longitude}&units=metric&appid=${appiKey}`
  return { urlCurrent, urlForecast }
}

//because response has step 3 hour
function roundForecastTime(obj) {
  let neededHour = 0
  if (!(obj.hour % 3)) neededHour = obj.hour
  else if (!((obj.hour + 1) % 3)) neededHour = obj.hour + 1
  else neededHour = obj.hour - 1

  const transformObj = {}
  Object.assign(transformObj, obj)
  transformObj.hour = neededHour

  return forecastTimeString(transformObj)
}

//search for the necessary data in forecast response
function searchNecessaryData(data, hour) {
  const time = roundForecastTime(hour)
  const dataArray = Array.from(data)
  return dataArray.find((item) => item.dt_txt == time)
}

function selectingRequiredFields(obj, status, time) {
  const {
    main: { feels_like = 0, temp = 0 },
    wind: { deg = 0, speed = 0 },
    clouds: { all = 0 },
    rain = 0,
  } = obj

  const data = {
    tempFeelsLike: roundData(feels_like),
    temperature: roundData(temp),
    windDirection: deg,
    windMs: roundData(speed),
    cloud: roundData(all),
    time: status == 'forecast' ? roundForecastTime(time) : currentTimeString(),
    precipMm: rain && status == 'current' ? rain[0] : rain,
    rainChance: rain,
  }

  return data
}

// weatherapi GeoCoding Api https://www.weatherapi.com/api-explorer.aspx#current
export async function currentWeatherDataOpenWeather(coordinate, forecastTime) {
  try {
    const url = urlInstall(coordinate)

    //current response
    const responseCurrent = await fetch(url.urlCurrent)
    const responseDataCurrent = await responseCurrent.json()
    const currentObjData = selectingRequiredFields(
      responseDataCurrent,
      'current'
    )

    //forecast response
    const responseForecast = await fetch(url.urlForecast)
    const responseDataForecast = await responseForecast.json()
    const responseDataForecastNecessary = searchNecessaryData(
      responseDataForecast.list,
      forecastTime
    )
    const forecastObjData = selectingRequiredFields(
      responseDataForecastNecessary,
      'forecast',
      forecastTime
    )

    return { currentObjData, forecastObjData }
  } catch (e) {
    console.error('Error>>', e)
  }
}
