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

  // ─── 2. BUILDER CURSORS (Creating Content Live) ────────────────────
  function initRoamingCursors() {
    if (prefersReducedMotion) return;

    const container = document.getElementById('roamingCursors');
    const fxLayer = document.getElementById('fx');
    const cursorColors = ['#ff4a3d', '#4cc9ff', '#ffeb3b', '#4caf50', '#9c27b0', '#ff6b9d', '#00d4ff', '#ff9800'];
    const cursorNames = ['Alex', 'Maya', 'John', 'Sara', 'Dev', 'Zara', 'Leo', 'Nina'];
    const cursors = [];

    // Create cursors
    for (let i = 0; i < 8; i++) {
      const cursorWrapper = document.createElement('div');
      cursorWrapper.className = 'roaming-cursor';
      cursorWrapper.innerHTML = `
        <svg viewBox="0 0 16 16" fill="none"><path d="M1 1L14 8L7 9L5 14L1 1Z" fill="${cursorColors[i]}" stroke="${cursorColors[i]}" stroke-width="1"/></svg>
        <span class="cursor-name-label" style="background: ${cursorColors[i]}; color: #fff; font-size: 10px; padding: 2px 6px; border-radius: 3px; margin-left: 4px; white-space: nowrap; font-family: 'Space Grotesk', sans-serif;">${cursorNames[i]}</span>
      `;
      cursorWrapper.style.display = 'flex';
      cursorWrapper.style.alignItems = 'center';
      container.appendChild(cursorWrapper);

      cursors.push({
        el: cursorWrapper,
        name: cursorNames[i],
        color: cursorColors[i],
        x: 200 + i * 100,
        y: 200 + (i % 3) * 150,
        targetX: 200,
        targetY: 200
      });
    }

    // Store globally for content builder
    window.builderCursors = cursors;

    // Animation loop
    function animate() {
      cursors.forEach(cursor => {
        // Move to target
        const speed = 0.12;
        cursor.x += (cursor.targetX - cursor.x) * speed;
        cursor.y += (cursor.targetY - cursor.y) * speed;

        cursor.el.style.left = (cursor.x - window.scrollX) + 'px';
        cursor.el.style.top = (cursor.y - window.scrollY) + 'px';
      });

      requestAnimationFrame(animate);
    }

    animate();

    // Random roaming when idle
    setInterval(() => {
      cursors.forEach(cursor => {
        // Only roam if not building
        if (Math.random() > 0.5) {
          const randomX = 100 + Math.random() * (window.innerWidth - 200);
          const randomY = window.scrollY + 100 + Math.random() * (window.innerHeight - 200);
          cursor.targetX = randomX;
          cursor.targetY = randomY;
        }
      });
    }, 4000);
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
    hideAllContent(); // Hide all content initially
    initRoamingCursors();
    initMyCursor();
    initContentBuilder(); // New: Build content on scroll
    initHUD();
    initNavHighlight();
    initMatrixFilter();
    initCardHover();
    initCursorSwarm();
  }

  // ─── HIDE ALL CONTENT INITIALLY ────────────────────────
  function hideAllContent() {
    // Hide all main content sections
    const contentElements = document.querySelectorAll(`
      .hero-portfolio,
      .hero-hello,
      .hero-name-tag,
      .hero-role,
      .hero-ctas,
      .hero-portrait,
      .section-heading,
      .about-col,
      .pull-quote,
      .flagship-card,
      .matrix-card,
      .dispatch-heading,
      .dispatch-contact
    `);

    contentElements.forEach(el => {
      el.style.opacity = '0';
      el.style.visibility = 'hidden';
      el.setAttribute('data-built', 'false');
    });
  }

  // ─── BUILD CONTENT ON SCROLL ────────────────────────────
  function initContentBuilder() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.getAttribute('data-built') === 'false') {
          // Build this element with cursors
          buildElementWithCursors(entry.target);
        }
      });
    }, { 
      threshold: 0.3,
      rootMargin: '100px'
    });

    // Observe all content elements
    const contentElements = document.querySelectorAll(`
      .hero-portfolio,
      .hero-hello,
      .hero-name-tag,
      .hero-role,
      .hero-ctas,
      .hero-portrait,
      .section-heading,
      .about-col,
      .pull-quote,
      .flagship-card,
      .matrix-card,
      .dispatch-heading,
      .dispatch-contact
    `);

    contentElements.forEach(el => observer.observe(el));
  }

  // ─── BUILD ELEMENT WITH CURSORS ─────────────────────────
  function buildElementWithCursors(element) {
    element.setAttribute('data-built', 'true');
    
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const fxLayer = document.getElementById('fx');
    
    // Pick 1-2 random cursors to build this element
    const availableCursors = window.builderCursors || [];
    const numCursors = Math.min(1 + Math.floor(Math.random() * 2), availableCursors.length);
    const selectedCursors = [];
    
    for (let i = 0; i < numCursors; i++) {
      const cursor = availableCursors[Math.floor(Math.random() * availableCursors.length)];
      if (cursor && !selectedCursors.includes(cursor)) {
        selectedCursors.push(cursor);
      }
    }

    // Determine build type based on element
    let buildType = 'text';
    if (element.classList.contains('section-heading') || element.classList.contains('hero-portfolio')) {
      buildType = 'heading';
    } else if (element.classList.contains('flagship-card') || element.classList.contains('matrix-card')) {
      buildType = 'card';
    } else if (element.classList.contains('about-col') || element.classList.contains('pull-quote')) {
      buildType = 'paragraph';
    } else if (element.classList.contains('hero-ctas') || element.classList.contains('dispatch-contact')) {
      buildType = 'buttons';
    } else if (element.classList.contains('hero-hello') || element.classList.contains('hero-role') || element.classList.contains('hero-name-tag')) {
      buildType = 'text';
    }

    // Show building process with first cursor only (simpler and more reliable)
    const cursor = selectedCursors[0];
    if (cursor) {
      // Move cursor to element
      cursor.targetX = rect.left + rect.width * 0.3 + window.scrollX;
      cursor.targetY = rect.top + rect.height * 0.5 + scrollTop;

      // Show building animation
      showBuildingProcess(cursor, element, rect, scrollTop, buildType, true);
    }
  }

  // ─── SHOW BUILDING PROCESS ──────────────────────────────
  function showBuildingProcess(cursor, element, rect, scrollTop, buildType, isLast) {
    const fxLayer = document.getElementById('fx');
    
    // Show label
    const label = document.createElement('div');
    label.style.cssText = `
      position: absolute;
      left: ${rect.left}px;
      top: ${rect.top + scrollTop - 30}px;
      background: ${cursor.color};
      color: #fff;
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 11px;
      font-family: monospace;
      white-space: nowrap;
      pointer-events: none;
      z-index: 9996;
    `;
    label.textContent = `${cursor.name}: Writing...`;
    fxLayer.appendChild(label);

    // Start typing the actual element content
    if (buildType === 'heading' || buildType === 'text' || buildType === 'paragraph') {
      typeElementContent(element, cursor, label, isLast);
    } else if (buildType === 'card') {
      buildCardWithTyping(element, cursor, label, isLast);
    } else if (buildType === 'buttons') {
      buildButtonsWithTyping(element, cursor, label, isLast);
    }
  }

  // ─── TYPE ELEMENT CONTENT (Letter by Letter) ───────────
  function typeElementContent(element, cursor, label, isLast) {
    // Store original text and HTML
    const originalText = element.textContent.trim();
    
    if (!originalText || originalText.length === 0) {
      // If no text, just show element
      element.style.visibility = 'visible';
      element.style.opacity = '1';
      if (label && label.parentNode) {
        label.remove();
      }
      return;
    }
    
    // Make element visible but empty
    element.style.visibility = 'visible';
    element.style.opacity = '1';
    
    // Store original styles
    const originalHTML = element.innerHTML;
    element.textContent = '';
    
    let currentIndex = 0;
    const typingSpeed = 30; // ms per character
    
    function typeNextChar() {
      if (currentIndex < originalText.length) {
        // Add character + blinking cursor
        element.textContent = originalText.substring(0, currentIndex + 1) + '|';
        currentIndex++;
        setTimeout(typeNextChar, typingSpeed);
      } else {
        // Typing complete - restore original content
        element.innerHTML = originalHTML;
        
        // Clean up label
        if (label && label.parentNode) {
          label.style.transition = 'opacity 0.3s';
          label.style.opacity = '0';
          setTimeout(() => {
            if (label.parentNode) label.remove();
          }, 300);
        }
      }
    }
    
    typeNextChar();
  }

  // ─── BUILD CARD WITH TYPING ─────────────────────────────
  function buildCardWithTyping(element, cursor, label, isLast) {
    const fxLayer = document.getElementById('fx');
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // First draw the card box
    const cardBox = document.createElement('div');
    cardBox.style.cssText = `
      position: absolute;
      left: ${rect.left}px;
      top: ${rect.top + scrollTop}px;
      width: 0;
      height: 0;
      border: 2px solid ${cursor.color};
      background: ${cursor.color}08;
      border-radius: 16px;
      transition: width 0.8s ease-out, height 0.8s ease-out;
      pointer-events: none;
      z-index: 9995;
    `;
    fxLayer.appendChild(cardBox);
    
    setTimeout(() => {
      cardBox.style.width = rect.width + 'px';
      cardBox.style.height = rect.height + 'px';
    }, 100);
    
    // After box is drawn, show the element and type content
    setTimeout(() => {
      // Get all text elements inside card
      const textElements = [];
      
      // Find all text-containing elements
      const h3 = element.querySelector('h3, h4');
      const p = element.querySelector('p');
      const techContainer = element.querySelector('.flagship-tech, .matrix-tech');
      
      if (h3) textElements.push(h3);
      if (p) textElements.push(p);
      
      // Show element
      element.style.visibility = 'visible';
      element.style.opacity = '1';
      
      // Type each text element sequentially
      let delay = 0;
      textElements.forEach((textEl, index) => {
        setTimeout(() => {
          typeTextElement(textEl);
        }, delay);
        const textLength = textEl.textContent ? textEl.textContent.length : 0;
        delay += textLength * 25 + 300;
      });
      
      // Show tech tags after typing (no need to type them)
      if (techContainer) {
        setTimeout(() => {
          techContainer.style.opacity = '1';
          techContainer.style.transition = 'opacity 0.5s';
        }, delay);
      }
      
      // Show links container if exists
      const linksContainer = element.querySelector('.flagship-links, .card-links');
      if (linksContainer) {
        setTimeout(() => {
          linksContainer.style.opacity = '1';
          linksContainer.style.transition = 'opacity 0.5s';
        }, delay + 200);
      }
      
      // Clean up
      setTimeout(() => {
        cardBox.style.transition = 'opacity 0.4s';
        cardBox.style.opacity = '0';
        setTimeout(() => {
          if (cardBox.parentNode) cardBox.remove();
        }, 400);
        
        if (label && label.parentNode) {
          label.style.opacity = '0';
          label.style.transition = 'opacity 0.3s';
          setTimeout(() => {
            if (label.parentNode) label.remove();
          }, 300);
        }
      }, delay + 800);
    }, 1000);
  }

  // ─── BUILD BUTTONS WITH TYPING ──────────────────────────
  function buildButtonsWithTyping(element, cursor, label, isLast) {
    const fxLayer = document.getElementById('fx');
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    element.style.visibility = 'visible';
    element.style.opacity = '1';
    
    const buttons = element.querySelectorAll('a, button');
    
    buttons.forEach((btn, index) => {
      // Draw button outline first
      const btnRect = btn.getBoundingClientRect();
      const outline = document.createElement('div');
      outline.style.cssText = `
        position: absolute;
        left: ${btnRect.left}px;
        top: ${btnRect.top + scrollTop}px;
        width: 0;
        height: ${btnRect.height}px;
        border: 2px solid ${cursor.color};
        border-radius: 50px;
        transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        pointer-events: none;
        z-index: 9995;
      `;
      fxLayer.appendChild(outline);
      
      setTimeout(() => {
        outline.style.width = btnRect.width + 'px';
        
        // Type button text
        setTimeout(() => {
          typeTextElement(btn);
          
          // Clean up outline
          setTimeout(() => {
            outline.style.opacity = '0';
            outline.style.transition = 'opacity 0.3s';
            setTimeout(() => outline.remove(), 300);
          }, btn.textContent.length * 30 + 200);
        }, 400);
      }, index * 400 + 100);
    });
    
    // Clean up label
    setTimeout(() => {
      if (label && label.parentNode) {
        label.style.opacity = '0';
        label.style.transition = 'opacity 0.3s';
        setTimeout(() => label.remove(), 300);
      }
    }, buttons.length * 600 + 1000);
  }

  // ─── TYPE TEXT ELEMENT (Reusable) ──────────────────────
  function typeTextElement(element) {
    if (!element) return;
    
    const originalText = element.textContent.trim();
    
    if (!originalText || originalText.length === 0) {
      return;
    }
    
    // Store original HTML
    const originalHTML = element.innerHTML;
    
    // Check if element has children (complex structure)
    const hasChildren = element.children.length > 0;
    
    if (hasChildren) {
      // For complex elements with nested tags, just fade in
      element.style.opacity = '0';
      element.style.transition = 'opacity 0.5s';
      setTimeout(() => {
        element.style.opacity = '1';
      }, 100);
      return;
    }
    
    // Simple text - type it
    element.textContent = '';
    
    let currentIndex = 0;
    const typingSpeed = 25;
    
    function typeNextChar() {
      if (currentIndex < originalText.length) {
        element.textContent = originalText.substring(0, currentIndex + 1);
        currentIndex++;
        setTimeout(typeNextChar, typingSpeed);
      } else {
        // Typing complete - restore original HTML in case there were inline styles/spans
        element.innerHTML = originalHTML;
      }
    }
    
    typeNextChar();
  }

  // ─── START ──────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIntroLoader);
  } else {
    initIntroLoader();
  }

})();
