//url for Api call
function urlInstall(coord) {
  const link = 'https://api.tomorrow.io/v4/weather/forecast?location='

  const appiKey = 'hj1xE00KFr9xD6TtSPC0LAr0zkbl8Knh'

  const urlCurrent = `${link}weather?lat=${coord.latitude}&lon=${coord.longitude}&units=metric&appid=${appiKey}`
  //5 day forecast!!!
  const urlForecast = `${link}${coord.latitude},${coord.longitude}&timesteps=1h&units=metric&apikey=${appiKey}`
  return { urlCurrent, urlForecast }
}

//convert time to find in request "2023-04-27T04:00:00Z"
function convertTime(obj) {
  function zeroBefore(numb) {
    return numb < 10 ? `0${numb}` : numb
  }
  const YYYYMMDD =
    obj.year + '-' + zeroBefore(obj.month) + '-' + zeroBefore(obj.day)
  const HHMMSS = zeroBefore(obj.hour) + ':00:00Z'
  return `${YYYYMMDD}T${HHMMSS}`
}

function searchNecessaryData(response, data) {
  const formattedTime = convertTime(data)
  return response.timelines.hourly.find((item) => item.time == formattedTime)
}

//https://docs.tomorrow.io/reference/aviation
export async function currentWeatherOpenMeteo(coordinate, forecastTime) {
  try {
    const url = urlInstall(coordinate)

    //   const responseCurrent = await fetch(url.urlCurrent)
    //   const responseDataCurrent = await responseCurrent.json()

    //   let {
    //     main: { feels_like = 0, temp = 0 },
    //     wind: { deg = 0, speed = 0 },
    //     clouds: { all = 0 },
    //     rain = 0,
    //   } = responseDataCurrent

    //   const currentObjData = {
    //     tempFeelsLike: roundData(feels_like),
    //     temperature: roundData(temp),
    //     windDirection: deg,
    //     windMs: +speed.toFixed(1),
    //     cloud: all,
    //     time: localtime(),
    //     precipMm: !rain ? 0 : responseDataCurrent.rain['1h'],
    //   }

    const responseForecast = await fetch(url.urlForecast)
    const responseDataForecast = await responseForecast.json()

    const needlessResponseDataForecast = searchNecessaryData(
      responseDataForecast,
      forecastTime
    )
    console.log(needlessResponseDataForecast)
    let {
      temperatureApparent = 0,
      temperature = 0,
      windDirection = 0,
      windSpeed = 0,
      cloudCover = 0,
      rainAccumulation = 0,
      precipitationProbability = 0,
    } = needlessResponseDataForecast.values

    const forecastObjData = {
      tempFeelsLike: temperatureApparent,
      temperature: temperature,
      windDirection: windDirection,
      windMs: windSpeed,
      cloud: cloudCover,
      time: convertTime(forecastTime),
      precipMm: rainAccumulation,
      rainChance: precipitationProbability,
    }

    return forecastObjData
  } catch (e) {
    console.error('Error>>', e)
  }
}
