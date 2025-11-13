// ═══════════════════════════════════════════════════════════════════════════
// MATRIX GLITCH PANIC SPLASH SCREEN - ENHANCED CHAOS EDITION
// ═══════════════════════════════════════════════════════════════════════════
//
// This splash screen creates an intense, panic-inducing visual experience
// combining multiple chaotic effects to simulate a system crash:
//
// 🟢 Matrix Rain          - Cascading error text with random color flashes
// 🔴 Screen Shake         - Violent trembling and rotation
// ⚡ Screen Tears         - Random horizontal glitch strips
// 💥 Flash Effects        - Random white/red full-screen flashes
// 📟 Error Messages       - Randomly appearing panic messages
// 🌈 RGB Split Glitch     - Cyan/magenta chromatic aberration
// 💀 Error Code Cycler    - Rotating hexadecimal error codes
// 🎨 Color Distortion     - Random filter effects (hue, saturation, contrast)
// 📺 Scan Line Glitches   - Horizontal cyan scanning lines
// 🔲 Pixel Corruption     - Random pixel noise blocks
//
// Duration: 2.5 seconds of pure chaos before fade out
// ═══════════════════════════════════════════════════════════════════════════

(function () {
  "use strict";

  // Configuration
  const CONFIG = {
    duration: 2500, // Total splash duration in ms
    matrixFPS: 50, // Matrix rain frame rate
    glitchInterval: 150, // Screen glitch frequency
    flashInterval: 300, // Random flash frequency
    shakeIntensity: 15, // Screen shake pixels
    fontSize: 14,
  };

  // Error messages pool for random display
  const ERROR_MESSAGES = [
    "KERNEL PANIC",
    "SEGMENTATION FAULT",
    "FATAL EXCEPTION",
    "MEMORY CORRUPTED",
    "SYSTEM HALTED",
    "ACCESS VIOLATION",
    "CRITICAL ERROR",
    "ABORT SIGNAL",
    "STACK OVERFLOW",
    "DISK FAILURE",
    "NULL POINTER",
    "DIVIDE BY ZERO",
  ];

  document.addEventListener("DOMContentLoaded", function () {
    const splashScreen = document.getElementById("splash-screen");
    const matrixRain = document.querySelector(".matrix-rain");
    const glitchText = document.querySelector(".glitch");
    const errorCode = document.querySelector(".error-code");

    if (!splashScreen || !matrixRain) return;

    // ═══════════════════════════════════════════════════════════════════════
    // MATRIX RAIN CANVAS SETUP
    // ═══════════════════════════════════════════════════════════════════════

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

    // Matrix characters - chaos edition
    const chars =
      "ERROR!PANIC!FATAL!KERNEL!0x8000ABORT!CRITICAL!01SEGFAULT!CRASH!";
    const fontSize = CONFIG.fontSize;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];
    const speeds = []; // Different speeds for more chaos

    // Initialize drops at random positions with random speeds
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100);
      speeds[i] = Math.random() * 0.5 + 0.5; // Random speed multiplier
    }

    // ═══════════════════════════════════════════════════════════════════════
    // MATRIX RAIN ANIMATION
    // ═══════════════════════════════════════════════════════════════════════

    let glitchMode = false;

    function drawMatrix() {
      // Fade effect with occasional full clear for glitch
      if (Math.random() > 0.95) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      } else {
        ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Color chaos - more random colors in glitch mode
        const rand = Math.random();
        if (glitchMode && rand > 0.9) {
          ctx.fillStyle = "#00FFFF"; // Cyan
        } else if (rand > 0.98) {
          ctx.fillStyle = "#F00"; // Red
        } else if (rand > 0.96) {
          ctx.fillStyle = "#FF0"; // Yellow
        } else if (rand > 0.94) {
          ctx.fillStyle = "#F0F"; // Magenta
        } else {
          ctx.fillStyle = "#0F0"; // Green
        }

        ctx.fillText(text, x, y);

        // Add random horizontal lines for glitch effect
        if (Math.random() > 0.98) {
          ctx.fillStyle = "#F00";
          ctx.fillRect(0, y, canvas.width, 2);
        }

        // Reset drop to top randomly with speed
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += speeds[i];
      }
    }

    const matrixInterval = setInterval(drawMatrix, CONFIG.matrixFPS);

    // ═══════════════════════════════════════════════════════════════════════
    // SCREEN SHAKE EFFECT
    // ═══════════════════════════════════════════════════════════════════════

    function screenShake() {
      const intensity = CONFIG.shakeIntensity;
      const x = (Math.random() - 0.5) * intensity;
      const y = (Math.random() - 0.5) * intensity;
      const rotation = (Math.random() - 0.5) * 2;

      splashScreen.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;

      setTimeout(() => {
        splashScreen.style.transform = "";
      }, 50);
    }

    const shakeInterval = setInterval(screenShake, 100);

    // ═══════════════════════════════════════════════════════════════════════
    // RANDOM SCREEN GLITCHES (TEARS & DISTORTIONS)
    // ═══════════════════════════════════════════════════════════════════════

    function createScreenTear() {
      const tear = document.createElement("div");
      tear.style.position = "fixed";
      tear.style.left = "0";
      tear.style.width = "100%";
      tear.style.height = Math.random() * 50 + 5 + "px";
      tear.style.top = Math.random() * window.innerHeight + "px";
      tear.style.background = `rgba(${Math.random() * 255},${
        Math.random() * 255
      },${Math.random() * 255},0.3)`;
      tear.style.zIndex = "9999";
      tear.style.mixBlendMode = "screen";
      tear.style.pointerEvents = "none";

      splashScreen.appendChild(tear);

      // Animate tear
      const direction = Math.random() > 0.5 ? 1 : -1;
      const distance = (Math.random() * 50 + 10) * direction;
      tear.style.transform = `translateX(${distance}px)`;
      tear.style.transition = "transform 0.1s";

      setTimeout(() => tear.remove(), 150);
    }

    const tearInterval = setInterval(createScreenTear, CONFIG.glitchInterval);

    // ═══════════════════════════════════════════════════════════════════════
    // RANDOM FLASH EFFECTS
    // ═══════════════════════════════════════════════════════════════════════

    function flashScreen() {
      const flash = document.createElement("div");
      flash.style.position = "fixed";
      flash.style.top = "0";
      flash.style.left = "0";
      flash.style.width = "100%";
      flash.style.height = "100%";
      flash.style.background = Math.random() > 0.7 ? "#FF0000" : "#FFFFFF";
      flash.style.opacity = "0.3";
      flash.style.zIndex = "9998";
      flash.style.pointerEvents = "none";
      flash.style.mixBlendMode = "screen";

      splashScreen.appendChild(flash);

      setTimeout(() => {
        flash.style.opacity = "0";
        setTimeout(() => flash.remove(), 50);
      }, 50);
    }

    const flashInterval = setInterval(flashScreen, CONFIG.flashInterval);

    // ═══════════════════════════════════════════════════════════════════════
    // RANDOM ERROR MESSAGE POPUP
    // ═══════════════════════════════════════════════════════════════════════

    function showRandomError() {
      const errorMsg = document.createElement("div");
      errorMsg.textContent =
        ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)];
      errorMsg.style.position = "fixed";
      errorMsg.style.left = Math.random() * 80 + 10 + "%";
      errorMsg.style.top = Math.random() * 80 + 10 + "%";
      errorMsg.style.color = "#FF0000";
      errorMsg.style.fontSize = Math.random() * 20 + 15 + "px";
      errorMsg.style.fontFamily = "Courier New, monospace";
      errorMsg.style.textShadow = "0 0 10px #FF0000";
      errorMsg.style.zIndex = "10001";
      errorMsg.style.pointerEvents = "none";
      errorMsg.style.fontWeight = "bold";
      errorMsg.style.opacity = "0";
      errorMsg.style.transform = "scale(0.5)";
      errorMsg.style.transition = "all 0.1s";

      splashScreen.appendChild(errorMsg);

      // Animate in
      setTimeout(() => {
        errorMsg.style.opacity = "1";
        errorMsg.style.transform = "scale(1)";
      }, 10);

      // Animate out
      setTimeout(() => {
        errorMsg.style.opacity = "0";
        errorMsg.style.transform = "scale(0)";
        setTimeout(() => errorMsg.remove(), 100);
      }, 400);
    }

    const errorInterval = setInterval(showRandomError, 400);

    // ═══════════════════════════════════════════════════════════════════════
    // RGB SPLIT GLITCH INTENSIFIER
    // ═══════════════════════════════════════════════════════════════════════

    function intensifyGlitch() {
      if (glitchText) {
        glitchText.style.animation = "glitchShake 0.05s infinite";
        glitchMode = true;

        setTimeout(() => {
          glitchText.style.animation = "glitchShake 0.1s infinite";
          glitchMode = false;
        }, 200);
      }
    }

    const glitchIntensifier = setInterval(intensifyGlitch, 500);

    // ═══════════════════════════════════════════════════════════════════════
    // ERROR CODE RANDOMIZER
    // ═══════════════════════════════════════════════════════════════════════

    const errorCodes = [
      "0x8000FFFF",
      "0xDEADBEEF",
      "0xC0000005",
      "0x0000007B",
      "0xBADC0DE",
      "0x8007045D",
    ];
    let errorIndex = 0;

    function cycleErrorCode() {
      if (errorCode && Math.random() > 0.7) {
        errorCode.textContent =
          errorCodes[Math.floor(Math.random() * errorCodes.length)];
      }
    }

    const errorCodeInterval = setInterval(cycleErrorCode, 300);

    // ═══════════════════════════════════════════════════════════════════════
    // SCREEN DISTORTION FILTER
    // ═══════════════════════════════════════════════════════════════════════

    function applyDistortion() {
      const filters = [
        "hue-rotate(30deg) saturate(2)",
        "hue-rotate(-30deg) contrast(1.5)",
        "brightness(1.5) saturate(0.5)",
        "contrast(2) hue-rotate(15deg)",
        "invert(0.1) saturate(2)",
      ];

      if (Math.random() > 0.8) {
        const filter = filters[Math.floor(Math.random() * filters.length)];
        splashScreen.style.filter = filter;

        setTimeout(() => {
          splashScreen.style.filter = "none";
        }, 100);
      }
    }

    const distortionInterval = setInterval(applyDistortion, 250);

    // ═══════════════════════════════════════════════════════════════════════
    // HORIZONTAL SCAN LINE GLITCH
    // ═══════════════════════════════════════════════════════════════════════

    function createScanGlitch() {
      const scan = document.createElement("div");
      scan.style.position = "fixed";
      scan.style.left = "0";
      scan.style.width = "100%";
      scan.style.height = "3px";
      scan.style.top = Math.random() * window.innerHeight + "px";
      scan.style.background = "#00FFFF";
      scan.style.boxShadow = "0 0 10px #00FFFF";
      scan.style.zIndex = "10000";
      scan.style.pointerEvents = "none";
      scan.style.mixBlendMode = "screen";

      splashScreen.appendChild(scan);

      setTimeout(() => scan.remove(), 100);
    }

    const scanInterval = setInterval(createScanGlitch, 200);

    // ═══════════════════════════════════════════════════════════════════════
    // PIXEL CORRUPTION EFFECT
    // ═══════════════════════════════════════════════════════════════════════

    function corruptPixels() {
      const corruption = document.createElement("canvas");
      corruption.width = 100;
      corruption.height = 100;
      corruption.style.position = "fixed";
      corruption.style.left = Math.random() * window.innerWidth + "px";
      corruption.style.top = Math.random() * window.innerHeight + "px";
      corruption.style.zIndex = "10000";
      corruption.style.pointerEvents = "none";
      corruption.style.imageRendering = "pixelated";

      const corruptCtx = corruption.getContext("2d");
      const imageData = corruptCtx.createImageData(100, 100);

      for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] = Math.random() * 255;
        imageData.data[i + 1] = Math.random() * 255;
        imageData.data[i + 2] = Math.random() * 255;
        imageData.data[i + 3] = Math.random() > 0.5 ? 255 : 0;
      }

      corruptCtx.putImageData(imageData, 0, 0);
      splashScreen.appendChild(corruption);

      setTimeout(() => corruption.remove(), 150);
    }

    const corruptionInterval = setInterval(corruptPixels, 300);

    // ═══════════════════════════════════════════════════════════════════════
    // CLEANUP AND FADE OUT
    // ═══════════════════════════════════════════════════════════════════════

    setTimeout(function () {
      // Add intense final glitch before fade
      splashScreen.style.filter = "hue-rotate(180deg) saturate(3) contrast(2)";
      splashScreen.style.transform = "scale(1.1) rotate(2deg)";

      setTimeout(() => {
        splashScreen.classList.add("fade-out");

        // Clear all intervals
        clearInterval(matrixInterval);
        clearInterval(shakeInterval);
        clearInterval(tearInterval);
        clearInterval(flashInterval);
        clearInterval(errorInterval);
        clearInterval(glitchIntensifier);
        clearInterval(errorCodeInterval);
        clearInterval(distortionInterval);
        clearInterval(scanInterval);
        clearInterval(corruptionInterval);

        // Remove from DOM after fade completes
        setTimeout(function () {
          splashScreen.remove();
        }, 500);
      }, 100);
    }, CONFIG.duration);
  });
})();
