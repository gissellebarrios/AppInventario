import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialMovimientoComponent } from './historial-movimiento.component';

describe('HistorialMovimientoComponent', () => {
  let component: HistorialMovimientoComponent;
  let fixture: ComponentFixture<HistorialMovimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialMovimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
