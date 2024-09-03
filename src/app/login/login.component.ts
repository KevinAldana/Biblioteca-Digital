import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.http.post<any>('http://localhost/biblioteca_digital/backend/Controlador/controlador.php?action=login', this.loginForm.value)
        .subscribe(response => {
          if (response && response.token) {
            this.authService.login(response.token, response.rol, response.username, response.id);
            this.router.navigate(['/home']);
          } else {
            console.error('Token no recibido');
          }
        }, error => {
          console.error('Error en la solicitud de inicio de sesión:', error);
        });
    }
  }

  navegarRegistro() {
    this.router.navigate(['/registro']);
  }
}
