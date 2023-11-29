import { Component, Injectable, OnDestroy, WritableSignal, signal } from '@angular/core';
import { ServicioRecargaComponent } from '../../components/servicio-recarga/servicio-recarga.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reservas-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservas-usuario.component.html',
  styleUrl: './reservas-usuario.component.scss'
})
export class ReservasUsuarioComponent implements OnDestroy {

  reservas: WritableSignal<Reserva[]> = signal([]);
  cargando = signal(false);
  detallesReserva: WritableSignal<DetalleReserva[]> = signal([]);
  private recargaSubscription: Subscription;

  constructor(private servicioRecarga: ServicioRecargaComponent) {
    this.recargaSubscription = this.servicioRecarga.recargar$.subscribe(async () => {
      await this.getReservas();
      await this.getDetallesReserva();  // Vuelve a cargar las reservas cuando se recibe el evento de recarga
    });
  }

  ngOnDestroy() {
    if (this.recargaSubscription) {
      this.recargaSubscription.unsubscribe();
    }
  }

  async ngOnInit() {
    await this.getReservas();
    await this.getDetallesReserva();
  }

  async getReservas() {
    this.cargando.set(true);
    const token = localStorage.getItem('token') || '';
    const res = await fetch(`https://back-project-johan.onrender.com/bookings/userstate?idUsuario=${localStorage.getItem('Usuario')}&idEstado=activo`, {
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
      const res = await fetch(`https://back-project-johan.onrender.com/bookings/calendar/${idReserva}`, {
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

  async cancelarReserva(idReserva: string) {
    
    await this.cancelarReservaEnElServidor(idReserva);
    await this.recargarComponente();
    
  }

  async borrarReserva(idReserva: string) {
     await this.borrarReservaEnElServidor(idReserva);
     await this.recargarComponente();
  }

  async cancelarReservaEnElServidor(idReserva: string) {
    const token = localStorage.getItem('token') || '';
    const res = await fetch(`https://back-project-johan.onrender.com/bookings/updatestate`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify({
        "idReserva": idReserva,
        "idEstado": "cancelado"
      })
    });

    if (!res.ok) {
      console.log(res);
    } else {
      const responseData = await res.json();
      console.log('Reserva cancelada:', responseData);
    }
  }

  async borrarReservaEnElServidor(idReserva: string) {
    const token = localStorage.getItem('token') || '';
    const res = await fetch(`https://back-project-johan.onrender.com/bookings/deletebooking`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify({
        "idReserva": idReserva
      })
    });

    if (!res.ok) {
      console.log(res);
    } else {
      const responseData = await res.json();
      console.log('Reserva borrada:', responseData);
    }
  }

   recargarComponente() {
   this.servicioRecarga.recargar();
  }
}

interface Reserva {
  idreserva: string;
  idusuariopkfk: string;
  idrecursopkfk: string;
  idtiporecursopkfk: string;
  idestado: string;
}

interface DetalleReserva {
  idReserva: string;
  detalle: { fi: string; ff: string };
}
