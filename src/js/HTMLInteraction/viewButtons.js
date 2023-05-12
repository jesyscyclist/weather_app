import { addingListenerToInput } from './inputRequest.js'
import { createMapAndRoute } from '../RoutesApiYandex/createMap.js'

export function addViewButtonListeners() {
  const buttonAdd = document.querySelector('.button-add')
  const buttonReset = document.querySelector('.button-reset')
  const buttonCreateRoute = document.querySelector('.button-create-route')

  buttonReset.addEventListener('click', clearAllInput)
  buttonAdd.addEventListener('click', addInput)
  buttonCreateRoute.addEventListener('click', creatingArrayOfPoints)
}

function clearAllInput() {
  const autocompleteBlock = document.querySelectorAll('.autocomplete__block')
  if (autocompleteBlock.length > 2) {
    autocompleteBlock.forEach((item, index) => {
      if (index == 1) {
        item.querySelector('.autocomplete__input').placeholder = 'Куда'
      }
      if (index > 1) {
        const parent = item.closest('.autocomplete-wrapper')
        parent.removeChild(item)
      }
    })
  }
  const allInput = document.querySelectorAll('.autocomplete__input')
  allInput.forEach((item) => (item.value = ''))
}

function addInput() {
  const autocompleteWrapper = document.querySelector('.autocomplete-wrapper')
  const autocompleteBlock = document.querySelectorAll('.autocomplete__block')
  if (autocompleteBlock.length < 5) {
    const lastChild = autocompleteWrapper.lastElementChild
    const newAutocompleteBlock = lastChild.cloneNode(true)
    const newAutocompleteInput = newAutocompleteBlock.querySelector(
      '.autocomplete__input'
    )
    newAutocompleteInput.addEventListener('input', addingListenerToInput)
    newAutocompleteInput.placeholder = 'Куда'
    newAutocompleteInput.value = ''
    lastChild.querySelector('.autocomplete__input').placeholder =
      'Промежуточная точка'
    autocompleteWrapper.append(newAutocompleteBlock)
  }
}

function creatingArrayOfPoints() {
  const allInput = Array.from(document.querySelectorAll('.autocomplete__input'))
  if (!validationInputСheck(allInput).length) {
    const allInputResult = allInput.reduce((acc, item) => {
      acc.push(item.value)
      return acc
    }, [])

    requestForPoints(allInputResult)
  }
}

function validationInputСheck(arr) {
  const invalidInput = arr.filter((item) => item.value == '')
  invalidInput.forEach((item) => {
    item.style.boxShadow = '0 0 3px red'
    setTimeout(() => (item.style.boxShadow = 'none'), 1500)
  })
  return invalidInput
}

function requestForPoints(arr) {
  const url = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=`
  const appiKey = '688efe04-e23e-42f4-98a7-b8cea7d40838'

  const result = []
  console.log(result)

  let promise = new Promise((res, rej) => {
    arr.forEach(async (item) => {
      const request = await fetch(`${url}${appiKey}&geocode=${item}`)
      const response = await request.json()

      let coordinate =
        response.response.GeoObjectCollection.featureMember[0].GeoObject.Point
          .pos
      coordinate = coordinate
        .split(' ')
        .map((item) => (item = +item))
        .reverse()
      result.push(coordinate)
    })
    res()
  })

  console.log(result.length)
  createMapAndRoute(result)

  // arr.forEach(async (item) => {
  //   const request = await fetch(`${url}${appiKey}&geocode=${item}`)
  //   const response = await request.json()

  //   let coordinate =
  //     response.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
  //   coordinate = coordinate
  //     .split(' ')
  //     .map((item) => (item = +item))
  //     .reverse()

  //   result.push(coordinate)
  //   createMapAndRoute(result)
  // })
  // console.log(result)
  // createMapAndRoute(result)
}

// arr.forEach(async (item) => {
//   const request = await fetch(`${url}${appiKey}&geocode=${item}`)
//   const response = await request.json()

//   let coordinate =
//     response.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
//   coordinate = coordinate
//     .split(' ')
//     .map((item) => (item = +item))
//     .reverse()

//   result.push(coordinate)
//   console.log(result)
//   createMapAndRoute(result)
// })
