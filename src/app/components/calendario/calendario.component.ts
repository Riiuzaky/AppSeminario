import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';



declare global {
  interface Window { Calendly: any; }
}

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent {
  
  @Output() fechaHoraSeleccionada = new EventEmitter<string>();

  guardarFechaHora() {
    const datetimeInput = document.getElementById('datetime') as HTMLInputElement;
    const fechaHora = datetimeInput.value;
    this.fechaHoraSeleccionada.emit(fechaHora);
  }

}
