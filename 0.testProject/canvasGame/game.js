const canvas = document.querySelector("#canvas");
const startBtn = document.querySelector(".startBtn");
const ctx = canvas.getContext("2d");

let player = { "x": canvas.width / 2 - 25, "y": canvas.height / 2 - 25, "size": 50, "speed": 3 };
let keyDown = {};
let bulletList = []; // 총알 객체가 들어가는 배열 
let isOver = false; // 게임 종료 인지 아닌지 
let time = null; // setInterval 변수 

let playerImg = new Image();  // <img>
playerImg.src = "./bug.png";

// 안되는 이유 => 캔버스가 생성되는 시간이 이미지 로딩되는 속도보다 빨라서 안보여줌 
let backImg = new Image();
backImg.src = "./background1.png";
let backX = 0;

// load 이미지를 화면에 불러오기가 성공이 된 후 -> 캔버스에다가 그려라 
backImg.addEventListener("load", () => {
    ctx.drawImage(backImg, 0, 0, 800, 400); // 안들어간다 => 로딩 이벤트 처리 

})



window.addEventListener("keydown", (e) => {
    keyDown[e.key] = true;

})
window.addEventListener("keyup", (e) => {
    keyDown[e.key] = false;
})

startBtn.addEventListener("click", startGame);

function bulletInit() {
    // 만들어주고 싶은 총알 갯수 
    bulletList = [];
    // 총알 50개 만듬 
    for (let i = 0; i < 10; i++) {
        let b = new Bullet();
        bulletList.push(b);
    }
    // 플레이어 정중앙 셋팅
    bulletList.forEach((b) => { b.init(player.x + 25, player.y + 25) });
}

function movePlayer() {
    if (keyDown["ArrowUp"]) {
        player.y -= player.speed;
    } else if (keyDown["ArrowRight"]) {
        player.x += player.speed;

    } else if (keyDown["ArrowDown"]) {
        player.y += player.speed;
    } else if (keyDown["ArrowLeft"]) {
        player.x -= player.speed;
    }

    if (player.x <= 0) player.x = 0;
    if (player.y <= 0) player.y = 0;
    if (player.x >= canvas.width - player.size) player.x = canvas.width - player.size;
    if (player.y >= canvas.height - player.size) player.y = canvas.height - player.size;

}

// 그림판 새로고침 
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 백그라운드 이미지도 사라진다 -> 그래서 같이 넣어줘야함 
    backX++; //  배경이 움직이는 방향으로 x축으로 이동
    ctx.drawImage(backImg, backX, 0, 800, 400);
    // 빈공간을 다시 배경으로 채우기 
    ctx.drawImage(backImg, backX - 800, 0, 800, 400);

    if (backX == 800) {
        backX = 0;
    }

    drawPlayer();
    movePlayer();
    bulletList.forEach((b) => { b.update(player.x, player.y) });
    bulletList.forEach((b) => {


        // player.x player.y는 위쪽 꼭지점 지점이니깐 
        // 정중앙으로 셋팅 
        if (b.collision(player.x + player.size / 2, player.y + player.size / 2, 25)) {
            gameOver();
            // alert("gameOver");
            clearInterval(time);
            // forEach 문에서 나가기 reutrn false;
            return false;
        }
    });

    if (isOver) {
        return;
    }

    bulletList.forEach((b) => { b.render(ctx) });
}


function drawPlayer() {
    ctx.beginPath();
    ctx.drawImage(playerImg, player.x, player.y, player.size, player.size);
    ctx.closePath();
}

function startGame() {
    isOver = false;
    startBtn.style.visibility = "hidden";
    // 플레이어 초기화
    player.x = canvas.width / 2 - 25;
    player.y = canvas.height / 2 - 25;
    // 총알 초기화 
    bulletInit();
    // 게임 시작 
    time = window.setInterval(draw, 10);
}

function gameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "40px Gulim";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2)
    isOver = true;
    startBtn.style.visibility = "visible";
    ctx.drawImage(backImg, 0, 0, 800, 400);
}

