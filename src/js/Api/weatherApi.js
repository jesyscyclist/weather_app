//url for Api call
//30 days!!!
function urlInstall(coord) {
  const linkForecast = 'http://api.weatherapi.com/v1/forecast.json?key='
  const appiKey = '97999080c0624b248b4120332232304'
  const days = 1
  const url = `${linkForecast}${appiKey}&q=${coord.latitude}, ${coord.longitude}&days=${days}&aqi=no&alerts=no`
  return url
}

// weatherapi GeoCoding Api https://www.weatherapi.com/api-explorer.aspx#current
export async function currentWeatherDataOpenWeather(coordinate, forecastHour) {
  try {
    const url = urlInstall(coordinate)
    const response = await fetch(url)
    const responseData = await response.json()
    // console.log(responseData)

    //current weather
    let {
      feelslike_c = 0,
      temp_c = 0,
      wind_degree = 0,
      wind_kph = 0,
      cloud = 0, //as %
      precip_mm = 0,
    } = responseData.current
    const { localtime = 0 } = responseData.location
    wind_kph = +(wind_kph / 3.6).toFixed(1)

    const currentObjData = {
      tempFeelsLike: feelslike_c,
      temperature: temp_c,
      windDirection: wind_degree,
      windMs: wind_kph,
      cloud: cloud,
      time: localtime,
      precipMm: precip_mm,
    }

    //wheather for the required hour
    let {
      feelslike_c: feelslike_cFrcst = 0,
      temp_c: temp_cFrcst = 0,
      wind_degree: wind_degreeFrcst = 0,
      wind_kph: wind_kphFrcst = 0,
      cloud: cloudFrcst = 0, //as %
      chance_of_rain = 0,
      precip_mm: precip_mmFrcst = 0,
    } = responseData.forecast.forecastday[0].hour[forecastHour]
    const { time = 0 } = responseData.forecast.forecastday[0].hour[forecastHour]
    wind_kphFrcst = +(wind_kphFrcst / 3.6).toFixed(1)

    const forecastObjData = {
      tempFeelsLike: feelslike_cFrcst,
      temperature: temp_cFrcst,
      windDirection: wind_degreeFrcst,
      windMs: wind_kphFrcst,
      cloud: cloudFrcst,
      time: time,
      precipMm: precip_mmFrcst,
      rainChance: chance_of_rain,
    }

    return { currentObjData, forecastObjData }
  } catch (e) {
    console.error('Error>>', e)
  }
}
