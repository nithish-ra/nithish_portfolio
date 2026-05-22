/* ═══════════════════════════════════════════════
   NITHISH RA — PORTFOLIO  |  script.js
   ═══════════════════════════════════════════════ */

/* ─── NAV SCROLL ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ─── MOBILE BURGER ─── */
const burger   = document.getElementById('nav-burger');
const mobileNav = document.getElementById('nav-mobile');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});
mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

/* ─── FADE-UP OBSERVER ─── */
const fadeEls = document.querySelectorAll('.fade-up');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => fadeObserver.observe(el));

/* ─── ACTIVE NAV LINK (SCROLL SPY) ─── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        const active = link.getAttribute('href') === '#' + entry.target.id;
        link.classList.toggle('active', active);
      });
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => spyObserver.observe(s));

/* ─── EDUCATION PROGRESS BAR ─── */
const progFill = document.querySelector('.edu-prog-fill');
if (progFill) {
  const progObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      progFill.style.width = progFill.dataset.width || '80%';
      progObserver.disconnect();
    }
  }, { threshold: 0.3 });
  progObserver.observe(progFill);
}

/* ─── TIMELINE LINE ANIMATE ─── */
document.querySelectorAll('.timeline, .edu-timeline').forEach(tl => {
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      tl.classList.add('animate-line');
      obs.disconnect();
    }
  }, { threshold: 0.1 });
  obs.observe(tl);
});

/* ─── 3D TILT ENGINE ─── */
(function () {
  const MAX_TILT  = 9;

  function injectShine(card) {
    if (card.querySelector('.tilt-shine')) return;
    const shine = document.createElement('div');
    shine.className = 'tilt-shine';
    card.appendChild(shine);
  }

  function applyTilt(card, e) {
    const r   = card.getBoundingClientRect();
    const dx  = ((e.clientX - r.left) / r.width  - 0.5) * 2;
    const dy  = ((e.clientY - r.top)  / r.height - 0.5) * 2;
    const rx  = -dy * MAX_TILT;
    const ry  =  dx * MAX_TILT;
    const mx  = ((e.clientX - r.left) / r.width  * 100).toFixed(1);
    const my  = ((e.clientY - r.top)  / r.height * 100).toFixed(1);
    card.style.transform = `perspective(880px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.025,1.025,1.025)`;
    card.style.setProperty('--mx', mx + '%');
    card.style.setProperty('--my', my + '%');
  }

  function resetTilt(card) {
    card.style.transition = 'transform .5s cubic-bezier(.23,1,.32,1), box-shadow .5s, border-color .25s';
    card.style.transform  = '';
    card.style.removeProperty('--mx');
    card.style.removeProperty('--my');
    setTimeout(() => { card.style.transition = ''; }, 520);
  }

  function initTilt(selector) {
    document.querySelectorAll(selector).forEach(card => {
      injectShine(card);
      card.addEventListener('mousemove', e => {
        card.style.transition = 'transform .07s linear, box-shadow .07s, border-color .25s';
        applyTilt(card, e);
      });
      card.addEventListener('mouseleave', () => resetTilt(card));
    });
  }

  initTilt('.project-card');
  initTilt('.skill-group');
  initTilt('.cert-img-card');
  initTilt('.achieve-card');
  initTilt('.tl-card');
  initTilt('.edu-tl-card');
  initTilt('.activity-card');
  initTilt('.cricket-banner');
})();

/* ─── CERTIFICATE LIGHTBOX ─── */
function openLightbox(src) {
  const lb  = document.getElementById('cert-lightbox');
  const img = document.getElementById('lightbox-img');
  img.src = src;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('cert-lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ─── HERO NAME LETTER ANIMATION + ELECTRIC HOVER ─── */
(function () {
  let offset = 0;
  const h1 = document.querySelector('h1');

  document.querySelectorAll('h1 .first, h1 .last').forEach(span => {
    const text = span.textContent;
    span.textContent = '';
    [...text].forEach(char => {
      const s = document.createElement('span');
      s.className = 'letter';
      s.textContent = char;
      s.dataset.char = char;
      s.style.setProperty('--i', offset);
      s.style.animationDelay = (0.22 + offset * 0.065) + 's';
      span.appendChild(s);
      offset++;
    });
  });

  if (!h1) return;

  /* arm hover after entry finishes */
  setTimeout(() => h1.classList.add('name-ready'), 1500);

  /* subtle shimmer hover animation */
  h1.addEventListener('mouseenter', () => {
    if (!h1.classList.contains('name-ready')) return;

    const letters = [...h1.querySelectorAll('.letter')];

    letters.forEach((el, i) => {
      setTimeout(() => {
        el.style.transform = 'translateY(-3px)';
        el.style.color = '#00d4ff';
        el.style.opacity = '0.9';

        setTimeout(() => {
          el.style.transform = '';
          el.style.color = '';
          el.style.opacity = '';
        }, 220);

      }, i * 45);
    });
  });
})();

/* ─── INTEREST TILES STAGGER ─── */
(function () {
  const grid = document.querySelector('.animated-tiles');
  if (!grid) return;
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      grid.classList.add('tiles-in');
    }
  }, { threshold: 0.05 }).observe(grid);
})();

/* ─── SHIMMER TITLE HOVER ─── */
(function () {
  const el = document.querySelector('.shimmer-title');
  if (!el) return;

  /* split into letter spans */
  const text = el.textContent;
  el.textContent = '';
  [...text].forEach((char, i) => {
    const s = document.createElement('span');
    s.className = 'shimmer-letter';
    s.dataset.char = char;
    s.textContent = char === ' ' ? ' ' : char;
    s.style.setProperty('--i', i);
    el.appendChild(s);
  });

  /* shimmer on hover */
  el.addEventListener('mouseenter', () => {
    [...el.querySelectorAll('.shimmer-letter')].forEach((s, i) => {
      setTimeout(() => {
        s.style.transform = 'translateY(-3px)';
        s.style.color = '#00d4ff';
        s.style.opacity = '0.9';
        setTimeout(() => {
          s.style.transform = '';
          s.style.color = '';
          s.style.opacity = '';
        }, 220);
      }, i * 45);
    });
  });
})();

/* ─── ACHIEVEMENTS JUMP IN ─── */
(function () {
  const grid = document.querySelector('.jumping-cards');
  if (!grid) return;
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      grid.classList.add('cards-in');
    }
  }, { threshold: 0.05 }).observe(grid);
})();

/* ─── CANVAS BACKGROUND PARTICLES ─── */
(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const COUNT = 48, MAX_DIST = 125;
  let W, H, particles, lastFrame = 0;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Particle() {
    this.x    = Math.random() * W;
    this.y    = Math.random() * H;
    this.vx   = (Math.random() - .5) * .32;
    this.vy   = (Math.random() - .5) * .32;
    this.r    = Math.random() * 1.4 + .5;
    this.gold = Math.random() > .7;
  }

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, () => new Particle());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    /* connecting lines */
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const a = (1 - dist / MAX_DIST) * 0.13;
          ctx.strokeStyle = `rgba(0,212,255,${a})`;
          ctx.lineWidth = .6;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    /* glowing particles */
    particles.forEach(p => {
      const rgb = p.gold ? '245,200,66' : '0,212,255';
      ctx.save();
      ctx.shadowColor  = `rgba(${rgb},0.9)`;
      ctx.shadowBlur   = 8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb},0.55)`;
      ctx.fill();
      ctx.restore();
    });
  }

  function update() {
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
  }

  function loop(ts) {
    if (ts - lastFrame >= 33) { update(); draw(); lastFrame = ts; }
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => {
    resize();
    particles.forEach(p => { p.x = Math.min(p.x, W); p.y = Math.min(p.y, H); });
  }, { passive: true });

  init();
  requestAnimationFrame(loop);
})();

/* ─── HERO PARALLAX ORBS ─── */
(function () {
  const orb1 = document.querySelector('.hero-orb-1');
  const orb2 = document.querySelector('.hero-orb-2');
  if (!orb1 || !orb2) return;
  orb1.style.transition = 'transform .55s ease-out';
  orb2.style.transition = 'transform .55s ease-out';
  document.addEventListener('mousemove', e => {
    const nx = (e.clientX / window.innerWidth  - 0.5) * 2;
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;
    orb1.style.transform = `translate(${nx * 22}px, ${ny * 14}px)`;
    orb2.style.transform = `translate(${-nx * 14}px, ${-ny * 9}px)`;
  }, { passive: true });
})();
