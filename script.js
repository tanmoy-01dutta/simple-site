// ==========================================================================
// Tanmoy Dutta — Portfolio
// Small, dependency-free interactions: mobile nav, scroll-based active link,
// scroll reveal, a light typing accent in the hero, and a mailto contact form.
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initActiveNavOnScroll();
  initScrollReveal();
  initHeroTyping();
  initContactForm();
  initFooterYear();
});

/* ---------------------------------- mobile nav ---------------------------------- */

function initMobileNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // close the menu after choosing a link (mobile)
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------------------------------- active nav link on scroll ---------------------------------- */

function initActiveNavOnScroll() {
  const links = Array.from(document.querySelectorAll("[data-nav]"));
  if (!links.length) return;

  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        links.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === id);
        });
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------------------------------- scroll reveal ---------------------------------- */

function initScrollReveal() {
  const targets = document.querySelectorAll(
    ".section-head, .about-text, .about-facts, .ledger-table, .skill-card, .contact-card, .hint"
  );

  targets.forEach((el) => el.classList.add("reveal"));

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ---------------------------------- hero role typing accent ---------------------------------- */

function initHeroTyping() {
  const roleEl = document.querySelector(".hero-role");
  const cursor = document.getElementById("typeCursor");
  if (!roleEl || !cursor) return;

  const roles = [
    "Higher Secondary graduate (Commerce)",
    "Based in Howrah, West Bengal",
    "Ready for my first opportunity",
  ];

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return; // keep the static first line

  const textNodeHolder = document.createElement("span");
  roleEl.insertBefore(textNodeHolder, cursor);

  let roleIndex = 0;
  let charIndex = roles[0].length;
  let deleting = false;

  textNodeHolder.textContent = roles[0];

  function tick() {
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      if (charIndex > current.length) {
        deleting = true;
        setTimeout(tick, 1400); // pause on full text
        return;
      }
    } else {
      charIndex--;
      if (charIndex < 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        charIndex = 0;
        setTimeout(tick, 300);
        return;
      }
    }

    textNodeHolder.textContent = roles[roleIndex].slice(0, charIndex);
    setTimeout(tick, deleting ? 35 : 55);
  }

  setTimeout(tick, 1600);
}

/* ---------------------------------- contact form ---------------------------------- */

function initContactForm() {
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  if (!form || !note) return;

  const RECIPIENT = "duttatanmoy512@gmail.com";

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      note.textContent = "Please fill in every field before sending.";
      note.style.color = "#A03B2A";
      return;
    }

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${RECIPIENT}?subject=${subject}&body=${body}`;

    note.textContent = "Opening your email app to send this message...";
    note.style.color = "#1F5C52";
    form.reset();
  });
}

/* ---------------------------------- footer year ---------------------------------- */

function initFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
