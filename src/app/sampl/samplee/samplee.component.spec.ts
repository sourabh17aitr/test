import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleeComponent } from './samplee.component';

describe('SampleeComponent', () => {
  let component: SampleeComponent;
  let fixture: ComponentFixture<SampleeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
