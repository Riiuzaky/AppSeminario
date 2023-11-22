import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasServiceComponent } from './reservas-service.component';

describe('ReservasServiceComponent', () => {
  let component: ReservasServiceComponent;
  let fixture: ComponentFixture<ReservasServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservasServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservasServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
