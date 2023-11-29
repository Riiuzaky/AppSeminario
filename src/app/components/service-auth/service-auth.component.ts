import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Component({
  selector: 'app-service-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-auth.component.html',
  styleUrl: './service-auth.component.scss'
})

@Injectable({
  providedIn: 'root',
})
export class ServiceAuthComponent {

  private _usuarioLogueado: BehaviorSubject<boolean>;

  constructor(){
    const estadoInicial = localStorage.getItem('usuarioLogueado') === 'true';
    this._usuarioLogueado = new BehaviorSubject<boolean>(estadoInicial);
  }

  get usuarioLogueado$(): Observable<boolean> {
    return this._usuarioLogueado.asObservable();
    
  }

  iniciarSesion(): void {
    // Lógica para iniciar sesión
    // Actualizar el estado de autenticación y notificar a los observadores
    this._usuarioLogueado.next(true);
    localStorage.setItem('usuarioLogueado', 'true');
  }

  cerrarSesion(): void {
    // Lógica para cerrar sesión
    // ...

    // Actualizar el estado de autenticación y notificar a los observadores
    this._usuarioLogueado.next(false);
  }

  obtenerEstadoAutenticacion(): boolean {
    return this._usuarioLogueado.value;
  }

}
