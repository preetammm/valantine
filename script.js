function goToPage2() {
    const p1 = document.getElementById('page1');
    const p2 = document.getElementById('page2');

    // Fade out p1
    p1.classList.add('opacity-0', 'scale-90');
    setTimeout(() => {
        p1.classList.add('hidden');
        p1.classList.remove('flex');

        // Show p2
        p2.classList.remove('hidden');
        p2.classList.add('flex');
        // Trigger reflow
        void p2.offsetWidth;
        p2.classList.remove('opacity-0', 'scale-90');
    }, 500);
}

function goToPage3() {
    const p2 = document.getElementById('page2');
    const p3 = document.getElementById('page3');

    p2.classList.add('opacity-0', 'scale-90');
    setTimeout(() => {
        p2.classList.add('hidden');
        p2.classList.remove('flex');

        p3.classList.remove('hidden');
        p3.classList.add('flex');

        // Play music
        const audio = document.getElementById('bgMusic');
        audio.play().catch(e => console.log("Audio requires interaction", e));

        // Confetti shower
        createConfetti();
    }, 500);
}

// Button Runaway Logic
function moveButton(btn) {
    // Get viewport dimensions (safe area)
    const maxX = window.innerWidth - btn.offsetWidth - 20;
    const maxY = window.innerHeight - btn.offsetHeight - 20;

    const randomX = Math.max(10, Math.floor(Math.random() * maxX));
    const randomY = Math.max(10, Math.floor(Math.random() * maxY));

    // Calculate rotation for "rolling" effect
    // We accumulate rotation so it keeps spinning in the same direction or switches naturally
    const currentRotation = parseInt(btn.getAttribute('data-rotation') || '0');
    const newRotation = currentRotation + (Math.random() > 0.5 ? 360 : -360);
    btn.setAttribute('data-rotation', newRotation);

    btn.classList.add('runaway'); // Ensure styling is applied
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
    btn.style.transform = `rotate(${newRotation}deg)`;

    // Add a cheeky vibration on mobile
    if (navigator.vibrate) navigator.vibrate(50);
}

const noBtn1 = document.getElementById('noBtn1');
const noBtn2 = document.getElementById('noBtn2');

// Desktop
noBtn1.addEventListener('mouseover', () => moveButton(noBtn1));
noBtn2.addEventListener('mouseover', () => moveButton(noBtn2));

// Mobile & Click fallback
// using 'pointerdown' covers both mouse click attempts and touch
const runAwayHandler = (e) => {
    e.preventDefault();
    e.stopImmediatePropagation(); // Stop other handlers
    moveButton(e.target);
};

// Add multiple event types to ensure we catch it
// Use capture: true to catch it early
['mouseover', 'click', 'touchstart'].forEach(evt => {
    noBtn1.addEventListener(evt, runAwayHandler, { passive: false });
    noBtn2.addEventListener(evt, runAwayHandler, { passive: false });
});

// Heart Trail
document.addEventListener('mousemove', (e) => createHeart(e.clientX, e.clientY));
document.addEventListener('touchmove', (e) => {
    // Multi-touch support
    [...e.touches].forEach(touch => createHeart(touch.clientX, touch.clientY));
});

document.addEventListener('click', (e) => {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createHeart(e.clientX + (Math.random() * 60 - 30), e.clientY + (Math.random() * 60 - 30));
        }, i * 40);
    }
});

function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'click-heart text-neon-red';
    heart.innerHTML = '❤️';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';

    const size = Math.random() * 20 + 10;
    heart.style.fontSize = size + 'px';

    // Add random rotation
    heart.style.transform = `rotate(${Math.random() * 360}deg)`;

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
}

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const c = document.createElement('div');
            c.className = 'fixed text-2xl z-40 animate-spin-slow';
            c.innerHTML = ['🌹', '❤️', '💋', '✨'][Math.floor(Math.random() * 4)];
            c.style.left = Math.random() * 100 + 'vw';
            c.style.top = '-5vh';
            c.style.transition = `top ${Math.random() * 2 + 2}s ease-in`;

            document.body.appendChild(c);

            // Trigger animation
            setTimeout(() => c.style.top = '105vh', 10);
            setTimeout(() => c.remove(), 4000);
        }, i * 100);
    }
}
