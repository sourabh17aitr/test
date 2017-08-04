import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import {MdButtonModule,
           MdCheckboxModule,
           MdInputModule,
           MdAutocompleteModule} from '@angular/material';



import { AppComponent } from './app.component';
import{AppRoutingModule} from './app-routing.module';
import {HomeModule} from './home/home.module';
import {RegisterModule} from "./register/register.module";
import {UserModule} from "./user/user.module";
import {UserService} from './service/user.service';
import{SampleeComponent} from './sampl/samplee/samplee.component'



@NgModule({
  declarations: [
    AppComponent,
    SampleeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    RegisterModule,
    NgbModule.forRoot(),
    HttpModule,
    BrowserAnimationsModule,
    MdInputModule,
    MdCheckboxModule,
    MdButtonModule,
    NoopAnimationsModule,
    MdAutocompleteModule,
    UserModule
    
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
