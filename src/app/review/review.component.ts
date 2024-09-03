import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-resenas',
  templateUrl: './review.component.html',
  standalone: true,
  styleUrls: ['./review.component.css'],
  imports: [NgFor, NgIf, FormsModule, NavBarComponent]
})
export class ReviewComponent implements OnInit {
  recursosPrestados: any[] = [];
  usuarioId: string | null = '';  // Asegúrate de pasar este ID correctamente
  nuevoComentario: string = '';
  calificacion: number = 0;
  idRecursoSeleccionado: number = 0;

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.cargarRecursosPrestados();
    this.usuarioId = this.authService.getId();
  }

  cargarRecursosPrestados(): void {
    this.http.get('http://localhost/biblioteca_digital/backend/Controlador/controlador.php?action=getRecursosPrestados')
      .subscribe((data: any) => {
        this.recursosPrestados = data[0];
      });
  }

  seleccionarRecurso(idRecurso: number): void {
    this.idRecursoSeleccionado = idRecurso;
  }

  enviarReview(): void {
    if (this.idRecursoSeleccionado && this.calificacion && this.nuevoComentario.trim()) {
      const Review = {
        id_usuario: this.usuarioId,
        id_recurso: this.idRecursoSeleccionado,
        comentario: this.nuevoComentario,
        calificacion: this.calificacion
      };

      this.http.post('http://localhost/biblioteca_digital/backend/Controlador/controlador.php?action=crearReseña', Review)
        .subscribe((response: any) => {
          if(response === 1) {
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Reseña guardada correctamente'
            });
            this.cargarRecursosPrestados();
            this.nuevoComentario = '';
            this.calificacion = 0;
            this.idRecursoSeleccionado = 0;
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo guardar la reseña'
            });
          }
        });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Por favor, complete todos los campos antes de enviar.'
      });
    }
  }
}
