import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { TimelineComponent } from "../timeline/timeline.component";

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  imports: [AboutComponent, TimelineComponent],
})
export class HeroComponent implements AfterViewInit, OnInit {

  ngOnInit() {
    // Fuerza el scroll al inicio cada vez que se carga el componente
    window.scrollTo(0, 0);
  }

  ngAfterViewInit(): void {
  

      // Animación de aparición del hero
      const hero = document.getElementById('hero');
    if (hero) {
      setTimeout(() => {
        hero.classList.remove('opacity-0', '-translate-y-10');
        hero.classList.add('opacity-100', 'translate-y-0');
      }, 400); // Delay para que no aparezca instantáneo
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
