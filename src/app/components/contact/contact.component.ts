import { Component, AfterViewInit, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements AfterViewInit, OnInit {
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    // Fuerza el scroll al inicio cada vez que se carga el componente
    window.scrollTo(0, 0);
  }

  successMessage = '';
  errorMessage = '';
  isLoading = false;

  ngAfterViewInit() {
    // --- Animaciones de entrada ---
    const title = document.querySelector('.text-center.opacity-0');
    const formBox = document.querySelector('.max-w-2xl.bg-gray-900');

    if (title) {
      setTimeout(() => {
        title.classList.remove('opacity-0', '-translate-y-10');
        title.classList.add('opacity-100', 'translate-y-0');
      }, 300);
    }

    if (formBox) {
      setTimeout(() => {
        formBox.classList.remove('opacity-0', 'translate-y-10');
        formBox.classList.add('opacity-100', 'translate-y-0');
      }, 600);
    }
  }

  async onSubmit() {
    if (this.contactForm.invalid) {
      this.errorMessage = 'Por favor, rellena todos los campos correctamente.';
      this.successMessage = '';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formspreeEndpoint = 'https://formspree.io/f/myznplvy';

    const formData = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      message: this.contactForm.value.message,
    };

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        this.successMessage = '✅ Mensaje enviado correctamente. ¡Gracias!';
        this.contactForm.reset();
        // ⏳ Oculta el mensaje tras unos segundos
        setTimeout(() => (this.successMessage = ''), 700);
      } else {
        this.errorMessage =
          '⚠️ Hubo un error al enviar el mensaje. Inténtalo de nuevo más tarde.';
          // ⏳ Oculta el mensaje tras unos segundos
        setTimeout(() => (this.errorMessage = ''), 700);
      }
    } catch (error) {
      this.errorMessage =
        '⚠️ Hubo un error al conectar con el servidor. Comprueba tu conexión.';
        // ⏳ Oculta el mensaje tras unos segundos
      setTimeout(() => (this.errorMessage = ''), 700);
    }

    this.isLoading = false;
  }
}
