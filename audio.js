// audio.js

const beat = document.getElementById('beat');
const stat = document.getElementById('stat');

beat.loop = true;
stat.loop = true;

// Initial volumes
beat.volume = 0;   // start silent
stat.volume = 0;   // start silent

let hidden = false; // track if text is hidden

// Function to gradually fade volume
function fadeAudio(audio, targetVolume, duration){
    let startVol = audio.volume;
    let step = (targetVolume - startVol) / (duration / 50); // update every 50ms
    let interval = setInterval(()=>{
        audio.volume = Math.min(1, Math.max(0, audio.volume + step));
        if(Math.abs(audio.volume - targetVolume) < 0.01){
            audio.volume = targetVolume;
            clearInterval(interval);
        }
    }, 50);
}

// Start heartbeat when text becomes visible
function onTextVisible(){
    beat.play().catch(()=>{});
    fadeAudio(beat, 0.5, 500); // fade in heartbeat to 50% volume
}

// Fade heartbeat out and fade static in
function onTextHidden(){
    fadeAudio(beat, 0, 500);   // heartbeat fades out
    stat.play().catch(()=>{});
    fadeAudio(stat, 0.2, 500); // static fades in to 20% volume
}

// Example usage with your poem show/hide
const poemEl = document.getElementById('poem');

function showPoem(){
    poemEl.classList.remove('hidden');
    hidden = false;
    onTextVisible();
}

function hidePoem(){
    poemEl.classList.add('hidden');
    hidden = true;
    onTextHidden();
}

// Connect this to your existing idle logic
document.addEventListener('mousemove', ()=>{
    if(hidden) showPoem();
});

