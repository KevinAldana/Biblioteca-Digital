import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      rol: ['', Validators.required],
      nombre: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  get nombre() {
    return this.registroForm.get('nombre');
  }
  get rol() {
    return this.registroForm.get('rol');
  }

  get email() {
    return this.registroForm.get('email');
  }

  get password() {
    return this.registroForm.get('password');
  }

  get confirmPassword() {
    return this.registroForm.get('confirmPassword');
  }

  passwordMatchValidator(group: FormGroup) {
    const password        = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registroForm.valid) {
      this.http.post('http://localhost/biblioteca_digital/backend/Controlador/controlador.php?action=registro', this.registroForm.value)
        .subscribe(response => {
          if (response === 0) {
            Swal.fire({
              icon: 'error',
              title: 'Fallo',
              text: 'Usuario no registrado'
            });
          }
          else {
            Swal.fire({
              icon: 'success',
              title: 'Exito',
              text: 'Usuario registrado'
            });
          }
          // Redireccionar al login después del registro
          this.router.navigate(['/login']);
        });
    }
  }

  navegaLogin() {
    this.router.navigate(['/login']);
  }
}
