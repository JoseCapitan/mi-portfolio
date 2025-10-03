import { Component } from '@angular/core';
import {
  ProjectCardComponent,
  Project,
} from '../project-card/project-card.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-projects',
  imports: [ProjectCardComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
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
      logo: 'assets/vita.png',
      title: 'Aplicación Web VitaFlow',
      description:
        'Vitaflow es una aplicación web de nutrición y seguimiento de hábitos saludables, diseñada para gestionar planes de alimentación y monitorizar el progreso de los usuarios. Permite registrar comidas, objetivos y datos de salud de manera visual y dinámica.',
      technologies: ['Angular', 'TypeScript', 'Symfony', 'Docker', 'PostgreSQL', 'Node.js', 'Tailwind CSS', 'Git'],
      year: 2025,
      status: 'En curso',
      progress: 60,
      github: 'https://github.com/JoseCapitan/VitaFlow',
      demo: '',
    },

    {
      logo: 'assets/portfolio.png',
      title: 'Aplicación Web de mi portfolio',
      description:
        'Portfolio web que reúne todos mis proyectos y experiencia profesional. Incluye secciones de inicio, proyectos, currículum, contacto, animaciones en el hero y fondo dinámico con partículas y ondas, mostrando un diseño moderno y responsivo.',
      technologies: ['Angular', 'TypeScript', 'Node.js', 'Canvas API', 'Tailwind CSS', 'HTML5', 'Git'],
      year: 2025,
      status: 'Terminado',
      progress: 100,
      github: 'https://github.com/JoseCapitan/mi-portfolio',
      demo: '',
    },
      {
      logo: 'assets/gestor.png',
      title: 'Aplicación Web Gestor de Proyectos',
      description:
        'Aplicación de gestión de proyectos para equipos de trabajo, con sistema de usuarios y roles. Los administradores pueden crear, asignar y monitorizar proyectos y tareas de todos los usuarios, mientras que los miembros pueden gestionar sus propias tareas. Perfecta para organizar pequeñas empresas.',
      technologies: ['PHP', 'MySQL', 'phpMyAdmin', 'JavaScript', 'Bootstrap', 'HTML', 'CSS'],
      year: 2024,
      status: 'Terminado',
      progress: 100,
      github: 'https://github.com/JoseCapitan/Gestor-de-Proyectos',
      demo: 'https://player.vimeo.com/video/1124257167?'
    }
  ];

selectedProject: Project | null = null;
isModalOpen = false;

constructor(private sanitizer: DomSanitizer) {}

handleViewResult(project: Project) {
  this.selectedProject = project;
  this.isModalOpen = true;
}

// Cerrar modal
closeModal() {
  this.isModalOpen = false;
  this.selectedProject = null;
}

getSafeUrl(url: string | undefined): SafeResourceUrl {
    return url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : '';
  }


}
