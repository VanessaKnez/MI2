"use strict";
var windowheight,
	windowwidth,
	speler,
	score = 0;
/* jshint esnext: true */

// hier gaan we de rode bolletjes tekenen
var Teken = () => {
	var offsetleft = GetRandom(window.innerWidth);
	var offsettop = GetRandom(window.innerHeight);
	document.body.innerHTML += "<div class='vijand' id='vijand' style='left: " + offsetleft + "px; top: " + offsettop + "px'></div>";
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
			if (!DetecteerCollisie("links"))
				$(".speler").finish().animate({
					left: "-=10"
				});
			break;
		case 38:
			//boven
			if (!DetecteerCollisie("boven"))
				$(".speler").finish().animate({
					top: "-=10"
				});
			break;
		case 39:
			//rechts
			if (!DetecteerCollisie("rechts"))
				$(".speler").finish().animate({
					left: "+=10"
				});
			break;
		case 40:
			//beneden
			if (!DetecteerCollisie("beneden"))
				$(".speler").finish().animate({
					top: "+=10"
				});
			break;
	}
});

// als de speler tegen de rand is dan stoppen
function DetecteerCollisie(richting) {
	console.log("detecteercollisie")
	switch (richting) {
		case "boven":
			console.log(speler.css("top"))
			console.log(parseInt(speler.css("top")) - 10)
			if ((parseInt(speler.css("top")) - 17) < 0) {

				return true;
			} else return false;
			break;
		case "links":
			if ((parseInt(speler.css("left")) - 17) < 0) {
				return true;
			} else return false;
			break;
		case "rechts":
			if ((parseInt(speler.css("left")) + 32.5) > windowwidth) {
				return true;
			} else return false;
			break;
		case "beneden":
			if ((parseInt(speler.css("top")) + 38) > windowheight) {
				return true;
			} else return false;
			break;

	}
}

// score maken voor de speler
function MijnScore() {}

// welkom box met knop functie
// voorlopig enkel de box laten verdwijnen
$(document).ready(function () {
	$("#StartSpel").click(function () {
		// met een lus ervoor zorgen dat de rode bolletjes 10 keer getoond worden
		var i = 0;
		for (i; i < 10; i++) {
			Teken();
		}
		windowheight = window.innerHeight;
		windowwidth = window.innerWidth;
		speler = $(".speler");
		$("#welkombox").hide();
	});
});

// verloren box met knop functie
// voorlopig enkel de box laten verdwijnen
$(document).ready(function () {
	$("#SpeelOpnieuw").click(function () {
		$("#verlorenbox").hide();
	});
});
