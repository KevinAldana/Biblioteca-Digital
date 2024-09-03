import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isAdmin = false;
  username: string | null = '';
  goToHome() {
    this.router.navigate(['/home']);
  }

  goToUserManagement() {
    this.router.navigate(['/gestion-usuarios']);
  }

  goToCollectionManagement() {
    this.router.navigate(['/coleccion']);
  }

  goToMyLoans() {
    this.router.navigate(['/prestamos']);
  }

  goToUserProfile() {
    this.router.navigate(['/perfil']);
  }

  goToSocialInteraction() {
    this.router.navigate(['/interaccion-social']);
  }

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const token = this.authService.isAuthenticated();
    if (!token) {
      this.router.navigate(['/login']); // Redirige a login si no hay token
    }
    const rol     = this.authService.getRol();
    this.isAdmin  = rol === 'administrador'; // Asume que el rol del administrador es 'admin'
    this.username = this.authService.getUsername();
    console.log('isAdmin:', this.isAdmin);
    console.log('username:', this.username);
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
