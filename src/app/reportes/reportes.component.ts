import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MedicamentosService } from '../medicamentos/service/medicamentos.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  movimientos: any[] = [];
  empresa_nombre: string = 'Nombre de la empresa';
  fechaReporte: Date = new Date();
  mensajeNoMovimientos: string = '';

  constructor(private http: HttpClient, private medicamentoService : MedicamentosService){}

  ngOnInit(): void {
    this.obtenerMovimiento();
  }
    
  obtenerMovimiento(): void {
    this.http.get<any>('http://127.0.0.1:8000/api/movimientos/')
    .subscribe(
      (data) =>{
        this.movimientos = data.results;
        if(this.movimientos.length === 0){
          console.log('No hay movimientos registrados');
          this.mensajeNoMovimientos = 'No hay movimientos registrados'; 
        }
        else {
          const id = this.movimientos[0].empresaid;
          if(id){
            this.obtenerEmpresaId(id);
          }
          else {
            console.error('No se encontro empresaId en los movimientos.')
          }
        }
      },
      (error) => {
        console.error('Error al obtener los movimientos;', error);
      }
    );
  }

  obtenerEmpresaId(id:number):void {
    this.medicamentoService.obtenerEmpresa(id).subscribe(
      (data) => {
        this.empresa_nombre = data.nombre
      },
      (error) => {
        console.error('Error al obtener el nombre de la empresa;', error)
      }
    );
  }

  generarPDF(): void {
    const pdf = new jsPDF();
    const contenido = document.getElementById('contenido-reporte'); // ID del div que contiene la tabla

    if (contenido) {
      contenido.style.display = 'block';
      setTimeout(() => {
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
      }, 500)
    }
  }
}
