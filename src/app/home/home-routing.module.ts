import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import{HomeComponent} from "./home/home.component";
import {ShiftVehicleComponent} from './shift-vehicle/shift-vehicle.component';
import {MainComponent} from './main/main.component';
import {SelectVehicleComponent} from './select-vehicle/select-vehicle.component'
import {ShippingDetailsComponent} from './shipping-details/shipping-details.component'
import { SelectHomeComponent } from './select-home/select-home.component';

const routes: Routes = [
  {
    path:'home',
    component:HomeComponent, 
    children:[
      {
        path:'',
        component:MainComponent
      },
      {
        path:'shiftVehicle',
        component:ShiftVehicleComponent
      },
      {
        path:'selectVehicle',
        component:SelectVehicleComponent
      },
      {
        path:'shippingDetails',
        component:ShippingDetailsComponent
      },
      {
        path:'selectHome',
        component:SelectHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
