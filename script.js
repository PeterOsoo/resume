/* ═══════════════════════════════════════════
   MACLEAN BEAUTY BAR & NAILS — SCRIPT.JS
═══════════════════════════════════════════ */

const WA_NUMBER = '254708645328';

/* ── WhatsApp handler ────────────────────────
   Every .wa-order element opens WhatsApp
   with its data-msg pre-filled
─────────────────────────────────────────── */
function initWhatsApp() {
  document.querySelectorAll('.wa-order').forEach(el => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      const msg = encodeURIComponent(
        this.dataset.msg || "Hi Maclean Beauty Bar! I'd like to book an appointment 💅"
      );
      window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
    });
  });
}

/* ── Scroll reveal ───────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal-up, .reveal-fade');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

/* ── Nav scroll shrink ───────────────────── */
function initNavScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ── Mobile hamburger ────────────────────── */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ── Stagger service cards on reveal ────── */
function initServiceStagger() {
  const cards = document.querySelectorAll('.svc-card');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }, i * 60);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.05 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    obs.observe(card);
  });
}

/* ── Init ────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initWhatsApp();
  initReveal();
  initNavScroll();
  initMobileMenu();
  initServiceStagger();
});