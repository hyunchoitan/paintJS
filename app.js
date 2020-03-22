const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
// (12) canvas란 context를 갖는 html 요소. context는 픽셀에 접근할 수 있는 방법. 위와같이 context를 만든다.

canvas.width = 700;
canvas.height = 700;
// (14) css와 별개로 x,y의 좌표를 확정시켜주려면 JS에서 좌표를 인지한 canvas의 기준 사이즈를 설정해주어야 함.
// 즉 pixel modifier의 사이즈를 설정해주어야 함. 윈도우에게 픽셀을 사용할 수 있는 공간의 크기를 알려주는 것.

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;
//(13)

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
    //  여기서 path는 선이 아니라 선분으로 연결된 점의 목록! 즉 표현(rendering)이 아닌 수치와 방정식의 개념.
    // path는 create-use drawing commands to draw into the path-rendering by stroke(획을 긋다)/fill의 단계로 진행
    //  beginPath는 새로운 path를 만드는 함수.
    // 추후에 drawing command들은 이 path로 바로 보내진다. 그리고 이 path를 확립한다.
    ctx.moveTo(x, y);
    // 이 역시 실제로 그리는 함수는 아니고, path의 한 지점에서 펜을 떼고 다른 한 지점으로 path의 시작점을 옮기는 함수.
  }
  //위의 두개의 함수는 painting을 하고 있지 않을 때 이므로, 그리고 있는 동안
  // (즉 클릭 후 그리기 시작해서 끝내고 언클릭할때까지)에는 적용되지 않는다.
  else {
    ctx.lineTo(x, y);
    // path의 한 지점에서 설정한 지점까지 선을 그리는 기능. 즉 마우스를 옮길 때마다! 선으로 지정된다.
    ctx.stroke();
    // 그려진 선을 따라 획을 긋는 기능. 즉 이 때서야 비로소 시각적으로 선이 그려진다.
  }
}

// function onMouseDown(event) {
//   startPainting();
// }

// function onMouseUp(event) {
//   stopPainting();
// }

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting); //onMouseDown 대신에 startPainting으로 넣어줌.
  canvas.addEventListener("mouseup", stopPainting); //onMouseUp 대신에 stopPainting으로 바로 넣어주기로 함.
  // 이에 해당하는 logic은 onMouseMove에 넣어주는 걸로 정리!
  canvas.addEventListener("mouseleave", stopPainting);
}

function init() {}
init();
