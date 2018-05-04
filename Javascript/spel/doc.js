"use strict";
var windowheight
    , windowwidth
    , speler
    , score = 0
    , random
    , vijandLeft
    , vijandTop
    , vijandRight
    , vijandBottom
    , spelerTop
    , spelerLeft
    , spelerRight
    , spelerBottom
    , speler
    , vijandHoogte
    , vijandBreedte;
/* jshint esnext: true */
$(document).ready(function () {
    // welkom box met knop functie
    // voorlopig enkel de box laten verdwijnen
    $("#StartSpel").click(function () {
        // met een lus ervoor zorgen dat de rode bolletjes 10 keer getoond worden
        var i = 0;
        for (i; i < 15; i++) {
            Teken(i);
        }
        windowheight = window.innerHeight;
        windowwidth = window.innerWidth;
        speler = $(".speler");
        $("#welkombox").hide();
        BeweegBallen();
    });
    // verloren box met knop functie
    // voorlopig enkel de box laten verdwijnen
    $("#SpeelOpnieuw").click(function () {
        $("#verlorenbox").hide();
    });
    $("#verlorenbox").hide();
});
// hier gaan we de rode bolletjes tekenen
var Teken = (index) => {
        var offsetleft = GetRandom(window.innerWidth);
        var offsettop = GetRandom(window.innerHeight);
        var id = "vijand" + index;
        var nieuwevijand = "<div class='vijand' id='" + id + "' style='left: " + offsetleft + "px; top: " + offsettop + "px'></div>";
        document.body.innerHTML += nieuwevijand;
    }
    //  hier zetten we een random positie
var GetRandom = (max) => {
        return Math.floor(Math.random() * max) - 25;
    }
    // de speler laten bewegen met de pijltjes toetsen
$(document).keydown(function (e) {
    DetecteerCollisieMetVijand();
    switch (e.which) {
    case 37:
        //links
        if (!DetecteerCollisie("links")) $(".speler").finish().animate({
            left: "-=10"
        });
        break;
    case 38:
        //boven
        if (!DetecteerCollisie("boven")) $(".speler").finish().animate({
            top: "-=10"
        });
        break;
    case 39:
        //rechts
        if (!DetecteerCollisie("rechts")) $(".speler").finish().animate({
            left: "+=10"
        });
        break;
    case 40:
        //beneden
        if (!DetecteerCollisie("beneden")) $(".speler").finish().animate({
            top: "+=10"
        });
        break;
    }
});
// als de speler tegen de rand is dan stoppen
function DetecteerCollisie(richting) {
    switch (richting) {
    case "boven":
        if ((parseInt(speler.css("top")) - 17) < 0) {
            return true;
        }
        else return false;
        break;
    case "links":
        if ((parseInt(speler.css("left")) - 17) < 0) {
            return true;
        }
        else return false;
        break;
    case "rechts":
        if ((parseInt(speler.css("left")) + 32.5) > windowwidth) {
            return true;
        }
        else return false;
        break;
    case "beneden":
        if ((parseInt(speler.css("top")) + 38) > windowheight) {
            return true;
        }
        else return false;
        break;
    }
}
// score maken voor de speler
function MijnScore() {}

function DetecteerCollisieMetVijand() {
    speler = $("#speler")
    $(".vijand").each(function () {
        vijandHoogte = $(this).height();
        vijandBreedte = $(this).width();
        vijandLeft = parseInt(this.style.left);
        //console.log("leftVijand: " + leftVijand);
        //console.log("leftSpeler: " + leftSpeler);
        vijandTop = parseInt(this.style.top);
        //console.log("topVijand: " + topVijand);
        //console.log("topSpeler: " + topSpeler);
        spelerLeft = parseInt(speler.css("left"));
        spelerRight = parseInt(speler.css("left")) + (speler.width());
        spelerTop = parseInt(speler.css("top"));
        spelerBottom = parseInt(speler.css("top")) + (speler.height());
        vijandLeft = vijandLeft;
        vijandRight = vijandLeft + (vijandBreedte);
        vijandTop = vijandTop;
        vijandBottom = vijandTop + (vijandHoogte);
        //   if (!((spelerBottom < vijandTop) || (spelerTop > vijandBottom) || (spelerRight < vijandLeft) || (spelerLeft > vijandRight))) {
        //        console.log(spelerLeft + "," + spelerRight + "," + spelerTop + "," + spelerBottom + "," + vijandLeft + "," + vijandRight + "," + vijandTop + "," + vijandBottom);
        //      $("#verlorenbox").show();
        //    speler.css("display", "none");
        //}
        //if ((spelerBottom == vijandTop) || (spelerTop == vijandBottom)) {
        //    $("#verlorenbox").show();
        //    speler.css("display", "none");
        //}
    })
}

function BeweegBallen() {
    $(".vijand").each(function () {
        random = Math.random();
        if (random > 0.75) {
            random = 3;
        }
        else if (random > 0.50) {
            random = 2;
        }
        else if (random > 0.25) {
            random = 1;
        }
        else if (random > 0) {
            random = 0;
        }
        switch (random) {
        case 0:
            console.log("case 0");
            Beweeg(this.id, 0);
            break;
        case 1:
            console.log("case 1");
            Beweeg(this.id, 1);
            break;
        case 2:
            console.log("case 2");
            Beweeg(this.id, 2);
            break;
        case 3:
            console.log("case 3");
            Beweeg(this.id, 3);
            break;
        }
    });
    requestAnimationFrame(BeweegBallen);
}

function Beweeg(obj, richting) {
    switch (richting) {
    case 0:
        //links
        //if (!DetecteerCollisie("links")) {
        $("#" + obj).animate({
            left: "-=100"
        });
        break;
    case 1:
        //boven
        $("#" + obj).animate({
            top: "-=100"
        }, "fast", function () {
            console.log(obj + " the new value is: " + $("#" + obj).left);
        });
        break;
    case 2:
        //rechts
        $("#" + obj).animate({
            left: "+=100"
        });
        break;
    case 3:
        //beneden
        $("#" + obj).animate({
            top: "+=100"
        });
        break;
    }
}