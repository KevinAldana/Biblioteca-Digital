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
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const rol = this.authService.getRol();
    this.isAdmin = rol === 'administrador'; // Asume que el rol del administrador es 'administrador'
  }
}

