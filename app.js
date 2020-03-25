const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave"); //(34)

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
//(31) 이미지를 저장했을 때 배경색을 투명이 아닌 흰색으로 나오도록 지정해주기 위한 설정!
//위의 expression을 지정하지 않았을때, 화면상에서 canvas는 흰색으로 나오지만 이는 html배경색 설정에 불과하므로
// 저장 결과물에는 배경색 지정이 되어있지 않는 오류가 생김.
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

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
  ctx.fillStyle = color;
}

function handleCanvasClick(event) {
  if (filling) ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function handleCM(event) {
  //  console.log(event); 이로는 마우스 우클릭은 가능하지만 저장기능이 보이지 않음.
  event.preventDefault();
  // 이렇게 설정해두면 마우스 우클릭 자체가 되지 않음!!
}
//(33) (32)와 함께 캔버스위의 이미지를 마우스 우클릭의 save as..기능을 이용해 저장하지 못하도록 막는 event설정!

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM); //(32)
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

if (range) {
  range.addEventListener("input", handleRangeChange);
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  //image를 포함하는 data URL로 return하는 method. format type default는 PNG.
  const link = document.createElement("a");
  link.href = image; //href가 .toDataURL이 되어야 하고
  link.download = "PaintJs[🎨 ]";
  //HTMLAnchorElement.download is a property which is a DOMString indicating that
  //the linked resource is intended to be downloaded rather than displayed in the browser
  // download property에 이름을 지정해주어야 함.
  link.click();
  //HTMLElement.click() method simulates a mouse click on an element
}
//(36)

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
//(35)

function init() {}
init();
