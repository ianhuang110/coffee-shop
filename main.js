document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const reveals = document.querySelectorAll('.reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15
    });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    // Header background change on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '1rem 5%';
            header.style.background = 'rgba(18, 18, 18, 0.95)';
        } else {
            header.style.padding = '1.5rem 5%';
            header.style.background = 'rgba(18, 18, 18, 0.85)';
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Audio Controller
    const soundBtn = document.getElementById('sound-toggle');
    const bgMusic = document.getElementById('bg-music');
    const sfxHover = document.getElementById('sfx-hover');
    let isPlaying = false;

    // Set lower volumes for background sounds
    if (bgMusic) bgMusic.volume = 0.3;
    if (sfxHover) sfxHover.volume = 0.2;

    const toggleSound = () => {
        if (!isPlaying) {
            if (bgMusic) {
                bgMusic.play().catch(e => console.log("Audio play failed:", e));
            }
            soundBtn.querySelector('.icon').textContent = '🔊';
            soundBtn.querySelector('.text').textContent = '靜音控制';
            soundBtn.classList.add('playing');
        } else {
            if (bgMusic) {
                bgMusic.pause();
            }
            soundBtn.querySelector('.icon').textContent = '🔇';
            soundBtn.querySelector('.text').textContent = '開啟音效';
            soundBtn.classList.remove('playing');
        }
        isPlaying = !isPlaying;
    };

    soundBtn.addEventListener('click', toggleSound);

    // Hover sounds for cards and nav links
    const interactiveElements = document.querySelectorAll('.card, nav a');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (isPlaying) {
                sfxHover.currentTime = 0;
                sfxHover.play().catch(e => { });
            }
        });
    });
});
