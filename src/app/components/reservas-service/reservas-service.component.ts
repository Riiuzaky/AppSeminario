import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';



@Component({
  selector: 'app-reservas-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservas-service.component.html',
  styleUrl: './reservas-service.component.scss'
})

@Injectable({
  providedIn: 'root',
})

export class ReservasServiceComponent {
  constructor() { }

  async reservar(bookingData: Recurso) {
    const url = 'https://back-project-johan.onrender.com/bookings';
    console.log(bookingData);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        console.log(response);
      }

      const responseData = await response.json();
      console.log('Reserva exitosa:', responseData);

      

    } catch (error) {
      console.log("Hubo un problema con la reserva", error);
    }
  }
}

interface Recurso {

  idRecurso: string | null,
  idTipoR: string | null,
  idUsuario: string | null,
  idEstado: any,
  calendarios:
  {
    fechaInicio: string;
    fechaFin: string
  }[]

}
