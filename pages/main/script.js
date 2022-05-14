// open more instrument menu
const moreInstrument = document.getElementById('more-instr');
moreInstrument.addEventListener('click', openMoreInstr);

function openMoreInstr(){
    document.querySelector('.sub__menu-instruments').classList.toggle('active')
}

// scroll to anchor
const anchors = document.querySelectorAll('a[href*="#"]')
for (let anchor of anchors){
    anchor.addEventListener('' +
        'click', function (event){
        event.preventDefault();
        const blockID = anchor.getAttribute('href')
        document.querySelector(''+blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}

//====================================
var soundID = "Thunder";

loadSound();
function loadSound () {
    createjs.Sound.registerSound("snare.wav", soundID);
}

function playSound () {
    createjs.Sound.play(soundID);
}



