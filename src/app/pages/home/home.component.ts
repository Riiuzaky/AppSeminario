import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  images: string[] = [
    './../../../assets/Imagenes/Portada.jpg',
    './../../../assets/Imagenes/Portada2.jpg',
    // Agrega más imágenes según sea necesario
  ];
  currentImageIndex = 0;

  ngOnInit(): void {

    setInterval(() => {
      this.changeImage();
    }, 5000);

    this.getSalas();

  }

  salas: WritableSignal<Recurso[]> = signal([])
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

  reservarRecurso(idRecurso: string, idTipoRecurso: string): void {
    // Guardar en el localStorage
    localStorage.setItem('id', `${idRecurso}`);
    localStorage.setItem('idTipo', `${idTipoRecurso}`);
  }

  async getSalas() {
    this.cargando = signal(true);
    const res = await fetch("https://back-project-johan.onrender.com/resources");
    const resJson = await res.json();
    const conversion = resJson.data.map((value: { recurso: Recurso; }) => value.recurso);
    this.salas.set(conversion);
    this.cargando = signal(false);
  }

}

interface Recurso {

  idrecurso: string,
  idtiporecursopkfk: string,
  descripcion: string,
  imagen: any

}





