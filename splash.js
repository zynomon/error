(function () {
  "use strict";

  const CONFIG = {
    duration: 4000,
    pauseDuration: 1000,
    fadeDuration: 800,
    matrixFPS: 50,
    glitchInterval: 120,
    shakeIntensity: 20,
    fontSize: 16,
  };

  document.addEventListener("DOMContentLoaded", function () {
    const splashScreen = document.getElementById("splash-screen");
    const matrixRain = document.querySelector(".matrix-rain");
    const systemTitle = document.querySelector(".system-title");
    if (!splashScreen || !matrixRain) return;

    if (systemTitle) {
      systemTitle.style.fontFamily = "'Consolas', 'Courier New', monospace";
      systemTitle.style.fontSize = "48px";
      systemTitle.style.color = "#FF0000";
      systemTitle.style.textShadow = "0 0 12px #FF0000";
      systemTitle.style.fontWeight = "400";
      systemTitle.style.letterSpacing = "2px";
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
      ctx.font = fontSize + "px monospace";

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
      tear.style.background = `rgba(${r},${g},${b},0.15)`;
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
      flash.style.background = `rgba(${r},${g},${b},0.08)`;
      flash.style.zIndex = "9998";
      flash.style.pointerEvents = "none";
      flash.style.mixBlendMode = "screen";
      splashScreen.appendChild(flash);
      setTimeout(() => flash.remove(), 50);
    }
    const flashInterval = setInterval(flashScreen, CONFIG.glitchInterval);

    function showTerminatedText() {
      const terminated = document.createElement("div");
      terminated.textContent = "> terminated_";
      terminated.style.position = "fixed";
      terminated.style.left = "50%";
      terminated.style.top = "50%";
      terminated.style.transform = "translate(-50%, -50%)";
      terminated.style.fontFamily = "'Courier New'";
      terminated.style.fontSize = "28px";
      terminated.style.color = "#00FF00";
      terminated.style.textShadow = "0 0 8px #00FF00";
      terminated.style.zIndex = "10002";
      terminated.style.pointerEvents = "none";
      terminated.style.fontWeight = "bold";
      terminated.style.whiteSpace = "pre";
      splashScreen.appendChild(terminated);

      let visible = true;
      const cursor = setInterval(() => {
        terminated.textContent = visible ? "> terminated_" : "> terminated";
        visible = !visible;
      }, 500);

      setTimeout(() => {
        clearInterval(cursor);
        terminated.remove();
      }, CONFIG.pauseDuration);
    }

    setTimeout(() => {
      paused = true;
      splashScreen.style.filter = "grayscale(100%)";
      showTerminatedText();
      setTimeout(() => {
        splashScreen.style.transition = `opacity ${CONFIG.fadeDuration}ms`;
        splashScreen.style.opacity = "0";
        setTimeout(() => {
          clearInterval(matrixInterval);
          clearInterval(shakeInterval);
          clearInterval(tearInterval);
          clearInterval(flashInterval);
          splashScreen.remove();
        }, CONFIG.fadeDuration);
      }, CONFIG.pauseDuration);
    }, CONFIG.duration);
  });
})();
