import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservasComponent } from './../../pages/reservas/reservas.component';
import { ReservasUsuarioComponent } from './../../pages/reservas-usuario/reservas-usuario.component';




@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CommonModule,ReservasComponent, ReservasUsuarioComponent]
})
export class HomeComponent implements OnInit {

  images: string[] = [
    './../../../assets/Imagenes/Portada.jpg',
    './../../../assets/Imagenes/Portada2.jpg',
    // Agrega más imágenes según sea necesario
  ];
  currentImageIndex = 0;
  vista = 1;

  cambiarVista(vista: number){
    this.vista = vista;
  }

  constructor() {}
  
  ngOnInit(): void {


    
    setInterval(() => {
      this.changeImage();
    }, 5000);

  }


  /* salas: WritableSignal<Recurso[]> = signal([])
 */
  
  cargando = signal(false);


  changeImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  onLeftArrowClick() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }

  onRightArrowClick() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }


  

/*   async setSalasPrueba(filtro: string){
    this.cargando = signal(true);
    const res = await fetch( `https://back-project-johan.onrender.com/resources/byid?idRecurso=${filtro}&idTipoR=Salon`);
    const resJson = await res.json();
    const conversion = resJson.data.map((value: { recurso: Recurso; }) => value.recurso);
    this.salas.set(conversion);
    console.log(this.salas());
    this.cargando = signal(false);
    this.changeDetectorRef.detectChanges();
  } */

}






