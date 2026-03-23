/* ===== LOADER ===== */
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1600);
});

/* ===== SCROLL PROGRESS ===== */
window.addEventListener('scroll', () => {
    const el = document.getElementById('scrollProgress');
    const h = document.documentElement.scrollHeight - window.innerHeight;
    el.style.width = (window.scrollY / h * 100) + '%';
});

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ===== MOBILE MENU ===== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

/* ===== HERO SLIDER ===== */
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const leafTransition = document.getElementById('leafTransition');
let current = 0;
let autoSlide;

function goToSlide(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');

    // Leaf transition animation
    leafTransition.classList.add('animating');
    setTimeout(() => leafTransition.classList.remove('animating'), 700);

    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
}

function startAutoSlide() {
    autoSlide = setInterval(() => goToSlide(current + 1), 5000);
}
function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
}

document.getElementById('sliderNext').addEventListener('click', () => { goToSlide(current + 1); resetAutoSlide(); });
document.getElementById('sliderPrev').addEventListener('click', () => { goToSlide(current - 1); resetAutoSlide(); });
dots.forEach(dot => {
    dot.addEventListener('click', () => { goToSlide(+dot.dataset.index); resetAutoSlide(); });
});

startAutoSlide();

// Touch/swipe support
let touchStartX = 0;
document.getElementById('slider').addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
document.getElementById('slider').addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { goToSlide(diff > 0 ? current + 1 : current - 1); resetAutoSlide(); }
});

/* ===== REVIEWS CAROUSEL ===== */
const reviewCards = document.querySelectorAll('.review-card');
let currentReview = 0;
let reviewAuto;

function showReview(index) {
    reviewCards[currentReview].classList.remove('active');
    currentReview = (index + reviewCards.length) % reviewCards.length;
    reviewCards[currentReview].classList.add('active');
}

function startReviewAuto() {
    reviewAuto = setInterval(() => showReview(currentReview + 1), 5000);
}
function resetReviewAuto() { clearInterval(reviewAuto); startReviewAuto(); }

document.getElementById('revNext').addEventListener('click', () => { showReview(currentReview + 1); resetReviewAuto(); });
document.getElementById('revPrev').addEventListener('click', () => { showReview(currentReview - 1); resetReviewAuto(); });
startReviewAuto();

/* ===== SCROLL REVEAL ===== */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
