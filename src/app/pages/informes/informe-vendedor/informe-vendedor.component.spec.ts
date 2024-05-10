import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeVendedorComponent } from './informe-vendedor.component';

describe('InformeVendedorComponent', () => {
  let component: InformeVendedorComponent;
  let fixture: ComponentFixture<InformeVendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeVendedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformeVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
