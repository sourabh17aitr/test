import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import{CustomerSignUpComponent} from './customerSignUp/customerSignUp.component';
import {VendorSignUpComponent} from './vendor-sign-up/vendor-sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  {
    path:'register',
    component:RegisterComponent,
    children:[
      {
        path:'customerSignUp',
        component:CustomerSignUpComponent
      },
      {
        path:'vendorSignUp',
        component:VendorSignUpComponent
      }
    ]
  },
  {
    path:'signin',
    component:SignInComponent,
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
