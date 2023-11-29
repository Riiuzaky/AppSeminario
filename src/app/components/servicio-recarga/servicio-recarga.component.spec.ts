import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioRecargaComponent } from './servicio-recarga.component';

describe('ServicioRecargaComponent', () => {
  let component: ServicioRecargaComponent;
  let fixture: ComponentFixture<ServicioRecargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioRecargaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicioRecargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
