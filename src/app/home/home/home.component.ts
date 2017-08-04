import { Component, OnInit } from '@angular/core';
import{UserData} from '../user-data'

/**
 * @description It Is parent component of home module and cantains nav bar of home page
 * 
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  constructor() {
   }

  ngOnInit() {
  }

}

