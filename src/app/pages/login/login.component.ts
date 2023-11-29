import { Component, Injectable, signal } from '@angular/core';
import { ServiceAuthComponent } from '../../components/service-auth/service-auth.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss',
    './masEstilos/alert.scss',
    './masEstilos/focus.scss',
    './masEstilos/media.scss',
  ],

})

@Injectable({
  providedIn: 'root',
})
export class LoginComponent {

  cargando = signal(false);
  constructor(private router: Router, private authService: ServiceAuthComponent) { }

  ngOnInit(): void {

  }

  getUser() {
    return (document.querySelector('input[name="user"]') as HTMLInputElement).value;
  }

  getPassword() {
    return (document.querySelector('input[name="pass"]') as HTMLInputElement).value;
  }

  async login() {
      this.cargando = signal(true);

      const usuario = this.getUser();
      const password = this.getPassword();

      const requestBody = {
        "idUsuario": usuario,
        "password": password
      };

      try {
        const res = await fetch('https://back-project-johan.onrender.com/user/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
        
        if (res.ok) {
          
          const resJson = await res.json();
          console.log(resJson);
          const token = resJson.data.map((value: { token: Token; }) => value.token);
          localStorage.setItem('token', token);
          localStorage.setItem('Usuario', usuario);
          this.cargando = signal(false);
          this.authService.iniciarSesion();
          this.router.navigateByUrl('/');
        } else {
          console.error('Error en la solicitud POST:', res.statusText);
          // Maneja el error según tus necesidades
          console.log("else");
        }
      } catch (error) {
        console.error('Error en la solicitud POST:', error);
        // Maneja el error según tus necesidades
        console.log("catch");
      }
  }


}


interface Token {
  token: string
}