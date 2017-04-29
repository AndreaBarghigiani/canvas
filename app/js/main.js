const canvas = document.getElementsByClassName('drawing-area')[0]
const context = canvas.getContext('2d')
const inputs = document.querySelectorAll('input[type=range]')
const restOfPage = document.querySelector('body')
let lastEvent
let mouseDown = false
let mouseMovedOffCanvas = false
let selected = document.querySelector('.selected')
let color = window.getComputedStyle(selected, null).getPropertyValue('background-color')
const red = document.getElementById('red')
const green = document.getElementById('green')
const blue = document.getElementById('blue')
const newColor = document.querySelector('.color-new')
const buttonReveal = document.getElementById('revealColorSelect')
const buttonAdd = document.getElementById('addNewColor')
const buttonSave = document.querySelector('.save')
const buttonClear = document.querySelector('.clear')
const selectionDiv = document.getElementById('colorSelect')
const availableColors = document.querySelector('.colors-list')

function selectColor (e) {
  if (e.target.classList.contains('color')) {
    let colors = document.querySelectorAll('.color')
    for (let i = 0; i < colors.length; i++) {
      colors[i].classList.remove('selected')
    }
    e.target.classList.add('selected')
    color = window.getComputedStyle(e.target, null).getPropertyValue('background-color')
  }
}

function allowSelecting () {
  availableColors.addEventListener('click', selectColor, false)
}

allowSelecting()

// Toggle visibility of adding panel

buttonReveal.addEventListener('click', () => {
  selectionDiv.style.display = selectionDiv.style.display === 'block' ? 'none' : 'block'
})

// Change color - sliders

function changeColor () {
  let r = red.value
  let g = green.value
  let b = blue.value
  newColor.style.backgroundColor = 'rgb(' + r + ',' + g + ', ' + b + ')'
}

for (let j = 0; j < inputs.length; j++) {
  inputs[j].addEventListener('input', changeColor, false)
}

// Add new color

buttonAdd.addEventListener('click', () => {
  let addColor = document.createElement('li')
  addColor.className = 'color-element color'
  addColor.style.backgroundColor = newColor.style.backgroundColor
  availableColors.insertBefore(addColor, buttonReveal)
  red.value = green.value = blue.value = 125
  newColor.style.backgroundColor = 'transparent'
})

// Drawing functions

canvas.onmousedown = (e) => {
  lastEvent = e
  mouseDown = true
}

canvas.onmousemove = (e) => {
  if (mouseDown) {
    context.beginPath()
    context.moveTo(lastEvent.offsetX, lastEvent.offsetY)
    context.lineTo(e.offsetX, e.offsetY)
    context.strokeStyle = color
    context.stroke()
    lastEvent = e
  }
}

canvas.onmouseup = () => mouseDown = false

canvas.onmouseout = () => {
  mouseMovedOffCanvas = mouseDown === true
  mouseDown = false
}

canvas.onmouseover = (e) => {
  lastEvent = e
  if (mouseMovedOffCanvas === true) {
    mouseDown = true
  }
}

restOfPage.onmouseup = () => {
  mouseMovedOffCanvas = false
  mouseDown = false
}

// Save image

buttonSave.addEventListener('click', saveImage)

function saveImage () {
  this.href = canvas.toDataURL('image/png')
}

// Clear canvas

buttonClear.addEventListener('click', clear)

function clear () {
  context.clearRect(0, 0, canvas.width, canvas.height)
}