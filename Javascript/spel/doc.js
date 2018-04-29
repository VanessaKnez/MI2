"use strict";
/* jshint esnext: true */
// met een lus ervoor zorgen dat de rode bolletjes 10 keer getoond worden
$(document).ready(function () {
        var i = 0;
        for (i; i < 10; i++) {
            Teken();
        }
    })
    // hier gaan we de rode bolletjes tekenen
var Teken = () => {
        var offsetleft = GetRandom(window.innerWidth);
        var offsettop = GetRandom(window.innerHeight);
        document.body.innerHTML += "<div class='vijand' style='left: " + offsetleft + "px; top: " + offsettop + "px'></div>";
    }
    //  hier zetten we een random positie
var GetRandom = (max) => {
        return Math.floor(Math.random() * max) - 25;
    }
    // de speler laten bewegen met de pijltjes toetsen
$(document).keydown(function (e) {
    switch (e.which) {
    case 37:
        //links
        $(".speler").finish().animate({
            left: "-=10"
        });
        break;
    case 38:
        //boven
        $(".speler").finish().animate({
            top: "-=10"
        });
        break;
    case 39:
        //rechts
        $(".speler").finish().animate({
            left: "+=10"
        });
        break;
    case 40:
        //beneden
        $(".speler").finish().animate({
            top: "+=10"
        });
        break;
    }
});