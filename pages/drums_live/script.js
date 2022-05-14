let jsonData = [];
let soundData = [];

const fetchURL = 'live_drums_config.json';

//unparsing and render mixer
fetch(fetchURL)
    .then(resp => {
        return resp.json();
    })
    .then(data => jsonData = data)
    .then(function rec(key){
        const faderParent = document.querySelector('.mixer__block');
        for (let i = 0; i < key.length; i++) {
            if (key[i].enable){
                const faderDiv = document.createElement("div");
                faderDiv.classList.add(`fader`);
                switch (key[i].type){
                    case 'master':
                        faderDiv.setAttribute('id','mstr-fader');
                        break;
                    default:
                        faderDiv.setAttribute('id',`faderID-${key[i].key}`);
                }
                faderParent.appendChild(faderDiv);
                //
                const keyDiv = document.createElement("div");
                keyDiv.classList.add(`hotkey`);
                keyDiv.innerHTML = key[i].keyText
                faderDiv.appendChild(keyDiv);
                //
                const nameDiv = document.createElement("div");
                nameDiv.classList.add(`name`);
                nameDiv.innerHTML = key[i].name
                faderDiv.appendChild(nameDiv);
                //
                const volRangeDiv = document.createElement("div");
                volRangeDiv.classList.add(`volume-range`);
                faderDiv.appendChild(volRangeDiv);
                //
                const inputLabel = document.createElement("label");
                inputLabel.setAttribute('for',"fader");
                volRangeDiv.appendChild(inputLabel);
                const inputRange = document.createElement("input");
                inputRange.classList.add(`slider`);
                inputRange.setAttribute('orient',"vertical");
                inputRange.setAttribute('type',"range");
                inputRange.setAttribute('min',"0");
                inputRange.setAttribute('max',"1");
                inputRange.setAttribute('step',"0.01");
                inputRange.setAttribute('value',`${key[i].default_volume}`);
                inputRange.setAttribute('id',`fader-${key[i].name}`);
                inputRange.setAttribute('oninput',`drVol(this)`);
                volRangeDiv.appendChild(inputRange);
                //
                const faderVol = document.createElement("div");
                faderVol.classList.add(`volume`);
                faderVol.setAttribute('id',`volume-fader-${key[i].name}`);
                faderVol.innerHTML = `${key[i].default_volume}`
                faderDiv.appendChild(faderVol);
                //
            }
        }
    })

// set faders volume
function drVol(thisIn){
    document.getElementById(`volume-${thisIn.id}`).innerHTML = thisIn.value;
    // if (thisIn.id === 'fader-master'){
    //     // console.log(thisIn.id )
    //     masterVol = (1-thisIn.value).toFixed(2)
    //     document.title = `LiDrums (mstr:${thisIn.value})`;
    // }
}

// loading sounds
setTimeout(() => {

    jsonData.forEach(function (inpuht){
        // console.log(inpuht.src)

        inpuht.src !== '' ? soundData.push(new Audio(`${inpuht.src}`)) : false;
    } )

    // console.log(soundData[1])
    }, 300)


document.getElementById('snare').addEventListener('click', function (event) {

    soundData[1].onended = function () {
        soundData[1].pause();
        soundData[1].currentTime = 0;
        console.log(soundData[1],' > pause');
    }
    soundData[1].currentTime = 0;
    soundData[1].play()

})

function kek() {
    console.log('kek')
}