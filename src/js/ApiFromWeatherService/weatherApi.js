import {
  roundData,
  forecastTimeString,
  currentTimeString,
} from './generalFunctionsApi.js'

//url for Api call
//30 days!!!
function urlInstall(coord) {
  const linkForecast = 'http://api.weatherapi.com/v1/forecast.json?key='
  const appiKey = '97999080c0624b248b4120332232304'
  const days = 5
  const url = `${linkForecast}${appiKey}&q=${coord.latitude}, ${coord.longitude}&days=${days}&aqi=no&alerts=no`
  return url
}

function searchNecessaryData(array, date) {
  function zeroBefore(numb) {
    return numb < 10 ? `0${numb}` : numb
  }
  const needlessDate =
    date.year + '-' + zeroBefore(date.month) + '-' + zeroBefore(date.day)
  const needlessData = array.find((item) => item.date == needlessDate)
  const needlessHourDate = needlessDate + ' ' + zeroBefore(date.hour) + ':00'
  return needlessData.hour.find((item) => item.time == needlessHourDate)
}

function selectingRequiredFields(obj, status, time) {
  let {
    feelslike_c = 0,
    temp_c = 0,
    wind_degree = 0,
    wind_kph = 0,
    cloud = 0, //as %
    precip_mm = 0,
    rainChance = 0,
  } = obj

  const data = {
    tempFeelsLike: roundData(feelslike_c),
    temperature: roundData(temp_c),
    windDirection: wind_degree,
    windMs: roundData(wind_kph / 3.6),
    cloud: roundData(cloud),
    time: status == 'forecast' ? forecastTimeString(time) : currentTimeString(),
    precipMm: roundData(precip_mm),
    rainChance: roundData(rainChance),
  }
  return data
}

// weatherapi GeoCoding Api https://www.weatherapi.com/api-explorer.aspx#current
export async function currentWeatherDataOpenWeather(coordinate, forecastTime) {
  try {
    const url = urlInstall(coordinate)
    const response = await fetch(url)
    const responseData = await response.json()
    // console.log(responseData)

    const currentObjData = selectingRequiredFields(
      responseData.current,
      'current'
    )

    const needlessResponseDataForecast = searchNecessaryData(
      responseData.forecast.forecastday,
      forecastTime
    )
    const forecastObjData = selectingRequiredFields(
      needlessResponseDataForecast,
      'forecast',
      forecastTime
    )

    return { currentObjData, forecastObjData }
  } catch (e) {
    console.error('Error>>', e)
  }
}
