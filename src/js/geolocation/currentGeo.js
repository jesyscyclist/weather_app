export function currentGeoPositionRequest() {
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        res({ latitude, longitude })
      },
      (e) => rej(e)
    )
  })
}
