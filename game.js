const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

let state = {
    running: false,
    pressure: 100,
    corruption: 0,
    time: 0
};

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

document.getElementById("start-btn").onclick = () => {
    document.getElementById("start-screen").style.display = "none";
    state.running = true;
    initAudio();
    loop();
};

function update() {
    state.time += 1;
    state.pressure -= 0.05;
    state.corruption += 0.02;

    if (state.corruption > 50) {
        Achievements.unlock("corruption50");
    }
    if (state.corruption > 100) {
        Achievements.unlock("corruption100");
    }

    playHeartbeat(state.corruption / 100);

    document.getElementById("pressure").textContent = Math.floor(state.pressure);
    document.getElementById("corruption").textContent = Math.floor(state.corruption);
}

function render() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ノイズ
    for (let i = 0; i < 200; i++) {
        ctx.fillStyle = "rgba(0,255,150,0.05)";
        ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height, 2, 2);
    }

    // ホラー中心点
    ctx.strokeStyle = "rgba(255,0,0,0.3)";
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, 50 + state.corruption, 0, Math.PI*2);
    ctx.stroke();
}

function loop() {
    if (!state.running) return;

    update();
    render();

    requestAnimationFrame(loop);
}
