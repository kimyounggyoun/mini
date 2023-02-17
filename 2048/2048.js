const tds = [...document.querySelectorAll("td")];
const playScore = document.querySelector(".score_main");
const overScreen = document.querySelector(".overPage");
const win = document.querySelector(".win");
const lose = document.querySelector(".lose");

let score = 0;
let max = 4;
let gameOver = false;
let endNumber = false;

let board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

// 실행시 박스생성
window.onload = function () {
  setGame();
  keyup();
};

// 시작 밑 박스 수정, 생성
function setGame() {
  tds.forEach((td) => {
    td.innerHTML = "";
  });
  for (let i = 0; i < max; i++) {
    for (let k = 0; k < max; k++) {
      let num = board[i][k];
      let box = document.createElement("div");
      box.classList.value = "";
      box.innerText = "";
      if (num != 0) {
        box.classList.add("box");
        box.classList.add("x" + num);
        box.innerText = num.toString();
      }
      let id = i.toString() + "-" + k.toString();
      idBox = document.getElementById(id).append(box);
    }
  }
  boxMaker();
}

//새로운 박스 생성
function boxMaker() {
  let makeBox = 0;
  board.forEach((i) => {
    i.forEach((k) => {
      if (k == 0) {
        makeBox++; // 게임판의 0의 갯수 확인
      }
    });
  });
  makeBox = makeBox > 2 ? 2 : makeBox; // 최대생성 2개 제한
  while (makeBox > 0) {
    let y = Math.floor(Math.random() * 4);
    let x = Math.floor(Math.random() * 4);
    if (board[y][x] == 0) {
      board[y][x] = Math.floor(Math.random * 3) > 0 ? 4 : 2;

      let box = document.createElement("div");
      box.classList.add("box");
      box.classList.add("x" + board[y][x]);
      box.classList.add("newBox");
      box.innerText = board[y][x].toString();
      let id = y.toString() + "-" + x.toString();
      idBox = document.getElementById(id).append(box);
      makeBox--;
    }
  }
}

// 컨트롤러
function keyup() {
  document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowUp" && !endNumber && !gameOver) {
      slideUp();
    } else if (e.code == "ArrowDown" && !endNumber && !gameOver) {
      slideDown();
    } else if (e.code == "ArrowLeft" && !endNumber && !gameOver) {
      slideLeft();
    } else if (e.code == "ArrowRight" && !endNumber && !gameOver) {
      slideRight();
    }
  });
}

// 상단슬라이드
function slideUp() {
  for (let i = 0; i < max; i++) {
    let temp = [board[0][i], board[1][i], board[2][i], board[3][i]];
    temp = zeroSwitch(temp);
    temp = boxSlide(temp);
    temp = zeroSwitch(temp);
    for (let k = 0; k < max; k++) {
      board[k][i] = temp[k];
    }
  }
  update();
}

// 하단슬라이드
function slideDown() {
  for (let i = 0; i < max; i++) {
    let temp = [board[3][i], board[2][i], board[1][i], board[0][i]];
    temp = zeroSwitch(temp);
    temp = boxSlide(temp);
    temp = zeroSwitch(temp);
    for (let k = 0; k < max; k++) {
      board[3 - k][i] = temp[k];
    }
  }
  update();
}

// 좌측슬라이드
function slideLeft() {
  for (let i = 0; i < max; i++) {
    let temp = board[i];
    temp = zeroSwitch(temp);
    temp = boxSlide(temp);
    board[i] = zeroSwitch(temp);
  }
  update();
}

// 우측슬라이드
function slideRight() {
  for (let i = 0; i < max; i++) {
    let temp = reverse(board[i]);
    temp = zeroSwitch(temp);
    temp = boxSlide(temp);
    temp = zeroSwitch(temp);
    temp = reverse(temp);
    board[i] = temp;
  }
  update();
}

// 우측 이동 배열을 좌측으로 반전하고 계산할때 사용
function reverse(arr) {
  let half = max / 2;
  for (let i = 0; i < half; i++) {
    temp = arr[i];
    arr[i] = arr[max - 1 - i];
    arr[max - 1 - i] = temp;
  }
  return arr;
}

// 박스 이동, 스코어 계산
function boxSlide(temp) {
  for (let k = 0; k < max; k++) {
    if (temp[k] == temp[k + 1]) {
      temp[k] = temp[k] * 2;
      temp[k + 1] = 0;
      score += temp[k] * 2;
    }
  }
  return temp;
}

// 배열 중간의 0 값을 맨뒤로 보내주는 역할
function zeroSwitch(arr) {
  let zeroCount = 0;
  for (let i = 0; i < max; i++) {
    if (arr[i] == 0) {
      arr.splice(i, 1);
      i--;
      zeroCount++;
    }
  }
  for (let i = 0; i < zeroCount; i++) {
    arr.push(0);
  }
  return arr;
}

// 수정된 박스 값 교체
function update() {
  playScore.innerText = score;
  setGame();
  gameOverCheck();
}

function gameOverCheck() {
  // 게임오버 체크
  doNotSlide();
  setInterval(() => {
    if (gameOver || endNumber) {
      gameOverScreen();
      let overScore = document.querySelector(".overScore2");
      overScore.innerHTML = score;
      let retry = document.querySelector(".retry");
      retry.addEventListener("click", (e) => {
        reset();
        overScreen.style.opacity = "0";
        win.style.opacity = "0";
        lose.style.opacity = "0";
      });
    }
  }, 100);
}
// 게임오버 체크 2
function doNotSlide() {
  let temp = zeroSwitch(board);
  let doNotSlideCheck = 0;
  for (let i = 0; i < max; i++) {
    for (let k = 0; k < max; k++) {
      if (temp[i][k] == 2048) {
        endNumber = true;
      }
      if (
        temp[i][k] == 0 ||
        (i != 0 && temp[i][k] == temp[i - 1][k]) ||
        (i != 3 && temp[i][k] == temp[i + 1][k]) ||
        (k != 3 && temp[i][k] == temp[i][k + 1]) ||
        (k != 0 && temp[i][k] == temp[i][k - 1])
      ) {
        doNotSlideCheck = 1;
      }
    }
  }
  gameOver = doNotSlideCheck == 0 ? true : false;
}
// 게임오버 창 띄우기
function gameOverScreen() {
  overScreen.style.opacity = "1";
  if (endNumber) {
    win.style.opacity = "1";
  } else {
    lose.style.opacity = "1";
  }
}
// 게임오버창 => 리셋버튼클릭
function reset() {
  endNumber = false;
  gameOver = false;
  let highScore = document.querySelector(".HScore_main");
  if (Number(highScore.innerText) < score) {
    highScore.innerText = score;
  }
  score = 0;
  for (let i = 0; i < max; i++) {
    for (let k = 0; k < max; k++) {
      board[i][k] = 0;
    }
  }
  setGame();
}
