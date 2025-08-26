
// Select audio elements
const beat = document.getElementById('beat');
const stat = document.getElementById('stat');

// Function to start audio (loop heartbeat + static)
function startAudio(){
    if(!beat || !stat) return;
    beat.loop = true;
    stat.loop = true;

    beat.play().catch(()=>{ console.warn('Heartbeat audio blocked'); }); 
    stat.play().catch(()=>{ console.warn('Static audio blocked'); });
}

// Start audio on first interaction
document.addEventListener('click', startAudio, {once:true});
document.addEventListener('keydown', startAudio, {once:true});
document.addEventListener('mousemove', startAudio, {once:true});
