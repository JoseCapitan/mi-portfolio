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
    { role: 'Frontend Developer', company: 'CodeArts', year: 'Julio 2025 - Octubre 2025', 
    description: 
`
● Diseñé y desarrollé componentes reutilizables en Angular (modulares y tipados con TypeScript), enfocados en reuso y la mantenibilidad del código.
● Implementé navegación y experiencia de usuario avanzada: enrutado con routerLink, gestión de enlaces activos, menú hamburguesa responsive y scroll-spy.
● Desarrollé servicios Angular con HttpClient para consumo de APIs REST; creé un endpoint en Symfony para recibir formularios y validar datos antes de enviar correo (pruebas con Mailtrap).
● Implementé el diseño visual con Tailwind CSS y HTML, adaptando la interfaz para ser totalmente responsive (desktop - móvil).
● Participé en reuniones con el cliente para recoger requisitos y traducirlos en issues y tareas concretas; planifiqué entregables dentro del sprint y optimicé comportamientos del user flow.
`},

{ role: 'Technical support specialist', company: 'Teleperformance', year: 'Mayo 2018 - Marzo 2023', 
    description: 
`
● Diagnostiqué y resolví incidencias de hardware y software, asegurando la continuidad operativa de los
sistemas de la empresa.
● Analicé y asesoré sobre averías técnicas, cumpliendo con los acuerdos de nivel de servicio (SLA) para
optimizar los tiempos de respuesta.
● Configuré y desplegué equipos informáticos, adaptándolos a las necesidades de cada usuario y a las
políticas de la empresa.

`},

{ role: 'Database Administrator', company: 'Palacio Marqués de la Gomera', year: 'Septiembre 2010 - Mayo 2011', 
    description: 
`
● Brindé soporte y administré la base de datos, asegurando la fiabilidad de la información.
● Optimicé los datos para los diferentes departamentos de la empresa.
● Realicé copias de seguridad y restauraciones de datos, garantizando la integridad y disponibilidad de la información.
`}

  ];

  skills: Skill[] = [
    { name: 'Angular'},
    { name: 'TypeScript'},
    { name: 'Symfony'},
    { name: 'PHP'},
    { name: 'Docker'},
    { name: 'HTML5'},
    { name: 'CSS3'},
    { name: 'JavaScript'},
    { name: 'MySQL'},
    { name: 'PostgreSQL'},
    { name: 'Figma'},
    { name: 'Git'},
    { name: 'GitHub'},
    { name: 'Tailwind CSS'},
    { name: 'Bootstrap'},
    { name: 'Linux'},
    { name: 'Windows'},
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
