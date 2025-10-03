import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface Project {
  logo: string;
  title: string;
  description: string;
  technologies: string[];
  year: number;
  status: 'Terminado' | 'Pausado' | 'En curso';
  progress: number;
  github?: string;
  demo?: string;
}

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Output() viewResult = new EventEmitter<Project>();
  @Output() viewImage = new EventEmitter<string>();

  onViewResult() {
    this.viewResult.emit(this.project);
  }

  onImageClick() {
  this.viewImage.emit(this.project.logo);
  }
}
