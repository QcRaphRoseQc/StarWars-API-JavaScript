//------------------------------------------------------------------DECLARATION VARIABLE--------------------------------------------------

let urlFilm = "https://swapi.dev/api/films/";
let urlPlanete = "https://swapi.dev/api/planets/";
let films = [];
let filmArray = [];
let imageAfficher = [];
let film;

let currentImageNumber = 0;
let scrollSpeedValue = 0;
let imagePath = "";
let planetName = "";
let imageScroller = "";
let isScroll = true;
let isMusic = false;
let isMusicCreated = false;
let filmList = document.getElementById("filmsList");
let planetList = document.getElementById("planetsList");
let htmlImage = document.getElementById("image");
let precedentBtn = document.getElementById("precedent");
let suivantBtn = document.getElementById("suivant");
let stopBtn = document.getElementById("stop");
let scrollerBtn = document.getElementById("scroller");
let soundBtn = document.getElementById("sound");
let mp3 = document.getElementById("mp3");
let audio = document.createElement("audio");
//------------------------------------------------------------------EVENTLISTENER--------------------------------------------------

filmList.addEventListener("change", afficherPlanete);
planetList.addEventListener("change", afficherImage);
suivantBtn.addEventListener("click", afficherImage);
precedentBtn.addEventListener("click", afficherPrecedent);
scrollerBtn.addEventListener("change", imageScroll);
stopBtn.addEventListener("click", stopScroll);
soundBtn.addEventListener("click", playMusic);

//get button#sound.btn
//------------------------------------------------------------------FUNCTION EventListener--------------------------------------------------


function createMusic() {


    audio.src = "audio/audio.mp3";
    audio.loop = true;
    audio.play();


    var resp = audio.play();

if (resp!== undefined) {
    resp.then(_ => {
        // autoplay starts!
    }).catch(error => {
       //show error
    });
}
}




function playMusic() {

    

    if (isMusicCreated == false) {
        createMusic();
        isMusicCreated = true;
    }

    

    if (isMusic == false) {
        console.log("music");
        audio.muted = false;
        sound.style.backgroundImage = "url('./images/playicon.png')";
        sound.style.width = "50px";
        sound.style.height = "50px";

    }
    else {
        console.log("muted");
        audio.muted = true;
        sound.style.backgroundImage = "url('./images/mutedicon.png')";
        sound.style.width = "50px";
        sound.style.height = "50px";

    }

    isMusic = !isMusic;

}



function stopScroll() {

    console.log(isScroll);

    if (isScroll) {
        clearInterval(imageScroller);
        stopBtn.innerHTML = "demarrer";
    }
    else {
        imageScroll();
        stopBtn.innerHTML = "ARRÊT";
    }

    isScroll = !isScroll;

}


function imageScroll() {

    scrollSpeedValue = 6600 - scrollerBtn.value;
    console.log(scrollSpeedValue);
    clearInterval(imageScroller);
    imageScroller = setInterval(afficherImage, scrollSpeedValue);
}

function afficherPrecedent() {
    isScroll = true;
    stopScroll();
    currentImageNumber = currentImageNumber - 2;
    afficherImage();
}


//------------------------------------------------------------------FUNCTION ASYNC/API CALL--------------------------------------------------

const retrieveFilms = async function () {

    films = await fetch(urlFilm).then(resp => resp.json());
    for (let i = 0; i < films.results.length; i++) {
        films.results[i].title = films.results[i].title;

        for (let j = 0; j < films.results[i].planets.length; j++) {
            let planetes = await retrievePlanetsName(films.results[i].planets[j]);
            films.results[i].planets[j] = planetes;

            film = {
                title: films.results[i].title,
                planets: films.results[i].planets
            };
        }
        filmArray.push(film);
    }

    //------------------------------------------------------------------CALL AFFICHAGE--------------------------------------------------


    afficherFilms();
    afficherPlanete();
    afficherImage();
    imageScroll();
    return films;

};

const retrievePlanetsName = async function (urlPlanete) {
    let planetes = await fetch(urlPlanete).then(resp => resp.json());
    return planetes.name;

};

//------------------------------------------------------------------FUNCTION AFFICHAGE HTML--------------------------------------------------

function afficherFilms() {
    for (let i = 0; i < filmArray.length; i++) {
        let option = document.createElement("option");
        option.innerHTML = filmArray[i].title;
        filmsList.appendChild(option);
    }
}

function afficherPlanete() {

    planetList.innerHTML = "";
    for (let i = 0; i < filmArray.length; i++) {
        if (filmArray[i].title == filmList.value) {
            for (let j = 0; j < filmArray[i].planets.length; j++) {
                let option = document.createElement("option");
                option.innerHTML = filmArray[i].planets[j];
                planetList.appendChild(option);
            }
        }
    }
    afficherImage();
}


function afficherImage() {


    while (currentImageNumber > 5) {
        currentImageNumber = 1;
    }

    while (currentImageNumber < 1) {
        currentImageNumber = 5;
    }
    planetName = planetList.value;
    //console.log(imageNombre);
    imagePath = "images/" + planetName + "/" + currentImageNumber + ".jpeg";
    //create a fade in effect
    htmlImage.style.opacity = 0;
    htmlImage.style.transition = "opacity 0.5s";
    htmlImage.style.backgroundColor = "black";
    htmlImage.style.filter = "blur(5px)";

    setTimeout(function () {
        //set the image source

        htmlImage.src = imagePath;
        htmlImage.alt = planetList.value;
        imageAfficher.push(imagePath);
        currentImageNumber++;
        htmlImage.style.opacity = 1;
        htmlImage.style.filter = "blur(0px)";
    }, 1000);
}


//------------------------------------------------------------------CALL FUNCTION ASYNC--------------------------------------------------


retrieveFilms();






