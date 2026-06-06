/* ============================================================
   SENGAR STUDIO — script.js
   Refokus-style interactions
   ============================================================ */

// ─── PAGE LOADER ────────────────────────────────────────────
const loader     = document.getElementById('pageLoader');
const loaderText = document.getElementById('loaderText');
const word       = 'SENGAR.';

word.split('').forEach((ch, i) => {
  const s = document.createElement('span');
  s.textContent = ch === '.' ? ch : ch;
  s.style.animationDelay = (i * 0.07) + 's';
  s.style.color = ch === '.' ? '#00d4ff' : '#fff';
  loaderText.appendChild(s);
});

setTimeout(() => {
  loader.classList.add('done');
  initAll();
}, 1600);

// ─── INIT ALL ────────────────────────────────────────────────
function initAll() {
  initCursor();
  initNavbar();
  initSplitText();
  initNavChars();
  initRotatingWord();
  initScrollReveal();
  initProjectFilter();
  initContactForm();
  initMagneticButtons();
  initParallaxOrb();
}

// ─── CURSOR ─────────────────────────────────────────────────
function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mX = 0, mY = 0, fX = 0, fY = 0;

  document.addEventListener('mousemove', e => {
    mX = e.clientX; mY = e.clientY;
    cursor.style.left = mX - 5 + 'px';
    cursor.style.top  = mY - 5 + 'px';
  });

  (function tick() {
    fX += (mX - fX) * 0.13;
    fY += (mY - fY) * 0.13;
    follower.style.left = fX - 18 + 'px';
    follower.style.top  = fY - 18 + 'px';
    requestAnimationFrame(tick);
  })();

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform   = 'scale(2.5)';
      follower.style.transform = 'scale(1.4)';
      follower.style.borderColor = '#00d4ff';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform   = 'scale(1)';
      follower.style.transform = 'scale(1)';
      follower.style.borderColor = 'rgba(0,212,255,0.35)';
    });
  });
}

// ─── NAVBAR ─────────────────────────────────────────────────
function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

// ─── SPLIT TEXT (char-by-char reveal) ───────────────────────
function initSplitText() {
  document.querySelectorAll('.split-text').forEach(el => {
    const text  = el.textContent.trim();
    const delay = parseFloat(el.style.animationDelay || '0');
    el.textContent = '';

    text.split('').forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      span.style.animationDelay = (delay + i * 0.055) + 's';
      el.appendChild(span);
    });
  });
}

// ─── NAV CHARS (bounce on hover) ────────────────────────────
function initNavChars() {
  document.querySelectorAll('.nav-links a').forEach(link => {
    const text = link.textContent;
    link.textContent = '';
    text.split('').forEach((ch, i) => {
      const s = document.createElement('span');
      s.className = 'nav-char';
      s.textContent = ch;
      s.style.transitionDelay = (i * 0.03) + 's';
      link.appendChild(s);
    });
  });
}

// ─── ROTATING WORD ──────────────────────────────────────────
function initRotatingWord() {
  const words = ['Digital', 'Creative', 'Futuristic', 'Cinematic', 'Premium'];
  let idx = 0;
  const el = document.getElementById('rotatingWord');

  // Wrap content
  el.innerHTML = `<span>${el.textContent}</span>`;

  setInterval(() => {
    el.classList.add('hide');
    setTimeout(() => {
      idx = (idx + 1) % words.length;
      el.innerHTML = `<span>${words[idx]} Experiences</span>`;
      el.classList.remove('hide');
    }, 500);
  }, 2800);
}

// ─── PARALLAX ORB ────────────────────────────────────────────
function initParallaxOrb() {
  const orb = document.getElementById('heroOrb');
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 32;
    const y = (e.clientY / window.innerHeight - 0.5) * 32;
    orb.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
  });
}

// ─── SCROLL REVEAL ───────────────────────────────────────────
function initScrollReveal() {
  // Wrap about-p words
  document.querySelectorAll('.about-p').forEach(p => {
    const words = p.textContent.split(' ');
    p.innerHTML = words.map((w, i) =>
      `<span class="word" style="animation-delay:${0.03 * i}s">${w}</span>`
    ).join(' ');
  });

  // Section titles — line-reveal
  document.querySelectorAll('.section-title').forEach(el => {
    el.querySelectorAll('br').forEach(br => br.replaceWith('\n'));
    const lines = el.innerHTML.split('\n');
    el.innerHTML = lines.map(line =>
      `<div class="line-reveal"><span class="inner">${line}</span></div>`
    ).join('');
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;

      // Line reveals
      el.querySelectorAll('.line-reveal').forEach(lr => lr.classList.add('visible'));

      // Word reveals
      el.querySelectorAll('.word').forEach((w, i) => {
        w.style.opacity = '0';
        w.style.transform = 'translateY(18px)';
        w.style.transition = `opacity 0.5s ease ${0.02 * i}s, transform 0.5s ease ${0.02 * i}s`;
        setTimeout(() => {
          w.style.opacity = '1';
          w.style.transform = 'translateY(0)';
        }, 50);
      });

      // Generic reveal
      if (el.classList.contains('anim-up')) {
        el.style.opacity    = '1';
        el.style.transform  = 'translateY(0)';
      }

      io.unobserve(el);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  // Cards — staggered
  document.querySelectorAll('.project-card, .bento-card, .stat-card, .team-card').forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = `opacity 0.7s ease ${i * 0.08}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`;
    el.classList.add('anim-up');
    io.observe(el);
  });

  // Section headers
  document.querySelectorAll('.section-header, .about-text, .about-visual, .contact-header').forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)';
    el.classList.add('anim-up');
    io.observe(el);
  });

  // About paragraphs
  document.querySelectorAll('.about-text').forEach(el => io.observe(el));
  document.querySelectorAll('[class*="section-title"]').forEach(el => io.observe(el));
}

// ─── MAGNETIC BUTTONS ────────────────────────────────────────
function initMagneticButtons() {
  document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width  / 2;
      const y = e.clientY - rect.top  - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0,0)';
    });
  });
}

// ─── PROJECT FILTER ──────────────────────────────────────────
function initProjectFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      cards.forEach((card, i) => {
        const tags = card.dataset.tags || '';
        const show = filter === 'all' || tags.includes(filter);
        card.style.transition = `opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s`;
        if (show) {
          card.style.display = '';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => { card.style.display = 'none'; }, 400);
        }
      });
    });
  });
}

// ─── CONTACT FORM ────────────────────────────────────────────
function initContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('contactSuccess');
  const btn     = form ? form.querySelector('.btn-submit') : null;
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Loading state
    btn.textContent = 'Sending...';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    const data = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        // Success
        form.style.opacity   = '0';
        form.style.transform = 'translateY(-20px)';
        form.style.transition = 'all 0.4s ease';
        setTimeout(() => {
          form.style.display = 'none';
          success.style.display = 'block';
          success.style.opacity = '0';
          success.style.transition = 'opacity 0.5s ease';
          setTimeout(() => { success.style.opacity = '1'; }, 50);
        }, 400);
      } else {
        // Error
        btn.textContent = 'Failed — Try Again';
        btn.style.background = '#ff4444';
        btn.disabled = false;
        btn.style.opacity = '1';
      }
    } catch {
      btn.textContent = 'Network Error — Try Again';
      btn.style.background = '#ff4444';
      btn.disabled = false;
      btn.style.opacity = '1';
    }
  });
}
