import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from './../../components/calendario/calendario.component';

@Component({
    selector: 'app-recurso',
    standalone: true,
    templateUrl: './recurso.component.html',
    styleUrl: './recurso.component.scss',
    imports: [CommonModule, CalendarioComponent]
})
export class RecursoComponent {

  constructor() {
    this.getRecurso();
  }

  recurso: WritableSignal<Recurso[]> = signal([])
  cargando = signal(false);

  async getRecurso() {

    this.cargando = signal(true);
    const id = localStorage.getItem('id');
    const idTipo = localStorage.getItem('idTipo');
    const res = await fetch(`https://back-project-johan.onrender.com/resources/byid?idRecurso=${id}&idTipoR=${idTipo}`);
    const resJson = await res.json();
    const conversion = resJson.data.map((value: { recurso: Recurso; }) => value.recurso);
    console.log(conversion);
    this.recurso.set(conversion);
    this.cargando = signal(false);

  }

}


interface Recurso {

  idrecurso: string,
  idtiporecursopkfk: string,
  descripcion: string,
  imagen: any

}
