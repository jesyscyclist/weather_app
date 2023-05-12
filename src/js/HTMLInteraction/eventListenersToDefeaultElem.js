import { addViewButtonListeners } from './viewButtons.js'
import { addingListenerToInput } from './inputRequest.js'

export function addListenersToDefaultElem() {
  //listeners for button
  addViewButtonListeners()

  //listeners for input
  const listeners = document.querySelectorAll('.autocomplete__input')
  listeners.forEach((item) =>
    item.addEventListener('input', addingListenerToInput)
  )
}
