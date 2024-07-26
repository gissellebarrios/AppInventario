import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {
  periodo = 'diario';
  formato = 'json';

  constructor(private http: HttpClient){}
    
    generarReporte(){
      const url = 'http://localhost:8000/api/reporte/$(this.periodo)7?formato=$(this.formato)';
      this.http.get(url,{ responseType:'blob' }).subscribe(blob =>{
        const filename = this.formato === 'json' ? 'reporte_inventario.json':'reporte_inventario.${this.formato}';
        saveAs(blob,filename);
      });
    }
}
