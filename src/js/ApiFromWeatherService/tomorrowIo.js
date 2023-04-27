import {
  roundData,
  forecastTimeString,
  currentTimeString,
} from './generalFunctionsApi.js'

//url for Api call
function urlInstall(coord) {
  const link = 'https://api.tomorrow.io/v4/weather/' //forecast?location=
  const appiKey = 'hj1xE00KFr9xD6TtSPC0LAr0zkbl8Knh'
  const urlCurrent = `${link}realtime?location=${coord.latitude},${coord.longitude}&units=metric&apikey=${appiKey}`
  //5 day forecast!!!
  const urlForecast = `${link}forecast?location=${coord.latitude},${coord.longitude}&timesteps=1h&units=metric&apikey=${appiKey}`
  return { urlCurrent, urlForecast }
}

//convert time to find in request "2023-04-27T04:00:00Z"
function convertTime(frcstTime) {
  const forecastTime = forecastTimeString(frcstTime)
  return forecastTime.replace(' ', 'T') + 'Z'
}

function searchNecessaryData(response, data) {
  const formattedTime = convertTime(data)
  return response.timelines.hourly.find((item) => item.time == formattedTime)
}

function selectingRequiredFields(obj, status, time) {
  const {
    temperatureApparent = 0,
    temperature = 0,
    windDirection = 0,
    windSpeed = 0,
    cloudCover = 0,
    rainAccumulation = 0,
    precipitationProbability = 0,
  } = obj

  const data = {
    tempFeelsLike: roundData(temperatureApparent),
    temperature: roundData(temperature),
    windDirection: roundData(windDirection),
    windMs: roundData(windSpeed),
    cloud: roundData(cloudCover),
    time: status == 'forecast' ? convertTime(time) : currentTimeString(),
    precipMm: roundData(rainAccumulation),
    rainChance: precipitationProbability,
  }

  return data
}

//https://docs.tomorrow.io/reference/aviation
export async function currentWeatherOpenMeteo(coordinate, forecastTime) {
  try {
    const url = urlInstall(coordinate)

    //current response
    const responseCurrent = await fetch(url.urlCurrent)
    const responseDataCurrent = await responseCurrent.json()

    const currentObjData = selectingRequiredFields(
      responseDataCurrent.data.values,
      'current',
      forecastTime
    )

    //forecast response
    const responseForecast = await fetch(url.urlForecast)
    const responseDataForecast = await responseForecast.json()

    const needlessResponseDataForecast = searchNecessaryData(
      responseDataForecast,
      forecastTime
    )

    const forecastObjData = selectingRequiredFields(
      needlessResponseDataForecast.values,
      'forecast',
      forecastTime
    )

    return { currentObjData, forecastObjData }
  } catch (e) {
    console.error('Error>>', e)
  }
}
