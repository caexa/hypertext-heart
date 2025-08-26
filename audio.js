// audio.js

const beat = document.getElementById('beat');
const stat = document.getElementById('stat');

beat.loop = true;
stat.loop = true;

// Start silent
beat.volume = 0;
stat.volume = 0;

// Fade helper
function fadeAudio(audio, target, duration){
    let step = (target - audio.volume) / (duration / 50); // every 50ms
    let interval = setInterval(()=>{
        audio.volume += step;
        if((step>0 && audio.volume >= target) || (step<0 && audio.volume <= target)){
            audio.volume = target;
            clearInterval(interval);
        }
    },50);
}

// Called when poem is visible
function startHeartbeat(){
    beat.play().catch(()=>{});
    fadeAudio(beat,0.5,500); // fade in heartbeat
    fadeAudio(stat,0,300);  // fade out static just in case
}

// Called when poem fades
function fadeToStatic(){
    fadeAudio(beat,0,500);   // fade out heartbeat
    stat.play().catch(()=>{});
    fadeAudio(stat,0.2,500); // fade in static
}

// Example: connect to your show/hide logic
const poemEl = document.getElementById('poem');

function showPoem(){
    poemEl.classList.remove('hidden');
    startHeartbeat();
}

function hidePoem(){
    poemEl.classList.add('hidden');
    fadeToStatic();
}

// Connect to your idle detection or mouse events
document.addEventListener('mousemove',()=>{
    if(poemEl.classList.contains('hidden')) showPoem();
});
