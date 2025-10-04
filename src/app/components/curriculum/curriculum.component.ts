import { Component, AfterViewInit } from '@angular/core';

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface Experience {
  role: string;
  company: string;
  year: string;
  description: string;
}

interface Skill {
  name: string;
// Ej: Básico, Intermedio, Avanzado
}

@Component({
  selector: 'app-curriculum',
  imports: [],
  templateUrl: './curriculum.component.html',
  styleUrl: './curriculum.component.scss'
})
export class CurriculumComponent implements AfterViewInit {

  // Datos de ejemplo
  educations: Education[] = [
    { degree: 'Grado Superior en Desarrollo de Aplicaciones Web', institution: 'ILERNA', year: '2023-2025' },
    { degree: 'Bachillerato', institution: 'IES Sierra Sur', year: '2014-2016' },
    { degree: 'Grado Medio en Sistemas Microinformáticos y Redes', institution: 'IES Luis Velez de Guevara', year: '2008-2010' }
  ];
  
  experiences: Experience[] = [
    { role: 'Frontend Developer', company: 'Prácticas Angular', year: '2025', description: 'Desarrollo de proyectos en Angular, integración de backend y UI/UX.' }
  ];

  skills: Skill[] = [
    { name: 'Angular'},
    { name: 'TypeScript'},
    { name: 'Java'},
    { name: 'Git'}
  ];

  ngAfterViewInit() {
    // Animaciones de aparición al cargar la página
    const header = document.getElementById('curriculum-header');
    if (header) {
      setTimeout(() => {
        header.classList.remove('opacity-0', '-translate-y-10');
        header.classList.add('opacity-100', 'translate-y-0');
      }, 400);
    }

    // Animación para las secciones secundarias
    const sections = document.querySelectorAll('.curriculum-section');
    sections.forEach((section, i) => {
      setTimeout(() => {
        section.classList.remove('opacity-0', 'translate-y-10');
        section.classList.add('opacity-100', 'translate-y-0');
      }, 600 + i * 200); // Se va desfasando cada sección
    });
  }
}
