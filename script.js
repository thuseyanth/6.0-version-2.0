// ========== PRELOADER ==========
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
    }, 1800);
  }
});

// ========== SCROLL REVEAL (Intersection Observer) ==========
const revealElements = document.querySelectorAll('.fade-up, .fade-right, .fade-left');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ========== COUNTER ANIMATION ==========
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.getAttribute('data-target'));
      let current = 0;
      const increment = target / 60;
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.innerText = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target;
        }
      };
      updateCounter();
      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ========== ACTIVE NAV LINK ON SCROLL ==========
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ========== MOBILE MENU TOGGLE ==========
const mobileIcon = document.getElementById('mobileMenuIcon');
const navLinksContainer = document.querySelector('.nav-links');

if (mobileIcon) {
  mobileIcon.addEventListener('click', () => {
    if (navLinksContainer.style.display === 'flex') {
      navLinksContainer.style.display = 'none';
    } else {
      navLinksContainer.style.display = 'flex';
      navLinksContainer.style.flexDirection = 'column';
      navLinksContainer.style.position = 'absolute';
      navLinksContainer.style.top = '70px';
      navLinksContainer.style.left = '0';
      navLinksContainer.style.width = '100%';
      navLinksContainer.style.background = 'rgba(255,255,255,0.98)';
      navLinksContainer.style.padding = '2rem';
      navLinksContainer.style.gap = '1.5rem';
      navLinksContainer.style.boxShadow = '0 20px 35px -12px rgba(0,0,0,0.15)';
      navLinksContainer.style.zIndex = '99';
      navLinksContainer.style.backdropFilter = 'blur(12px)';
    }
  });
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('.nav-link, #contactScrollBtn').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (window.innerWidth < 860 && navLinksContainer.style.display === 'flex') {
        navLinksContainer.style.display = 'none';
      }
    }
  });
});

// ========== TOAST NOTIFICATION ==========
const toast = document.getElementById('toastMsg');

function showToast(message, isError = false) {
  toast.innerHTML = message;
  toast.style.opacity = '1';
  toast.style.background = isError ? '#c0392b' : '#004e7c';
  setTimeout(() => {
    toast.style.opacity = '0';
  }, 3000);
}

// ========== DISCOVER BUTTON ==========
const discoverBtn = document.getElementById('discoverBtn');
if (discoverBtn) {
  discoverBtn.addEventListener('click', () => {
    showToast('📘 BOSS product catalog & brochure → request sent successfully.');
  });
}

// ========== CONTACT FORM HANDLER ==========
const contactForm = document.getElementById('bossContactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if (!name || !email || !email.includes('@')) {
      showToast('⚠️ Please provide full name and valid business email.', true);
      return;
    }
    
    showToast('✅ Inquiry received! BOSS chemical expert will respond within 12 hours.');
    contactForm.reset();
  });
}

// ========== MAGNETIC BUTTON EFFECT ==========
const magneticBtn = document.querySelector('.magnetic-btn');
if (magneticBtn) {
  magneticBtn.addEventListener('mousemove', (e) => {
    const rect = magneticBtn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    magneticBtn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });
  magneticBtn.addEventListener('mouseleave', () => {
    magneticBtn.style.transform = 'translate(0, 0)';
  });
}

// ========== DYNAMIC FOOTER YEAR ==========
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
  const year = new Date().getFullYear();
  footerYear.innerHTML = `© ${year} BOSS Chemicals. All rights reserved. | Smart Chemistry for a Cleaner Future`;
}

// ========== RIPPLE EFFECT ==========
const buttons = document.querySelectorAll('.btn-primary, .btn-outline');
buttons.forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// ========== TILT EFFECT ON CARDS ==========
const cards = document.querySelectorAll('[data-tilt]');
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ========== BACKGROUND PARTICLE GENERATOR ==========
function createParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  for (let i = 0; i < 40; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.position = 'absolute';
    particle.style.width = '3px';
    particle.style.height = '3px';
    particle.style.background = 'rgba(0,159,107,0.4)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.pointerEvents = 'none';
    particle.style.animation = `particleFloat ${5 + Math.random() * 12}s infinite ease-in-out`;
    particle.style.animationDelay = Math.random() * 5 + 's';
    hero.appendChild(particle);
  }
}
createParticles();

// Add particle animation style if not exists
if (!document.querySelector('#particle-style')) {
  const particleStyle = document.createElement('style');
  particleStyle.id = 'particle-style';
  particleStyle.textContent = `
    @keyframes particleFloat {
      0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
      50% { transform: translateY(-40px) translateX(20px); opacity: 0.6; }
    }
  `;
  document.head.appendChild(particleStyle);
}

// ========== VIDEO LOADING FALLBACK ==========
const videos = document.querySelectorAll('video');
videos.forEach(video => {
  video.addEventListener('error', () => {
    console.log('Video failed to load, using fallback');
    video.style.display = 'none';
  });
});