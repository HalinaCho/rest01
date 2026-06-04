// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

navToggle?.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const icon = navToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    const icon = navToggle.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  });
});

// ===== HERO: PARTICLE CANVAS =====
(function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'heroCanvas';
  canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
  document.querySelector('.hero').prepend(canvas);

  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function randomBetween(a, b) { return a + (b - a) * Math.random(); }

  function createParticle() {
    return {
      x: randomBetween(0, W),
      y: randomBetween(0, H),
      r: randomBetween(1, 2.5),
      dx: randomBetween(-0.4, 0.4),
      dy: randomBetween(-0.5, -0.1),
      alpha: randomBetween(0.2, 0.6),
    };
  }

  for (let i = 0; i < 80; i++) particles.push(createParticle());

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.y < -5) { p.y = H + 5; p.x = randomBetween(0, W); }
      if (p.x < -5) p.x = W + 5;
      if (p.x > W + 5) p.x = -5;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ===== HERO: ENTRANCE ANIMATION =====
(function heroEntrance() {
  const items = [
    document.querySelector('.hero-photo'),
    document.querySelector('.hero-greeting'),
    document.querySelector('.hero-name'),
    document.querySelector('.hero-title'),
    document.querySelector('.hero-desc'),
    document.querySelector('.hero-buttons'),
  ];

  items.forEach(el => {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  });

  items.forEach((el, i) => {
    if (!el) return;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200 + i * 150);
  });
})();

// ===== HERO: TYPEWRITER EFFECT =====
(function typewriter() {
  const el = document.querySelector('.hero-title');
  if (!el) return;

  const texts = [
    'Medical Device Marketing & Sales Professional',
    'Marketing Product Manager',
    'Sales Account Manager',
  ];

  let ti = 0, ci = 0, deleting = false;
  const SPEED_TYPE = 55, SPEED_DELETE = 30, PAUSE = 2200;

  // 파티클·등장 애니메이션 끝난 후 시작
  setTimeout(() => {
    el.textContent = '';
    el.style.borderRight = '2px solid rgba(255,255,255,0.7)';
    el.style.paddingRight = '4px';
    tick();
  }, 1400);

  function tick() {
    const full = texts[ti];
    if (deleting) {
      el.textContent = full.slice(0, ci--);
      if (ci < 0) {
        deleting = false;
        ti = (ti + 1) % texts.length;
        ci = 0;
        setTimeout(tick, 400);
      } else {
        setTimeout(tick, SPEED_DELETE);
      }
    } else {
      el.textContent = full.slice(0, ci++);
      if (ci > full.length) {
        deleting = true;
        setTimeout(tick, PAUSE);
      } else {
        setTimeout(tick, SPEED_TYPE);
      }
    }
  }
})();

// ===== HERO: PHOTO FLOAT =====
(function photoFloat() {
  const photo = document.querySelector('.hero-photo');
  if (!photo) return;
  photo.style.animation = 'heroFloat 4s ease-in-out infinite';
})();

// ===== SKILL BARS ANIMATION =====
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(el => skillObserver.observe(el));

// ===== FADE IN ANIMATION =====
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.timeline-content, .project-card, .skill-category, .about-photo, .about-info').forEach(el => {
  el.classList.add('fade-in');
  fadeObserver.observe(el);
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--primary)';
    }
  });
});

// ===== CONTACT FORM =====
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('메시지가 전송되었습니다! (실제 전송 기능은 백엔드 연동이 필요합니다)');
  e.target.reset();
});
