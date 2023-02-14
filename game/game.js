const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let player = { "x": canvas.width / 2 - 25, "y": canvas.height / 2 - 25, "size": 50, "speed": 3 };

let keyDown = {};
let bulletList = []; // 총알 객체가 들어가는 배열 

window.addEventListener("keydown", (e) => {
    keyDown[e.key] = true;

})
window.addEventListener("keyup", (e) => {
    keyDown[e.key] = false;
})

function bulletInit() {
    // 만들어주고 싶은 총알 갯수 
    bulletList = [];
    // 총알 50개 만듬 
    for (let i = 0; i < 50; i++) {
        let b = new Bullet();
        //bulletList[i] = b;
        b.init(); // 랜덤 좌표값 셋팅 
        bulletList.push(b);
    }

}

function movePlayer() {
    if (keyDown["ArrowUp"]) {
        player.y -= player.speed;
        console.log("test");
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
    drawPlayer();
    movePlayer();

    bulletList.forEach((bull) => {
        bull.render(ctx);
    })

    bulletList.forEach((bull) => {
        bull.update(player.x, player.y);
    })

}

let playerImg = new Image();  // <img>
playerImg.src = "./poketball.png";


function drawPlayer() {
    ctx.beginPath();
    ctx.drawImage(playerImg, player.x, player.y, player.size, player.size);
    ctx.closePath();
}

bulletInit();
window.setInterval(draw, 10);