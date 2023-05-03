//import { multiRoute } from './routeBuilding.js'

//https://yandex.ru/dev/maps/jsapi/doc/2.1/terms/index.html

ymaps.ready(function () {
  var myMap = new ymaps.Map('YMapsID', {
    center: [55.751574, 37.573856],
    zoom: 9,
    controls: [],
  })

  //Создание экземпляра маршрута.
  var multiRoute = new ymaps.multiRouter.MultiRoute(
    {
      // Точки маршрута.
      // Обязательное поле.
      referencePoints: [
        'Выборг',
        'Рощино',
        'Санкт-Петербург', // улица Льва Толстого.
      ],
    },
    {
      // Автоматически устанавливать границы карты так,
      // чтобы маршрут был виден целиком.
      boundsAutoApply: true,
    }
  )

  // Добавление маршрута на карту.
  myMap.geoObjects.add(multiRoute)
})
