import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    // 1. Fondo de partículas (background-canvas)
    const particlesCanvas = document.getElementById('background-canvas') as HTMLCanvasElement | null;
    if (particlesCanvas) {
      const ctx = particlesCanvas.getContext('2d');
      function resizeParticles() {
        if (!particlesCanvas) return;
        particlesCanvas.width = window.innerWidth;
        particlesCanvas.height = window.innerHeight;
      }
      window.addEventListener('resize', resizeParticles);
      resizeParticles();
      // Partículas
      const particles = Array.from({ length: 60 }, () => ({
        x: Math.random() * (particlesCanvas?.width ?? window.innerWidth),
        y: Math.random() * (particlesCanvas?.height ?? window.innerHeight),
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.7,
        dy: (Math.random() - 0.5) * 0.7,
      }));
      function animateParticles() {
        if (!particlesCanvas || !ctx) return;
        ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
        ctx.globalAlpha = 0.5;
        for (const p of particles) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
          ctx.fillStyle = '#6366f1';
          ctx.fill();
          p.x += p.dx;
          p.y += p.dy;
          if (particlesCanvas && (p.x < 0 || p.x > particlesCanvas.width)) p.dx *= -1;
          if (particlesCanvas && (p.y < 0 || p.y > particlesCanvas.height)) p.dy *= -1;
        }
        requestAnimationFrame(animateParticles);
      }
      animateParticles();
    }
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
      function drawPolygon(cx: number, cy: number, r: number, sides: number, rotation: number, color: string) {
        if (!ctx) return;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rotation);
        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
          const theta = (2 * Math.PI * i) / sides;
          ctx.lineTo(r * Math.cos(theta), r * Math.sin(theta));
        }
        ctx.closePath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.globalAlpha = 0.7;
        ctx.stroke();
        ctx.restore();
      }
      function animatePolygons() {
        if (!ctx) return;
  if (!polygonsCanvas) return;
  ctx.clearRect(0, 0, polygonsCanvas.width, polygonsCanvas.height);
  const cx = polygonsCanvas.width/2;
  const cy = polygonsCanvas.height/2 - 60;
  drawPolygon(cx, cy, 60, 4, angle, '#6366f1');
  drawPolygon(cx, cy, 40, 6, -angle*1.2, '#818cf8');
  drawPolygon(cx, cy, 25, 3, angle*2, '#a5b4fc');
        angle += 0.01;
        requestAnimationFrame(animatePolygons);
      }
      animatePolygons();
    }
  }
}
