"use strict";

function haalGetalOp() {
    var waarde = parseInt(document.getElementById("invoerGetal").value);
    tekenBord(waarde);
}

function tekenBord(aantal) {
    var i, j, k, veld, inhoud = "";
    for (i = 0; i < aantal; i++) {
        for (j = 0; j < aantal; j++) {
            k = '';
            if (j == 0) k = 'first ';
            k += (i % 2 == j % 2) ? 'wit' : 'zwart';
            inhoud += "<div class='" + k + "'></div>"
                //veld = document.createElement('div');
                //veld.className = k;
                //document.body.appendChild(veld);
        }
    }
    document.getElementById("bord").innerHTML = inhoud;
    document.getElementById("bord").style.width = (aantal * 75) + "px";
    document.getElementById("bord").style.height = (aantal * 75) + "px";
}
tekenBord(12);