import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router }            from '@angular/router';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  imports: [NgIf]
})
export class NavBarComponent implements OnInit {
  isAdmin = false;
  username: string | null = '';
  rol:      string | null = '';
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
    this.router.navigate(['/review']);
  }
  goToReporte() {
    this.router.navigate(['/reporte']);
  }
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const token = this.authService.isAuthenticated();
    if (!token) {
      this.router.navigate(['/login']); // Redirige a login si no hay token
    }
    this.rol      = this.authService.getRol();
    this.isAdmin  = this.rol === 'administrador'; // Asume que el rol del administrador es 'admin'
    this.username = this.authService.getUsername();
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}

