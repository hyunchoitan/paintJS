const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
// (18)
const mode = document.getElementById("jsMode");
//(21)

const INITIAL_COLOR = "#2c2c2c";
//(26)
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
//(27)
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;
//(23) Fill버튼의 toggle기능을 위해 만든 변수. 재사용이 가능하게끔 만듦.

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color; //(25)
}

function handleCanvasClick(event) {
  if (filling) {
    //(30)이렇게 filling조건문을 만듦으로써 캔버스에 클릭을 하자마자 filling기능이 발동하는 것을 막고
    // paint일때는 선을 그리는 것만 할 수 있도록 함!
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  } //(29)캔버스에 사각형을 만드는 것부터 시작!
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick); //(28) fill 상태에서 캔버스를 클릭하면 캔버스를 채우기
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

function handleRangeChange(event) {
  // console.log(event.target.value);
  // console.log(event)를 해서 range slider를 조작했을 때 console창에서 값이 도출되는지 확인하고
  // object 중 target - value값을 가져온다. 이는 html파일에서 input의 attribute 값들을 확인해보면 나옴!
  const size = event.target.value;
  ctx.lineWidth = size;
}
//(20)

if (range) {
  range.addEventListener("input", handleRangeChange);
}
//(19) eventlistener input은 input, select, textarea값의 변화가 있을 때 이벤트를 발동시킨다.

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}
//(24) 화면상의 Fill버튼을 누르면 Paint로 바뀌고, Paint일때 누르면 Fill로 바뀌게 만드는 toggle기능!

if (mode) {
  mode.addEventListener("click", handleModeClick);
}
//(22)

function init() {}
init();
