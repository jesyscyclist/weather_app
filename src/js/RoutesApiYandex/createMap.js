// import { multiRoute } from './routeBuilding.js'
import { currentGeoPositionRequest } from '../geolocation/currentGeo.js'

//https://yandex.ru/dev/maps/jsbox/2.1/request_map
//https://yandex.ru/dev/maps/jsapi/doc/2.1/terms/index.html

//Неправильно?
let myMap = null

export function createMapAndRoute(arrayOfCoordinates) {
  ymaps.ready(() => init(arrayOfCoordinates))
}

async function init(arr) {
  const curentCoordinate = await currentGeoPositionRequest()
  if (myMap) {
    myMap.destroy()
    myMap = null
  }
  // Создаем карту
  myMap = new ymaps.Map('YMapsID', {
    center: [`${curentCoordinate.latitude}`, `${curentCoordinate.longitude}`],
    zoom: 9,
    controls: [],
  })

  const abc = [
    [55.354864, 37.617698],
    [59.138955, 30.315644],
  ]

  console.log(abc, arr)
  arr.forEach((item) => console.log(item))
  const first = abc[0]
  const second = arr[0]
  console.log(first, second)

  // Построение маршрута.
  // По умолчанию строится автомобильный маршрут.
  var multiRoute = new ymaps.multiRouter.MultiRoute(
    {
      // Точки маршрута. Точки могут быть заданы как координатами, так и адресом.
      // referencePoints: [
      //   [55.354864, 37.617698],
      //   [59.138955, 30.315644],
      // ],
      referencePoints: arr,
    },
    {
      // Автоматически устанавливать границы карты так,
      // чтобы маршрут был виден целиком.
      boundsAutoApply: true,
    }
  )

  // Добавление маршрута на карту.
  myMap.geoObjects.add(multiRoute)
}
