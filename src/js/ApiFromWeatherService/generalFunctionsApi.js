//to round up the data
export function roundData(data) {
  return !data ? 0 : Math.round(data)
}

//future time as a string
export function forecastTimeString(obj) {
  function zeroBefore(numb) {
    return numb < 10 ? `0${numb}` : numb
  }
  const YYYYMMDD =
    obj.year + '-' + zeroBefore(obj.month) + '-' + zeroBefore(obj.day)
  const HHMMSS = zeroBefore(obj.hour) + ':00:00'
  return `${YYYYMMDD} ${HHMMSS}`
}

//current time
export function currentTimeString() {
  const today = new Date()
  function zeroBefore(numb) {
    return numb < 10 ? `0${numb}` : numb
  }
  const date =
    today.getFullYear() +
    '-' +
    zeroBefore(today.getMonth() + 1) +
    '-' +
    zeroBefore(today.getDate())
  const time =
    zeroBefore(today.getHours()) +
    ':' +
    zeroBefore(today.getMinutes()) +
    ':' +
    zeroBefore(today.getSeconds())
  return date + ' ' + time
}
