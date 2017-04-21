var canvas = document.getElementsByClassName('drawing-area')[0];
var context = canvas.getContext("2d");
var lastEvent;
var mouseDown = false;
var mouseMovedOffCanvas = false;
var inputs = document.querySelectorAll("input[type=range]");
var restOfPage = document.getElementsByTagName("body");
var selected = document.getElementsByClassName('selected')[0];
var color = window.getComputedStyle(selected,null).getPropertyValue('background-color');
var red = document.getElementById("red");
var green = document.getElementById("green");
var blue = document.getElementById("blue");
var newColor = document.getElementsByClassName("color-new")[0];
var buttonReveal = document.getElementById('revealColorSelect');
var selectionDiv = document.getElementById('colorSelect');


$(".controls").on("click", "li", function () {
  $(this).siblings().removeClass("selected");
  if ($(this).attr('id') !== 'revealColorSelect') {
    $(this).addClass("color-element color selected");
    color = $(this).css("background-color");
  }
});

// Toggle visibility of adding panel

buttonReveal.addEventListener('click', function () {
  selectionDiv.style.display =  selectionDiv.style.display === 'block'? 'none' : 'block';
})

// Change color - sliders

function changeColor() {
  var r = red.value;
  var g = green.value;
  var b = blue.value;
  newColor.style.backgroundColor = "rgb(" + r + "," + g + ", " + b + ")";
}

for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('input', changeColor, false);
}

// Add new color

$("#addNewColor").click(function () {
  var $newColor = $("<li></li>");
  $newColor.css("background-color", $(".color-new").css("background-color"));
  $($newColor).insertBefore("#revealColorSelect");
  $newColor.click();
});

// Drawing functions

canvas.onmousedown = function(e){
  lastEvent = e;
  mouseDown = true;
}

canvas.onmousemove = function (e) {
  if (mouseDown) {
    context.beginPath();
    context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
    context.lineTo(e.offsetX, e.offsetY);
    context.strokeStyle = color;
    context.stroke();
    lastEvent = e;
  }
}

canvas.onmouseup = function(e){
  mouseDown = false;
}

canvas.onmouseout = function(e){
  mouseMovedOffCanvas = mouseDown === true;
  mouseDown = false;
}

canvas.onmouseover = function (e) {
  lastEvent = e;
  if (mouseMovedOffCanvas === true) {
    mouseDown = true;
  }
}

restOfPage.onmouseup = function(e){
  mouseMovedOffCanvas = false;
  mouseDown = false;
}
