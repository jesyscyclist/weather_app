// Построение маршрута.
// По умолчанию строится автомобильный маршрут.
export const multiRoute = new ymaps.multiRouter.MultiRoute(
  {
    // Точки маршрута. Точки могут быть заданы как координатами, так и адресом.
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
