import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MdInputModule} from '@angular/material';


import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register/register.component';
import{CustomerSignUpComponent} from './customerSignUp/customerSignUp.component';
import { VendorSignUpComponent } from './vendor-sign-up/vendor-sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import{SampleeComponent} from'../sampl/samplee/samplee.component'
@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MdInputModule
  ],
  declarations: [RegisterComponent,
  CustomerSignUpComponent,
  VendorSignUpComponent,
  SignInComponent
]
})
export class RegisterModule { }
