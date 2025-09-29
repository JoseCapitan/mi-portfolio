import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const canvas = document.getElementById('hero-bg-canvas') as HTMLCanvasElement | null;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      function resize() {
        if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
      }
      window.addEventListener('resize', resize);
      resize();

      const particles = Array.from({ length: 60 }, () => ({
        x: Math.random() * (canvas?.width ?? window.innerWidth),
        y: Math.random() * (canvas?.height ?? window.innerHeight),
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.7,
        dy: (Math.random() - 0.5) * 0.7,
      }));

      function animate() {
        if (!canvas || !ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.5;
        for (const p of particles) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
          ctx.fillStyle = '#6366f1';
          ctx.fill();
          p.x += p.dx;
          p.y += p.dy;
          if (canvas && (p.x < 0 || p.x > canvas.width)) p.dx *= -1;
          if (canvas && (p.y < 0 || p.y > canvas.height)) p.dy *= -1;
        }
        requestAnimationFrame(animate);
      }
      animate();
    }
  }
}
