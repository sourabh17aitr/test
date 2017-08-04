import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
//import {MdSidenavModule} from '@angular/material';
import {MdGridListModule} from '@angular/material';
import {MdInputModule} from '@angular/material';
import {MdPaginatorModule} from '@angular/material';
import {MdListModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';

import { UserRoutingModule } from './user-routing.module';
import { AdminComponent } from './admin/admin.component';
import { CustomerComponent } from './customer/customer.component';


import { UserComponent } from './user/user.component';
import { VendorComponent } from './vendor/vendor.component';
import{ KeysPipe } from '../key.pipe'

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    MdGridListModule,
    MdInputModule,
    FormsModule,
    ReactiveFormsModule,
    MdPaginatorModule,
    MdListModule,
    MdButtonModule
  ],
  declarations: [AdminComponent, CustomerComponent, UserComponent, VendorComponent,KeysPipe]
})
export class UserModule { }
