(function () {
  "use strict";

  const CONFIG = {
    duration: 4000,
    pauseDuration: 2500,
    fadeDuration: 800,
    matrixFPS: 100,
    glitchInterval: 120,
    shakeIntensity: 20,
    fontSize: 16,
  };

  document.addEventListener("DOMContentLoaded", function () {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.height = "100%";
    document.documentElement.style.height = "100%";

    const splashScreen = document.getElementById("splash-screen");
    if (!splashScreen) return;

    const fontLink = document.createElement("link");
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);

    const style = document.createElement("style");
    style.textContent = `
      #splash-screen, #splash-screen * {
        font-family: "Courier Prime", "Courier New", monospace !important;
      }
      #splash-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #000;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        opacity: 1;
        transition: opacity 0.5s ease-out, transform 0.1s ease-out;
        will-change: transform, opacity;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
      }
      .glitch-container {
        position: relative;
        width: 100%;
        height: 100%;
        background: #000;
      }
      .matrix-rain {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        font-size: 14px;
        overflow: hidden;
      }
      .panic-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        z-index: 100;
        width: 90%;
        max-width: 1200px;
      }
      .glitch {
        font-size: clamp(3rem, 15vw, 12rem);
        font-weight: 900;
        color: #ff0000;
        position: relative;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        animation: glitchShake 0.1s infinite, colorPulse 0.3s infinite;
        text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 40px #ff0000, 0 0 80px #ff0000, 0 0 120px #ff0000;
        line-height: 1;
        will-change: transform;
      }
      .glitch::before, .glitch::after {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .glitch::before {
        left: 2px;
        text-shadow: -2px 0 #00ffff;
        clip: rect(44px, 450px, 56px, 0);
        animation: glitchAnim1 0.5s infinite linear alternate-reverse;
      }
      .glitch::after {
        left: -2px;
        text-shadow: -2px 0 #ff00ff;
        clip: rect(44px, 450px, 56px, 0);
        animation: glitchAnim2 0.475s infinite linear alternate-reverse;
      }
      @keyframes glitchShake {
        0% { transform: translate(0); }
        20% { transform: translate(-5px, 5px); }
        40% { transform: translate(-5px, -5px); }
        60% { transform: translate(5px, 5px); }
        80% { transform: translate(5px, -5px); }
        100% { transform: translate(0); }
      }
      @keyframes glitchAnim1 {
        0% { clip: rect(20px, 9999px, 80px, 0); transform: skew(0.5deg); }
        10% { clip: rect(90px, 9999px, 120px, 0); transform: skew(0.8deg); }
        20% { clip: rect(40px, 9999px, 70px, 0); transform: skew(-0.5deg); }
        30% { clip: rect(10px, 9999px, 150px, 0); transform: skew(0.3deg); }
        40% { clip: rect(70px, 9999px, 100px, 0); transform: skew(-0.8deg); }
        50% { clip: rect(5px, 9999px, 90px, 0); transform: skew(0.6deg); }
        60% { clip: rect(110px, 9999px, 140px, 0); transform: skew(-0.4deg); }
        70% { clip: rect(30px, 9999px, 60px, 0); transform: skew(0.7deg); }
        80% { clip: rect(80px, 9999px, 130px, 0); transform: skew(-0.6deg); }
        90% { clip: rect(50px, 9999px, 110px, 0); transform: skew(0.4deg); }
        100% { clip: rect(15px, 9999px, 95px, 0); transform: skew(-0.3deg); }
      }
      @keyframes glitchAnim2 {
        0% { clip: rect(65px, 9999px, 95px, 0); transform: skew(-0.4deg); }
        10% { clip: rect(25px, 9999px, 55px, 0); transform: skew(0.7deg); }
        20% { clip: rect(105px, 9999px, 135px, 0); transform: skew(-0.6deg); }
        30% { clip: rect(35px, 9999px, 75px, 0); transform: skew(0.5deg); }
        40% { clip: rect(85px, 9999px, 125px, 0); transform: skew(-0.8deg); }
        50% { clip: rect(55px, 9999px, 85px, 0); transform: skew(0.3deg); }
        60% { clip: rect(15px, 9999px, 45px, 0); transform: skew(-0.5deg); }
        70% { clip: rect(95px, 9999px, 145px, 0); transform: skew(0.8deg); }
        80% { clip: rect(45px, 9999px, 105px, 0); transform: skew(-0.7deg); }
        90% { clip: rect(75px, 9999px, 115px, 0); transform: skew(0.6deg); }
        100% { clip: rect(5px, 9999px, 65px, 0); transform: skew(-0.4deg); }
      }
      .error-code {
        font-size: clamp(1.5rem, 6vw, 3rem);
        color: #ff4444;
        margin-top: 2rem;
        text-shadow: 0 0 20px #ff0000, 0 0 40px #ff0000;
        animation: errorFlicker 0.15s infinite, errorShake 0.5s infinite;
        letter-spacing: 0.3em;
        will-change: opacity, transform;
      }
      @keyframes errorFlicker {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      @keyframes errorShake {
        0%, 100% { transform: translate(0, 0); }
        25% { transform: translate(-2px, 2px); }
        50% { transform: translate(2px, -2px); }
        75% { transform: translate(-2px, -2px); }
      }
      @keyframes colorPulse {
        0%, 100% { filter: hue-rotate(0deg) brightness(1); }
        50% { filter: hue-rotate(15deg) brightness(1.2); }
      }
      .glitch-lines {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(0deg, rgba(255, 0, 0, 0.2) 0px, rgba(255, 0, 0, 0.2) 2px, transparent 2px, transparent 4px);
        animation: scanlineMove 0.1s linear infinite, scanlineGlitch 0.5s infinite;
        pointer-events: none;
        opacity: 0.8;
        mix-blend-mode: screen;
        will-change: transform, opacity;
      }
      @keyframes scanlineMove {
        0% { transform: translateY(0); }
        100% { transform: translateY(4px); }
      }
      @keyframes scanlineGlitch {
        0%, 90%, 100% { opacity: 0.8; }
        95% { opacity: 0.3; }
      }
    `;
    document.head.appendChild(style);

    splashScreen.innerHTML = `
      <div class="glitch-container">
        <div class="matrix-rain"></div>
        <div class="panic-text">
          <div class="glitch" data-text="SYSTEM ERROR">FATAL ERROR</div>
          <div class="error-code">SEGMENTATION_FAULT-X00-YOU-CANT-FIX-CONTACT-VENDOR</div>
          <div class="glitch-lines"></div>
        </div>
      </div>
    `;

    const matrixRain = splashScreen.querySelector(".matrix-rain");
    const glitchElement = splashScreen.querySelector(".glitch");

    if (glitchElement) {
      glitchElement.setAttribute("data-text", "SYSTEM ERROR");
    }

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

    const fontSize = CONFIG.fontSize;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];
    const speeds = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100);
      speeds[i] = Math.random() * 1 + 0.5;
    }

    let paused = false;

    function drawMatrix() {
      if (paused) return;
      ctx.fillStyle =
        Math.random() > 0.9 ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = fontSize + "px 'Courier Prime', 'Courier New', monospace";

      for (let i = 0; i < drops.length; i++) {
        const number = Math.floor(Math.random() * 99999);
        const text = `ERR_${number}`;
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const rand = Math.random();
        if (rand > 0.97) ctx.fillStyle = "#FF0";
        else if (rand > 0.94) ctx.fillStyle = "#F0F";
        else ctx.fillStyle = "#FF0000";

        ctx.fillText(text, x, y);

        if (Math.random() > 0.96) ctx.fillRect(0, y, canvas.width, 2);
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += speeds[i];
      }
    }

    const matrixInterval = setInterval(drawMatrix, CONFIG.matrixFPS);

    function screenShake() {
      if (paused) return;
      const x = (Math.random() - 0.5) * CONFIG.shakeIntensity;
      const y = (Math.random() - 0.5) * CONFIG.shakeIntensity;
      const rot = (Math.random() - 0.5) * 2;
      splashScreen.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
      setTimeout(() => (splashScreen.style.transform = ""), 50);
    }

    const shakeInterval = setInterval(screenShake, 80);

    function createScreenTear() {
      if (paused) return;
      const tear = document.createElement("div");
      tear.style.position = "fixed";
      tear.style.left = "0";
      tear.style.width = "100%";
      tear.style.height = Math.random() * 60 + 5 + "px";
      tear.style.top = Math.random() * window.innerHeight + "px";
      const r = Math.random() * 255;
      const g = Math.random() * 255;
      const b = Math.random() * 255;
      tear.style.background = `rgba(${r},${g},${b},0.2)`;
      tear.style.zIndex = "9999";
      tear.style.mixBlendMode = "screen";
      tear.style.pointerEvents = "none";
      splashScreen.appendChild(tear);
      const distance =
        (Math.random() * 60 + 10) * (Math.random() > 0.5 ? 1 : -1);
      tear.style.transform = `translateX(${distance}px)`;
      tear.style.transition = "transform 0.1s";
      setTimeout(() => tear.remove(), 150);
    }

    const tearInterval = setInterval(createScreenTear, CONFIG.glitchInterval);

    function flashScreen() {
      if (paused) return;
      const flash = document.createElement("div");
      flash.style.position = "fixed";
      flash.style.top = "0";
      flash.style.left = "0";
      flash.style.width = "100%";
      flash.style.height = "100%";
      const r = Math.random() * 255;
      const g = Math.random() * 255;
      const b = Math.random() * 255;
      flash.style.background = `rgba(${r},${g},${b},0.1)`;
      flash.style.zIndex = "9998";
      flash.style.pointerEvents = "none";
      flash.style.mixBlendMode = "screen";
      splashScreen.appendChild(flash);
      setTimeout(() => flash.remove(), 50);
    }

    const flashInterval = setInterval(flashScreen, CONFIG.glitchInterval);

    function stopAllEffects() {
      clearInterval(matrixInterval);
      clearInterval(shakeInterval);
      clearInterval(tearInterval);
      clearInterval(flashInterval);
    }

    function showTerminatedText() {
      stopAllEffects();

      const glitchEl = splashScreen.querySelector(".glitch");
      const errorCodeEl = splashScreen.querySelector(".error-code");
      const glitchLinesEl = splashScreen.querySelector(".glitch-lines");

      if (glitchEl) {
        glitchEl.style.animation = "none";
        glitchEl.style.color = "#888";
        glitchEl.style.textShadow = "0 0 10px #888, 0 0 20px #666";
      }
      if (errorCodeEl) {
        errorCodeEl.style.animation = "none";
        errorCodeEl.style.color = "#888";
        errorCodeEl.style.textShadow = "0 0 10px #666";
      }
      if (glitchLinesEl) {
        glitchLinesEl.style.animation = "none";
        glitchLinesEl.style.opacity = "0.3";
      }

      splashScreen.style.transform = "";

      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.zIndex = "10002";
      overlay.style.display = "flex";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      overlay.style.pointerEvents = "none";

      const svgGrayscale = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg",
      );
      svgGrayscale.setAttribute(
        "style",
        "position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;",
      );
      svgGrayscale.innerHTML = `
        <filter id="termGrayscale">
          <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0 0.33 0.33 0.33 0 0 0.33 0.33 0.33 0 0 0 0 0 1 0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#termGrayscale)" fill="#000" opacity="0.85"/>
      `;

      const terminated = document.createElement("div");
      terminated.style.position = "relative";
      terminated.style.zIndex = "2";
      terminated.style.fontFamily = "'Courier Prime', 'Courier New', monospace";
      terminated.style.fontSize = "28px";
      terminated.style.color = "#00ff00";
      terminated.style.textShadow = "0 0 8px #00ff00";
      terminated.style.fontWeight = "bold";
      terminated.style.whiteSpace = "pre";
      terminated.style.backgroundColor = "transparent";
      terminated.innerHTML =
        '> terminated<span class="term-underscore" style="opacity:1">_</span>';

      overlay.appendChild(svgGrayscale);
      overlay.appendChild(terminated);
      document.body.appendChild(overlay);

      const startTime = Date.now();
      const duration = CONFIG.pauseDuration;

      function loop() {
        const elapsed = Date.now() - startTime;
        if (elapsed >= duration) {
          overlay.remove();
          splashScreen.style.transition = `opacity ${CONFIG.fadeDuration}ms`;
          splashScreen.style.opacity = "0";
          setTimeout(() => {
            splashScreen.remove();
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            document.body.style.height = "";
            document.documentElement.style.height = "";
          }, CONFIG.fadeDuration);
          return;
        }
        const underscoreSpan = terminated.querySelector(".term-underscore");
        if (underscoreSpan) {
          underscoreSpan.style.opacity =
            Math.floor(elapsed / 500) % 2 === 0 ? "1" : "0";
        }
        requestAnimationFrame(loop);
      }

      loop();
    }

    setTimeout(() => {
      paused = true;
      showTerminatedText();
    }, CONFIG.duration);
  });
})();
