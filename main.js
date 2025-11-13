VANTA.CELLS({
  el: "#vanta-bg",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.0,
  minWidth: 200.0,
  scale: 1.0,
  scaleMobile: 3.0,
  backgroundColor: 0xd8d8cf,
  color1: 0x2f2f2f,
  color2: 0x353541,
  amplitudeFactor: 1.0,
  ringFactor: 1.0,
  rotationFactor: 1.0,
  speed: 1.0,
  size: 1.5,
});

window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY > 20) {
      document.body.classList.add("scrolled");
    } else {
      document.body.classList.remove("scrolled");
    }
  },
  { passive: true },
);

const topMenuBtn = document.getElementById("top-menu-btn");
const topMenu = document.getElementById("top-menu");

topMenuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  topMenu.classList.toggle("show");
});

document.addEventListener("click", (e) => {
  if (!topMenu.contains(e.target) && e.target !== topMenuBtn) {
    topMenu.classList.remove("show");
  }
});

const tracker = document.getElementById("tracker");
const hoverTargets = document.querySelectorAll(
  ".hover-target, button, a, .download-card, .more-options-btn, .top-menu-btn",
);
let mouseX = 0,
  mouseY = 0;
let trackerX = 0,
  trackerY = 0;
let isDesktop = window.innerWidth >= 768;

if (isDesktop) {
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateTracker() {
    trackerX += (mouseX - trackerX) * 0.15;
    trackerY += (mouseY - trackerY) * 0.15;
    tracker.style.left = `${trackerX}px`;
    tracker.style.top = `${trackerY}px`;
    requestAnimationFrame(animateTracker);
  }
  animateTracker();

  hoverTargets.forEach((target) => {
    target.addEventListener("mouseenter", () => {
      tracker.classList.add("hover");
    });
    target.addEventListener("mouseleave", () => {
      tracker.classList.remove("hover");
    });
  });

  document.addEventListener("mouseleave", () => {
    if (tracker) tracker.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    if (tracker) tracker.style.opacity = "1";
  });
}

const cards = document.querySelectorAll("[data-card]");
cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    if (!isDesktop) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mouse-x", `${x}%`);
    card.style.setProperty("--mouse-y", `${y}%`);
  });
});

window.addEventListener("resize", () => {
  const newIsDesktop = window.innerWidth >= 768;
  if (newIsDesktop !== isDesktop) {
    isDesktop = newIsDesktop;
    if (tracker) {
      tracker.style.display = isDesktop ? "block" : "none";
    }
  }
});
