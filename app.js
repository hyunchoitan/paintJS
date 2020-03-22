const canvas = document.getElementById("jsCanvas");
// (1)

let painting = false;
// (6) 기본적으로 painting을 false로 설정해두고

function onMouseMove(event) {
  //   console.log(event); console창을 켜고 mouseevent가 발동하는지 확인!
  //   mouseevent를 클릭해서 offset property를 찾아봄.
  const x = event.offsetX; //offset좌표는 canvas안의 좌표. window좌표를 나타내는 client좌표와 다르다.
  const y = event.offsetY;
  //   console.log(x, y); console창을 켜고 mousevent의 대상이 canvas안의 좌표로 한정되었는지 확인!
}
// (3)

function stopPainting() {
  painting = false;
}
// (11)

function onMouseDown(event) {
  //   console.log(event); (5)
  painting = true;
  //   (7) 캔버스위에서 마우스를 클릭할 때, paining을 true로 전환시킴.
}

function onMouseUp(event) {
  //   painting = false; 이 구문이 아래의 함수에서도 반복되므로 따로 함수로 빼서 중복을 제거!
  //  (9) painting이 끝난 후 다시 마우스클릭을 떼었을 때 painting을 기본값인 false로 돌아감.
  stopPainting();
}

// function onMouseLeave(event) {
//  painting = false;
// } 이 함수의 기능은 painting = false;밖에 없으므로 전체를 stopPainting함수로 대체!

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); // (2)
  canvas.addEventListener("mousedown", onMouseDown); //(4)
  canvas.addEventListener("mouseup", onMouseUp); //(8) stopPainting함수로 대체하지 않는 이유는 후에 이 함수에는 코드를 추가해야 하므로.
  canvas.addEventListener("mouseleave", stopPainting); //onMouseLeave); //(10)
}

function init() {}
init();
