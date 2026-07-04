
(() => {
  const body = document.body;
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const panel = document.querySelector('[data-mobile-panel]');

  const onScroll = () => {
    if (window.scrollY > 10) header?.classList.add('is-scrolled');
    else header?.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  toggle?.addEventListener('click', () => {
    const open = body.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  panel?.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      body.classList.remove('menu-open');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      if (form.dataset.ready !== 'true') {
        event.preventDefault();
        const note = form.querySelector('[data-form-note]');
        if (note) note.textContent = 'Forma je vizualno spremna. Prije objave povežite slanje na e-mail ili Web3Forms.';
      }
    });
  }

  const entryIntro = document.querySelector('[data-entry-intro]');
  if (entryIntro) {
    const removeEntry = () => {
      entryIntro.setAttribute('aria-hidden', 'true');
      setTimeout(() => entryIntro.remove(), 450);
    };
    window.addEventListener('load', () => setTimeout(removeEntry, 3300), { once: true });
    setTimeout(removeEntry, 4300);
  }

})();
