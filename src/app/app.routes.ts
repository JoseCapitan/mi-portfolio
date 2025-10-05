import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { CurriculumComponent } from './components/curriculum/curriculum.component';

export const routes: Routes = [
  { path: '', component: HeroComponent },
  { path: 'proyectos', component: ProjectsComponent },
  { path: 'curriculum', component: CurriculumComponent }, // o crea una vista específica
  { path: 'contacto', component: ContactComponent },
  { path: '**', redirectTo: '' } // Redirige rutas no encontradas al home
];
