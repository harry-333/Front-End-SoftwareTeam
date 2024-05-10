import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedpluginComponent } from './fixedplugin.component';

describe('FixedpluginComponent', () => {
  let component: FixedpluginComponent;
  let fixture: ComponentFixture<FixedpluginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedpluginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixedpluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
