/* =========================================================================
   NAVBAR CONTROLLER MODULE
   Mobile full-screen overlay toggle, sliding active glider, scroll spy
   ========================================================================= */

export function toggleNavMobileMenu(open) {
  const overlay = document.getElementById('mobileNavOverlay');
  const backdrop = document.getElementById('curvedMenuBackdrop');
  const curvePath = document.getElementById('curvedSvgPath');
  if (!overlay) return;

  const h = window.innerHeight || 800;

  if (open) {
    if (backdrop) backdrop.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Morph curve: initial outward organic bulge -> settled curve
    if (curvePath) {
      curvePath.setAttribute('d', `M100 0 L100 ${h} Q -80 ${h / 2} 100 0`);
      setTimeout(() => {
        curvePath.setAttribute('d', `M100 0 L100 ${h} Q 100 ${h / 2} 100 0`);
      }, 350);
    }
  } else {
    // Morph curve when pulling back
    if (curvePath) {
      curvePath.setAttribute('d', `M100 0 L100 ${h} Q -60 ${h / 2} 100 0`);
    }
    if (backdrop) backdrop.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

export function handleMobileNavClick(e, targetHref) {
  toggleNavMobileMenu(false);
  if (targetHref && targetHref.startsWith('#')) {
    const targetEl = document.querySelector(targetHref);
    if (targetEl) {
      e.preventDefault();
      if (window.setActiveNavLink) {
        window.setActiveNavLink(targetHref);
      }
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

const MOBILE_NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Venue', href: '#venue' },
  { label: 'FAQ', href: '#faq' }
];

function updateCurveHeight() {
  const svg = document.querySelector('.curved-svg-edge');
  const path = document.getElementById('curvedSvgPath');
  if (!svg || !path) return;
  const h = window.innerHeight || 800;
  svg.setAttribute('viewBox', `0 0 100 ${h}`);
  path.setAttribute('d', `M100 0 L100 ${h} Q 100 ${h / 2} 100 0`);
}
window.addEventListener('resize', updateCurveHeight);

export function initNavbar() {
  const navbar = document.getElementById('globalNavbar');
  const navContainer = document.getElementById('mainNavLinks');
  const glider = document.getElementById('navActiveGlider');
  const desktopLinks = document.querySelectorAll('.nav-link');

  let isProgrammaticScroll = false;
  let scrollTimeout = null;

  updateCurveHeight();

  // Function to move the floating glider under a specific link element
  function moveGliderTo(link) {
    if (!glider || !navContainer || !link) return;
    const containerRect = navContainer.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const left = linkRect.left - containerRect.left;
    const width = linkRect.width;

    glider.style.width = `${width}px`;
    glider.style.transform = `translateX(${left}px)`;
    glider.style.opacity = '1';
  }

  // Set active link on both desktop and mobile
  function setActiveNavLink(targetHref) {
    desktopLinks.forEach(link => {
      const match = link.getAttribute('href') === targetHref;
      link.classList.toggle('active', match);
      if (match) {
        moveGliderTo(link);
      }
    });

    const mobileIdx = MOBILE_NAV_ITEMS.findIndex(item => item.href === targetHref);
    if (mobileIdx !== -1) {
      activeSidebarIndex = mobileIdx;
      startLoop();
    }
  }

  window.setActiveNavLink = setActiveNavLink;

  // Handle desktop nav link clicks
  desktopLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          isProgrammaticScroll = true;
          setActiveNavLink(href);

          targetEl.scrollIntoView({ behavior: 'smooth' });

          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            isProgrammaticScroll = false;
          }, 800);
        }
      }
    });
  });

  // Track sections for scroll-spy
  const observedSections = [
    document.getElementById('home'),
    document.getElementById('about'),
    document.getElementById('events'),
    document.getElementById('venue'),
    document.getElementById('faq')
  ].filter(Boolean);

  function onScroll() {
    const scrollY = window.scrollY;

    // Sticky navbar shadow elevation
    if (navbar) {
      if (scrollY > 20) {
        navbar.style.background = 'rgba(2, 4, 9, 0.92)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.85)';
      } else {
        navbar.style.background = 'rgba(4, 7, 18, 0.78)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.7)';
      }
    }

    if (isProgrammaticScroll) return;

    // Determine currently visible section
    const viewportOffset = window.innerHeight * 0.35;
    let currentId = null;

    for (let i = observedSections.length - 1; i >= 0; i--) {
      const sec = observedSections[i];
      const rect = sec.getBoundingClientRect();
      if (rect.top <= viewportOffset && rect.bottom > 0) {
        currentId = '#' + sec.id;
        break;
      }
    }

    if (!currentId && observedSections.length > 0) {
      currentId = '#' + observedSections[0].id;
    }

    if (currentId) {
      const currentActive = document.querySelector('.nav-link.active');
      if (!currentActive || currentActive.getAttribute('href') !== currentId) {
        setActiveNavLink(currentId);
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  window.addEventListener('resize', () => {
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) moveGliderTo(activeLink);
  });

  // Expose global helpers
  window.toggleNavMobileMenu = toggleNavMobileMenu;
  window.handleMobileNavClick = handleMobileNavClick;

  // Initialize glider position
  setTimeout(() => {
    const hash = window.location.hash || '#home';
    const initialLink = document.querySelector(`.nav-link[href="${hash}"]`) || document.querySelector('.nav-link.active') || desktopLinks[0];
    if (initialLink) {
      setActiveNavLink(initialLink.getAttribute('href'));
    }
  }, 120);
}
