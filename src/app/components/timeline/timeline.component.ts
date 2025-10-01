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
      year: '2021',
      title: 'Comienzo de DAW',
      description: 'Empecé mis estudios en Desarrollo de Aplicaciones Web.'
    },
    {
      year: '2022',
      title: 'Primer proyecto Angular',
      description: 'Realicé un proyecto sencillo con Angular y Tailwind.'
    },
    {
      year: '2023',
      title: 'Prácticas en empresa',
      description: 'Adquirí experiencia real trabajando en un equipo ágil.'
    },
    {
      year: '2024',
      title: 'Desarrollador Frontend Junior',
      description: 'Me especialicé en Angular y desarrollo de interfaces modernas.'
    }
  ];

  ngAfterViewInit() {
    // Observer para la sección principal
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', '-translate-x-12');
          entry.target.classList.add('opacity-100', 'translate-x-0');
        }
      });
    }, { threshold: 0.2 });
    sectionObserver.observe(this.timelineSection.nativeElement);

    // Observer para los items
    const itemObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', '-translate-x-12');
          entry.target.classList.add('opacity-100', 'translate-x-0');
        }
      });
    }, { threshold: 0.2 });
    this.timelineItems.forEach(item => {
      itemObserver.observe(item.nativeElement);
    });
  }
}
