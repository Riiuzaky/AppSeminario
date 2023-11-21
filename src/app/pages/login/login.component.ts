import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
export class LoginComponent {

  loginForm=this.formBuilder.group({
    email:['prueba@gmail.com',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
  })

  constructor(private formBuilder:FormBuilder) {}

  ngOnInit(): void {

  }

  get email(){
    return this.loginForm.controls.email;
  }

  get password(){
    return this.loginForm.controls.password;
  }

  login() {
    if(this.loginForm.valid){
      console.log("Llamar al servicio de login");
      //this.router.navigateByUrl('/Home');
      this.loginForm.reset();
    }else{
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos");
    }
  }



}
