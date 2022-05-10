let audioKick = new Audio('assets/audio/Bass-Drum-1.wav');
let audioSnare = new Audio('assets/audio/snare.wav');
let audioHH = new Audio('assets/audio/opHat.wav');
let audioHH_close = new Audio('assets/audio/clHat.wav');
let crash = new Audio('assets/audio/allCrash.wav');
let maxVol = 0.5;

document.querySelector('#kick').addEventListener("click", clickKick)
document.querySelector('#snare').addEventListener("click", clickSnare)
document.querySelector('#hh').addEventListener("click", clickHH)
document.querySelector('#hh-close').addEventListener("click", clickHH_close)
document.querySelector('#crash').addEventListener("click", clickCrash)

function clickKick (){
    audioKick.pause();
    audioKick.volume = maxVol - 0.3;
    audioKick.currentTime = 0;
    audioKick.play();
}
function clickSnare (){
    audioSnare.pause();
    audioSnare.volume = maxVol;
    audioSnare.currentTime = 0;
    audioSnare.play();
}
function clickHH (){
    audioHH.pause();
    audioHH.volume = maxVol;
    audioHH.currentTime = 0;
    audioHH.play();
}
function clickHH_close (){
    audioHH_close.pause();
    audioHH_close.volume = maxVol;
    audioHH_close.currentTime = 0;
    audioHH_close.play();
}
function clickCrash (){
    crash.pause();
    crash.volume = maxVol - 0.3;
    crash.currentTime = 0;
    crash.play();
}

document.addEventListener('keydown', (event) => {
    soundCheck(event.key)
    console.log(event.key)
})

function soundCheck (inputKey){
    switch (inputKey){
        case ' ':
            clickKick();
            break;
        case 'c':
            clickSnare();
            break;
        case 'x':
            clickHH_close();
            break;
        case 'z':
            clickHH();
            break;
        case 'm':
            clickCrash();
            break;

    }
}
