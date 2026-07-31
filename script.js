// Typewriter effect for the hero "say" value
const typedEl = document.getElementById('typed');
const phrases = ["Hello, world!", "Let's build something.", "Open to work."];
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];

  if (!deleting) {
    typedEl.textContent = '"' + current.slice(0, charIndex + 1) + '"';
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    typedEl.textContent = '"' + current.slice(0, charIndex - 1) + '"';
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeLoop, deleting ? 40 : 80);
}

if (typedEl) typeLoop();

// Tab navigation: smooth scroll + active state on scroll
const tabs = document.querySelectorAll('.tab');
const sections = [...tabs].map(tab => document.getElementById(tab.dataset.target));

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.getElementById(tab.dataset.target);
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      tabs.forEach(t => t.classList.remove('active'));
      const activeTab = [...tabs].find(t => t.dataset.target === entry.target.id);
      if (activeTab) activeTab.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => { if (section) observer.observe(section); });

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
