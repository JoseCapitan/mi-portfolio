import { Component } from '@angular/core';

@Component({
  selector: 'app-background-canvas',
  imports: [],
  templateUrl: './background-canvas.component.html',
  styleUrl: './background-canvas.component.scss'
})
export class BackgroundCanvasComponent {
ngAfterViewInit(): void {
  // 1. Fondo de partículas (background-canvas)
    const backgroundCanvas = document.getElementById(
      'background-canvas'
    ) as HTMLCanvasElement | null;
    if (backgroundCanvas) {
      const ctx = backgroundCanvas.getContext('2d');
      function resizeBg() {
        if (!backgroundCanvas) return;
        backgroundCanvas.width = window.innerWidth;
        backgroundCanvas.height = window.innerHeight;
      }
      window.addEventListener('resize', resizeBg);
      resizeBg();

      // Partículas
      const particles = Array.from({ length: 60 }, () => ({
        x: Math.random() * (backgroundCanvas?.width ?? window.innerWidth),
        y: Math.random() * (backgroundCanvas?.height ?? window.innerHeight),
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.7,
        dy: (Math.random() - 0.5) * 0.7,
      }));
      function animateParticles() {
        if (!backgroundCanvas || !ctx) return;
        ctx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
        ctx.globalAlpha = 0.5;
        for (const p of particles) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
          ctx.fillStyle = '#6366f1';
          ctx.fill();
          p.x += p.dx;
          p.y += p.dy;
          if (backgroundCanvas && (p.x < 0 || p.x > backgroundCanvas.width))
            p.dx *= -1;
          if (backgroundCanvas && (p.y < 0 || p.y > backgroundCanvas.height))
            p.dy *= -1;
        }
        requestAnimationFrame(animateParticles);
      }
      animateParticles();
    }
    // --- Ondas animadas (waves-canvas) ---
const wavesCanvas = document.getElementById('waves-canvas') as HTMLCanvasElement | null;
if (wavesCanvas) {
  const ctx = wavesCanvas.getContext('2d');

  function resizeWaves() {
    if (!wavesCanvas) return;
    wavesCanvas.width = window.innerWidth;
    wavesCanvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeWaves);
  resizeWaves();

  let t = 0;

  function drawWave(
    color: string,
    amplitude: number,
    wavelength: number,
    speed: number,
    lineWidth: number,
    opacity: number,
    direction: 1 | -1 = 1
  ) {
    if (!ctx || !wavesCanvas) return;
    ctx.beginPath();
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    for (let x = 0; x < wavesCanvas.width; x += 2) {
      const y =
        wavesCanvas.height / 2 +
        Math.sin((x / wavelength + t * speed) * direction) * amplitude +
        Math.cos((x / (wavelength * 2) - t * speed) * direction) * amplitude * 0.5;
      ctx.lineTo(x, y);
    }

    ctx.stroke();
  }

  function animateWaves() {
    if (!ctx || !wavesCanvas) return;
    ctx.clearRect(0, 0, wavesCanvas.width, wavesCanvas.height);

    // 💠 Capa 1: onda principal (la que ya tenías)
    drawWave('#00ffff', 30, 60, 0.8, 0.3, 0.6);

    // 💠 Capa 2: onda secundaria entrelazada (más fina)
    drawWave('#00bfff', 25, 65, 1, 2, 0.4);

    // 💠 Capa 3: onda invertida (hacia el otro lado, para efecto ADN)
    drawWave('#4fd1c5', 25, 65, 1, 2, 0.4, -1);

    // 💠 Capa 4: onda gruesa y difuminada en sentido contrario (más lenta)
    drawWave('#1e40af', 60, 120, 0.2, 25, 0.1, -1);

    t += 0.02;
    requestAnimationFrame(animateWaves);
  }

  animateWaves();
}

}
}
