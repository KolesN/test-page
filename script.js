const instructionButton = document.querySelector('.options__header__instruction')
const options = document.querySelectorAll('.options__item_use')
const instr = document.querySelector('.instruction_wrapper')
const closeButton = document.querySelector('.instruction__close')
const userSearchButton = document.querySelector(".user_form__button")

const useItem = (e) => {
  e.preventDefault()
  e.target.classList.add('used')
  e.target.innerHTML = 'Уже использовано'
}

const hide = (el) => {
  el.classList.add('hide')
}

const show = (el) => {
  el.classList.remove('hide')
}

// const onUserSearch = (e) => {
//   e.preventDefault()
//   const username = document.querySelector(".user_form__input").value
//   const data = axios.get(`/user/${username}`).then(({ data }) => data)
// }

options.forEach((item) => {
  item.addEventListener('click', useItem.bind(this))
})


instructionButton.addEventListener("click", (e) => {
  e.preventDefault()
  show(instr)
})

closeButton.addEventListener("click", (e) => {
  e.preventDefault()
  hide(instr)
})

// userSearchButton.addEventListener("click", onUserSearch.bind(this))

