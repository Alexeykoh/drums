let masterVol = 0;
let jsonData;
let vol = 1;

const fetchURL = 'channels.json'

fetch(fetchURL)
    .then(resp => {
        return resp.json();
    })
    .then(data => jsonData = data)
    .then(function rec(key){
        const faderParent = document.querySelector('.mixer');
        // const faderInnerParent = document.querySelector('.master.fader');
        for (let i = 0; i < key.length ; i++) {
            if (key[i].enable){
                // console.log(key[i].enable, key[i].name)
                //
                // console.log(key[i].type)
                const faderDiv = document.createElement("div");
                switch (key[i].type){
                    case 'master':
                        faderDiv.classList.add(`master`);
                        faderDiv.setAttribute('id','master__fader');
                        break;
                }
                faderDiv.classList.add(`fader`);
                faderParent.appendChild(faderDiv);
                //
                //
                const faderVol = document.createElement("div");
                faderVol.classList.add(`fader-vol`);
                faderVol.setAttribute('id',`vol-fader-${key[i].name}`);
                switch (key[i].type){
                    case 'master':
                        faderVol.classList.add(`master-vol`);
                        break;
                }
                faderVol.innerHTML = `${key[i].default_volume}`
                faderDiv.appendChild(faderVol);
                //
                const rangeDiv = document.createElement("div");
                rangeDiv.classList.add(`fader__range`);
                faderDiv.appendChild(rangeDiv);
                const inputRange = document.createElement("input");
                inputRange.setAttribute('orient',"vertical");
                inputRange.setAttribute('type',"range");
                inputRange.setAttribute('min',"0");
                inputRange.setAttribute('max',"1");
                inputRange.setAttribute('step',"0.01");
                inputRange.setAttribute('value',`${key[i].default_volume}`);
                inputRange.setAttribute('id',`fader-${key[i].name}`);
                inputRange.setAttribute('oninput',`drVol(this)`);
                faderDiv.appendChild(inputRange);
                //
                const nameDiv = document.createElement("div");
                nameDiv.classList.add(`fader__name`);
                nameDiv.innerHTML = key[i].name
                faderDiv.appendChild(nameDiv);
                //
                const keyDiv = document.createElement("div");
                keyDiv.classList.add(`fader__key`);
                switch (key[i].type){
                    case 'master':
                        keyDiv.innerHTML = 'mstr'
                        break;
                    default:
                        keyDiv.innerHTML = key[i].key
                }
                faderDiv.appendChild(keyDiv);
            }
        }
    })



function drVol(thisIn){
    document.getElementById(`vol-${thisIn.id}`).innerHTML = thisIn.value;
    // console.log(thisIn.value, thisIn.id)
    if (thisIn.id === 'fader-master'){
        // console.log(thisIn.id )
        masterVol = (1-thisIn.value).toFixed(2)
        document.title = `LiDrums (mstr:${thisIn.value})`;
    }
}


// ====================================
// search sound
document.querySelectorAll('.dr').forEach(function (elements){
    elements.onclick = function (event) {
        searchSound(this)
    }
})



function searchSound (input) {
    jsonData.forEach((data) => {
        let scrAudio;
        if (data.name === input.id) {
            scrAudio = new Audio(`${data.src}`);
            playSound(scrAudio, data.name)
        }
    })
}

document.addEventListener('keydown', (event) => {
    let eventKey = '';
    console.log(event.key)
    switch (event.key){
        case ' ':
            eventKey = 'space';
            break
        default:
            eventKey = event.key;
    }
    jsonData.forEach((data) => {
        let scrAudio;
        if (data.key === eventKey) {
            scrAudio = new Audio(`${data.src}`);
            playSound(scrAudio, data.name)
            let drId = document.querySelector(`#${data.name}`).classList
            drId.add('active')
            setTimeout(() => drId.remove('active'), 50);
        }
    })
})

// ====================================
// play sound
function playSound(sourceLink, sourceId){
    let channelVol = 0;
    // console.log(sourceId)
    jsonData.forEach((data) => {
        if (data.name === sourceId && data.enable) {
            document.querySelectorAll(`#fader-${sourceId}`).forEach(function (elements){
                // console.log(elements.value)
                channelVol = elements.value;
            })
            vol = (channelVol-masterVol.toString())
            if(vol <= 0){vol = 0.01;}
            // console.log(vol.toString(), channelVol, masterVol.toString())
            sourceLink.pause();
            sourceLink.volume = vol.toFixed(2);
            sourceLink.currentTime = 0;
            sourceLink.play();
        }
    })

}

function setVolume(sourceId) {
    document.querySelectorAll(`#fader-${sourceId}`).forEach(function (elements){
        console.log(elements.value)
        return elements.value;
    })
}


