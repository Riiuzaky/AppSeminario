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
        throw new Error('Error al reservar');
      }

      const responseData = await response.json();
      console.log('Reserva exitosa:', responseData);

      // Puedes manejar el resultado de la reserva aquí

    } catch (error) {
      console.error('Error al reservar:', error);

      // Puedes manejar errores aquí
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
