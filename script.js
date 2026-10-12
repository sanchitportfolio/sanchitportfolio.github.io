document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      const target = targetId && targetId.startsWith('#') ? document.querySelector(targetId) : null;

      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const yearNode = document.getElementById('year');
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const revealItems = document.querySelectorAll('.reveal');
  const sections = document.querySelectorAll('main section[id]');

  const setActiveNav = () => {
    const offset = window.scrollY + 140;
    let currentId = 'about';

    sections.forEach((section) => {
      if (offset >= section.offsetTop) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      const isActive = href === `#${currentId}`;
      link.classList.toggle('active', isActive);
    });
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  setActiveNav();
  window.addEventListener('scroll', setActiveNav, { passive: true });
});
