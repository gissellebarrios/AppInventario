import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoMedicamentosComponent } from './seguimiento-medicamentos.component';

describe('SeguimientoMedicamentosComponent', () => {
  let component: SeguimientoMedicamentosComponent;
  let fixture: ComponentFixture<SeguimientoMedicamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguimientoMedicamentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeguimientoMedicamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
