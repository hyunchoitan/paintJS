const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
// (15)

canvas.width = 700;
canvas.height = 700;

// ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

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
  // click event의 target이 되는 colors array의 각각의 color의 style object에서 backgroundcolor라는
  // 요소만 뽑아서 color라는 변수로 정의한 것!
  ctx.strokeStyle = color;
}
// (17)

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);
// (16) 여기서 (color => color.addEventlistener...) 의 color는 그저 Array의 개별 요소를 지칭하는 것으로,
// color는 어떤 이름으로 대체해도 상관 없다.

function init() {}
init();
