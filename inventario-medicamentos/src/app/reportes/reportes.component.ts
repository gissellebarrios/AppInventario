import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  movimientos: any[] = [];
  empresa_nombre: string = 'Nombre de la empresa';
  fechaReporte: Date = new Date();

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.obtenerMovimiento();
  }
    
  obtenerMovimiento(): void {
    this.http.get<any>('http://127.0.0.1:8000/api/movimientos/')
    .subscribe(
      (data) =>{
        this.movimientos = data.results;
      },
      (error) => {
        console.error('Error al obtener los movimientos;', error);
      }
    );
  }

  generarPDF(): void {
    const pdf = new jsPDF();
    const contenido = document.getElementById('contenido-reporte'); // ID del div que contiene la tabla

    if (contenido) {
      contenido.style.display = 'block';
      html2canvas(contenido).then(canvas => {
        console.log(canvas);
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 190; // Ancho de la imagen
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('reporte_movimientos.pdf');
        contenido.style.display = 'none';
      });
    }
  }
}
