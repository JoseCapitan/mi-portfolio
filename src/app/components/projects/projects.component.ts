import { Component } from '@angular/core';
import { ProjectCardComponent, Project } from "../project-card/project-card.component";

@Component({
  selector: 'app-projects',
  imports: [ProjectCardComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  ngAfterViewInit(): void {
  const projectsSection = document.getElementById('projects-section');
  if (projectsSection) {
    setTimeout(() => {
      projectsSection.classList.remove('opacity-0', '-translate-y-10');
      projectsSection.classList.add('opacity-100', 'translate-y-0');
    }, 300); // pequeño delay para que no aparezca instantáneo
  }
}


projects: Project[] = [
    {
      logo: 'assets/vitaflow.png',
      title: 'Aplicación Web VitaFlow',
      description: 'Uso de Node.js, Express y MongoDB para gestionar cursos, usuarios y clases. Implementa autenticación segura y paneles de administración.',
      technologies: ['HTML', 'CSS', 'Node.js', 'MongoDB'],
      year: 2025,
      status: 'En curso',
      progress: 70
    },
    {
      logo: 'assets/gestor.png',
      title: 'Aplicación Web Gestor de Proyectos',
      description: 'Uso de Flutter y Firebase para crear una app móvil que calcula rutas de Semana Santa utilizando algoritmos genéticos, con mapas interactivos y gestión de perfiles.',
      technologies: ['Flutter', 'Firebase'],
      year: 2025,
      status: 'Terminado',
      progress: 100
    },
    {
      logo: 'assets/portfolio.png',
      title: 'Aplicación Web de mi portfolio',
      description: 'Uso de Flutter y Firebase para crear una app móvil que calcula rutas de Semana Santa utilizando algoritmos genéticos, con mapas interactivos y gestión de perfiles.',
      technologies: ['Flutter', 'Firebase'],
      year: 2025,
      status: 'Terminado',
      progress: 100
    }

  ];

  handleViewResult(project: Project) {
    console.log('Ver resultado de:', project.title);
    // Aquí puedes abrir una modal, navegar a otra página, etc.
  }
}
