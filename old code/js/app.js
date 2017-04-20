var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;
var mouseMovedOffCanvas = false;
var $restOfPage = $("body");
$(".controls").on("click", "li", function () {
    $(this).siblings().removeClass("selected");
    if ($(this).attr('id') != 'revealColorSelect') {
        $(this).addClass("selected");
        color = $(this).css("background-color");
    }
});
$("#revealColorSelect").click(function () {
    $("#colorSelect").toggle();
});

function changeColor() {
    var r = $("#red").val();
    var g = $("#green").val();
    var b = $("#blue").val();
    $("#newColor").css("background-color", "rgb(" + r + "," + g + ", " + b + ")");
}
$("input[type=range]").change(changeColor);
$("#addNewColor").click(function () {
    var $newColor = $("<li></li>");
    $newColor.css("background-color", $("#newColor").css("background-color"));
    $($newColor).insertBefore("#revealColorSelect");
    $newColor.click();
});
$canvas.mousedown(function (e) {
    lastEvent = e;
    mouseDown = true;
}).mousemove(function (e) {
    if (mouseDown) {
        context.beginPath();
        context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
        context.lineTo(e.offsetX, e.offsetY);
        context.strokeStyle = color;
        context.stroke();
        lastEvent = e;
    }
}).mouseup(function () {
    mouseDown = false;
}).mouseleave(function () {
    if (mouseDown === true) {
        mouseMovedOffCanvas = true;
    }
    else {
        mouseMovedOffCanvas = false;
    }
    mouseDown = false;
}).mouseenter(function (e) {
    lastEvent = e;
    if (mouseMovedOffCanvas === true) {
        mouseDown = true;
        $canvas.mousedown(e);
    }
});
$restOfPage.mouseup(function () {
    mouseMovedOffCanvas = false;
    mouseDown = false;
});