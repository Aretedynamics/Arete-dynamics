/* ---------------- TAB SYSTEM ---------------- */

const underline = document.querySelector('.tab-underline');
const buttons = document.querySelectorAll('.tab-btn');
const tabsContainer = document.querySelector('.tabs');

function moveUnderline(el) {
    const rect = el.getBoundingClientRect();
    const parentRect = tabsContainer.getBoundingClientRect();

    underline.style.width = rect.width + "px";
    underline.style.left = (rect.left - parentRect.left) + "px";
}

function showTab(event, tabId) {
    const current = document.querySelector('.tab-content.active');
    const next = document.getElementById(tabId);

    if (current === next) return;

    current.classList.remove('active');

    setTimeout(() => {
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.style.display = "none";
        });

        next.style.display = "block";

        setTimeout(() => {
            next.classList.add('active');
        }, 10);

    }, 180);

    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    event.target.classList.add('active');
    moveUnderline(event.target);
}

buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        moveUnderline(btn);
    });
});

tabsContainer.addEventListener('mouseleave', () => {
    const active = document.querySelector('.tab-btn.active');
    moveUnderline(active);
});

window.onload = () => {
    const active = document.querySelector('.tab-btn.active');
    moveUnderline(active);
};

/* ---------------- HERO FADE ---------------- */

const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    let opacity = 1 - scrollY / 320;

    if (opacity < 0) opacity = 0;

    hero.style.opacity = opacity;
    hero.style.transform = `translateY(-${scrollY * 0.08}px)`;
});

/* ---------------- STARFIELD ---------------- */

const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let stars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    stars = [];

    for (let i = 0; i < 170; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.35 + 0.2,
            opacity: Math.random() * 0.35 + 0.04,
            speed: Math.random() * 0.005 + 0.0013,
            direction: Math.random() > 0.5 ? 1 : -1
        });
    }
}

resizeCanvas();

window.addEventListener('resize', resizeCanvas);

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.opacity += star.speed * star.direction;

        if (star.opacity >= 0.42 || star.opacity <= 0.03) {
            star.direction *= -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
    });

    requestAnimationFrame(animateStars);
}

animateStars();

/* ---------------- TEAM MOTIVATIONS ---------------- */

document.querySelectorAll('.team-card').forEach(card => {
    const toggle = card.querySelector('.team-motivation-toggle');
    const panel = card.querySelector('.team-motivation');
    if (!toggle || !panel) return;

    let pinned = false;

    function setOpen(open) {
        panel.hidden = !open;
        toggle.setAttribute('aria-expanded', String(open));
    }

    card.addEventListener('pointerenter', event => {
        if (event.pointerType === 'mouse') setOpen(true);
    });

    card.addEventListener('pointerleave', event => {
        if (event.pointerType === 'mouse' && !pinned) setOpen(false);
    });

    toggle.addEventListener('click', () => {
        pinned = !pinned;
        setOpen(pinned);
    });

    toggle.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !panel.hidden) {
            pinned = false;
            setOpen(false);
            event.preventDefault();
        }
    });

    document.addEventListener('pointerdown', event => {
        if (!card.contains(event.target)) {
            pinned = false;
            setOpen(false);
        }
    });

    card.addEventListener('focusout', event => {
        if (!card.contains(event.relatedTarget)) {
            pinned = false;
            setOpen(false);
        }
    });
});
