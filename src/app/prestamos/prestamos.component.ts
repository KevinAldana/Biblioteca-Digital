import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { NgFor, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  standalone: true,
  styleUrls: ['./prestamos.component.css'],
  imports: [NgFor, NgIf, NavBarComponent, CommonModule, FormsModule]
})
export class PrestamosComponent implements OnInit {
  recursos: any[] = [];
  selectedResource: any;
  fechaPrestamo: string = '';
  Prestamos: any[] = [];
  usuarioId: string | null = '';

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadRecursos();
    this.loadPrestamos();
    this.usuarioId = this.authService.getId();
  }

  // Cargar los recursos disponibles
  loadRecursos(): void {
    this.http.get<any[]>('http://localhost/biblioteca_digital/backend/Controlador/controlador.php?action=getColeccion')
      .subscribe(data => {
        this.recursos = data[0]; // Asignar directamente el array de recursos
      });
  }

  // Cargar el historial de préstamos
  loadPrestamos(): void {
    this.http.get<any[]>('http://localhost/biblioteca_digital/backend/Controlador/controlador.php?action=getPrestamos')
      .subscribe(data => {
        console.log(data)
        if (data.length > 0) {
          this.Prestamos = data[0]; // Asignar directamente el array de préstamos
        } else {
          this.Prestamos = []; // Asegurarse de que se maneja el caso de datos vacíos
        }
      });
  }

  // Seleccionar un recurso para solicitar préstamo
  selectResource(recurso: any): void {
    this.selectedResource = recurso;
  }

  // Solicitar un préstamo
  requestPrestamo(): void {
    if (!this.selectedResource || !this.fechaPrestamo) {
      return; // Validar que haya un recurso seleccionado y una fecha de solicitud
    }
    const prestamoData = {
      id: this.selectedResource.id,
      fechaSolicitud: this.fechaPrestamo,
      usuarioId: this.usuarioId
    };
    this.http.post('http://localhost/biblioteca_digital/backend/Controlador/controlador.php?action=requestPrestamo', prestamoData)
      .subscribe((response: any) => {
        if (response === 1)  {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Prestamo realizado correctamente'
          });
          this.loadRecursos(); // Recargar recursos para actualizar la disponibilidad
          this.loadPrestamos(); // Recargar historial de préstamos
          this.selectedResource = null; // Limpiar la selección
          this.fechaPrestamo = ''; // Limpiar la fecha de solicitud
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Falló',
            text: 'No se pudo realizar el prestamo'
          });
        }
      });
  }

  // Devolver un recurso
  returnResource(prestamo: any): void {
    if (!prestamo || prestamo.fechaDevolucion) {
      return; // Validar que el préstamo exista y no haya sido devuelto aún
    }

    const returnData = {
      id: prestamo.id
    };

    this.http.post('http://localhost/biblioteca_digital/backend/Controlador/controlador.php?action=returnResource', returnData)
      .subscribe((response : any) => {
        if (response === 1)  {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Recuerso devuelto con exito'
          });
          this.loadRecursos(); // Recargar recursos para actualizar la disponibilidad
          this.loadPrestamos(); // Recargar historial de préstamos
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Falló',
            text: 'No se pudo devolver el recurso'
          });
        }
      });
  }
}
