function Zoek() {
    var artist = document.getElementById("artist").value;
    if (artist != "") {
        $.getJSON("http://www.songsterr.com/a/ra/songs.json?pattern=" + artist, function (result) {
            $.each(result, function (i, field) {
                document.getElementById("gegevens").innerHTML += "<p onclick =look(" + field.id + ")>" + field.title + "</p><br>";
            });
        });
    }
    else {
        document.getElementById("gegevens").innerHTML += "U hebt niks ingevoegd, gelieve een artist in te voegen.";
    }
}

function look(id) {
    window.open("http://www.songsterr.com/a/wa/song?id=" + id);
}