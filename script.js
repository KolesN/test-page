const instructionButton = document.querySelector('.options__header__instruction')
const options = document.querySelectorAll('.options__item_use')
const instr = document.querySelector('.instruction_wrapper')
const closeButton = document.querySelector('.instruction__close')
const userSearchButton = document.querySelector(".user_form__button")
const userInput = document.querySelector(".user_form__input")

const loadProducts = async () => {
  const data = await fetch('http://localhost:3000/product').then(res => res.json())

  const items = document.querySelectorAll('.options__item')
  items.forEach((item, index) => {
    const itemPrice = data[index].price
    const itemDescription = data[index].description.split('%')
    const price = item.querySelector('.options__item_cost').querySelector('span')
    const description = item.querySelector('.options__item_desc')
    const sale = description.querySelector('span')

    description.innerHTML = `${itemDescription[1]}`
    description.prepend(sale)
    sale.innerHTML = `${itemDescription[0]}%`
    price.innerText = (`${itemPrice}`)
  })
}

const clearProducts = () => {
  const products = document.querySelectorAll('.options__item')
  products.forEach((item) => {
    const button = item.querySelector('.options__item_use')
    button.classList.remove('used')
    button.innerText = 'Использовать скидку'
  })
}

const setUser = async (username = 'test1') => {
  const user = await fetch(`http://localhost:3000/user/${username}`)
    .then((item) => item.json())
    .catch((err) => {})
  if (user && user[0]) {
    const userBalance = user[1]
    const userProducts = user[2]

    const balanceField = document.querySelector('.balance').querySelector('.balance__info')
    const balanceImgs = balanceField.querySelectorAll('img')
    const products = document.querySelectorAll('.options__item')

    balanceField.innerText = `${userBalance}`
    balanceField.prepend(balanceImgs[0])
    balanceField.append(balanceImgs[1])

    if (userProducts[0]) {
      products.forEach((item, index) => {
        if (userProducts[index]) {
          const button = item.querySelector('.options__item_use')
          button.classList.add('used')
          button.innerText = 'Уже использовано'
        }
      })
    }
    sessionStorage.setItem('userId', user[0])
  }

}

const useItem = async (e) => {
  e.preventDefault()
  e.target.classList.add('used')
  e.target.innerText = 'Уже использовано'

  const classList = e.target.classList
  const userId = sessionStorage.getItem('userId')

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json")
  const body = {
    'product_id': '',
    'user_id': `${userId}`
  }

  const options = {
    method: 'POST',
    body: '',
    headers: myHeaders
  }
  if (classList.contains('call')) {
    const newBody = JSON.stringify({ ...body, 'product_id': '1'})
    await fetch('http://localhost:3000/order', { ...options, body: newBody })
  } else if (classList.contains('special')) {
    const newBody = JSON.stringify({ ...body, 'product_id': '2'})
    await fetch('http://localhost:3000/order', { ...options, body: newBody })
  } else if (classList.contains('course')) {
    const newBody = JSON.stringify({ ...body, 'product_id': '3'})
    await fetch('http://localhost:3000/order', { ...options, body: newBody })
  } else if (classList.contains('course_too')) {
    const newBody = JSON.stringify({ ...body, 'product_id': '4'})
    await fetch('http://localhost:3000/order', { ...options, body: newBody })
    console.log(JSON.stringify({ ...options, body }))
  }
}

const hide = (el) => {
  el.classList.add('hide')
}

const show = (el) => {
  el.classList.remove('hide')
}

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

userSearchButton.addEventListener('click', (e) => {
  e.preventDefault()
  clearProducts()
  const username = userInput.value
  setUser(username)
  userInput.value = ''
})



setUser()
loadProducts()