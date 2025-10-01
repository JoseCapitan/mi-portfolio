import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timeline',
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements AfterViewInit {
  @ViewChildren('timelineItem') timelineItems!: QueryList<ElementRef>;
  @ViewChild('timelineSection') timelineSection!: ElementRef;

items = [
  {
    year: '2023',
    title: 'Inicio de DAW',
    description: 'Comencé el Grado Superior en Desarrollo de Aplicaciones Web.'
  },
  {
    year: '2024',
    title: 'Primer proyecto con Angular',
    description: 'Desarrollé una aplicación de gestión aplicando Javascript y PHP.'
  },
  {
    year: '2025',
    title: 'Prácticas en empresa',
    description: 'Colaboré en un equipo ágil, trabajando con Angular y Symfony en proyectos reales, bajo metodología Scrum.'
  },
  {
    year: '2025',
    title: 'Especialización en Frontend',
    description: 'Me enfoqué en Angular, construyendo interfaces modernas y optimizadas, integrando Git y Docker en el flujo de desarrollo.'
  }
];

  ngAfterViewInit() {
    // Observer para la sección principal
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-12');
          entry.target.classList.add('opacity-100', 'translate-y-0');
        }
      });
    }, { threshold: 0.2 });
    sectionObserver.observe(this.timelineSection.nativeElement);

    // Observer para los items
    const itemObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-12');
          entry.target.classList.add('opacity-100', 'translate-y-0');
        }
      });
    }, { threshold: 0.2 });
    this.timelineItems.forEach(item => {
      itemObserver.observe(item.nativeElement);
    });
  }
}
