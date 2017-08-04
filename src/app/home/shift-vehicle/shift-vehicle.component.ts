import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import{Router} from '@angular/router'
import{UserData} from '../user-data'

import { User } from '../../model/user';
import { CityService } from '../../service/city.service';
import { Cities } from '../../model/cities'

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

/**
 * @description It is child component of home module with rouer link 'shiftVehicle'
 * It is used to select date and origin and destination city 
 */
@Component({
  selector: 'app-shift-vehicle',
  templateUrl: './shift-vehicle.component.html',
  styleUrls: ['./shift-vehicle.component.css']
})
export class ShiftVehicleComponent implements OnInit {



  /**
   * @description form having date calender, origin city and destination city
   */
  myForm: FormGroup;

  minDate;

  /**
   * @description use to update data on form submit 
   * @type User
   */
  customer: User;

  /**
   * @description contains json array of Indian cities
   */
  city: Cities = new Cities();

  /**
   * @var use as Formcontrol for origin city
   */
  originCity: FormControl;

  /**
   * @var use as Formcontrol for destination city
   */
  destinationCity: FormControl

  filteredStates: any;

  constructor(private router: Router,
              private userData:UserData) {
    this.getCityAutoComplete();
    
  }

  ngOnInit() {
    this.doFormValidation();
    this.getMinDate();
    this.getShiftingType()
  }

  getShiftingType(){
    this.customer = new User();
    if(this.userData.getShiftingType() == 'shiftHome'){
      this.customer.shiftType = 'home'
    }
    else{
      this.customer.shiftType = 'vehicle'}
  }
 
  /**
   * 
   * @param cityName @description It will return the the state of selected city
   */
  getState(cityName){
   return this.city.getCities()
      .map(x => x)
      .filter(s => s.name == cityName)
  }

  /**
   * @description It is use to validate the form date calender
   */
  doFormValidation() {
    this.myForm = new FormGroup({
      shiftingDate: new FormGroup({
        date: new FormControl(
          '', [
            Validators.required
          ]
        )
      })
    })
  }

  /**
   * @description disable the button till form is not valid
   */
  beforeSubmit() {
    if (this.myForm.valid && this.originCity.valid && this.destinationCity.valid) {
      return false
    }
    return true
  }

  /**
   * @description this method innitiate objects for auto complete function
   * @var originCity
   * @var destinationCity
   * @for autocomplete and provide cities option
   */
  getCityAutoComplete() {
    this.originCity = new FormControl('', [Validators.required]);
    this.destinationCity = new FormControl('', [Validators.required]);
    this.filteredStates = this.originCity.valueChanges
      .startWith(null)
      .map(name => this.filterCity(name));
    this.filteredStates = this.destinationCity.valueChanges
      .startWith(null)
      .map(name => this.filterCity(name));
  }

  /**
   * @description It is used to filter the autocomplete enter data of city 
   * @param val
   */
  filterCity(val: string) {
    return val ? this.city
      .getCities()
      .map(x => x.name)
      .filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.city.getCities().map(x => x.name);
  }

  /**
   * @description to block the previous dates
   */
  getMinDate(){
    let date = new Date();
    let cday = date.getDate()
    let cyear = date.getFullYear();
    let cmonth = date.getMonth() + 1;
    this.minDate = {year:cyear, day:cday, month:cmonth}
  }

   /**
   * @description this method call on submitting the form
   */
  onSubmit() {

   // this.customer.shiftType = 'vehicle'   //updatedon getShiftType()
    this.customer.Origin = this.originCity.value;
    this.customer.Destination = this.destinationCity.value

    let date:Date = this.myForm.value.shiftingDate.date
    this.customer.originState = this.getState(this.customer.Origin)[0].state;
    this.customer.destinationState = this.getState(this.customer.Destination)[0].state
    this.customer.date = JSON.stringify(date)
    console.log(this.customer)
    this.userData.setUserInfo(this.customer)
    //localStorage.setItem('customerInfo', JSON.stringify(this.customer)) 

    if(this.customer.shiftType == 'home'){
      this.router.navigateByUrl('/home/selectHome')
    }
    else{
      this.router.navigateByUrl('home/selectVehicle')
    }
  }
}

