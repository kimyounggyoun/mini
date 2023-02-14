
const board = [...document.querySelectorAll("td")];
const timer = document.querySelector(".timer_main");
const score = document.querySelector(".score_main");

let boxs = [];
let scr = 0;
let ENDNUMBER = 2048;

function test () {
    board.forEach((box) => {
        box.className = `"x"+${box.innerText}`;
    })
}


boxs.forEach((box) => {
    
})

test();