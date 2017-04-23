var canvas = document.getElementsByClassName('drawing-area')[0]
var context = canvas.getContext('2d')
var lastEvent
var mouseDown = false
var mouseMovedOffCanvas = false
var inputs = document.querySelectorAll('input[type=range]')
var restOfPage = document.getElementsByTagName('body')
var selected = document.getElementsByClassName('selected')[0]
var color = window.getComputedStyle(selected, null).getPropertyValue('background-color')
var red = document.getElementById('red')
var green = document.getElementById('green')
var blue = document.getElementById('blue')
var newColor = document.getElementsByClassName('color-new')[0]
var buttonReveal = document.getElementById('revealColorSelect')
var buttonAdd = document.getElementById('addNewColor')
var selectionDiv = document.getElementById('colorSelect')
var availableColors = document.getElementsByClassName('colors-list')[0]
var colors = document.querySelectorAll('.color')

function selectColor (e) {
  for (var i = 0; i < colors.length; i++) {
    colors[i].classList.remove('selected')
  }
  e.target.classList.add('selected')
  color = window.getComputedStyle(e.target, null).getPropertyValue('background-color')
}

function allowSelecting () {
  var colors = document.querySelectorAll('.color')
  for (var i = 0; i < colors.length; i++) {
    colors[i].addEventListener('click', selectColor, false)
  }
}
allowSelecting()

// Toggle visibility of adding panel

buttonReveal.addEventListener('click', function () {
  selectionDiv.style.display = selectionDiv.style.display === 'block' ? 'none' : 'block'
})

// Change color - sliders

function changeColor () {
  var r = red.value
  var g = green.value
  var b = blue.value
  newColor.style.backgroundColor = 'rgb(' + r + ',' + g + ', ' + b + ')'
}

for (var j = 0; j < inputs.length; j++) {
  inputs[j].addEventListener('input', changeColor, false)
}

// Add new color

buttonAdd.addEventListener('click', function () {
  var addColor = document.createElement('li')
  addColor.className = 'color-element color'
  addColor.style.backgroundColor = newColor.style.backgroundColor
  availableColors.insertBefore(addColor, buttonReveal)
  allowSelecting()
})

// Drawing functions

canvas.onmousedown = function (e) {
  lastEvent = e
  mouseDown = true
}

canvas.onmousemove = function (e) {
  if (mouseDown) {
    context.beginPath()
    context.moveTo(lastEvent.offsetX, lastEvent.offsetY)
    context.lineTo(e.offsetX, e.offsetY)
    context.strokeStyle = color
    context.stroke()
    lastEvent = e
  }
}

canvas.onmouseup = function () {
  mouseDown = false
}

canvas.onmouseout = function () {
  mouseMovedOffCanvas = mouseDown === true
  mouseDown = false
}

canvas.onmouseover = function (e) {
  lastEvent = e
  if (mouseMovedOffCanvas === true) {
    mouseDown = true
  }
}

restOfPage.onmouseup = function () {
  mouseMovedOffCanvas = false
  mouseDown = false
}
