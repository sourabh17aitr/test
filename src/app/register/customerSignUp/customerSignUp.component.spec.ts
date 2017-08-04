import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import{CustomerSignUpComponent} from './customerSignUp.component'

describe('RegisterComponent', () => {
  let component: CustomerSignUpComponent;
  let fixture: ComponentFixture<CustomerSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
