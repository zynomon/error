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
          <p>Void is not a rolling release title for error.os distro it's an unstable title shipped when the iso is bootable and people can use it for preview.</p>
          <p>you cannot update or upgrade the distro in void title by our official support, And its very heavy on system unlike the stable release</p>

          <h3>Features</h3>
          <ul>
            <li>Seeing error.os fully dark custom prototype assets in action</li>
            <li>Prototype testing in action</li>
            <li>A working new  linux distro preview</li>
            </ul>

            <h3>System Requirements</h3>
            <ul class="requirements-list">
              <li class="requirement-item">
                <div class="requirement-header" onclick="toggleRequirement(this)">
                  <span class="requirement-title">CPU: 2 cores 64-bit processor</span>
                  <svg class="requirement-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                <div class="requirement-details">
                <p>Amd or intel 64 architecture or anything with virtualization support by using on a virtual machine</p>
                </div>
              </li>
              <li class="requirement-item">
                <div class="requirement-header" onclick="toggleRequirement(this)">
                  <span class="requirement-title">RAM: 1.5 GB minimum</span>
                  <svg class="requirement-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                <div class="requirement-details">
               <p>1.5 or 2 GB is minimum and required is above that</p>
                </div>
              </li>
              <li class="requirement-item">
                <div class="requirement-header" onclick="toggleRequirement(this)">
                  <span class="requirement-title">Storage: 10 GB recommended</span>
                  <svg class="requirement-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                <div class="requirement-details">
                 <p>Around 10 GB available space is required for the installation of the operating system and applications. But due to unstable behavior of "void" titles, it is recommended to have more than 20 GB available. or a usb stick with 3 gb free ( use ventoy for better live booting)</p>
                </div>
              </li>
              <li class="requirement-item">
                <div class="requirement-header" onclick="toggleRequirement(this)">
                  <span class="requirement-title">Graphics: Anything</span>
                  <svg class="requirement-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                <div class="requirement-details">
                  <p>except obscure graphics cards that are not mainstream. like some unknown diy made GPUs
                   details about blur: when gpu is being used the thing would show blur when gpu isn't being used it will be opaque</p> </div>
              </li>
              <li class="requirement-item">
                <div class="requirement-header" onclick="toggleRequirement(this)">
                  <span class="requirement-title">Motherboard : Anything with modern support</span>
                  <svg class="requirement-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                <div class="requirement-details">
                  <p>The requirement is about whether you use a motherboard with modern Bios or uefi support and secure boot toggling support</p> </div>
              </li>
            </ul>
        </div>
      `;
    } else if (isoType === "neospace") {
      content = `
        <div class="modal-header">
          <img src="icons/neospace.png" alt="neospace" class="modal-image" />
          <h2 class="modal-title">Neospace</h2>
          <span class="badge badge-beta text-white font-bold">Incoming..</span>
        </div>
        <div class="modal-details">
          <h3>About Neospace Edition</h3>
          <p>Neospace is going to be the first linux distro to be stable for every purpose in bangladeshi linux community</p>
          <h3>Aimed Features</h3>
          <ul>
            <li>Bleeding edge animations</li>
            <li>Lightweight not in visual but in performance</li>
            <li>Easy to install, use and customize</li>
            <li>Better at performance</li>
            <li>Modern UI</li>
            <li>Letting users configure the whole distro in gui as if they made it.</li>
            </ul>

            <h3>Aimed System Requirements</h3>
            <ul class="requirements-list">
              <li class="requirement-item">
                <div class="requirement-header" onclick="toggleRequirement(this)">
                  <span class="requirement-title">CPU: 2 cores 64-bit processor</span>
                  <svg class="requirement-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                <div class="requirement-details">
                <p>Any 64 bit cpu (depends on linux firmware and auto configured driver support)</p>
                </div>
              </li>
              <li class="requirement-item">
                <div class="requirement-header" onclick="toggleRequirement(this)">
                  <span class="requirement-title">RAM: 1.5 GB minimum</span>
                  <svg class="requirement-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                <div class="requirement-details">
               <p>1.5 or 2 GB is minimum and required is above that</p>
                </div>
              </li>
              <li class="requirement-item">
                <div class="requirement-header" onclick="toggleRequirement(this)">
                  <span class="requirement-title">Storage: 5 GB minimum</span>
                  <svg class="requirement-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                <div class="requirement-details">
                 <p>10 gb is perfect for daily use while users can still use it in 5 gb Storage by choosing minimal profile</p> </div>
              </li>
              <li class="requirement-item">
                <div class="requirement-header" onclick="toggleRequirement(this)">
                  <span class="requirement-title">Graphics: Anything</span>
                  <svg class="requirement-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                <div class="requirement-details">
                  <p>except obscure graphics cards that are not mainstream. like some unknown diy made GPUs
                   details about blur: when gpu is being used the thing would show blur when gpu isn't being used it will be opaque</p> </div>
              </li>
              <li class="requirement-item">
                <div class="requirement-header" onclick="toggleRequirement(this)">
                  <span class="requirement-title">Motherboard : Anything with modern support</span>
                  <svg class="requirement-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                <div class="requirement-details">
                  <p>The requirement is about whether you use a motherboard with modern Bios or UEFI support and secure boot toggling support</p> </div>
              </li>
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

// Toggle requirement dropdown
function toggleRequirement(header) {
  const item = header.parentElement;
  const details = header.nextElementSibling;
  const arrow = header.querySelector(".requirement-arrow");

  // Toggle active class
  item.classList.toggle("active");

  // Toggle details visibility
  if (item.classList.contains("active")) {
    details.style.maxHeight = details.scrollHeight + "px";
    arrow.style.transform = "rotate(180deg)";
  } else {
    details.style.maxHeight = "0";
    arrow.style.transform = "rotate(0deg)";
  }
}

VANTA.CELLS({
  el: "#vanta-bg",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.0,
  minWidth: 200.0,
  scale: 1.0,
  scaleMobile: 3.0,
  backgroundAlpha: 1,
  backgroundColor: 0xd7d8cf,
  color1: 0xa7a797,
  color2: 0x61667f,
  amplitudeFactor: 1.0,
  ringFactor: 1.0,
  rotationFactor: 1.0,
  speed: 5.0,
  size: 0.9,
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
