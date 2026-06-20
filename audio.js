let audioCtx;

function initAudio() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

function playHeartbeat(intensity) {
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.value = 60 + intensity * 40;

    gain.gain.value = 0.1 + intensity * 0.5;

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
}
