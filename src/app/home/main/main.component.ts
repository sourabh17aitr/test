import { Component, OnInit } from '@angular/core';
import{UserData} from '../user-data'
import{Router} from '@angular/router'
/**
   * @description It is child component of home module and it loads by default
   * It contains the option of shit home and shift vehicle
   */
  
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor( private router: Router,
                private userData:UserData) { }

  ngOnInit() {
  }
  shiftHome(){
    this.userData.setShiftingType('shiftHome')
    this.router.navigateByUrl('home/shiftVehicle')
   // location.assign('home/shiftVehicle')
  }
  shiftVehicle(){
    this.userData.setShiftingType('shiftVehicle')
    this.router.navigateByUrl('home/shiftVehicle')
    //location.assign('home/shiftVehicle')
  }

}
