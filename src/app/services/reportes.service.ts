import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private baseUrl = 'http://localhost/biblioteca_digital/backend/Controlador/ReportesController.php';

  constructor(private http: HttpClient) { }

  descargarInformePrestamos(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}?tipo=prestamos`, { responseType: 'blob' });
  }

  descargarInformeInventario(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}?tipo=inventario`, { responseType: 'blob' });
  }
}

