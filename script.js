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
    // Force fixed position so it breaks out of the flex layout immediately
    btn.style.position = 'fixed'; // Use fixed to position relative to viewport
    btn.style.zIndex = '1000'; // Ensure it's on top

    // Get viewport dimensions
    const maxX = window.innerWidth - btn.offsetWidth - 20;
    const maxY = window.innerHeight - btn.offsetHeight - 20;

    // Generate valid random coordinates
    const randomX = Math.max(10, Math.floor(Math.random() * maxX));
    const randomY = Math.max(10, Math.floor(Math.random() * maxY));

    // Apply new position
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';

    // Add rotation for effect
    const currentRotation = parseInt(btn.getAttribute('data-rotation') || '0');
    const newRotation = currentRotation + (Math.random() > 0.5 ? 360 : -360);
    btn.style.transform = `rotate(${newRotation}deg)`;
    btn.setAttribute('data-rotation', newRotation);

    // Add a cheeky vibration on mobile
    if (navigator.vibrate) navigator.vibrate(50);
}

const noBtn1 = document.getElementById('noBtn1');
const noBtn2 = document.getElementById('noBtn2');

// Universal handler for all interaction types
const runAwayHandler = (e) => {
    // Stop the event from doing anything else (like clicking)
    e.preventDefault();
    e.stopPropagation();
    moveButton(e.target);
};

// Add listeners to both buttons for desktop (hover) and touch/click
[noBtn1, noBtn2].forEach(btn => {
    btn.addEventListener('mouseover', () => moveButton(btn));
    btn.addEventListener('click', runAwayHandler);
    btn.addEventListener('touchstart', runAwayHandler, { passive: false });
    btn.addEventListener('mousedown', runAwayHandler);
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
