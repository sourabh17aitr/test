import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  model;
  
  constructor(private http: Http) {
    //console.log(this.tempo())
  }
  /*  tempo() {
     return this.http
       .get('http://localhost:2403/users')
       .subscribe(val => console.log(val))
   } */
  tempo() {
    return this.http
      .get('http://localhost:2403/users')
      .subscribe(val => console.log(val.json()[0].id))
  }


}
