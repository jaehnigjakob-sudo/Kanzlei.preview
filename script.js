'use strict';
document.documentElement.classList.add('js');
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
if (toggle && navigation) {
  toggle.hidden = false;
  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    toggle.querySelector('span').textContent = '+';
  }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
    toggle.querySelector('span').textContent = open ? '−' : '+';
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });
}

const intro = document.querySelector('.brand-intro');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
if (intro) {
  let framePending = false;
  function updateIntroFade() {
    const distance = Math.max(intro.offsetHeight * 0.75, 1);
    const progress = motionPreference.matches ? 0 : Math.min(1, Math.max(0, window.scrollY / distance));
    intro.style.setProperty('--intro-opacity', String(1 - progress));
    framePending = false;
  }
  function requestIntroFrame() {
    if (!framePending) {
      framePending = true;
      window.requestAnimationFrame(updateIntroFade);
    }
  }
  window.addEventListener('scroll', requestIntroFrame, { passive: true });
  window.addEventListener('resize', requestIntroFrame);
  motionPreference.addEventListener('change', requestIntroFrame);
  updateIntroFade();
}
