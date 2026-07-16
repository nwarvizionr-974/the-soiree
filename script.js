/* ============================================================
   THE SOIRÉE — script.js
   Vanilla JS, aucun framework, aucune dépendance.
   Sommaire :
   1. Loader
   2. Particules dorées (canvas)
   3. Reveal au scroll (IntersectionObserver)
   4. Compte à rebours → 12 septembre 2026, 18h30 (heure Réunion, UTC+4)
   5. Parallax hero (halos de fumée)
   6. Effet 3D tilt sur l'affiche
   7. Nav auto-hide + sticky CTA mobile + bouton retour en haut
   8. Impression des infos pratiques
   ============================================================ */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. LOADER ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    // Courte pause pour laisser respirer l'animation, puis fondu.
    setTimeout(() => loader.classList.add('is-done'), prefersReducedMotion ? 0 : 700);
  });
  // Sécurité : on masque le loader après 3s quoi qu'il arrive.
  setTimeout(() => loader.classList.add('is-done'), 3000);

  /* ---------- 2. PARTICULES DORÉES ---------- */
  const canvas = document.getElementById('particles');
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let W, H;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function createParticles() {
      // Densité adaptée à l'écran (léger sur mobile).
      const count = Math.min(70, Math.floor(W / 18));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -(Math.random() * 0.35 + 0.08),        // les particules montent (braises)
        alpha: Math.random() * 0.5 + 0.15,
        blue: Math.random() < 0.18                 // ~18 % de particules bleues (fumée)
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        // Recyclage en bas de l'écran
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.blue
          ? `rgba(95, 182, 220, ${p.alpha * 0.8})`
          : `rgba(211, 166, 75, ${p.alpha})`;
        ctx.shadowColor = p.blue ? 'rgba(95,182,220,.6)' : 'rgba(211,166,75,.6)';
        ctx.shadowBlur = 6;
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();
    window.addEventListener('resize', () => { resize(); createParticles(); });
  }

  /* ---------- 3. REVEAL AU SCROLL ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- 4. COMPTE À REBOURS ---------- */
  // 12 septembre 2026, 18h30, heure de La Réunion (UTC+4)
  const TARGET = new Date('2026-09-12T18:30:00+04:00').getTime();
  const cd = {
    days: document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    mins: document.getElementById('cd-mins'),
    secs: document.getElementById('cd-secs')
  };

  function pad(n) { return String(n).padStart(2, '0'); }

  function updateCountdown() {
    const diff = TARGET - Date.now();
    if (diff <= 0) {
      cd.days.textContent = '00';
      cd.hours.textContent = '00';
      cd.mins.textContent = '00';
      cd.secs.textContent = '00';
      return;
    }
    cd.days.textContent = pad(Math.floor(diff / 86400000));
    cd.hours.textContent = pad(Math.floor(diff / 3600000) % 24);
    cd.mins.textContent = pad(Math.floor(diff / 60000) % 60);
    cd.secs.textContent = pad(Math.floor(diff / 1000) % 60);
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ---------- 5. PARALLAX HERO ---------- */
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length && !prefersReducedMotion) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        parallaxEls.forEach((el) => {
          const speed = parseFloat(el.dataset.parallax) || 0.2;
          el.style.transform = `translateY(${y * speed}px)`;
        });
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- 6. TILT 3D SUR L'AFFICHE ---------- */
  const posterWrap = document.getElementById('poster3d');
  const posterCard = document.getElementById('posterCard');
  if (posterWrap && posterCard && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    posterWrap.addEventListener('mousemove', (e) => {
      const rect = posterCard.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      posterCard.style.transform = `rotateY(${x * 14}deg) rotateX(${y * -14}deg)`;
    });
    posterWrap.addEventListener('mouseleave', () => {
      posterCard.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }

  /* ---------- 7. NAV / STICKY CTA / RETOUR HAUT ---------- */
  const nav = document.getElementById('nav');
  const stickyCta = document.querySelector('.sticky-cta');
  const toTop = document.getElementById('toTop');
  let lastY = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;

    // Nav : se masque en descendant, réapparaît en remontant
    if (y > 140 && y > lastY) nav.classList.add('is-hidden');
    else nav.classList.remove('is-hidden');
    lastY = y;

    // Sticky CTA mobile + bouton retour en haut : visibles après le hero
    const past = y > window.innerHeight * 0.7;
    stickyCta.classList.toggle('is-visible', past);
    toTop.classList.toggle('is-visible', past);
  }, { passive: true });

  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  /* ---------- 8. IMPRESSION INFOS PRATIQUES ---------- */
  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => window.print());
  }
})();
