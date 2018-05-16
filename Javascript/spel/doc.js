"use strict";
// het aanmaken van de variabelen
// de meeste variabelen probeer ik hier te zetten zo zijn ze allemaal samen en heb ik een goed overzicht
var windowheight, windowwidth, speler, score = 0
    , random, vijandLeft, vijandTop, vijandRight, vijandBottom, spelerTop, spelerLeft, spelerRight, spelerBottom, speler, vijandHoogte, vijandBreedte, subject, moeilijkheidsGraad = 0
    , aantalBollen = 0
    , pauze = false
    , request, kleuren = ["red", "orange", "yellow", "green", "blue", "purple", "beige", "cyan", "rose", "violet"]
    , tijdOver, timer;
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
        setInterval(RandomPositieVijand, 10000);
        setInterval(VeranderVijandVanKleur, 60000);
        setInterval(function () {
            score += 5;
            MijnScore();
        }, 1000);
        tijdOver(10);
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
        setInterval(RandomPositieVijand, 7000);
        setInterval(VeranderVijandVanKleur, 60000);
        setInterval(function () {
            score += 5;
            MijnScore();
        }, 1000);
        tijdOver(7);
        DetecteerCollisieUitgang();
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
        setInterval(RandomPositieVijand, 3000);
        setInterval(VeranderVijandVanKleur, 60000);
        setInterval(function () {
            score += 5;
            MijnScore();
        }, 1000);
        tijdOver(3);
    });
    // verloren box met knop functie
    // voorlopig enkel de box laten verdwijnen
    // $("#SpeelOpnieuw").click(function () {
    //     $("#verlorenbox").hide();
    // });
    // $("#verlorenbox").hide();
});

function tijdOver(getal) {
    tijdOver = getal;
    setInterval(function () {
        tijdOver--;
        document.getElementById("tijd").textContent = "00:" + tijdOver + " seconds";
        if (tijdOver < 0) {
            tijdOver = getal;
            document.getElementById("tijd").textContent = "00:" + tijdOver + " seconds";
        }
    }, 1000);
}

function RandomPositieVijand() {
    var offsetleft;
    var offsettop;
    for (var i = 0; i < aantalBollen; i++) {
        offsetleft = GetRandom(window.innerWidth);
        offsettop = GetRandom(window.innerHeight);
        $("#vijand" + i).css({
            left: offsetleft
            , top: offsettop
        })
    }
}
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
        // return Math.floor(Math.random() * max) - 25;
        return Math.floor(Math.random() * max);
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
        })
        DetecteerCollisieUitgang();
        break;
    case 39:
        //rechts
        if (!DetecteerCollisie("rechts")) $(".speler").finish().animate({
            left: "+=10"
        })
        DetecteerCollisieUitgang();
        break;
    case 40:
        //beneden
        if (!DetecteerCollisie("beneden")) $(".speler").finish().animate({
            top: "+=10"
        })
        DetecteerCollisieUitgang();
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
// als de speler in de uitgang is dan terug opnieuw positioneren
function DetecteerCollisieUitgang() {
    var uitgang = $("#uitgang")
    if (parseInt(speler.css("top")) > parseInt(uitgang.css("margin-top")) && (parseInt(speler.css("top")) + parseInt(speler.css("height"))) < (parseInt(window.innerHeight) - parseInt(uitgang.css("margin-top")) + parseInt(uitgang.css("height"))) && parseInt(speler.css("left")) > parseInt(window.innerWidth) - 40) {
        alert("test");
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
$("#speler").on("touchmove", function (e) {
    var raakAan = e.originalEvent.touches[0];
    var positieX = touch.clientX;
    var positieY = touch.clientY;
    $(this).css({
        "-webkit-transform": "translate3d(" + positieX + "px," + positieY + "px,0)"
    })
});