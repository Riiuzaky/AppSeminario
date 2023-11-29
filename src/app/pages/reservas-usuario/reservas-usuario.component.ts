import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservas-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservas-usuario.component.html',
  styleUrl: './reservas-usuario.component.scss'
})
export class ReservasUsuarioComponent {

  reservas: WritableSignal<Reserva[]> = signal([]);
  cargando = signal(false);
  detallesReserva: WritableSignal<DetalleReserva[]> = signal([]);

  async ngOnInit() {
    await this.getReservas();
    await this.getDetallesReserva();
  }

  async getReservas() {
    this.cargando.set(true);
    const token = localStorage.getItem('token') || '';
    const res = await fetch(`https://back-project-johan.onrender.com/bookings/iduser/${localStorage.getItem('Usuario')}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    });
    const resJson = await res.json();
    const conversion = resJson.data.map((value: { reserva: Reserva; }) => value.reserva);
    this.reservas.set(conversion);
    this.cargando.set(false);
  }

  async getDetallesReserva() {
    const detalles: DetalleReserva[] = [];
    for (const reserva of this.reservas()) {
      const idReserva = reserva.idreserva;
      const token = localStorage.getItem('token') || '';
      const res = await fetch(`https://back-project-johan.onrender.com/bookings/calendar/${idReserva}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      });
      const resJson = await res.json();
      const detalle = resJson.data[0] || {};
      detalles.push({ idReserva, detalle });
    }
    this.detallesReserva.set(detalles);
    
    console.log(this.detallesReserva());
  }

  // Otras funciones y propiedades...

}

interface Reserva {

  idreserva: string,
  idusuariopkfk: string,
  idrecursopkfk: string,
  idtiporecursopkfk: string,
  idestado: string

}


interface DetalleReserva {
  idReserva: string;
  detalle: { fi: string; ff: string };
}

