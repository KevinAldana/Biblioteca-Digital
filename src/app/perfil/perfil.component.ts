import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { NgFor, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './perfil.component.html',
  standalone: true,
  styleUrls: ['./perfil.component.css'],
  imports: [NgFor, NgIf, NavBarComponent, CommonModule, FormsModule]
})
export class PerfilComponent implements OnInit {
  usuario: any = {};
  confirmarPassword: string = '';
  usuarioId: string | null = '';

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    // Cargar información del usuario
    this.usuarioId = this.authService.getId();
    this.cargarUsuario();
  }

  
  cargarUsuario(): void {
    const Data = {id: this.usuarioId};
    this.http.post('http://localhost/biblioteca_digital/backend/Controlador/controlador.php?action=getUsuario', Data)
      .subscribe((data: any) => {
        this.usuario = data[0];
      });
  }

  guardarCambios(): void {
    if (this.confirmarPassword !== this.usuario.password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden'
      });
      return;
    }

  this.http.post('http://localhost/biblioteca_digital/backend/Controlador/controlador.php?action=updateUser', this.usuario)
    .subscribe((response) => {
      if(response === 1) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Perfil actualizado correctamente'
        });
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el perfil'
        });
      }
    });
  }
}
