import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftVehicleComponent } from './shift-vehicle.component';

describe('ShiftVehicleComponent', () => {
  let component: ShiftVehicleComponent;
  let fixture: ComponentFixture<ShiftVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
