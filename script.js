// ===== YASHRAJ KUMAR — PORTFOLIO SCRIPT =====

// Apply theme immediately before anything renders
(function() {
    var t = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', t);
})();

// === PARTICLES BACKGROUND ===
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animFrame;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticle() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.3,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.1,
        pulse: Math.random() * Math.PI * 2
    };
}

function initParticles() {
    resize();
    particles = [];
    const count = Math.floor((canvas.width * canvas.height) / 15000);
    for (let i = 0; i < count; i++) particles.push(createParticle());
}

function drawParticles() {
    const theme = document.documentElement.getAttribute('data-theme');
    const bgColor = theme === 'light' ? '#f0f4f8' : '#050b14';
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const color = theme === 'light' ? '0, 100, 200' : '0, 245, 255';

    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.02;
        const op = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${op})`;
        ctx.fill();
    });

    // Draw connections
    particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(q => {
            const dist = Math.hypot(p.x - q.x, p.y - q.y);
            if (dist < 100) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(q.x, q.y);
                ctx.strokeStyle = `rgba(${color}, ${0.08 * (1 - dist / 100)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        });
    });

    animFrame = requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', () => { initParticles(); });
initParticles();
drawParticles();

// === TYPEWRITER ===
const phrases = [
    'AI Engineer',
    'LLM Fine-tuner',
    'Multi-Agent Builder',
    'RAG Architect',
    'ML Enthusiast'
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const tw = document.getElementById('typewriter');

function typeLoop() {
    const current = phrases[phraseIdx];
    if (!deleting) {
        tw.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
            setTimeout(() => { deleting = true; typeLoop(); }, 2000);
            return;
        }
    } else {
        tw.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
            deleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
        }
    }
    setTimeout(typeLoop, deleting ? 50 : 90);
}
typeLoop();

// === THEME TOGGLE ===
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const curr = html.getAttribute('data-theme');
    const next = curr === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateIcon(next);
});

function updateIcon(theme) {
    themeToggle.querySelector('i').className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// === MOBILE HAMBURGER ===
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
});

// === ACTIVE NAV ON SCROLL ===
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (window.pageYOffset >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
});

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// === SCROLL REVEAL ===
const reveals = document.querySelectorAll('.proj-card, .acard, .ach-card, .skill-group, .exp-card');
reveals.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

reveals.forEach(el => observer.observe(el));

// === CONTACT FORM ===
const form = document.getElementById('contact-form');
form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const msg = document.getElementById('message').value;
    const link = `mailto:yashrajworkk09@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(msg)}%0D%0A%0D%0AFrom: ${encodeURIComponent(email)}`;
    window.location.href = link;
    form.reset();
});

// === NAVBAR BLUR ON SCROLL ===
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    nav.style.background = window.scrollY > 50
        ? 'rgba(5,11,20,0.95)'
        : 'rgba(5,11,20,0.85)';
});
