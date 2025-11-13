// Modal functions for ISO details
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("iso-modal");
  const modalBody = document.getElementById("modal-body");
  const closeBtn = document.getElementById("modal-close-btn");
  const isoIcons = document.querySelectorAll(".iso-icon[data-iso]");

  function openModal(isoType) {
    if (!modal || !modalBody) {
      console.error("Modal elements not found");
      return;
    }

    let content = "";

    if (isoType === "void") {
      content = `
        <div class="modal-header">
          <img src="icons/void.png" alt="Void" class="modal-image" />
          <h2 class="modal-title">Void</h2>
          <span class="badge badge-beta text-white font-bold">BETA</span>
        </div>
        <div class="modal-details">
          <h3>About Void Edition</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

          <h3>Features</h3>
          <ul>
            <li>Lorem ipsum dolor sit amet</li>
            <li>Consectetur adipiscing elit</li>
            <li>Sed do eiusmod tempor incididunt</li>
            <li>Ut labore et dolore magna aliqua</li>
          </ul>

          <h3>System Requirements</h3>
          <ul>
            <li>CPU: 64-bit processor (2 GHz or faster)</li>
            <li>RAM: 2 GB minimum, 4 GB recommended</li>
            <li>Storage: 20 GB available space</li>
            <li>Graphics: VGA capable of 1024x768 resolution</li>
            <li>Boot: UEFI or Legacy BIOS support</li>
          </ul>
        </div>
      `;
    } else if (isoType === "neospace") {
      content = `
        <div class="modal-header">
          <img src="icons/neospace.jpg" alt="NeoSpace" class="modal-image" />
          <h2 class="modal-title">NeoSpace</h2>
          <span class="badge badge-disabled text-white font-bold">COMING SOON</span>
        </div>
        <div class="modal-details">
          <h3>About NeoSpace Edition</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

          <h3>Planned Features</h3>
          <ul>
            <li>Lorem ipsum dolor sit amet</li>
            <li>Consectetur adipiscing elit</li>
            <li>Sed do eiusmod tempor incididunt</li>
            <li>Ut labore et dolore magna aliqua</li>
          </ul>

          <h3>System Requirements</h3>
          <ul>
            <li>CPU: 64-bit processor (2 GHz or faster)</li>
            <li>RAM: 4 GB minimum, 8 GB recommended</li>
            <li>Storage: 30 GB available space</li>
            <li>Graphics: OpenGL 3.3 compatible or better</li>
            <li>Boot: UEFI required</li>
          </ul>
        </div>
      `;
    }

    modalBody.innerHTML = content;
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove("show");
      document.body.style.overflow = "";
    }
  }

  // Attach click event listeners to ISO icons
  isoIcons.forEach(function (icon) {
    icon.addEventListener("click", function () {
      const isoType = this.getAttribute("data-iso");
      openModal(isoType);
    });
  });

  // Close button click
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  // Close modal on outside click
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Close modal on ESC key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });
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
