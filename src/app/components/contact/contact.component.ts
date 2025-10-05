import { Component, AfterViewInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements AfterViewInit {
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required]),
  });

  successMessage = '';
  errorMessage = '';
  isLoading = false;

  ngAfterViewInit() {
    // Animación de aparición para el título
    const title = document.querySelector('.text-center.opacity-0');
    if (title) {
      setTimeout(() => {
        title.classList.remove('opacity-0', '-translate-y-10');
        title.classList.add('opacity-100', 'translate-y-0');
      }, 300);
    }
    // Animación de aparición para el formulario
    const formBox = document.querySelector('.max-w-2xl.bg-gray-900');
    if (formBox) {
      setTimeout(() => {
        formBox.classList.remove('opacity-0', 'translate-y-10');
        formBox.classList.add('opacity-100', 'translate-y-0');
      }, 600);
    }
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      // Formspree endpoint (puedes cambiarlo por tu propio endpoint)
      const formspreeEndpoint = 'https://formspree.io/f/xwkzqgqg';
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
          this.successMessage = 'Mensaje enviado correctamente. ¡Gracias!';
          this.contactForm.reset();
        } else {
          this.errorMessage =
            'Hubo un error al enviar el mensaje. Inténtalo de nuevo más tarde.';
        }
      } catch (error) {
        this.errorMessage =
          'Hubo un error al enviar el mensaje. Inténtalo de nuevo más tarde.';
      }
      this.isLoading = false;
    } else {
      this.errorMessage = 'Por favor, rellena todos los campos correctamente.';
      this.successMessage = '';
    }
  }
}
