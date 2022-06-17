"use strict"

let jsonData  = [];
let soundData = [];

const fetchURL = 'live_drums_config.json';

//unparsing and render mixer
fetch (fetchURL)
	.then (resp => {
		return resp.json ();
	})
	.then (data => jsonData = data)
	.then (function rec (key) {
		const faderParent = document.querySelector ('.mixer__block');
		for (let i = 0; i < key.length; i++) {
			if (key[i].enable) {
				const faderDiv = document.createElement ("div");
				faderDiv.classList.add (`fader`);
				switch (key[i].type) {
					case 'master':
						faderDiv.setAttribute ('id', 'mstr-fader');
						break;
					default:
						faderDiv.setAttribute ('id', `faderID-${key[i].key}`);
				}
				faderParent.appendChild (faderDiv);
				//
				const keyDiv = document.createElement ("div");
				keyDiv.classList.add (`hotkey`);
				keyDiv.innerHTML = key[i].keyText
				faderDiv.appendChild (keyDiv);
				//
				const nameDiv = document.createElement ("div");
				nameDiv.classList.add (`name`);
				nameDiv.innerHTML = key[i].name
				faderDiv.appendChild (nameDiv);
				//
				const volRangeDiv = document.createElement ("div");
				volRangeDiv.classList.add (`volume-range`);
				faderDiv.appendChild (volRangeDiv);
				//
				const inputLabel = document.createElement ("label");
				inputLabel.setAttribute ('for', "fader");
				volRangeDiv.appendChild (inputLabel);
				const inputRange = document.createElement ("input");
				inputRange.classList.add (`slider`);
				inputRange.setAttribute ('orient', "vertical");
				inputRange.setAttribute ('type', "range");
				inputRange.setAttribute ('min', "0");
				inputRange.setAttribute ('max', "1");
				inputRange.setAttribute ('step', "0.01");
				inputRange.setAttribute ('value', `${key[i].default_volume}`);
				inputRange.setAttribute ('id', `fader-${key[i].name}`);
				inputRange.setAttribute ('oninput', `drVol(this)`);
				volRangeDiv.appendChild (inputRange);
				//
				const faderVol = document.createElement ("div");
				faderVol.classList.add (`volume`);
				faderVol.setAttribute ('id', `volume-fader-${key[i].name}`);
				faderVol.innerHTML = `${(key[i].default_volume)*100}`
				faderDiv.appendChild (faderVol);
				//
			}
		}
	})

// set faders volume
let masterVolume = 100
function drVol (thisIn) {
	document.getElementById (`volume-${thisIn.id}`).innerHTML = (thisIn.value * 100).toFixed();
	masterVolume = 1*((document.getElementById(`volume-fader-master`).innerHTML))
	// console.log(masterVolume)
}

// loading sounds
setTimeout (() => {
	jsonData.forEach (function (inpuht) {
		//
		// inpuht.src !== '' ? soundData.push(new Audio(`${inpuht.src}` )) : false;
		//
		if (inpuht.src !== '') {
			let kekea = inpuht.name
			let keka  = `../../assets/audio/${kekea}.wav`;
			// console.log(keka === inpuht.src, inpuht.name)
			createjs.Sound.registerSound (keka, `play-${inpuht.name}`);
		}
	})

}, 300)


document.querySelectorAll ('.dr').forEach (function (elements) {
	elements.onclick = function (event) {
		jsonData.forEach ((data) => {
			if (data.name === this.id) {
				play(this.id)
			}
		})
	}
})

function play(id){
	console.log (id)
	let currentVolume = document.getElementById(`volume-fader-${id}`).innerHTML
	let commonVol = (((currentVolume/100)*masterVolume).toFixed())/100
	//
	// console.log ('play:',data.name,' [vol:', currentVolume,'] Common: ',commonVol,'master:',masterVolume)
	//
	createjs.Sound.on ("fileload", handleLoadComplete);
	createjs.Sound.play (`play-${id}`);
	createjs.Sound.volume = commonVol;
}

function handleLoadComplete () {
	console.log ('sound load complete')
}

document.addEventListener('keydown', (event) => {
	//
	jsonData.forEach((data) => {
		if (data.key === event.code){
			play(data.name)
		}
	})
})
