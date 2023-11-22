import { Component, OnInit } from '@angular/core';
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
  
}
