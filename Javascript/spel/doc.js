"use strict";
/*global $ */

var vijand = document.getElementById("vijand");
var currentPos = 5;
var currentPos2 = 5;
var dx = 5;
var dy = 5;
var breedteBal = window.innerWidth * 0.015;
var hoogteBal = window.innerHeight * 0.03;
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

function BeweegVijand() {
    currentPos += dx;
    currentPos2 += dy;
    vijand.style.left = currentPos + dx + 'px';
    vijand.style.bottom = currentPos2 + dy + 'px';
    
    if (currentPos >= window.innerWidth - breedteBal) {
        dx = -dx;
    }
    if (currentPos2 >= window.innerHeight - breedteBal) {
        dy = -dy;
    }
    if (currentPos <= 0) {
        dx = -dx;
    }
    if (currentPos2 <= 0) {
        dy = -dy;
    }
    
    requestAnimationFrame(BeweegVijand);
}

BeweegVijand();