export function onInputChange(arr, elem) {
  deleteAllDropdawnElement()
  const input = elem
  const ul = document.createElement('ul')
  ul.className = 'autocomplete-list'
  arr.forEach((item) => createDropdawnElement(item, ul, input))

  document.addEventListener('click', (e) => clickNotOnDropdawnElement(e, input))

  const autocompleteBlock = elem.closest('.autocomplete__block')
  autocompleteBlock.append(ul)
}

function createDropdawnElement(element, list, input) {
  const li = document.createElement('li')
  li.className = 'autocomplete-list__item'
  const button = document.createElement('button')
  button.className = 'autocomplete-list__button'
  button.textContent = element.displayName
  button.addEventListener('click', function () {
    fillingInput(this, input)
  })

  li.append(button)
  list.append(li)
}

function deleteAllDropdawnElement() {
  const autocompleteList = document.querySelectorAll('.autocomplete-list')
  autocompleteList.forEach((item) => {
    const parent = item.parentNode
    parent.removeChild(item)
  })
}

function clickNotOnDropdawnElement(event, input) {
  if (!event.target.classList.contains('autocomplete-list__button')) {
    deleteAllDropdawnElement()
    input.value = ''
  }
}

function fillingInput(button, parentInput) {
  parentInput.value = button.textContent
  deleteAllDropdawnElement()
}
