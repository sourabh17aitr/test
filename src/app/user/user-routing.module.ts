import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AdminComponent } from './admin/admin.component';
import { CustomerComponent } from './customer/customer.component';
import { UserComponent } from './user/user.component';
import { VendorComponent } from './vendor/vendor.component';

const routes: Routes = [
  {
    path:'myLogin',
    component:UserComponent,
    pathMatch: 'full',
    children:[
      {
        path:'',
        component:CustomerComponent
      }
    ]
  },
  {
    path:'myLogin/vendor',
    component:VendorComponent,
    pathMatch: 'full',
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
 