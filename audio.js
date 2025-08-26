// audio.js — specifically for heartbeat.mp3 and static.mp3

// Preload audio files
const heartbeat = new Audio('heartbeat.mp3');
const staticSound = new Audio('static.mp3');

// Loop both
heartbeat.loop = true;
staticSound.loop = true;

// Start silent
heartbeat.volume = 0;
staticSound.volume = 0;

// Smooth fade function
function fadeAudio(audio, target, duration){
    const step = (target - audio.volume) / (duration / 50);
    const interval = setInterval(()=>{
        audio.volume += step;
        if ((step>0 && audio.volume>=target) || (step<0 && audio.volume<=target)){
            audio.volume = target;
            clearInterval(interval);
        }
    },50);
}

// Start heartbeat
function playHeartbeat(){
    heartbeat.play().catch(()=>{}); // browsers require user gesture
    fadeAudio(heartbeat,0.5,500);
    fadeAudio(staticSound,0,300);
}

// Fade to static
function fadeToStatic(){
    fadeAudio(heartbeat,0,500);
    staticSound.play().catch(()=>{});
    fadeAudio(staticSound,0.2,500);
}

// ---- USER INTERACTION REQUIRED ----
// Audio will only start after the user clicks/touches the page
function initAudio(){
    playHeartbeat();

    // Optional: after 10s idle fade to static automatically
    setTimeout(fadeToStatic, 10000);
}

// Wait for first user gesture
document.addEventListener('click', initAudio, {once:true});
document.addEventListener('touchstart', initAudio, {once:true});
document.addEventListener('keydown', initAudio, {once:true});
