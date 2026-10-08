(() => {
  'use strict';
  const config = window.SORIDENTS || {};
  document.querySelectorAll('[data-photo]').forEach(img => { if (config.photos?.[img.dataset.photo]) img.src = config.photos[img.dataset.photo]; });
  document.querySelector('#year').textContent = new Date().getFullYear();
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    document.documentElement.classList.add('motion-ready');
  }
  const menu = document.querySelector('.menu-toggle'), nav = document.querySelector('#navigation');
  function closeMenu() { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Abrir menu'); nav.classList.remove('open'); }
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); nav.classList.toggle('open', open); });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); } });
  const contact = document.querySelector('#contact-dialog'), number = String(config.whatsapp || '').replace(/\D/g, '');
  document.querySelectorAll('[data-contact]').forEach(link => {
    if (/^\d{10,15}$/.test(number)) { const message = (config.message || '') + (link.dataset.treatment ? ' Tenho interesse em ' + link.dataset.treatment + '.' : ''); link.href = 'https://wa.me/' + number + '?text=' + encodeURIComponent(message); link.target = '_blank'; link.rel = 'noopener noreferrer'; }
    else link.addEventListener('click', e => { e.preventDefault(); contact.showModal(); });
  });
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.querySelectorAll('.dialog-close,.dialog-done').forEach(button => button.addEventListener('click', () => dialog.close()));
    dialog.addEventListener('click', e => { const r = dialog.getBoundingClientRect(); if (e.target === dialog && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) dialog.close(); });
  });
  document.querySelector('[data-credits]').addEventListener('click', () => document.querySelector('#credits-dialog').showModal());
  document.querySelector('.motion-toggle').addEventListener('click', e => { const paused = document.documentElement.classList.toggle('motion-paused'); e.currentTarget.setAttribute('aria-pressed', String(paused)); e.currentTarget.setAttribute('aria-label', paused ? 'Retomar animações' : 'Pausar animações'); e.currentTarget.textContent = paused ? '▷' : 'Ⅱ'; });
})();
