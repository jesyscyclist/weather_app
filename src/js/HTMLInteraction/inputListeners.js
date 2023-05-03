export function addListeners() {
  const listeners = document.querySelectorAll('.route-box__input')
  Array.from(listeners).forEach((item) =>
    item.addEventListener('input', () => {
      console.log(item)
    })
  )
}

function debounce(func, delay) {
  let timeout
  return function () {
    const context = this
    const args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(context, args), delay)
  }
}
