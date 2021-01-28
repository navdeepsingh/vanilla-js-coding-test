/**
 * Author: Navdeep Singh <navdeep.er@gmail.com>
 */

// Define default loading state
document.getElementById('root').innerHTML = 'Loading...'
const modal = document.querySelector('.modal-dialog')
const modalBody = modal.querySelector('.modal-dialog--body')

/**
 * Fetch Request with browser api
 */
const promise = window.fetch(
  `https://api.unsplash.com/photos/?client_id=74afffb9a7b7829d0439d12c87e2897797059b651fd39cd33d3c5ebc1293e4f8`,
)
promise
  .then(async response => {
    if (response.ok && response.status === 200) {
      return await response.json()
    } else {
      throw new Error('Something got wrong')
    }
  })
  .then(result => updateDOM(result))
  .catch(error => {
    document.getElementById('root').innerHTML = ''
    document
      .getElementById('root')
      .append(CreateComponent('div', {class: 'alert'}, error))
  })

function updateDOM(data) {
  const div = document.createElement('div')
  div.classList.add('images-wrapper')
  data.map(item => {
    const image = new Image()
    image.src = item.urls.small
    image.addEventListener(
      'click',
      this.handleClick.bind(this, item.urls.regular),
    )
    div.append(image)
  })
  document.getElementById('root').innerHTML = ''
  document.getElementById('root').append(div)
}

function CreateComponent(tag, options = {class: 'default'}, children = null) {
  const componentDiv = document.createElement(tag)
  componentDiv.classList.add(options.class)
  if (children) {
    const txt = document.createTextNode(children)
    componentDiv.append(txt)
  }
  return componentDiv
}

function handleClick(imageUrl) {
  document.body.classList.add('show-overlay')
  document.body.append(CreateComponent('div', {class: 'overlay'}))
  modal.classList.add('show')
  const image = new Image()
  image.src = imageUrl
  modalBody.append(image)
}

function closeDialog() {
  document.body.classList.remove('show-overlay')
  modal.classList.remove('show')
  modalBody.innerHTML = ''
  document.querySelector('.overlay').remove()
}

/**
 * Sticky Header
 */
window.onscroll = function () {
  const header = document.querySelector('h1')
  if (window.pageYOffset > 100) {
    header.classList.add('sticky')
  } else {
    header.classList.remove('sticky')
  }
}
