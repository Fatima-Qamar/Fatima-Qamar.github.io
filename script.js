/* ==========================================================================
   Fatima Qamar — Cyberpunk HUD Interactive Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const scrollProgress = document.getElementById('scrollProgress');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinksContainer = document.getElementById('navLinksContainer');
  const filterBtns = document.querySelectorAll('.filter-btn-cyber');
  const projectCards = document.querySelectorAll('.project-card-wrapper');
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMsg');
  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBody = document.getElementById('modalBody');
  const sideTabBtn = document.getElementById('sideTabBtn');

  // 1. Scroll Progress Bar
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }
  });

  // 2. Navigation Scroll Highlight
  const sections = document.querySelectorAll('section[id]');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-20% 0px -60% 0px' });

  sections.forEach(section => sectionObserver.observe(section));

  // 3. Mobile Navigation Toggle
  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      const isHidden = navLinksContainer.style.display === 'none' || navLinksContainer.style.display === '';
      navLinksContainer.style.display = isHidden ? 'flex' : 'none';
      if (isHidden) {
        navLinksContainer.style.flexDirection = 'column';
        navLinksContainer.style.position = 'absolute';
        navLinksContainer.style.top = '100%';
        navLinksContainer.style.left = '0';
        navLinksContainer.style.right = '0';
        navLinksContainer.style.background = '#0e111a';
        navLinksContainer.style.padding = '1rem';
        navLinksContainer.style.borderBottom = '1px solid var(--accent-red)';
      }
    });
  }

  // 4. Project Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Modal Deep-Dive Window
  const projectDetails = {
    'coolcity': {
      title: 'COOLCITY AI // URBAN HEAT INTERVENTION PLANNER',
      focus: 'AI • DATA ANALYSIS • SMART CITIES • CLIMATE TECH',
      role: 'TEAM LEAD & DEVELOPER (FORTYGUARD HACKATHON \'26)',
      text: 'Developed from concept to functional prototype in hackathon constraints. Utilized AI-assisted rapid development for risk modeling and targeted greening intervention mapping.'
    },
    'cropdisease': {
      title: 'AI CROP DISEASE DETECTION // COMPUTER VISION SYSTEM',
      focus: 'AI • COMPUTER VISION • IMAGE ANALYSIS • AGRICULTURE',
      role: 'DEVELOPER (UNDERGRAD AI PROJECT)',
      text: 'Currently developing lightweight CNN models trained on leaf pathology datasets to support agricultural decision-making and early crop disease diagnosis.'
    },
    'fixora': {
      title: 'FIXORA // AI-POWERED HOME SERVICES MARKETPLACE',
      focus: 'AI • PRODUCT DEV • MARKETPLACE • ENTREPRENEURSHIP',
      role: 'FOUNDER & CEO',
      text: 'Leading Fixora product planning, AI-assisted platform architecture, and intelligent service-matching workflows connecting homeowners with service providers.',
      github: 'https://github.com/Fatima-Qamar/FIXORA'
    },
    'skillmatch': {
      title: 'SKILLMATCH AI // CAREER & SKILL GAP PLATFORM',
      focus: 'REACT.JS • JAVASCRIPT • REST APIs • AI INTEGRATION',
      role: 'DEVELOPER',
      text: 'Built an AI-powered career guidance platform with skill scoring and personalized career-path recommendations via REST APIs.'
    },
    'smartspend': {
      title: 'SMARTSPEND AI // PERSONAL FINANCE ANALYZER',
      focus: 'REACT.JS • JAVASCRIPT • REST APIs • AI INTEGRATION',
      role: 'DEVELOPER',
      text: 'Built an AI-powered personal finance web app with budget tracking and AI-driven saving recommendations connected via REST APIs.'
    }
  };

  document.querySelectorAll('.btn-detail-cyber').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      const data = projectDetails[key];
      if (data && modalBody && modalOverlay) {
        modalBody.innerHTML = `
          <div style="font-size: 0.75rem; color: var(--accent-red); font-weight: 800;">// PROJECT SPECS DATA</div>
          <h3 style="font-family: var(--font-title); font-size: 1.4rem; font-weight: 900; color: #fff; margin: 0.4rem 0;">${data.title}</h3>
          <div style="font-size: 0.8rem; color: var(--accent-green); font-weight: bold; margin-bottom: 0.8rem;">${data.role}</div>
          <div style="font-size: 0.75rem; color: var(--text-dim); margin-bottom: 1rem;">FOCUS: ${data.focus}</div>
          <p style="font-size: 0.88rem; color: var(--text-code); line-height: 1.6;">${data.text}</p>
          ${data.github ? `<div style="margin-top: 1.2rem;"><a href="${data.github}" target="_blank" rel="noopener" class="cyber-btn btn-cyber-dark" style="padding: 0.4rem 0.8rem; font-size: 0.75rem; display: inline-block;">VIEW ON GITHUB ↗</a></div>` : ''}
        `;
        modalOverlay.classList.add('active');
      }
    });
  });

  if (modalCloseBtn && modalOverlay) {
    modalCloseBtn.addEventListener('click', () => modalOverlay.classList.remove('active'));
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('active');
    });
  }

  // 6. Copy Email
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('7atima.qamar@gmail.com').then(() => {
        showToast('Email address copied to clipboard!');
      });
    });
  }

  // 7. Contact Form
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Transmission received! Thank you.');
      contactForm.reset();
    });
  }

  // 8. Side Tab Action
  if (sideTabBtn) {
    sideTabBtn.addEventListener('click', () => {
      showToast('Fatima Qamar — AI Researcher & Developer Portfolio loaded.');
    });
  }

  // 9. Dynamic Interactive Cursor Light & Spotlight Effect
  const cursorLight = document.getElementById('cursorLight');
  const cursorDot = document.getElementById('cursorDot');

  if (cursorLight && cursorDot && window.innerWidth > 992) {
    document.addEventListener('mousemove', (e) => {
      const x = e.clientX;
      const y = e.clientY;
      
      cursorLight.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      cursorDot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    });

    document.addEventListener('mouseleave', () => {
      cursorLight.style.opacity = '0';
      cursorDot.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      cursorLight.style.opacity = '1';
      cursorDot.style.opacity = '1';
    });
  }

  // 10. Dynamic 3D Card Interactive Tilt Effect
  const tiltCards = document.querySelectorAll('.cyber-card, .project-card-cyber, .interest-box-cyber');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale3d(1.01, 1.01, 1.01)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)';
    });
  });

  function showToast(msg) {
    if (toast && toastMsg) {
      toastMsg.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3500);
    }
  }
});
// Final Release
