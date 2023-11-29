import { Component, EventEmitter, OnInit, Output, WritableSignal, signal } from '@angular/core';
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

  isSelectedDay: boolean = false;
  month: number;
  monthString: string;
  year: number;
  day: number;
  selectedHour: string;
  calendar: Array<CalendarItem> = [];
  rows = [
    ['1', '2', '3', '4', '5', '6', '7'],
    ['8', '9', '10', '11', '12', '13', '14'],
    ['15', '16', '17', '18', '19', '20', '21'],
    ['22', '23', '24', '25', '26', '27', '28'],
    ['29', '30', '31']
  ];

  horas: WritableSignal<string[]> = signal([]);


  hours = [
    '06:00:00', '08:00:00', '10:00:00', '12:00:00', '14:00:00', '16:00:00', '18:00:00'
  ];



  selectedDate?: Date;
  constructor() {
    const fechaActual: Date = new Date();
    const mesActual: number = fechaActual.getMonth();
    const anioActual: number = fechaActual.getFullYear();
    const diaActual: number = fechaActual.getDay();
    this.selectedHour = '00:00:00';
    this.month = mesActual + 1;
    this.monthString = monthNames[this.month - 1];
    this.year = anioActual;
    this.day = diaActual;
    this.horas.set(this.hours);
  }

  selectDay(day: string): void {
    if (this.selectedHour !== '00:00:00') {
      this.day = parseInt(day);
      this.selectedDate = new Date(this.year, this.month - 1, this.day, parseInt(this.selectedHour));
      console.log('Fecha seleccionada:', this.selectedDate);
      this.isSelectedDay = true;
      this.guardarFechaHora();
    } else {
      alert('porfavor seleccione una hora');
    }

  }

  changeTime(hour: string): void {
    // Actualiza la variable selectedHour con el valor seleccionado del select
    this.selectedHour = hour;
    console.log('Hora seleccionada:', this.selectedHour);
    // Puedes realizar otras acciones que necesites con la hora seleccionada
  }

  guardarFechaHora() {
    // Verificar si selectedDate tiene un valor antes de emitir
    if (this.selectedDate) {
      const fechaHoraString = this.selectedDate.toISOString();
      this.fechaHoraSeleccionada.emit(fechaHoraString);
      console.log(this.fechaHoraSeleccionada);

    }
  }

  changeMonth(delta: number): void {
    let date = new Date(this.year, this.month - 1, 1);
    date.setMonth(date.getMonth() + delta);
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();
    this.generateCalendar();

  }

  generateCalendar(): void {
    this.calendar = [];
    let currentDate = new Date(); // Obtén la fecha actual
    let date = new Date(this.year, this.month - 1, 1);
    let daysInMonth = new Date(this.year, this.month, 0).getDate();
  
    this.monthString = monthNames[this.month - 1];
  
  
    // Llenamos el calendario con los días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const isDisabled = this.isDayDisabled(this.year, this.month, day);
      this.calendar.push({ day: day, month: this.month, year: this.year, disabled: isDisabled });
    }
  
  }
  
  // Nuevo método para verificar si un día está desactivado
  isDayDisabled(year: number, month: number, day: number): boolean {
    const currentDate = new Date();
    const daysInMonth = new Date(year, month, 0).getDate();
    const compareDate = new Date(year, month - 1, day+1);
  
    if (day > daysInMonth) {
      return true;
    }

    return compareDate <= currentDate;
  }
  
  

  parseDay(cell: string): number {
    return parseInt(cell, 10);
  }


}

interface CalendarItem {
  day: number;
  month: number;
  year: number;
  disabled: boolean;
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

