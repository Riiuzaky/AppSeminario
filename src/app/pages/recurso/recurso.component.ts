import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from './../../components/calendario/calendario.component';
import { ReservasServiceComponent } from './../../components/reservas-service/reservas-service.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-recurso',
    standalone: true,
    templateUrl: './recurso.component.html',
    styleUrl: './recurso.component.scss',
    imports: [CommonModule, CalendarioComponent]
})
export class RecursoComponent {

  fechaHoraInicio!: string;
  fechaHoraFin!: string;

  constructor(private ReservasServiceComponent: ReservasServiceComponent,private router: Router) {
    this.getRecurso();
  }

  recurso: WritableSignal<Recurso[]> = signal([])
  cargando = signal(false);

  async getRecurso() {

    this.cargando = signal(true);
    const id = localStorage.getItem('id');
    const idTipo = localStorage.getItem('idTipo');
    const token = localStorage.getItem('token') || '';
    const res = await fetch(`https://back-project-johan.onrender.com/resources/byid?idRecurso=${id}&idTipoR=${idTipo}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    });
    const resJson = await res.json();
    const conversion = resJson.data.map((value: { recurso: Recurso; }) => value.recurso);
    console.log(conversion);
    this.recurso.set(conversion);
    this.cargando = signal(false);

  }

 

  // ...

  onFechaHoraSeleccionada(fechaHora: string) {
    this.fechaHoraInicio = fechaHora;
    const fechaObjeto = new Date(fechaHora);
    const fechaObjetoModificada = new Date(fechaObjeto);
    fechaObjetoModificada.setHours(fechaObjetoModificada.getHours() + 2);

    const fechaFormateadaOriginal = formatearFecha(fechaObjeto);
    const fechaFormateadaModificada = formatearFecha(fechaObjetoModificada);
    
    
    this.fechaHoraInicio = fechaFormateadaOriginal;
    this.fechaHoraFin = fechaFormateadaModificada;
    console.log(this.fechaHoraInicio);
    console.log(this.fechaHoraFin);
    this.reservar();
  }

 
   
  reservar() {
    const idRecurso = localStorage.getItem('id');
    const idTipoR = localStorage.getItem('idTipo');
    const idUsuario = localStorage.getItem('Usuario');
    const idEstado = 'activo';
  
    const bookingData = {
      idRecurso: idRecurso,
      idTipoR: idTipoR,
      idUsuario: idUsuario,
      idEstado: idEstado,
      calendarios: [
        {
          fechaInicio: this.fechaHoraInicio ,
          fechaFin: this.fechaHoraFin
        }
      ],
    };
  
    this.ReservasServiceComponent.reservar(bookingData);
    
  }

}


interface Recurso {

  idrecurso: string,
  idtiporecursopkfk: string,
  descripcion: string,
  imagen: any

}

function pad(numero: any) {
  return numero < 10 ? '0' + numero : numero;
}

function formatearFecha(fecha: any) {
  return `${fecha.getFullYear()}-${pad(fecha.getMonth() + 1)}-${pad(fecha.getDate())} ${pad(fecha.getHours())}:${pad(fecha.getMinutes())}:${pad(fecha.getSeconds())}`;
}