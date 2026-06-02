
// ── Custom cursor (desktop/fine pointer only) ──
if (window.matchMedia('(pointer:fine)').matches) {
    const cur = document.getElementById('cur'), ring = document.getElementById('curRing');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cur.style.left = mx + 'px'; cur.style.top = my + 'px' });
    (function animate() { rx += (mx - rx) * .12; ry += (my - ry) * .12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(animate) })();
    document.querySelectorAll('a,button,[onclick]').forEach(el => {
        el.addEventListener('mouseenter', () => { cur.classList.add('hover'); ring.classList.add('hover') });
        el.addEventListener('mouseleave', () => { cur.classList.remove('hover'); ring.classList.remove('hover') });
    });
}

// ── Mobile menu ──
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const btn = document.getElementById('hamburger');
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
}
function closeMobileMenu() {
    document.getElementById('mobileMenu').classList.remove('open');
    document.getElementById('hamburger').classList.remove('open');
    document.body.style.overflow = '';
}
// Close menu on outside click
document.getElementById('mobileMenu').addEventListener('click', function (e) {
    if (e.target === this) closeMobileMenu();
});

// ── Scroll reveal ──
const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
        if (e.isIntersecting) {
            const d = e.target.dataset.delay || 0;
            setTimeout(() => e.target.classList.add('up'), +d);
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach((el, i) => {
    el.dataset.delay = (i % 4) * 90;
    io.observe(el);
});

// ── Toast ──
let tt;
function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 3200);
}

// ── Cart ──
let cart = [];
function syncCartBtns() {
    const label = `Cart (${cart.length})`;
    document.getElementById('cartBtn').textContent = label;
    const mb = document.getElementById('mobileCartBtn');
    if (mb) mb.textContent = label;
}
function addCart(name) {
    cart.push(name);
    syncCartBtns();
    showToast(`✓ ${name} added to your cart`);
}

// ── Wishlist ──
function wishlist(btn, name) {
    const on = btn.classList.toggle('active');
    btn.textContent = on ? '♥' : '♡';
    showToast(on ? `♥ ${name} saved to wishlist` : `Removed from wishlist`);
}

// ── Newsletter ──
function subscribe() {
    const n = document.getElementById('nlName').value.trim();
    const e = document.getElementById('nlEmail').value.trim();
    if (!n) { showToast('Please enter your name'); return }
    if (!e || !e.includes('@')) { showToast('Please enter a valid email'); return }
    showToast(`✓ Welcome, ${n.split(' ')[0]}! You're on the list.`);
    document.getElementById('nlName').value = '';
    document.getElementById('nlEmail').value = '';
}

// ── Hero image load ──
const heroImg = document.getElementById('heroImg');
if (heroImg) {
    if (heroImg.complete) heroImg.classList.add('loaded');
    else heroImg.onload = () => heroImg.classList.add('loaded');
}

// ── Parallax (desktop only, reduced motion check) ──
const prefersReduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
if (!prefersReduced && window.matchMedia('(pointer:fine)').matches) {
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        const hr = document.querySelector('.hero-right img');
        if (hr && y < window.innerHeight) hr.style.transform = `scale(1.02) translateY(${y * 0.12}px)`;
    }, { passive: true });
}



// Shop 

