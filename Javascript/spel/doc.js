"use strict";
// het aanmaken van de variabelen
// de meeste variabelen probeer ik hier te zetten zo zijn ze allemaal samen en heb ik een goed overzicht
var windowheight, windowwidth, speler, score = 0
    , random, vijandLeft, vijandTop, vijandRight, vijandBottom, spelerTop, spelerLeft, spelerRight, spelerBottom, speler, vijandHoogte, vijandBreedte, subject, moeilijkheidsGraad = 0
    , aantalBollen = 0
    , pauze = false
    , request, kleuren = ["red", "orange", "yellow", "green", "blue", "purple", "beige", "cyan", "rose", "violet"];
/* jshint esnext: true */
$(document).ready(function () {
    // welkom box met knop functie
    // --- EPILEPSIE? ---
    $("#GoRechts").click(function () {
        alert("test");
        if (!DetecteerCollisie("rechts")) {
            alert("test");
            $(".speler").finish().animate({
                left: "+=10"
            })
        }
    });
    /**
     * Als er op de easy knop gedrukt wordt,
     * Dan is de moeilijkheidsgraad lager, op 50
     * En het aantal bollen dat getekend word zijn 15
     */
    $("#StartEasy").click(function () {
        moeilijkheidsGraad = 50;
        aantalBollen = 15;
        TekenVijand(aantalBollen);
        setInterval(VeranderVijandVanKleur, 60000);
        setInterval(function () {
            score += 5;
            MijnScore();
        }, 1000);
    });
    /**
     * Als er op de normaal knop gedrukt wordt,
     * Dan is de moeilijkheidsgraad normaal, op 100
     * En het aantal bollen dat getekend word zijn 25
     */
    $("#StartNormaal").click(function () {
        moeilijkheidsGraad = 100;
        aantalBollen = 25;
        TekenVijand(aantalBollen);
        setInterval(VeranderVijandVanKleur, 60000);
        setInterval(function () {
            score += 5;
            MijnScore();
        }, 1000);
    });
    /**
     * Als er op de hard knop gedrukt wordt,
     * Dan is de moeilijkheidsgraad hoger, op 200
     * En het aantal bollen dat getekend word zijn 40
     */
    $("#StartHard").click(function () {
        moeilijkheidsGraad = 200;
        aantalBollen = 40;
        TekenVijand(aantalBollen);
        setInterval(VeranderVijandVanKleur, 60000);
        setInterval(function () {
            score += 5;
            MijnScore();
        }, 1000);
    });
    // verloren box met knop functie
    // voorlopig enkel de box laten verdwijnen
    // $("#SpeelOpnieuw").click(function () {
    //     $("#verlorenbox").hide();
    // });
    // $("#verlorenbox").hide();
});
// met een lus ervoor zorgen dat de rode bolletjes "aantalBollen" keer getoond worden
function TekenVijand(getal) {
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
// de vijanden van kleur laten veranderen, de kleuren die in de array staan
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
    // de spel laten pauzeren
    // VOORLOPIG WERKT DIT NOG NIET
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
    speler = $("#speler")
    spelerTop = parseInt(speler.css("top"));
    spelerBottom = parseInt(speler.css("top")) + parseInt(speler.css("height"));
    spelerLeft = parseInt(speler.css("left"));
    spelerRight = parseInt(speler.css("left")) + parseInt(speler.css("width"));
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
    console.log(obj + ": " + parseInt(subject.css("top")));
    switch (richting) {
    case "boven":
        if ((parseInt(subject.css("top")) - 100) < 0) {
            return true;
        }
        else return false;
        break;
    case "links":
        if ((parseInt(subject.css("left")) - 100) < 0) {
            return true;
        }
        else return false;
        break;
    case "rechts":
        if ((parseInt(subject.css("left")) + 100) > windowwidth) {
            return true;
        }
        else return false;
        break;
    case "beneden":
        if ((parseInt(subject.css("top")) + 100) > windowheight) {
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
// zien of de speler opgegeten is door de vijand
function DetecteerCollisieMetVijand() {
    $(".vijand").each(function () {
        if (parseInt(this.style.left) < spelerLeft && parseInt(this.style.top) < spelerTop && (parseInt(this.style.left) + parseInt(this.style.width)) > spelerRight && (parseInt(this.style.top) + this.style.height) > spelerBottom) {
            gameOver();
        }
    })
}
// wanneer het spel voorbij is
function gameOver() {
    $("#verlorenbox").show();
}
// de vijanden random laten bewegen
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
        case 0: //links
            //console.log(this.id);
            if ((parseInt(this.style.left) - 100) > 0) {
                console.log("the left is: " + parseInt(this.style.left) + " and is larger than 0");
                Beweeg(this.id, 0);
            }
            break;
        case 1: //boven
            if ((parseInt(this.style.top) - 100) > 0) {
                console.log("the top is: " + parseInt(this.style.top) + " and is larger than 0");
                Beweeg(this.id, 1);
            }
            break;
        case 2: //rechts
            if ((parseInt(this.style.left) + 100) < window.innerWidth) {
                console.log("the left is: " + parseInt(this.style.left) + " and is smaller than " + window.innerWidth);
                Beweeg(this.id, 2);
            }
            break;
        case 3: //beneden
            if ((parseInt(this.style.top) + 100) < window.innerHeight) {
                console.log("the top is: " + parseInt(this.style.top) + " and is smaller than " + window.innerHeight);
                Beweeg(this.id, 3);
            }
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
$("#speler").on("touchmove", function (e) {
    var raakAan = e.originalEvent.touches[0];
    var positieX = touch.clientX;
    var positieY = touch.clientY;
    $(this).css({
        "-webkit-transform": "translate3d(" + positieX + "px," + positieY + "px,0)"
    })
});