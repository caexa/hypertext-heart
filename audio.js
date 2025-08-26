// audio.js 


const heartbeat = new Audio('heartbeat.mp3');
const staticSound = new Audio('static.mp3');


heartbeat.loop = true;
staticSound.loop = true;


heartbeat.volume = 0;
staticSound.volume = 0;

// Fade function
function fadeAudio(audio, targetVol, duration) {
    const step = (targetVol - audio.volume) / (duration / 50); // update every 50ms
    const interval = setInterval(() => {
        audio.volume += step;
        if ((step > 0 && audio.volume >= targetVol) || (step < 0 && audio.volume <= targetVol)) {
            audio.volume = targetVol;
            clearInterval(interval);
        }
    }, 50);
}

// Play heartbeat when text is visible
function startHeartbeat() {
    heartbeat.play().catch(() => {});
    fadeAudio(heartbeat, 0.5, 500); // fade in to 50% volume
    fadeAudio(staticSound, 0, 300); // fade out static just in case
}

// Fade heartbeat out and fade static in
function fadeToStatic() {
    fadeAudio(heartbeat, 0, 500);      // heartbeat fades out
    staticSound.play().catch(() => {}); // play static
    fadeAudio(staticSound, 0.2, 500);  // fade in static to 20%
}


const poemEl = document.getElementById('poem');

// Show/hide triggers
function showPoem() {
    poemEl.classList.remove('hidden');
    startHeartbeat();
}

function hidePoem() {
    poemEl.classList.add('hidden');
    fadeToStatic();
}

// Detect movement or interaction to show poem and play heartbeat
document.addEventListener('mousemove', () => {
    if (poemEl.classList.contains('hidden')) showPoem();
});
document.addEventListener('click', () => {
    if (poemEl.classList.contains('hidden')) showPoem();
});
document.addEventListener('keydown', () => {
    if (poemEl.classList.contains('hidden')) showPoem();
});

