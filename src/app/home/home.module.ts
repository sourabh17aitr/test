import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import {
  MdTabsModule,
  MdAutocompleteModule,
  MdInputModule,
  MdSelectModule,
  MdButtonModule
} from '@angular/material';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { ShiftVehicleComponent } from './shift-vehicle/shift-vehicle.component';
import { MainComponent } from './main/main.component';
import { SelectVehicleComponent } from './select-vehicle/select-vehicle.component';
import { ShippingDetailsComponent } from './shipping-details/shipping-details.component';
import { SelectHomeComponent } from './select-home/select-home.component';
import{UserData} from './user-data'


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MdInputModule,
    MdAutocompleteModule,
    MdSelectModule,
    MdButtonModule,
    MdTabsModule
  ],
  declarations: [HomeComponent,
    ShiftVehicleComponent,
    MainComponent,
    SelectVehicleComponent,
    ShippingDetailsComponent,
    SelectHomeComponent],
  providers: [UserData],
})

export class HomeModule {

}
