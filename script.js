/* ============================================================
   SHIVANSH SINGH SENGAR — PORTFOLIO
   Figma-style live design-tool canvas animations
   ============================================================ */

(function() {
  'use strict';

  // Check for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Check for fine pointer (desktop vs touch)
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

  // ─── 1. INTRO LOADER (~5s) ─────────────────────────────
  function initIntroLoader() {
    if (prefersReducedMotion) {
      // Skip loader
      document.getElementById('intro-loader').remove();
      document.body.style.overflow = '';
      initAll();
      return;
    }

    // Lock scroll
    document.body.style.overflow = 'hidden';

    const loader = document.getElementById('intro-loader');
    const cursorsContainer = document.getElementById('loaderCursors');
    const boxesContainer = document.getElementById('loaderBoxes');

    // Create 8-10 small cursors
    const cursorColors = ['#ff4a3d', '#4cc9ff', '#ffeb3b', '#4caf50', '#9c27b0', '#ff6b9d', '#00d4ff', '#ff9800'];
    const cursors = [];

    for (let i = 0; i < 8; i++) {
      const cursor = document.createElement('div');
      cursor.className = 'loader-cursor';
      cursor.innerHTML = `<svg viewBox="0 0 16 16" fill="none"><path d="M1 1L14 8L7 9L5 14L1 1Z" fill="${cursorColors[i]}" stroke="${cursorColors[i]}" stroke-width="1"/></svg>`;
      cursor.style.left = '50%';
      cursor.style.top = '50%';
      cursor.style.transform = 'translate(-50%, -50%)';
      cursorsContainer.appendChild(cursor);
      cursors.push({ el: cursor, color: cursorColors[i] });
    }

    // a. After 600ms, fly cursors outward and morph to crosshairs
    setTimeout(() => {
      cursors.forEach((cursor, i) => {
        const angle = (i / cursors.length) * Math.PI * 2;
        const distance = 300 + Math.random() * 200;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        cursor.el.style.transition = 'all 1.4s cubic-bezier(0.22, 1, 0.36, 1)';
        cursor.el.style.left = `calc(50% + ${x}px)`;
        cursor.el.style.top = `calc(50% + ${y}px)`;

        // Morph to crosshair (+)
        setTimeout(() => {
          cursor.el.innerHTML = `<svg viewBox="0 0 16 16"><line x1="8" y1="2" x2="8" y2="14" stroke="${cursor.color}" stroke-width="2"/><line x1="2" y1="8" x2="14" y2="8" stroke="${cursor.color}" stroke-width="2"/></svg>`;
        }, 1400);
      });
    }, 600);

    // c. From ~1900ms, pop in blue selection boxes
    setTimeout(() => {
      const wireframeElements = [
        { label: 'NAVBAR 1200 × 60', top: '20px', left: '50%', width: '1200px', height: '60px', transform: 'translateX(-50%)' },
        { label: 'PORTFOLIO 940 × 210', top: '35%', left: '50%', width: '940px', height: '210px', transform: 'translateX(-50%)' },
        { label: 'HELLO 180 × 30', top: '52%', left: '50%', width: '180px', height: '30px', transform: 'translateX(-50%)' },
        { label: 'NAME_TAG 480 × 56', top: '56%', left: '50%', width: '480px', height: '56px', transform: 'translateX(-50%)' },
        { label: 'ROLE 360 × 24', top: '62%', left: '50%', width: '360px', height: '24px', transform: 'translateX(-50%)' },
        { label: 'CTA_GROUP 420 × 52', top: '68%', left: '50%', width: '420px', height: '52px', transform: 'translateX(-50%)' },
        { label: 'PORTRAIT 200 × 250', bottom: '40px', right: '40px', width: '200px', height: '250px' }
      ];

      wireframeElements.forEach((elem, i) => {
        setTimeout(() => {
          const box = document.createElement('div');
          box.className = 'loader-box';
          box.style.cssText = `
            top: ${elem.top || 'auto'};
            bottom: ${elem.bottom || 'auto'};
            left: ${elem.left || 'auto'};
            right: ${elem.right || 'auto'};
            width: ${elem.width};
            height: ${elem.height};
            ${elem.transform ? 'transform: ' + elem.transform : ''};
            opacity: 0;
            transition: opacity 0.4s ease;
          `;

          // Handles
          const handleTL = document.createElement('div');
          handleTL.className = 'loader-box-handle top-left';
          box.appendChild(handleTL);

          const handleBR = document.createElement('div');
          handleBR.className = 'loader-box-handle bottom-right';
          box.appendChild(handleBR);

          // Label
          const label = document.createElement('div');
          label.className = 'loader-box-label';
          label.textContent = elem.label;
          box.appendChild(label);

          boxesContainer.appendChild(box);

          // Fade in
          setTimeout(() => {
            box.style.opacity = '1';
          }, 50);
        }, i * 110);
      });
    }, 1900);

    // d. At ~3600ms fade out black overlay, fade in real page
    setTimeout(() => {
      loader.classList.add('done');

      // Turn crosshairs back to cursors and start roaming
      cursors.forEach(cursor => {
        cursor.el.innerHTML = `<svg viewBox="0 0 16 16" fill="none"><path d="M1 1L14 8L7 9L5 14L1 1Z" fill="${cursor.color}" stroke="${cursor.color}" stroke-width="1"/></svg>`;
      });

      // Unlock scroll at ~4900ms
      setTimeout(() => {
        document.body.style.overflow = '';
        loader.remove();
        initAll();
      }, 1300);
    }, 3600);
  }

  // ─── 2. PERSISTENT ROAMING CURSORS ────────────────────
  function initRoamingCursors() {
    if (prefersReducedMotion) return;

    const container = document.getElementById('roamingCursors');
    const cursorColors = ['#ff4a3d', '#4cc9ff', '#ffeb3b', '#4caf50', '#9c27b0', '#ff6b9d', '#00d4ff', '#ff9800'];
    const cursors = [];

    for (let i = 0; i < 8; i++) {
      const cursor = document.createElement('div');
      cursor.className = 'roaming-cursor';
      cursor.innerHTML = `<svg viewBox="0 0 16 16" fill="none"><path d="M1 1L14 8L7 9L5 14L1 1Z" fill="${cursorColors[i]}" stroke="${cursorColors[i]}" stroke-width="1"/></svg>`;
      cursor.style.left = `${Math.random() * 100}%`;
      cursor.style.top = `${Math.random() * 100}%`;
      container.appendChild(cursor);

      cursors.push({
        el: cursor,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        targetX: Math.random() * window.innerWidth,
        targetY: Math.random() * window.innerHeight
      });
    }

    // Animate each cursor
    function animate() {
      cursors.forEach(cursor => {
        // Lerp to target
        cursor.x += (cursor.targetX - cursor.x) * 0.02;
        cursor.y += (cursor.targetY - cursor.y) * 0.02;

        cursor.el.style.left = cursor.x + 'px';
        cursor.el.style.top = cursor.y + 'px';

        // Pick new target if close
        const dx = cursor.targetX - cursor.x;
        const dy = cursor.targetY - cursor.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 10) {
          cursor.targetX = Math.random() * window.innerWidth;
          cursor.targetY = Math.random() * window.innerHeight;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    // Update targets periodically
    setInterval(() => {
      cursors.forEach(cursor => {
        cursor.targetX = Math.random() * window.innerWidth;
        cursor.targetY = Math.random() * window.innerHeight;
      });
    }, 3000 + Math.random() * 2000);
  }

  // ─── 3. MY CURSOR (blue arrow + Shivansh chip) ─────────
  function initMyCursor() {
    if (!hasFinePointer || prefersReducedMotion) return;

    const cursor = document.getElementById('myCursor');
    cursor.style.display = 'flex';

    let mX = 0, mY = 0;
    let cX = 0, cY = 0;

    document.addEventListener('mousemove', (e) => {
      mX = e.clientX;
      mY = e.clientY;
    });

    function animate() {
      // Lerp
      cX += (mX - cX) * 0.18;
      cY += (mY - cY) * 0.18;

      cursor.style.left = cX + 'px';
      cursor.style.top = cY + 'px';

      requestAnimationFrame(animate);
    }

    animate();
  }

  // ─── 4. SELECTION BOXES ON SCROLL ──────────────────────
  function initSelectionBoxes() {
    if (prefersReducedMotion) return;

    const fx = document.getElementById('fx');
    const observed = new Set();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !observed.has(entry.target)) {
          observed.add(entry.target);
          showSelectionBox(entry.target);
        }
      });
    }, { threshold: 0.9 });

    // Observe section headings and cards
    const targets = document.querySelectorAll('.section-heading, .flagship-card, .matrix-card');
    targets.forEach(el => observer.observe(el));

    function showSelectionBox(target) {
      const rect = target.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      const box = document.createElement('div');
      box.className = 'selection-box';
      box.style.cssText = `
        position: absolute;
        left: ${rect.left + scrollLeft}px;
        top: ${rect.top + scrollTop}px;
        width: ${rect.width}px;
        height: ${rect.height}px;
        pointer-events: none;
      `;

      // Handles
      const handleTL = document.createElement('div');
      handleTL.className = 'selection-box-handle top-left';
      box.appendChild(handleTL);

      const handleBR = document.createElement('div');
      handleBR.className = 'selection-box-handle bottom-right';
      box.appendChild(handleBR);

      // Label
      const label = document.createElement('div');
      label.className = 'selection-box-label';
      const tagName = target.tagName.toLowerCase();
      label.textContent = `${tagName} ${Math.round(rect.width)} × ${Math.round(rect.height)}`;
      box.appendChild(label);

      fx.appendChild(box);

      // Fade in
      setTimeout(() => {
        box.classList.add('visible');
      }, 50);

      // Fade out and remove after 600ms
      setTimeout(() => {
        box.classList.remove('visible');
        setTimeout(() => box.remove(), 300);
      }, 600);
    }
  }

  // ─── 5. BOTTOM HUD BAR (section tracking) ──────────────
  function initHUD() {
    const hud = document.getElementById('hudSection');
    const sections = [
      { id: 'hero', label: '//01.00 SEC_HERO [01 / 05]' },
      { id: 'about', label: '//02.00 SEC_ABOUT_INDEX [02 / 05]' },
      { id: 'flagships', label: '//03.00 SEC_FLAGSHIPS [03 / 05]' },
      { id: 'matrix', label: '//04.00 SEC_SYSTEMS_MATRIX [04 / 05]' },
      { id: 'dispatch', label: '//05.00 SEC_DISPATCH [05 / 05]' }
    ];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = sections.find(s => s.id === entry.target.id);
          if (section) {
            hud.textContent = section.label;
          }
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(section => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });
  }

  // ─── 6. NAV HIGHLIGHT (active section) ─────────────────
  function initNavHighlight() {
    const links = document.querySelectorAll('.nav-links a');
    const sections = ['about', 'flagships', 'matrix'];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(link => {
            if (link.dataset.section === id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  // ─── 7. MATRIX FILTER ───────────────────────────────────
  function initMatrixFilter() {
    const chips = document.querySelectorAll('.filter-chip');
    const cards = document.querySelectorAll('.matrix-card');

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        // Set active
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const filter = chip.dataset.filter;

        cards.forEach(card => {
          const tags = card.dataset.tags || '';
          const show = filter === 'all' || tags.includes(filter);

          if (show) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // ─── 8. FLAGSHIP & MATRIX CARD HOVER (red glow) ────────
  function initCardHover() {
    const cards = document.querySelectorAll('.flagship-card, .matrix-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 12px 40px rgba(255, 74, 61, 0.3)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';
      });
    });
  }

  // ─── 9. ENDING CTA: Cursor Swarm ───────────────────────
  function initCursorSwarm() {
    if (prefersReducedMotion) return;

    const swarmContainer = document.getElementById('cursorSwarm');
    const cursorColors = ['#ff4a3d', '#4cc9ff', '#ffeb3b', '#4caf50', '#9c27b0', '#ff6b9d', '#00d4ff', '#ff9800', '#e91e63', '#03a9f4', '#8bc34a', '#ff5722', '#9e9e9e', '#3f51b5', '#cddc39'];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Spawn swarm
          for (let i = 0; i < 15; i++) {
            setTimeout(() => {
              const cursor = document.createElement('div');
              cursor.className = 'swarm-cursor';
              const color = cursorColors[i % cursorColors.length];
              cursor.innerHTML = `<svg viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4" fill="${color}"/></svg>`;
              cursor.style.left = '50%';
              cursor.style.top = '50%';
              swarmContainer.appendChild(cursor);

              // Random velocity
              const angle = Math.random() * Math.PI * 0.5 - Math.PI * 0.25; // roughly towards right
              const speed = 3 + Math.random() * 4;
              const vx = Math.cos(angle) * speed;
              const vy = Math.sin(angle) * speed;

              let x = 50;
              let y = 50;

              function fly() {
                x += vx;
                y += vy;
                cursor.style.left = x + '%';
                cursor.style.top = y + '%';
                cursor.style.opacity = Math.max(0, 1 - (x - 50) / 100);

                if (x < 150 && cursor.style.opacity > 0) {
                  requestAnimationFrame(fly);
                } else {
                  cursor.remove();
                }
              }

              fly();
            }, i * 50);
          }

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.8 });

    const dispatch = document.getElementById('dispatch');
    if (dispatch) observer.observe(dispatch);
  }

  // ─── INIT ALL ───────────────────────────────────────────
  function initAll() {
    initRoamingCursors();
    initMyCursor();
    initSelectionBoxes();
    initHUD();
    initNavHighlight();
    initMatrixFilter();
    initCardHover();
    initCursorSwarm();
  }

  // ─── START ──────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIntroLoader);
  } else {
    initIntroLoader();
  }

})();
