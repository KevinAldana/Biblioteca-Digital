import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { AboutComponent } from '../about/about.component';
import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-coleccion',
  standalone: true,
  templateUrl: './coleccion.component.html',
  styleUrls:  ['./coleccion.component.css'],
  imports:    [CommonModule, ReactiveFormsModule, NavBarComponent]
})
export class ColeccionComponent {
  coleccion: any[] = [];
  coleccionForm: FormGroup;
  currentItem: any;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.coleccionForm = this.fb.group({
      titulo:           ['', Validators.required],
      autor:            ['', Validators.required],
      genero:           ['', Validators.required],
      anio_publicacion: ['', Validators.required],
      isbn:             ['', Validators.required],
      tipo:             ['', Validators.required],
      disponibilidad:   ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.loadColeccion();
  }
  loadColeccion() {
    this.http.get<any[]>('http://localhost/biblioteca_digital/backend/Controlador/controlador.php?action=getColeccion')
      .subscribe(data => {
        this.coleccion = data[0];
      });
  }
  edit(item: any) {
    this.currentItem = item;
    this.coleccionForm.patchValue(item);
    const modalElement = document.getElementById('editModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  onUpdate() {
    const updatedItem = { id: this.currentItem.id, ...this.coleccionForm.value};
    this.http.put('http://localhost/biblioteca_digital/backend/Controlador/controlador.php?action=updateColeccion', updatedItem)
      .subscribe((response: any) => {
        if (response === 1) {
          this.loadColeccion();
          const modalElement = document.getElementById('editModal');
          if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal?.hide();
          }
          this.coleccionForm.reset();
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Colección actualizada correctamente'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Falló',
            text: 'No se pudo actualizar la colección'
          });
        }
      });
  }
  onSave() {
    if (this.coleccionForm.valid) {
      this.http.post('http://localhost/biblioteca_digital/backend/Controlador/controlador.php?action=agregarColeccion', this.coleccionForm.value)
        .subscribe((response: any) => {
          if (response === 1) {
            this.loadColeccion();
            this.coleccionForm.reset();
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Colección agregada correctamente'
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Falló',
              text: 'No se pudo agregar la colección'
            });
          }
        });
    }
  }
}
