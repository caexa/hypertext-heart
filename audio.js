// audio.js 


const heartbeatAudio = document.getElementById('heartbeat-sound');
const staticAudio = document.getElementById('static-sound');


heartbeatAudio.loop = true;
staticAudio.loop = true;


heartbeatAudio.volume = 0;
staticAudio.volume = 0;


function fadeAudio(audio, targetVolume, duration) {
    const step = (targetVolume - audio.volume) / (duration / 50);
    const interval = setInterval(() => {
        audio.volume += step;
        if ((step > 0 && audio.volume >= targetVolume) || (step < 0 && audio.volume <= targetVolume)) {
            audio.volume = targetVolume;
            clearInterval(interval);
        }
    }, 50);
}


function playHeartbeat() {
    heartbeatAudio.play().catch(() => {});
    fadeAudio(heartbeatAudio, 0.5, 500); // fade in heartbeat to 50%
    fadeAudio(staticAudio, 0, 300);      // fade out static just in case
}


function fadeToStatic() {
    fadeAudio(heartbeatAudio, 0, 500);   // fade out heartbeat
    staticAudio.play().catch(() => {});
    fadeAudio(staticAudio, 0.2, 500);    // fade in static to 20%
}

// Example integration with your poem element
const poemEl = document.getElementById('poem');


function showPoem() {
    poemEl.classList.remove('hidden');
    playHeartbeat();
}

function hidePoem() {
    poemEl.classList.add('hidden');
    fadeToStatic();
}


document.addEventListener('mousemove', () => {
    if (poemEl.classList.contains('hidden')) showPoem();
});
document.addEventListener('touchmove', () => {
    if (poemEl.classList.contains('hidden')) showPoem();
}, {passive:true});
