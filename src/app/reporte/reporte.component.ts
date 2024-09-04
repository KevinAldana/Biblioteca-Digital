import { Component } from '@angular/core';
import { ReportesService } from '../services/reportes.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  standalone: true,
  styleUrls: ['./reporte.component.css'],
  imports:[NavBarComponent]
})
export class ReportesComponent {

  constructor(private reportesService: ReportesService) { }

  descargarInformePrestamos() {
    this.reportesService.descargarInformePrestamos().subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url  = window.URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = 'informe_prestamos.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  descargarInformeInventario() {
    this.reportesService.descargarInformeInventario().subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url  = window.URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = 'informe_inventario.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
