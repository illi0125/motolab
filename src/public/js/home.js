console.log("MotoLab Admin Frontend Initialized.");

(function () {
  const canvas = document.getElementById("cockpitCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width, height, cx, cy;
  let particles = [];
  const PARTICLE_COUNT = 180;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    cx = width / 2;
    cy = height * 0.4; // Cockpit horizon height
  }

  window.addEventListener("resize", resize);
  resize();

  // Particle colors from your prompt palette: Obsidian, Cyan, Magenta, Orange
  const colors = ["#00f0ff", "#ff007f", "#ff6b35", "#00f0ff"];

  class SpeedStreak {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = (Math.random() - 0.5) * width * 2;
      this.y = (Math.random() - 0.5) * height * 2;
      this.z = Math.random() * width + 10;
      this.pz = this.z;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.width = Math.random() * 2 + 1;
    }

    update() {
      this.pz = this.z;
      this.z -= 22; // Speed multiplier (Hyper-sport speed)

      if (this.z <= 0) {
        this.reset();
        this.z = width;
        this.pz = this.z;
      }
    }

    draw() {
      // Perspective projection onto screen
      let sx = (this.x / this.z) * width + cx;
      let sy = (this.y / this.z) * height + cy;

      let px = (this.x / this.pz) * width + cx;
      let py = (this.y / this.pz) * height + cy;

      if (sx < 0 || sx > width || sy < 0 || sy > height) return;

      // Motion blur light trail
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(sx, sy);
      ctx.strokeStyle = this.color;
      ctx.lineWidth = (1 - this.z / width) * this.width * 2.5;
      ctx.shadowBlur = 12;
      ctx.shadowColor = this.color;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  }

  // Populate particles
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new SpeedStreak());
  }

  // Cyber perspective grid (Road & Horizon)
  function drawCyberHighway() {
    ctx.strokeStyle = "rgba(0, 240, 255, 0.08)";
    ctx.lineWidth = 1;

    // Perspective vanishing grid lines
    const lineCount = 24;
    for (let i = -lineCount; i <= lineCount; i++) {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + i * (width / lineCount) * 2, height);
      ctx.stroke();
    }

    // Horizontal speed grid lines
    let time = Date.now() * 0.003;
    for (let j = 0; j < 12; j++) {
      let yProgress = ((j + time) % 12) / 12;
      let y = cy + Math.pow(yProgress, 2.5) * (height - cy);

      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.strokeStyle = `rgba(255, 0, 127, ${yProgress * 0.15})`;
      ctx.stroke();
    }
  }

  function render() {
    // Semi-transparent black clear for motion blur trail effect
    ctx.fillStyle = "rgba(3, 3, 5, 0.3)";
    ctx.fillRect(0, 0, width, height);

    drawCyberHighway();

    // Render speed light streams
    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(render);
  }

  render();
})();
