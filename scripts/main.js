const svg = document.getElementById('stitch-rail');
const path = document.getElementById('stitch-path');

if (svg && path) {
  function buildPath() {
    const w = window.innerWidth;
    const h = document.documentElement.scrollHeight;

    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.setAttribute('width', String(w));
    svg.setAttribute('height', String(h));

    const x = w > 820 ? 28 : 10;
    const d = `M ${x} 0 L ${x} ${h}`;
    path.setAttribute('d', d);
    path.dataset.len = String(h);
    updateStitch();
  }

  function updateStitch() {
    const len = parseFloat(path.dataset.len || '0');
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
    const drawn = len * progress;
    path.style.strokeDasharray = `${drawn} ${len}`;
  }

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateStitch();
        ticking = false;
      });
      ticking = true;
    }
  });

  window.addEventListener('resize', buildPath);
  window.addEventListener('load', buildPath);
}

(function () {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');

  if (!toggle || !nav) {
    return;
  }

  function closeNav() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) {
      closeNav();
    }
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 760) {
        closeNav();
      }
    });
  });
})();
