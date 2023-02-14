const canvas  = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");

let player = { "x": canvas.width , "y": canvas.height, "size":50, "speed": 3};
let keyDown = {};


