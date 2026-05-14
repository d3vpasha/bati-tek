/* =============================================
   BATI-TEK — Scripts principaux
   ============================================= */

// ---- Navbar scroll effect ----
const header = document.getElementById('header');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  if (scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  if (scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

// ---- Burger menu ----
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu when clicking a link
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!header.contains(e.target)) {
    burger.classList.remove('active');
    navLinks.classList.remove('open');
  }
});

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link[href^="#"]');

const observerOptions = { rootMargin: '-50% 0px -50% 0px' };

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, observerOptions);

sections.forEach(s => sectionObserver.observe(s));

// ---- Fade-in on scroll ----
const fadeEls = document.querySelectorAll(
  '.service-card, .realisation-card, .temoignage-card, .stat-item, .valeur, .contact-item'
);

fadeEls.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => fadeObserver.observe(el));

// ---- Animated counters ----
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      const match = text.match(/(\+?)(\d+)(%?)/);
      if (match) {
        const prefix = match[1] || '';
        const target = parseInt(match[2]);
        const suffix = match[3] || '';
        let start = 0;
        const duration = 1800;
        const step = Math.ceil(target / (duration / 16));
        const interval = setInterval(() => {
          start = Math.min(start + step, target);
          el.textContent = `${prefix}${start}${suffix}`;
          if (start >= target) clearInterval(interval);
        }, 16);
      }
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

// ---- Contact form ----
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Envoi en cours...';

  // Simulate send (replace with real backend/EmailJS call)
  setTimeout(() => {
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Envoyer ma demande';
    btn.disabled = false;
    formSuccess.classList.add('show');
    form.reset();
    setTimeout(() => formSuccess.classList.remove('show'), 6000);
  }, 1200);
});

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
