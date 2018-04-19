"use strict";
var x = 5;
var y = 5;
var geschiedenis = [];
// opdracht 1 ------------------------------------------------------------
$(document).ready(function(){

document.getElementById("opdracht1_1").innerHTML = Opdracht1_1();

document.getElementById("opdracht1_2").innerHTML = Opdracht1_2();


document.getElementById("opdracht1_3").innerHTML = Opdracht1_3();


document.getElementById("opdracht1_4").innerHTML = Opdracht1_4();
});

function Opdracht1_1() {
    return x + y;
}

function Opdracht1_2() {
    return x - y;
}

function Opdracht1_3() {
    return x * y;
}

function Opdracht1_4() {
    return x / y;
}

// opdracht 1 bis ---------------------------------------------------------
function rekenen1() {
    var box1 = document.rekenen.box1.value;
    var box2 = document.rekenen.box2.value;
    var box3 = box1 / box2;
    document.rekenen.box3.value = box3;
    geschiedenis.push(uitkomst);
}

function rekenen2() {
    var box4 = document.rekenen.box4.value;
    var box5 = document.rekenen.box5.value;
    var box6 = box4 * box5;
    document.rekenen.box6.value = box6;
}

function rekenen3() {
    var box7 = document.rekenen.box7.value;
    var box8 = document.rekenen.box8.value;
    var box9 = parseInt(box7) + parseInt(box8);
    document.rekenen.box9.value = box9;
}

function rekenen4() {
    var box10 = document.rekenen.box10.value;
    var box11 = document.rekenen.box11.value;
    var box12 = box10 - box11;
    document.rekenen.box12.value = box12;
}

// opdracht 1 tris --------------------------------------------------------
function Opdracht1_tris_4()
    {
    geschiedenis.toString();
    document.getElementById("opdracht1_tris_1_geschiedenis").innerHTML = geschiedenis;
    }