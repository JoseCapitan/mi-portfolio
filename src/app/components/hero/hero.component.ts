import { Component, AfterViewInit } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { TimelineComponent } from "../timeline/timeline.component";

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  imports: [AboutComponent, TimelineComponent],
})
export class HeroComponent implements AfterViewInit {
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

      // Animación de aparición del hero
      const hero = document.getElementById('hero');
    if (hero) {
      setTimeout(() => {
        hero.classList.remove('opacity-0', '-translate-y-10');
        hero.classList.add('opacity-100', 'translate-y-0');
      }, 400); // Delay para que no aparezca instantáneo
    } 

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

    // 3. Polígonos animados (hero-polygons-canvas)
    const polygonsCanvas = document.getElementById(
      'hero-polygons-canvas'
    ) as HTMLCanvasElement | null;
    if (polygonsCanvas) {
      const ctx = polygonsCanvas.getContext('2d');
      function resizePolygons() {
        if (!polygonsCanvas) return;
        polygonsCanvas.width = window.innerWidth;
        polygonsCanvas.height = window.innerHeight;
      }
      window.addEventListener('resize', resizePolygons);
      resizePolygons();

      let angle = 0;
      let t = 0;

      function drawDeformingPolygon(
        ctx: CanvasRenderingContext2D,
        cx: number,
        cy: number,
        r: number,
        sides: number,
        rotation: number,
        color: string,
        t: number,
        noiseFactor: number
      ) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rotation);

        ctx.beginPath();
        const vertices: { x: number; y: number }[] = [];

        for (let i = 0; i < sides; i++) {
          const theta = (2 * Math.PI * i) / sides;
          const noise = Math.sin(t * 0.5 + i * 1.5) * noiseFactor;
          const radius = r + noise;
          const x = radius * Math.cos(theta);
          const y = radius * Math.sin(theta);
          vertices.push({ x, y });

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.closePath();

        // ✨ Estilo neón
        ctx.strokeStyle = color;
        ctx.lineWidth = 4; // más gordito
        ctx.globalAlpha = 0.9;

        ctx.shadowBlur = 20; // intensidad del glow
        ctx.shadowColor = color; // mismo color que el trazo
        ctx.stroke();

        // 🔵 Dibujar los puntos de los vértices con glow también
        for (const v of vertices) {
          ctx.beginPath();
          ctx.arc(v.x, v.y, 3, 0, 2 * Math.PI); // puntos más grandes
          ctx.fillStyle = color;
          ctx.shadowBlur = 20;
          ctx.shadowColor = color;
          ctx.fill();
        }

        ctx.restore();
      }

      function animatePolygons() {
        if (!ctx || !polygonsCanvas) return;
        ctx.clearRect(0, 0, polygonsCanvas.width, polygonsCanvas.height);
        const cx = polygonsCanvas.width / 2;
        const cy = polygonsCanvas.height / 2 - 60;

        // Capas de polígonos con efecto neón
        drawDeformingPolygon(ctx, cx, cy, 200, 6, angle, '#061740', t, 50);
        drawDeformingPolygon(ctx, cx, cy, 150, 6, angle, '#061740', t + 2, 25);
        drawDeformingPolygon(ctx, cx, cy, 90, 6, angle, '#061740', t + 4, 35);
        drawDeformingPolygon(ctx, cx, cy, 55, 6, angle, '#061740', t + 6, 40);

        angle += 0.002;
        t += 0.03;

        requestAnimationFrame(animatePolygons);
      }

      animatePolygons();
    }
  }
}
