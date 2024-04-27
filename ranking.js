function displayMembers(){
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            getAllMembers(this);
        }
    };
    xhttp.open("GET","Assets/Data/membersList.xml",true);
    xhttp.send();
}
function displayStandard() {
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            getStandard(this);
        }
    };
    xhttp.open("GET","Assets/Data/membersList.xml",true);
    xhttp.send();
}

function displayRapid() {
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            getRapid(this);
        }
    };
    xhttp.open("GET","Assets/Data/membersList.xml",true);
    xhttp.send();
}

function displayBlitz() {
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            getBlitz(this);
        }
    };
    xhttp.open("GET","Assets/Data/membersList.xml",true);
    xhttp.send();
}

function getAllMembers(xml){
    var i;
    var table="<table class='table table-dark table-striped' ><tr><th>Meno</th><th>Pohlavie</th><th>Rok nar.</th><th>Narodnost</th></tr>"
    const xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("player");
    var players = [];
    for(i = 0; i<x.length; i++) {
        const player = {
            name: getName((x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue).trim(), (x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue).trim()),
            sex: getSex(x[i].getElementsByTagName("sex")[0].childNodes[0].nodeValue.trim()),
            birthday: x[i].getElementsByTagName("birthday")[0].childNodes[0].nodeValue.trim(),
            nationality: x[i].getElementsByTagName("nationality")[0].childNodes[0].nodeValue.trim()
        };
        players.push(player);
    }
        for (const player of players) {
            if (player.currentRating !== "none") {
                table += "<tr><td>" + player.name + "</td><td>" + player.sex + "</td><td>" + player.birthday + "</td><td>" + player.nationality + "</td></tr>";
            }
        }
        table+="</table>";
        document.getElementById("text").innerHTML = "*Ratingy k 1.3.2024";
        document.getElementById("ranking-type").innerHTML = "Členovia";
        document.getElementById("ranking").innerHTML = table;
}

function getStandard(xml) {
    var table="<table class='table table-dark table-striped' ><tr><th>Meno</th><th>Pohlavie</th><th>Rok nar.</th><th>Narodnost</th><th>Elo</th><th>elo Max</th></tr>"
    var players = sortRatings(xml,"standard");

    for (const player of players) {
        if (player.currentRating !== "none") {
            table += "<tr><td>" + player.name + "</td><td>" + player.sex + "</td><td>" + player.birthday + "</td><td>" + player.nationality + "</td><td>" + player.currentRating + "</td><td>" + player.peakRating + "</td></tr>";
        }
    }
    table+="</table>";
    document.getElementById("text").innerHTML = "*Ratingy k 1.3.2024";
    document.getElementById("ranking-type").innerHTML = "Štandard";
    document.getElementById("ranking").innerHTML = table;
}
function getRapid(xml) {
    var table="<table class='table table-dark table-striped' ><tr><th>Meno</th><th>Pohlavie</th><th>Rok nar.</th><th>Narodnost</th><th>Elo</th><th>elo Max</th></tr>"
    const players = sortRatings(xml,"rapid");

    for (const player of players) {
        if (player.currentRating !== "none") {
            table += "<tr><td>" + player.name + "</td><td>" + player.sex + "</td><td>" + player.birthday + "</td><td>" + player.nationality + "</td><td>" + player.currentRating + "</td><td>" + player.peakRating + "</td></tr>";
        }
    }
    table+="</table>";
    document.getElementById("text").innerHTML = "*Ratingy k 1.3.2024";
    document.getElementById("ranking-type").innerHTML = "Rapid";
    document.getElementById("ranking").innerHTML = table;
}

function getBlitz(xml) {
    var table="<table class='table table-dark table-striped' ><tr><th>Meno</th><th>Pohlavie</th><th>Rok nar.</th><th>Narodnost</th><th>Elo</th><th>elo Max</th></tr>"
    const players = sortRatings(xml,"blitz");

    for (const player of players) {
        if (player.currentRating !== "none") {
            table += "<tr><td>" + player.name + "</td><td>" + player.sex + "</td><td>" + player.birthday + "</td><td>" + player.nationality + "</td><td>" + player.currentRating + "</td><td>" + player.peakRating + "</td></tr>";
        }
    }
    table+="</table>";
    document.getElementById("text").innerHTML = "*Ratingy k 1.3.2024";
    document.getElementById("ranking-type").innerHTML = "Blitz";
    document.getElementById("ranking").innerHTML = table;
}

function getName(title,name){
    if(title === "none"){
        return name;
    }

    return (title + " " + name);
}

function getSex(sex){
    if(sex === "F"){
        return "Ž";
    }
    return sex;
}

function sortRatings(xml,ratingType){
    var i;
    const xmlDoc = xml.responseXML;
    const x = xmlDoc.getElementsByTagName("player");
    var players = [];
    for(i = 0; i<x.length; i++) {
        const player = {
            name: getName((x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue).trim(), (x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue).trim()),
            sex: getSex(x[i].getElementsByTagName("sex")[0].childNodes[0].nodeValue.trim()),
            birthday: x[i].getElementsByTagName("birthday")[0].childNodes[0].nodeValue.trim(),
            nationality: x[i].getElementsByTagName("nationality")[0].childNodes[0].nodeValue.trim(),
            currentRating: x[i].getElementsByTagName("ratings")[0].querySelector("current").querySelector(ratingType).textContent.trim(),
            peakRating: x[i].getElementsByTagName("ratings")[0].querySelector("peak").querySelector(ratingType).textContent.trim(),
        };
        players.push(player);
    }
    players.sort((a, b) => {
        const eloA = parseInt(a.currentRating, 10) || -1;
        const eloB = parseInt(b.currentRating, 10) || -1;
        return eloB - eloA;
    });
    return players;
}