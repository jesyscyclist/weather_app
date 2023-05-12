import { onInputChange } from './createDropdawn.js'

export function addingListenerToInput() {
  const fn = debounce(requestInput, 500).bind(this)
  fn()
}

//Неправильно?
let timeout

function debounce(func, delay) {
  return function () {
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      const fn = func.bind(context)
      fn()
    }, delay)
  }
}

//https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/SuggestView.html
async function requestInput() {
  try {
    const request = await ymaps.suggest(this.value)
    console.log(request)

    const arrayFromRequestResponse = await request.reduce(
      (acc, item) => [...acc, item],
      []
    )
    onInputChange(arrayFromRequestResponse, this)
  } catch (e) {
    console.error('Error>>', e)
  }
}
