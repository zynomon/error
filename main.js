// Matrix Glitch Panic Splash Screen
window.addEventListener("DOMContentLoaded", () => {
  const splashScreen = document.getElementById("splash-screen");
  const matrixRain = document.querySelector(".matrix-rain");

  if (matrixRain) {
    // Create canvas for Matrix effect
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    matrixRain.appendChild(canvas);

    // Matrix characters
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()ERROR!PANIC!FATAL!KERNEL!0x";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    // Draw Matrix rain
    function drawMatrix() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Random color shift for panic effect
        if (Math.random() > 0.95) {
          ctx.fillStyle = "#F00";
        } else if (Math.random() > 0.98) {
          ctx.fillStyle = "#FF0";
        } else {
          ctx.fillStyle = "#0F0";
        }

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    // Animate Matrix rain
    const matrixInterval = setInterval(drawMatrix, 50);

    // Stop animation and remove splash after delay
    setTimeout(() => {
      clearInterval(matrixInterval);
    }, 2800);
  }

  // Remove splash screen after animation
  setTimeout(() => {
    if (splashScreen) {
      splashScreen.remove();
    }
  }, 3200);
});

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
