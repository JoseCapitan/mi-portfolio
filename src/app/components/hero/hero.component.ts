import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements AfterViewInit {
  ngAfterViewInit(): void {
      // 1. Fondo de partículas (background-canvas)
      const backgroundCanvas = document.getElementById('background-canvas') as HTMLCanvasElement | null;
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
            if (backgroundCanvas && (p.x < 0 || p.x > backgroundCanvas.width)) p.dx *= -1;
            if (backgroundCanvas && (p.y < 0 || p.y > backgroundCanvas.height)) p.dy *= -1;
          }
          requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // 2. Ondas animadas (waves-canvas)
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
      function animateWaves() {
        if (!ctx) return;
        if (!wavesCanvas) return;
        ctx.clearRect(0, 0, wavesCanvas.width, wavesCanvas.height);
        ctx.globalAlpha = 0.5;
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x < wavesCanvas.width; x += 4) {
          const y = wavesCanvas.height/2 + Math.sin((x/60) + t) * 30 + Math.cos((x/120) - t) * 20;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        t += 0.02;
        requestAnimationFrame(animateWaves);
      }
      animateWaves();
    }

    // 3. Polígonos animados (hero-polygons-canvas)
    const polygonsCanvas = document.getElementById('hero-polygons-canvas') as HTMLCanvasElement | null;
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

    for (let i = 0; i < sides; i++) {
      const theta = (2 * Math.PI * i) / sides;
      const deform = Math.sin(t + i * 1.5) * noiseFactor; // deformación vértices
      const radius = r + deform;
      const x = radius * Math.cos(theta);
      const y = radius * Math.sin(theta);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.8;
    ctx.shadowBlur = 15;
    ctx.shadowColor = color;
    ctx.stroke();
    ctx.restore();
  }

  function animatePolygons() {
    if (!ctx || !polygonsCanvas) return;
    ctx.clearRect(0, 0, polygonsCanvas.width, polygonsCanvas.height);
    const cx = polygonsCanvas.width / 2;
    const cy = polygonsCanvas.height / 2 - 60;

    // Capas de polígonos deformados
    drawDeformingPolygon(ctx, cx, cy, 140, 6, angle, "#6366f1", t, 15);
    drawDeformingPolygon(ctx, cx, cy, 100, 6, angle, "#818cf8", t + 2, 12);
    drawDeformingPolygon(ctx, cx, cy, 70, 6, angle, "#a5b4fc", t + 4, 10);
    drawDeformingPolygon(ctx, cx, cy, 40, 6, angle, "#c7d2fe", t + 6, 8);

    angle += 0.002; // rotación suave
    t += 0.03;      // deformación continua

    requestAnimationFrame(animatePolygons);
  }

  animatePolygons();
    }
  }
}