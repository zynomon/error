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
