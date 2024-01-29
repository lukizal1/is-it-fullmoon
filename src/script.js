document.addEventListener('DOMContentLoaded', getMoonPhase);
async function getMoonPhase() {
    const url = 'https://moon-phase.p.rapidapi.com/advanced?lat=51.4768&lon=-0.0004';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '794eb7ed8amsh314959ce76b18afp1aaa6fjsne3d86a896de4',
            'X-RapidAPI-Host': 'moon-phase.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        displayMoonData(result);
    } catch (error) {
        console.error('Fehler beim Abrufen der Mondphasen:', error);
    }
}
function displayMoonData(data) {
    let moonphase = data.moon.phase_name; //"Full Moon" //zum debuggen
    let moonemoji = data.moon.emoji;
    let lastfmDate = data.moon_phases.full_moon.last.datestamp;
    let nextfmDate = data.moon_phases.full_moon.next.datestamp;
    
    setMoonImage(moonphase);
    setMoonPhase(moonphase, moonemoji);
    setFullMoonInfo(lastfmDate, nextfmDate);
}
function setFullMoonInfo(lastfmDate, nextfmDate) {
    let fullmoonInfo = document.getElementById('fullmoonInfo');

    let dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' });
    lastfmDate = Date.parse(lastfmDate);
    nextfmDate = Date.parse(nextfmDate);
    let lastFullmoon = dateFormatter.format(lastfmDate);
    let nextFullmoon = dateFormatter.format(nextfmDate);

    fullmoonInfo.innerHTML = `<p><b>Last Full Moon:</b> ${lastFullmoon}</p> <p><b>Next Full Moon:</b> ${nextFullmoon}</p>`;
}
function setMoonPhase(moonphase, moonemoji) {
    let moonPhaseInfo = document.getElementById('moonPhaseInfo');
    let itsfullmoon = document.getElementById('itsfullmoon');
    let itsnotfullmoon = document.getElementById('itsnotfullmoon');

    moonPhaseInfo.innerHTML = `<p>${moonphase} ${moonemoji}</p>`;
    if (moonphase === "Full Moon") {
        itsnotfullmoon.style.display = "none";
        itsfullmoon.style.display = "block";
    }
}
function setMoonImage(moonPhase) {
    let moonimg = document.getElementById('moonimg');
    switch (moonPhase){
        case "Third Quarter":
            moonimg.src = "../img/third quarter.png"
            break;

        case "Waning Gibbous":
            moonimg.src = "../img/waning gibbous.png"
            break;

        case "Full Moon":
            moonimg.src = "../img/full moon.png"
            break;

        case "Waxing Gibbous":
            moonimg.src = "../img/waxing gibbous.png"
            break;

        case "First Quarter":
            moonimg.src = "../img/first quarter.png"
            break;

        case "Waxing Crescent":
            moonimg.src = "../img/waxing crescent.png"
            break;

        case "New Moon":
            moonimg.src = "../img/new moon.png"
            break;

        case "Waning Crescent":
            moonimg.src = "../img/waning crescent.png"
            break;
    }
}

