/**
 * FLOOR2FEED — CORE APPLICATION LOGIC & ARCHITECTURAL UI ENGINE
 * Handles: Scroll-Controlled Video Hero, Market Variant Shift, Interactive Demos, Split Slider, & Pipeline Simulation
 */

document.addEventListener('DOMContentLoaded', () => {
  // Preloader Logic
  const preloader = document.getElementById('site-preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('loaded');
    }, 1800);
  }

  initScrollControlledHero();
  initNavbarScroll();
  initPipelineTabs();
  initTrack2StyleSelector();
  initSplitScreenSlider();
  initFaqAccordion();
  initUploadSandbox();
});

/* Contact form handler (global so inline onsubmit works) */
window.handleContactForm = function(e) {
  e.preventDefault();
  const btn = document.getElementById('contact-submit-btn');
  const success = document.getElementById('contact-success');
  if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }
  setTimeout(() => {
    if (btn) { btn.style.display = 'none'; }
    if (success) { success.classList.remove('hidden'); }
    document.getElementById('footer-contact-form')?.reset();
  }, 800);
};

/* ==========================================================================
   1. SCROLL-CONTROLLED VIDEO HERO (CORE HERO EXPERIENCE)
   ========================================================================== */
function initScrollControlledHero() {
  const video = document.getElementById('hero-video');
  const scrollTrack = document.getElementById('hero-scroll-track');
  const cueBoxes = document.querySelectorAll('.hero-cue-box');

  if (!video || !scrollTrack) return;

  let targetTime = 0;
  let currentTime = 0;
  let videoDuration = 0;
  let currentCueIndex = 0;
  let isSeeking = false;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    video.loop = true;
    video.muted = true;
    video.play().catch(e => console.warn('Autoplay prevented:', e));
    return;
  }

  // Non-blocking seek locks to prevent decoder pipeline flooding
  video.addEventListener('seeking', () => { isSeeking = true; });
  video.addEventListener('seeked', () => { isSeeking = false; });

  // Handle video metadata load
  video.addEventListener('loadedmetadata', () => {
    videoDuration = video.duration || 15;
    video.pause();
    video.currentTime = 0;
  });

  setTimeout(() => {
    if (!videoDuration && video.duration) {
      videoDuration = video.duration;
    } else if (!videoDuration) {
      videoDuration = 18;
    }
  }, 1000);

  function onScroll() {
    const trackTop = scrollTrack.offsetTop;
    const trackHeight = scrollTrack.offsetHeight - window.innerHeight;
    if (trackHeight <= 0) return;

    const scrollY = window.scrollY;
    let progress = (scrollY - trackTop) / trackHeight;
    progress = Math.max(0, Math.min(1, progress));

    if (videoDuration > 0) {
      targetTime = progress * videoDuration;
    }
  }

  function renderLoop() {
    if (videoDuration > 0) {
      // Smooth LERP towards target scroll time
      currentTime += (targetTime - currentTime) * 0.18;
      
      // Snap to target if very close to prevent endless micro-seeks
      if (Math.abs(targetTime - currentTime) < 0.04) {
        currentTime = targetTime;
      }

      // Non-blocking seek engine: only request seek if decoder isn't busy and delta exceeds 1 frame (~0.04s)
      if (!isSeeking && video.readyState >= 1 && Math.abs(currentTime - video.currentTime) > 0.04) {
        isSeeking = true;
        try {
          if (typeof video.fastSeek === 'function') {
            video.fastSeek(currentTime);
          } else {
            video.currentTime = currentTime;
          }
        } catch (err) {
          isSeeking = false;
        }
      }
    }
    requestAnimationFrame(renderLoop);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
  requestAnimationFrame(renderLoop);
}

/* ==========================================================================
   2. NAVBAR SCROLL EFFECT
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   4. INTERACTIVE TABBED PIPELINE SHOWCASE (SECTION 3)
   ========================================================================== */
function initPipelineTabs() {
  const tabs = document.querySelectorAll('.step-tab');
  const panels = document.querySelectorAll('.step-panel');
  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetStep = tab.getAttribute('data-step');
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      
      tab.classList.add('active');
      const activePanel = document.getElementById(`step-panel-${targetStep}`);
      if (activePanel) activePanel.classList.add('active');
    });
  });
}

/* ==========================================================================
   6. TRACK 2 STYLE TRANSFER SELECTOR (SECTION 5)
   ========================================================================== */
function initTrack2StyleSelector() {
  const toggles = document.querySelectorAll('.style-toggle');
  const filterLayer = document.getElementById('style-filter-layer');
  const nameEl = document.getElementById('style-name-display');
  const descEl = document.getElementById('style-desc-display');

  if (!toggles.length || !filterLayer) return;

  const styleData = {
    warm: {
      className: "warm-lived-in",
      name: "Warm Family Lived-in (Timber, Leather, Brass)",
      desc: "Warm brown next to generated interiors reads as timber, leather, brass — harmonizing with what's in the imagery instead of sitting on top of it."
    },
    prime: {
      className: "prime-arch",
      name: "Cool Architectural Prime (Monochrome Marble)",
      desc: "Monochrome architectural concrete, Italian Calacatta marble, recessed LED linear lighting, minimalist luxury specification."
    },
    investor: {
      className: "investor-bright",
      name: "Bright Investor Neutral (High-Key Daylight)",
      desc: "High-key midday daylight, light Scandinavian ash joinery, neutral palettes designed to maximize perceived spatial volume."
    }
  };

  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      toggles.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      const styleKey = btn.getAttribute('data-style') || 'warm';
      const data = styleData[styleKey];
      if (data) {
        filterLayer.className = `style-filter-layer ${data.className}`;
        if (nameEl) nameEl.textContent = data.name;
        if (descEl) descEl.textContent = data.desc;
      }
    });
  });
}

/* ==========================================================================
   7. INTERACTIVE SPLIT-SCREEN COMPARISON SLIDER (SECTION 8)
   ========================================================================== */
function initSplitScreenSlider() {
  const container = document.getElementById('split-viewport');
  const beforeLayer = document.getElementById('before-layer');
  const handle = document.getElementById('split-handle');
  const beforeImgWrapper = document.getElementById('before-img-wrapper');

  if (!container || !beforeLayer || !handle) return;

  let isDragging = false;
  let pct = 50;

  const setPosition = (percentage) => {
    pct = Math.max(2, Math.min(98, percentage));
    // Clip the before-layer using clip-path so the underlying image never moves
    beforeLayer.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    handle.style.left = `${pct}%`;
  };

  const getPercentage = (clientX) => {
    const rect = container.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * 100;
  };

  // Init
  setPosition(50);

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    e.preventDefault();
    setPosition(getPercentage(e.clientX));
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setPosition(getPercentage(e.clientX));
  });

  window.addEventListener('mouseup', () => { isDragging = false; });

  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches.length > 0) setPosition(getPercentage(e.touches[0].clientX));
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || !e.touches.length) return;
    setPosition(getPercentage(e.touches[0].clientX));
  }, { passive: true });

  window.addEventListener('touchend', () => { isDragging = false; });
}

/* ==========================================================================
   8. FAQ SMOOTH ACCORDION (SECTION 10)
   ========================================================================== */
function initFaqAccordion() {
  const headers = document.querySelectorAll('.accordion-header');
  if (!headers.length) return;

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.accordion-body');
      const isExpanded = header.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherHeader = otherItem.querySelector('.accordion-header');
          const otherBody = otherItem.querySelector('.accordion-body');
          if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
          if (otherBody) otherBody.style.maxHeight = null;
        }
      });

      if (!isExpanded) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
        if (body) body.style.maxHeight = `${body.scrollHeight + 40}px`;
      } else {
        item.classList.remove('active');
        header.setAttribute('aria-expanded', 'false');
        if (body) body.style.maxHeight = null;
      }
    });
  });
}

/* ==========================================================================
   9. INTERACTIVE PLAN UPLOAD SANDBOX & PIPELINE SIMULATION (SECTION 11)
   ========================================================================== */
function initUploadSandbox() {
  const dropzone = document.getElementById('dropzone-area');
  const fileInput = document.getElementById('plan-file-input');
  const defaultState = document.getElementById('drop-default');
  const processingState = document.getElementById('drop-processing');
  const successState = document.getElementById('drop-success');
  const demoBtn = document.getElementById('demo-upload-btn');
  const resetBtn = document.getElementById('reset-upload-btn');
  const primaryTrigger = document.getElementById('primary-upload-trigger');
  
  const progBar = document.getElementById('processing-progress');
  const progTitle = document.getElementById('processing-title');
  const progDetail = document.getElementById('processing-detail');

  if (!dropzone || !defaultState || !processingState || !successState) return;

  function triggerFileSelect() {
    successState.classList.add('hidden');
    processingState.classList.add('hidden');
    defaultState.classList.remove('hidden');
    document.getElementById('cad-results-container')?.classList.add('hidden');
    if (progBar) progBar.style.width = '0%';
    fileInput?.click();
  }

  dropzone.addEventListener('click', (e) => {
    if (e.target === demoBtn || demoBtn?.contains(e.target)) return;
    if (e.target === resetBtn || resetBtn?.contains(e.target)) return;
    if (e.target.closest('#cad-results-container')) return;
    triggerFileSelect();
  });

  primaryTrigger?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropzone.scrollIntoView({ behavior: 'smooth', block: 'center' });
    triggerFileSelect();
  });

  document.querySelectorAll('a[href="#upload-section"], a[href="#dropzone-area"]').forEach(link => {
    if (link === primaryTrigger) return;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      dropzone.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        triggerFileSelect();
      }, 400);
    });
  });

  demoBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    startPipelineSimulation("demo_penthouse_layout_v2.dwg");
  });

  fileInput?.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      startPipelineSimulation(e.target.files[0]);
    }
  });

  resetBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    successState.classList.add('hidden');
    processingState.classList.add('hidden');
    defaultState.classList.remove('hidden');
    document.getElementById('cad-results-container')?.classList.add('hidden');
    if (progBar) progBar.style.width = '0%';
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('dragover');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('dragover');
    }, false);
  });

  dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt?.files;
    if (files && files.length > 0) {
      startPipelineSimulation(files[0]);
    }
  }, false);

  function startPipelineSimulation(fileOrFilename) {
    const isFile = typeof fileOrFilename === 'object' && fileOrFilename !== null;
    const filename = isFile ? fileOrFilename.name : fileOrFilename;

    defaultState.classList.add('hidden');
    successState.classList.add('hidden');
    processingState.classList.remove('hidden');

    if (progTitle) progTitle.textContent = `Ingesting ${filename}…`;
    if (progDetail) progDetail.textContent = "● Parsing CAD geometry and wall vectors...";
    if (progBar) progBar.style.width = '15%';

    const apiBase = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8077';
    const apiEndpoint = `${apiBase}/api/analyze-dwg`;
    const fetchPromise = isFile
      ? (() => {
          const fd = new FormData();
          fd.append('file', fileOrFilename);
          fd.append('target', 'exterior');
          return fetch(apiEndpoint, { method: 'POST', body: fd });
        })()
      : fetch(apiEndpoint);

    fetchPromise
      .then(res => res.json())
      .then(data => {
        if (data && data.status === 'success') {
          updatePipelineUIWithCADData(data);
        } else {
          console.warn("CAD Backend API notice:", data.message);
        }
      })
      .catch(err => {
        console.warn("CAD Backend API unreachable or simulated mode:", err);
      });

    setTimeout(() => {
      if (progTitle) progTitle.textContent = "Generating 3D room meshes & circulation…";
      if (progDetail) progDetail.textContent = "● Calculating natural lighting & applying timber/brass palettes...";
      if (progBar) progBar.style.width = '55%';
    }, 1200);

    setTimeout(() => {
      if (progTitle) progTitle.textContent = "Compiling Track 1 & Track 2 assets…";
      if (progDetail) progDetail.textContent = "● Publishing interactive property portal & CRM hooks...";
      if (progBar) progBar.style.width = '85%';
    }, 2400);

    setTimeout(() => {
      if (progBar) progBar.style.width = '100%';
      setTimeout(() => {
        processingState.classList.add('hidden');
        successState.classList.remove('hidden');
      }, 500);
    }, 3600);
  }

  function updatePipelineUIWithCADData(data) {
    const cadTitleEl = document.querySelector('.cad-title');
    if (cadTitleEl) {
      cadTitleEl.textContent = `${data.filename} (Project: ${data.project} · ${data.total_area || '?'} m²)`;
    }

    const svgTexts = document.querySelectorAll('.cad-drawing text');
    if (svgTexts && data.rooms && data.rooms.length > 0) {
      if (svgTexts[0] && data.rooms[0]) {
        svgTexts[0].textContent = `${data.rooms[0].name.toUpperCase()} (${data.rooms[0].sqm ? data.rooms[0].sqm + ' m²' : ''})`;
      }
      if (svgTexts[2] && data.rooms[1]) {
        svgTexts[2].textContent = `${data.rooms[1].name.toUpperCase()}`;
      }
      if (svgTexts[3] && data.rooms[2]) {
        svgTexts[3].textContent = `${data.rooms[2].name.toUpperCase()}`;
      }
    }

    const metaSpans = document.querySelectorAll('.gen-overlay-meta span');
    if (metaSpans && metaSpans.length >= 1) {
      metaSpans[0].textContent = `CAD Project: ${data.project} · ${data.total_area || 'Custom'} m²`;
    }

    const miniH = document.querySelector('.mini-h');
    const miniSub = document.querySelector('.mini-sub');
    if (miniH && data.project) {
      miniH.textContent = `THE ${data.project.toUpperCase()} RESIDENCES`;
    }
    if (miniSub && data.rooms) {
      const roomNames = data.rooms.slice(0, 3).map(r => r.name).join(', ');
      miniSub.textContent = `CAD Extracted: ${data.total_area || '?'} m² Total · Rooms: ${roomNames}`;
    }

    const promptCard = document.querySelector('.live-site-preview-card');
    if (promptCard && data.prompt && !document.getElementById('cad-prompt-banner')) {
      const banner = document.createElement('div');
      banner.id = 'cad-prompt-banner';
      banner.className = 'font-mono';
      banner.style.cssText = 'padding: 12px 14px; background: var(--bg-tint); border-top: 1px solid var(--border-strong); font-size: 11px; color: var(--harbour); white-space: pre-wrap; max-height: 100px; overflow-y: auto;';
      banner.textContent = `[CAD GENERATED PROMPT]: ${data.prompt}`;
      promptCard.appendChild(banner);
    }

    const resultsContainer = document.getElementById('cad-results-container');
    if (resultsContainer) {
      resultsContainer.classList.remove('hidden');
      const resFilename = document.getElementById('res-filename');
      const resProject = document.getElementById('res-project');
      const resAreaNum = document.getElementById('res-area-num');
      const resRoomsNum = document.getElementById('res-rooms-num');
      const resTextNum = document.getElementById('res-text-num');
      const resRoomsList = document.getElementById('res-rooms-list');
      const resPromptBox = document.getElementById('res-prompt-box');
      const copyBtn = document.getElementById('copy-prompt-btn');

      if (resFilename) resFilename.textContent = data.filename || 'file.dwg';
      if (resProject) resProject.textContent = data.project || 'Architecture Project';
      if (resAreaNum) resAreaNum.textContent = data.total_area ? `${data.total_area} m²` : 'Custom';
      if (resRoomsNum) resRoomsNum.textContent = (data.rooms || []).length;
      if (resTextNum) resTextNum.textContent = data.text_count !== undefined ? data.text_count : '42';
      
      if (resRoomsList) {
        resRoomsList.innerHTML = '';
        (data.rooms || []).forEach(r => {
          const pill = document.createElement('div');
          pill.className = 'cad-res-room-pill';
          const nameSpan = document.createElement('span');
          nameSpan.textContent = r.name;
          pill.appendChild(nameSpan);
          if (r.sqm) {
            const sqmSpan = document.createElement('span');
            sqmSpan.className = 'room-sqm';
            sqmSpan.textContent = `(${r.sqm} m²)`;
            pill.appendChild(sqmSpan);
          }
          resRoomsList.appendChild(pill);
        });
      }

      if (resPromptBox) resPromptBox.textContent = data.prompt || 'No prompt generated.';

      if (copyBtn && data.prompt) {
        copyBtn.onclick = () => {
          navigator.clipboard.writeText(data.prompt);
          copyBtn.textContent = '[ ✓ Copied Prompt ]';
          setTimeout(() => { copyBtn.textContent = '[ Copy Prompt ]'; }, 2000);
        };
      }

      const renderSec = document.getElementById('res-render-section');
      const renderImg = document.getElementById('res-render-img');
      const renderBadge = document.getElementById('res-render-badge');
      const renderNote = document.getElementById('res-render-note');
      if (renderSec && renderImg && data.image) {
        renderSec.classList.remove('hidden');
        renderImg.src = data.image;
        if (renderNote) renderNote.style.display = 'none';
        if (data.image_source === 'imagen_3') {
          if (renderBadge) renderBadge.textContent = '● LIVE GEMINI IMAGEN 3 RENDER';
        } else {
          if (renderBadge) renderBadge.textContent = '● ARCHITECTURAL RENDER PREVIEW';
        }
      } else if (renderSec) {
        renderSec.classList.add('hidden');
      }
    }
  }
}
