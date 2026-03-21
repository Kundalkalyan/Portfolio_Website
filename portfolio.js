// ============================================
//   KUNDAL KALYAN BORUAH — Portfolio Scripts
// ============================================

document.addEventListener("DOMContentLoaded", () => {

  // ── THEME TOGGLE (FIXED) ──
  const btn = document.getElementById("theme-toggle-btn");

  if (btn) {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      btn.textContent = "☀️";
    } else {
      document.body.classList.remove("dark");
      btn.textContent = "🌙";
    }

    btn.addEventListener("click", () => {
      document.body.classList.toggle("dark");

      if (document.body.classList.contains("dark")) {
        btn.textContent = "☀️";
        localStorage.setItem("theme", "dark");
      } else {
        btn.textContent = "🌙";
        localStorage.setItem("theme", "light");
      }
    });
  }

  // ── NAVBAR SCROLL EFFECT ──
  const nav = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.padding = '0.7rem 4rem';
      nav.style.borderBottomColor = 'var(--border)';
    } else {
      nav.style.padding = '1.1rem 4rem';
      nav.style.borderBottomColor = 'var(--border)';
    }
  });

  // ── ACTIVE NAV LINK ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // Active style FIXED
  const activeStyle = document.createElement('style');
  activeStyle.textContent = `
    .nav-links a.active { color: var(--accent-primary); }
    .nav-links a.active::after { transform: scaleX(1); }
  `;
  document.head.appendChild(activeStyle);

  // ── SCROLL REVEAL ──
  const revealElements = document.querySelectorAll(
    '.project-card, .exp-card, .about-content, .contact-links, .skills-list'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // ── TYPEWRITER EFFECT ──
  const welcomeText = "Hi, I'm Kundal — building scalable web apps and exploring the frontiers of AI & Machine Learning.";
  const welcomePara = document.querySelector('.welcome-message p');

  if (welcomePara) {
    welcomePara.textContent = '';

    let index = 0;

    function type() {
      if (index < welcomeText.length) {
        welcomePara.textContent += welcomeText.charAt(index);
        index++;
        setTimeout(type, 35);
      }
    }

    setTimeout(type, 700);
  }

  // ── SMOOTH SCROLL ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  

  // ── PROJECT TILT EFFECT ──
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      const rotateX = ((y - cy) / cy) * -6;
      const rotateY = ((x - cx) / cx) * 6;

      card.style.transform =
        `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform =
        'perspective(600px) rotateX(0) rotateY(0) translateY(0)';
      card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });

  // ── COPY EMAIL ──
  const emailBtn = document.querySelector('a[href^="mailto"]');

  if (emailBtn) {
    const originalText = emailBtn.textContent;

    emailBtn.addEventListener('click', (e) => {
      const email = emailBtn.getAttribute('href').replace('mailto:', '');

      if (navigator.clipboard) {
        e.preventDefault();
        navigator.clipboard.writeText(email).then(() => {
          emailBtn.textContent = 'Copied!';
          setTimeout(() => {
            emailBtn.textContent = originalText;
          }, 2000);
        });
      }
    });
  }

  // ── CONSOLE EASTER EGG ──
  console.log('%c Hey there! 👋', 'color: #6366f1; font-size: 1.2rem; font-weight: bold;');
  console.log('%c Built by Kundal Kalyan Boruah', 'color: #a855f7;');
});