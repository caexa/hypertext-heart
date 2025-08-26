// No-autoplay, explicit start via overlay/button
const heartbeat = document.getElementById('beat');
const staticSound = document.getElementById('stat');
const poemEl = document.getElementById('poem');

// ---- Config ----
const HEARTBEAT_VOL_UP = 0.45;     // volume while there's movement (instant on start)
const HEARTBEAT_VOL_DOWN = 0.08;   // volume while idle (text hidden)
const STATIC_VOL = 0.22;           // volume for static after 404
const HIDE_AFTER = 700;            // must match index.html idle threshold

// Setup
heartbeat.loop = true;
staticSound.loop = true;
heartbeat.volume = 0;   // start fully silent
staticSound.volume = 0; // start fully silent

let started = false;
let ended = false;
let idleMs = 0;
let hidden = false;

// Exposed global starter for the overlay/button
function startAudio() {
  if (started) return;
  started = true;
  try {
    heartbeat.muted = false;
    heartbeat.volume = HEARTBEAT_VOL_UP; // jump straight to target
    heartbeat.currentTime = 0;
    const p = heartbeat.play();
    if (p && typeof p.catch === 'function') {
      p.catch((e) => {
        console.log('Heartbeat play() failed:', e);
        started = false; // allow retry
      });
    }
  } catch (e) {
    console.log('Error starting heartbeat:', e);
    started = false;
  }
}

// Movement ties heartbeat up; idle ties it down
function onMove() {
  if (ended) return;
  idleMs = 0;
  if (hidden) hidden = false;
  if (started) {
    heartbeat.volume = HEARTBEAT_VOL_UP; // keep it up on movement
    staticSound.volume = 0;
  }
}

function tick() {
  if (ended) return;
  idleMs += 200;
  if (idleMs > HIDE_AFTER && !hidden) {
    hidden = true;
    if (started) heartbeat.volume = HEARTBEAT_VOL_DOWN; // instant down
  }
  setTimeout(tick, 200);
}
setTimeout(tick, 200);

// Detect the 404 page and switch to static
const contentObserver = new MutationObserver(() => {
  if (poemEl.querySelector('.broken404') || /404:\s*love not found/i.test(poemEl.textContent || '')) {
    ended = true;
    if (started) { heartbeat.volume = 0; heartbeat.pause(); }
    staticSound.currentTime = 0;
    const p = staticSound.play();
    if (p && typeof p.catch === 'function') p.catch(()=>{});
    staticSound.volume = STATIC_VOL;
  }
});
contentObserver.observe(poemEl, { childList: true, subtree: true });

// Movement listeners for volume behavior
document.addEventListener('mousemove', onMove);
document.addEventListener('touchmove', onMove, { passive: true });
