"use strict";
var windowheight, windowwidth, speler, score = 0
    , random, vijandLeft, vijandTop, vijandRight, vijandBottom, spelerTop, spelerLeft, spelerRight, spelerBottom, speler, vijandHoogte, vijandBreedte, subject, moeilijkheidsGraad = 0
    , aantalBollen = 0
    , pauze = false
    , request, kleuren = ["red", "orange", "yellow", "green", "blue", "purple", "beige", "cyan", "rose", "violet"];
/* jshint esnext: true */
$(document).ready(function () {
    // welkom box met knop functie
    // --- EPILEPSIE? ---
    $("#StartEasy").click(function () {
        moeilijkheidsGraad = 50;
        aantalBollen = 15;
        TekenVijand(aantalBollen);
        setInterval(VeranderVijandVanKleur, 60000);
        setInterval(function(){
            score += 5;
            MijnScore();
        }, 1000);
    });
    $("#StartNormaal").click(function () {
        moeilijkheidsGraad = 100;
        aantalBollen = 25;
        TekenVijand(aantalBollen);
        setInterval(VeranderVijandVanKleur, 60000);
        setInterval(function(){
            score += 5;
            MijnScore();
        }, 1000);
    });
    $("#StartHard").click(function () {
        moeilijkheidsGraad = 200;
        aantalBollen = 40;
        TekenVijand(aantalBollen);
        setInterval(VeranderVijandVanKleur, 60000);
        setInterval(function(){
            score += 5;
            MijnScore();
        }, 1000);
    });
    // verloren box met knop functie
    // voorlopig enkel de box laten verdwijnen
    $("#SpeelOpnieuw").click(function () {
        $("#verlorenbox").hide();
    });
    $("#verlorenbox").hide();
});

function TekenVijand(getal) {
    // met een lus ervoor zorgen dat de rode bolletjes "aantalBollen" keer getoond worden
    var i = 0;
    for (i; i < getal; i++) {
        Teken(i);
    }
    windowheight = window.innerHeight;
    windowwidth = window.innerWidth;
    speler = $(".speler");
    $("#welkombox").hide();
    BeweegBallen();
}

function VeranderVijandVanKleur() {
    random = Math.floor(Math.random() * 10);
    $(".vijand").each(function () {
        
        this.style.background = kleuren[random];
    })
}
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

function pauzeer() {
    alert("oi");
    console.log("OI");
    if (!pauze) {
        console.log("pauze");
        pauze = true;
        cancelAnimationFrame(request);
    }
    else {
        console.log("unpauze");
        pauze = false;
        request = requestAnimationFrame(BeweegBallen);
    }
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

function DetecteerCollisieVanVijand(richting, obj) {
    subject = $("#" + obj);
    // console.log(obj + ": " + parseInt(subject.css("top")));
    switch (richting) {
    case "boven":
        if ((parseInt(subject.css("top")) - 17) < 0) {
            return true;
        }
        else return false;
        break;
    case "links":
        if ((parseInt(subject.css("left")) - 17) < 0) {
            return true;
        }
        else return false;
        break;
    case "rechts":
        if ((parseInt(subject.css("left")) + 32.5) > windowwidth) {
            return true;
        }
        else return false;
        break;
    case "beneden":
        if ((parseInt(subject.css("top")) + 38) > windowheight) {
            return true;
        }
        else return false;
        break;
    }
}
// score maken voor de speler
function MijnScore() {
    $("#score").html = "Score: " + score;
}

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
            // console.log(this.id);
            if (!DetecteerCollisieVanVijand("links", this.id)) {
                //console.log("case 0");
                Beweeg(this.id, 0);
            }
            break;
        case 1:
            if (!DetecteerCollisieVanVijand("boven")) {
                //console.log("case 1");
                Beweeg(this.id, 1);
            }
            break;
        case 2:
            if (!DetecteerCollisieVanVijand("rechts")) {
                // console.log("case 2");
                Beweeg(this.id, 2);
            }
            break;
        case 3:
            if (!DetecteerCollisieVanVijand("beneden")) {
                //console.log("case 3");
                Beweeg(this.id, 3);
            }
            break;
        }
    });
    request = requestAnimationFrame(BeweegBallen);
}

function Beweeg(obj, richting) {
    switch (richting) {
    case 0:
        //links
        //if (!DetecteerCollisie("links")) {
        $("#" + obj).animate({
            left: "-=" + moeilijkheidsGraad
        });
        break;
    case 1:
        //boven
        $("#" + obj).animate({
            top: "-=" + moeilijkheidsGraad
        });
        break;
    case 2:
        //rechts
        $("#" + obj).animate({
            left: "+=" + moeilijkheidsGraad
        });
        break;
    case 3:
        //beneden
        $("#" + obj).animate({
            top: "+=" + moeilijkheidsGraad
        });
        break;
    }
}
$("#speler").on("touchmove", function (e) {
    var raakAan = e.originalEvent.touches[0];
    var positieX = touch.clientX;
    var positieY = touch.clientY;
    $(this).css({
        "-webkit-transform": "translate3d(" + positieX + "px," + positieY + "px,0)"
    })
});