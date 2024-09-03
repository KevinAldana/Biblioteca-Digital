import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { NgFor } from '@angular/common';
import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  standalone: true,
  styleUrls: ['./gestion-usuarios.component.css'],
  imports:[NavBarComponent, NgFor, ReactiveFormsModule]
})
export class GestionUsuariosComponent implements OnInit {
  usuarios:     any[] = [];
  editUserForm: FormGroup;
  currentUser:  any;
  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.editUserForm = this.fb.group({
    nombre: ['', Validators.required],
    email:  ['', [Validators.required, Validators.email]],
    rol:    ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get('http://localhost/biblioteca_digital/backend/Controlador/controlador.php?action=obtenerUsuarios')
      .subscribe((data: any) => {
        this.usuarios = data[0];
      },(error: any) => {
        console.error('Error loading users:', error);
      });
  }
  openEditModal(user: any) {
    this.currentUser = user;
    this.editUserForm.patchValue(user);
    const modalElement = document.getElementById('editUserModal');
    if (modalElement) {
      modalElement.removeAttribute('inert');
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  updateUser() {
    if (this.editUserForm.valid) {
      const updatedUser = { id: this.currentUser.id, ...this.editUserForm.value };
      this.http.put('http://localhost/biblioteca_digital/backend/Controlador/controlador.php?action=updateUser', updatedUser)
      .subscribe((response: any) => {
        if (response === 1) {
          this.loadUsers();
          const modalElement = document.getElementById('editUserModal');
          if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal?.hide();
          }
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Usuario actualizado correctamente'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Falló',
            text: 'No se pudo actualizar el usuario'
          });
        }
      });
    }
  }

  deleteUser(userId: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que quieres eliminar a este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.http.delete(`http://localhost/biblioteca_digital/backend/Controlador/controlador.php?action=deleteUser&id=${userId}`)
          .subscribe((response: any) => {
            if (response === 1) {
              this.loadUsers();
              Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Usuario eliminado correctamente'
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Falló',
                text: 'No se pudo eliminar el usuario'
              });
            }
          });
      }
    });
  }
}

