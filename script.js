/* ===================================================
   APPLICATION CONTROLLER & LOGIC ENGINE
   =================================================== */

// 1. Password Lock Check (Passphrase: "subba")
const lockScreen = document.getElementById('lock-screen');
const lockError = document.getElementById('lock-error');
const passInput = document.getElementById('passkey-input');
const unlockBtn = document.getElementById('unlock-btn');
const terminalScreen = document.getElementById('terminal-screen');
const terminalOutput = document.getElementById('terminal-output');
const terminalBtn = document.getElementById('terminal-proceed-btn');
const headphonesScreen = document.getElementById('headphones-screen');

function checkPasscode() {
    const val = passInput.value.trim().toLowerCase();
    if (val === "nigga") {
        lockError.style.display = 'none';
        lockScreen.style.opacity = '0';
        setTimeout(() => {
            lockScreen.style.display = 'none';
            startTerminalSequence();
        }, 800);
    } else {
        lockError.style.display = 'block';
        passInput.value = '';
        passInput.focus();
    }
}

unlockBtn.addEventListener('click', checkPasscode);
passInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkPasscode();
});

// 2. Terminal Boot Sequence
const terminalLines = [
    "Checking memories...",
    "Loading chat exhibits...",
    "Loading dawn conversations...",
    "Loading stupid jokes & overthinking...",
    "Loading Madam...",
    "100% COMPLETE",
    "----------------------------",
    "ACCESS GRANTED",
    "Welcome, Madam. 👋",
    "Don't judge the website. I spent way too much time making this."
];

function startTerminalSequence() {
    terminalScreen.style.display = 'flex';
    let lineIndex = 0;

    function printNextLine() {
        if (lineIndex < terminalLines.length) {
            const p = document.createElement('p');
            p.className = 'terminal-line';
            p.innerText = terminalLines[lineIndex];
            terminalOutput.appendChild(p);
            lineIndex++;
            setTimeout(printNextLine, 320);
        } else {
            terminalBtn.style.display = 'inline-block';
        }
    }
    printNextLine();
}

terminalBtn.addEventListener('click', () => {
    terminalScreen.style.display = 'none';
    headphonesScreen.style.display = 'flex';
});

document.getElementById('start-music-btn').addEventListener('click', () => {
    headphonesScreen.style.display = 'none';
    playAudioTrack();
});

// 3. Dynamic Case File Exhibit Generator (Chat Images 01-25)
const chatCaseFiles = [];
const categories = ['dawn', 'funny', 'life'];

for (let i = 1; i <= 25; i++) {
    const cat = categories[(i - 1) % categories.length];
    let tagTitle = "Chat Exhibit";
    let descStr = `Chat screenshot memory #${i}.`;
    
    if (i === 1) { tagTitle = "First Hesitant Talk"; descStr = "Where it all began. First shy messages before hesitation melted away."; }
    else if (i === 2) { tagTitle = "Dawn Conversations"; descStr = "Talking straight till morning dawn without realizing time passed."; }
    else if (i === 3) { tagTitle = "Word Origins: Nigga"; descStr = "The exact chat where the word 'Nigga' was first used casually."; }
    else if (i === 4) { tagTitle = "Word Origins: Mams"; descStr = "Dropping 'Mams' into the chat for the first time!"; }
    else if (i === 5) { tagTitle = "Life & Boundaries"; descStr = "Understanding each other's situations and respecting boundaries."; }

    const numPadded = i < 10 ? '0' + i : '' + i;

    chatCaseFiles.push({
        id: i,
        numStr: numPadded,
        title: `Exhibit #${numPadded}: ${tagTitle}`,
        category: cat,
        date: `FILE_ID_#0${i}`,
        suspects: "Madam & Nigga",
        desc: descStr,
        imgSrc: `assets/images/chat-${numPadded}.jpeg`
    });
}

function renderCaseFiles(filter = 'all') {
    const grid = document.getElementById('case-files-grid');
    grid.innerHTML = '';

    const filtered = filter === 'all' ? chatCaseFiles : chatCaseFiles.filter(item => item.category === filter);

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'case-card';
        card.onclick = () => openCaseModal(item);

        card.innerHTML = `
            <div class="case-stamp">CONFIDENTIAL</div>
            <div class="case-badge"><span>FILE #${item.numStr}</span> <span>${item.date}</span></div>
            <div class="case-img-box" style="background-image: url('${item.imgSrc}');">
                <i class="fa-solid fa-message"></i>
                <span>Chat Shot #${item.numStr}</span>
            </div>
            <h4 style="color: var(--accent-gold); font-size: 0.9rem; margin-bottom: 0.2rem;">${item.title}</h4>
            <p style="font-size: 0.78rem; color: var(--text-muted);">${item.desc}</p>
        `;
        grid.appendChild(card);
    });
}
renderCaseFiles();

function filterCases(cat, event) {
    document.querySelectorAll('.case-filter-btn').forEach(btn => btn.classList.remove('active'));
    if (event) event.target.classList.add('active');
    renderCaseFiles(cat);
}

function openCaseModal(item) {
    document.getElementById('modal-title').innerText = item.title;
    document.getElementById('modal-desc').innerText = item.desc;
    document.getElementById('modal-meta').innerText = `${item.date} | SUSPECTS: ${item.suspects}`;
    
    const container = document.getElementById('modal-img-container');
    container.innerHTML = `<img src="${item.imgSrc}" alt="${item.title}" style="width:100%; max-height: 380px; object-fit: contain;" onerror="this.parentElement.innerHTML='<div style=\\'padding:2rem; text-align:center;\\'><i class=\\'fa-solid fa-image\\' style=\\'font-size:3rem; color:var(--accent-gold);\\'></i><p style=\\'margin-top:0.5rem; color:var(--text-muted);\\'>[Chat Screenshot #${item.numStr}]<br><small>${item.imgSrc}</small></p></div>'">`;
    
    document.getElementById('modal-lightbox').style.display = 'flex';
}

// 4. Modal Handlers
function openLetterModal() { document.getElementById('modal-letter').style.display = 'flex'; }
function openLastMemoryModal() { document.getElementById('modal-last-memory').style.display = 'flex'; }
function showToastMemory(title, text) {
    document.getElementById('toast-title').innerText = title;
    document.getElementById('toast-text').innerText = text;
    document.getElementById('memory-toast-modal').style.display = 'flex';
}
function closeModal(modalId) { document.getElementById(modalId).style.display = 'none'; }

window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.style.display = 'none';
    }
};

// 5. Scroll Reading Progress
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progress-bar').style.width = scrolled + '%';
});

// 6. Interactive Canvas Engine
const canvas = document.getElementById('interactive-bg');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = -Math.random() * 0.6 - 0.2;
        this.opacity = Math.random() * 0.6 + 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y < 0 || this.x < 0 || this.x > canvas.width) {
            this.reset();
            this.y = canvas.height;
        }
    }
    draw() {
        ctx.fillStyle = `rgba(243, 198, 105, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 45; i++) { particles.push(new Particle()); }

function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateCanvas);
}
animateCanvas();

// 7. Jukebox Controller
const audioPlayer = document.getElementById('audio-player');
let isPlaying = false;
let currentTrackIndex = 0;

const musicPlaylist = [
    { name: "1. Cigattres After Sex ☕", src: "assets/music/track1.mp3" },
    { name: "2. Main Rahoon Ya Na Rahoon 🌙", src: "assets/music/track2.mp3" },
    { name: "3. Afreen Afreen 🌅", src: "assets/music/track3.mp3" },
    { name: "4. The  Night  We Met 🌅", src: "assets/music/track4.mp3" },
    { name: "5. Sun is  Coming 🌅", src: "assets/music/track5.mp3" }
];

function loadTrack(index) {
    audioPlayer.src = musicPlaylist[index].src;
    document.getElementById('track-name').innerText = musicPlaylist[index].name;
}

function playAudioTrack() {
    if (!audioPlayer.src) loadTrack(currentTrackIndex);
    audioPlayer.play().then(() => {
        isPlaying = true;
        updateJukeboxUI();
    }).catch(err => console.warn("Audio blocked/missing: ", err));
}

function pauseAudioTrack() {
    audioPlayer.pause();
    isPlaying = false;
    updateJukeboxUI();
}

function updateJukeboxUI() {
    const playIcon = document.getElementById('jb-play-icon');
    playIcon.className = isPlaying ? "fa-solid fa-pause" : "fa-solid fa-play";
}

document.getElementById('jb-play').addEventListener('click', () => {
    if (isPlaying) pauseAudioTrack();
    else playAudioTrack();
});

document.getElementById('jb-next').addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % musicPlaylist.length;
    loadTrack(currentTrackIndex);
    playAudioTrack();
});

document.getElementById('jb-prev').addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + musicPlaylist.length) % musicPlaylist.length;
    loadTrack(currentTrackIndex);
    playAudioTrack();
});

audioPlayer.addEventListener('ended', () => {
    currentTrackIndex = (currentTrackIndex + 1) % musicPlaylist.length;
    loadTrack(currentTrackIndex);
    playAudioTrack();
});