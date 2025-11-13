// Matrix Glitch Panic Splash Screen
document.addEventListener("DOMContentLoaded", function () {
  const splashScreen = document.getElementById("splash-screen");
  const matrixRain = document.querySelector(".matrix-rain");

  if (splashScreen && matrixRain) {
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

    // Matrix characters - error messages
    const chars = "ERROR!PANIC!FATAL!KERNEL!0x8000ABORT!01";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];

    // Initialize drops at random positions
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -50);
    }

    // Draw Matrix rain animation
    function drawMatrix() {
      // Fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Random color for panic effect
        if (Math.random() > 0.98) {
          ctx.fillStyle = "#F00"; // Red for errors
        } else if (Math.random() > 0.96) {
          ctx.fillStyle = "#FF0"; // Yellow for warnings
        } else {
          ctx.fillStyle = "#0F0"; // Green for matrix
        }

        ctx.fillText(text, x, y);

        // Reset drop to top randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    // Run Matrix animation
    const matrixInterval = setInterval(drawMatrix, 50);

    // Fade out and remove splash screen after 2.5 seconds
    setTimeout(function () {
      splashScreen.classList.add("fade-out");
      clearInterval(matrixInterval);

      // Remove from DOM after fade completes
      setTimeout(function () {
        splashScreen.remove();
      }, 500);
    }, 2500);
  }
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
