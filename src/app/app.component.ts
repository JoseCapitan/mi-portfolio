import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackgroundCanvasComponent } from "./components/background-canvas/background-canvas.component";
import { NavbarComponent } from "./components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BackgroundCanvasComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('mi-portfolio');
}
