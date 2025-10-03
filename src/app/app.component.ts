import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { BackgroundCanvasComponent } from "./components/background-canvas/background-canvas.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavbarComponent, BackgroundCanvasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('mi-portfolio');
}
