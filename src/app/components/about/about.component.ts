import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('aboutSection') aboutSection!: ElementRef;

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', '-translate-x-12');
          entry.target.classList.add('opacity-100', 'translate-x-0');
        }
      });
    }, { threshold: 0.2 });

    observer.observe(this.aboutSection.nativeElement);
  }
}
