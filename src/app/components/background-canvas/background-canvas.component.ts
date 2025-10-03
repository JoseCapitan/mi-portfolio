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
    // 2. Ondas animadas (waves-canvas)
    const wavesCanvas = document.getElementById(
      'waves-canvas'
    ) as HTMLCanvasElement | null;
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
      function animateWaves() {
        if (!ctx) return;
        if (!wavesCanvas) return;
        ctx.clearRect(0, 0, wavesCanvas.width, wavesCanvas.height);
        ctx.globalAlpha = 0.5;
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x < wavesCanvas.width; x += 4) {
          const y =
            wavesCanvas.height / 2 +
            Math.sin(x / 60 + t) * 30 +
            Math.cos(x / 120 - t) * 20;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        t += 0.02;
        requestAnimationFrame(animateWaves);
      }
      animateWaves();
    }

}
}
