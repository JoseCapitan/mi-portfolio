import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackgroundCanvasComponent } from "./components/background-canvas/background-canvas.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BackgroundCanvasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('mi-portfolio');
}
