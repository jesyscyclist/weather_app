//url for Api call
function urlInstall(coord) {
  const link = 'https://api.openweathermap.org/data/2.5/'
  const appiKey = '2baa06e0c482aa255b85406c646badf4'

  const urlCurrent = `${link}weather?lat=${coord.latitude}&lon=${coord.longitude}&units=metric&appid=${appiKey}`
  //5 day forecast with a 3-hour step!!!
  const urlForecast = `${link}forecast?lat=${coord.latitude}&lon=${coord.longitude}&units=metric&appid=${appiKey}`
  return { urlCurrent, urlForecast }
}

function localtime() {
  const today = new Date()
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  return date + ' ' + time
}

//because response has step 3 hour
function roundForecastTime(hour) {
  let neededHour = 0
  if (!(hour % 3)) neededHour = hour
  else if (!((hour + 1) % 3)) neededHour = hour + 1
  else neededHour = hour - 1

  function zeroBefore(numb) {
    return numb < 10 ? `0${numb}` : numb
  }

  const today = new Date()
  const date =
    today.getFullYear() +
    '-' +
    zeroBefore(today.getMonth() + 1) +
    '-' +
    zeroBefore(today.getDate())
  const time = neededHour + ':00:00'
  return date + ' ' + time
}

//search for the necessary data in forecast response
function searchNecessaryData(data, hour) {
  const time = roundForecastTime(hour)
  const dataArray = Array.from(data)

  return dataArray.find((item) => item.dt_txt == time)
}

function roundData(data) {
  return !data ? 0 : Math.round(data)
}

// weatherapi GeoCoding Api https://www.weatherapi.com/api-explorer.aspx#current
export async function currentWeatherDataOpenWeather(coordinate, forecastHour) {
  try {
    const url = urlInstall(coordinate)

    const responseCurrent = await fetch(url.urlCurrent)
    const responseDataCurrent = await responseCurrent.json()

    let {
      main: { feels_like = 0, temp = 0 },
      wind: { deg = 0, speed = 0 },
      clouds: { all = 0 },
      rain = 0,
    } = responseDataCurrent

    const currentObjData = {
      tempFeelsLike: roundData(feels_like),
      temperature: roundData(temp),
      windDirection: deg,
      windMs: +speed.toFixed(1),
      cloud: all,
      time: localtime(),
      precipMm: !rain ? 0 : responseDataCurrent.rain['1h'],
    }

    const responseForecast = await fetch(url.urlForecast)
    const responseDataForecast = await responseForecast.json()
    const responseDataForecastNecessary = searchNecessaryData(
      responseDataForecast.list,
      forecastHour
    )

    // let {
    //   main: { feels_like: feels_likeFrsct = 0, temp: tempFrcst = 0 },
    //   wind: { deg: degFrcst = 0, speed: speedFrcst = 0 },
    //   clouds: { all: allFrcst = 0 },
    //   rain: rainFrcst = 0,
    //   dt_txt = 0,
    // } = responseDataForecastNecessary

    const forecastObjData = {
      // tempFeelsLike: roundData(feels_likeFrsct),
      // temperature: roundData(tempFrcst),
      // windDirection: degFrcst,
      // windMs: +speedFrcst.toFixed(1),
      // cloud: allFrcst,
      // time: dt_txt,
      // precipMm: rainFrcst,
      // rainChance: 'хз',
    }

    return { currentObjData, forecastObjData }
  } catch (e) {
    console.error('Error>>', e)
  }
}
