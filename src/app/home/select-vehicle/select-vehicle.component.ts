import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import{Router} from '@angular/router'

import { ShiftVehicleComponent } from '../shift-vehicle/shift-vehicle.component'

import{UserData} from '../user-data'
import { User } from '../../model/user'
import { Vehicle, SelectedVehicle } from '../../model/vehicle'


/**
 * @description this is child class in home module used to get list of type of 
 * vehicle and segment that need to shift by user and it followed by user selection of 
 * date, origin city and destination city
 */
@Component({
  selector: 'app-select-vehicle',
  templateUrl: './select-vehicle.component.html',
  styleUrls: ['./select-vehicle.component.css']
})
export class SelectVehicleComponent implements OnInit {
  customer: User;
  vehicle: Array<Vehicle>; //cantains type of available vehicle details
  /**
   * @description to get and assign values of vehicle selected by user
   */
  selectedVehicle: Vehicle; 

  /**
   * @description Contains list of vehicle selected by user
   */
  addedVehicleList = [] 
  
  //used to display vehicle type and segment
  selectVehicleTitle: string = 'Select Vehicle Type'; 
  selectSegmentTitle = 'Select Segment';
  
  constructor(private router: Router,
                private userData:UserData) {
  }

  ngOnInit() {
    this.customer = this.getCustomerInfo();
    this.vehicle = this.getVehicle();
  }

  /**
   * @description to get customer data from previous selection of date,origin and destination city
   */
  getCustomerInfo() {
    if (this.userData.getUserInfo()) {
      return this.userData.getUserInfo()
    }
    else {
      location.assign('../')
    }
  }

  /**
   * @description to get the list of available vehicles
   */
  getVehicle() {
    return this.vehicle = [
      new Vehicle('2-Wheeler', ['upto 200cc','above 200 cc']),
      new Vehicle('4-Wheeler', ['Small','Executive','Luxury'])
    ]
  }

  /**
   * 
   * @param selectedVehicle @description to get selected vehicle type from dropdown
   */
  selectVehicleType(selectedVehicle) {
    this.selectedVehicle = selectedVehicle;
    this.selectVehicleTitle = selectedVehicle.type

  }

  /**
   * @description To get selected vehicle segment from dropdown
   * @param vehicles 
   */
  selectVehicleSegment(vehicles) {
    this.selectSegmentTitle = vehicles
    this.selectedVehicle.selectedSegment = vehicles
     console.log(this.selectedVehicle)

  }

  /**
   * @description to add selected vechile detail into list
   */
  addVehicle() {
    
    let typelo: string = this.selectedVehicle.type
    let segmentk: string = this.selectedVehicle.selectedSegment;
    this.addedVehicleList.push({ type: typelo, seg: segmentk, count: this.addedVehicleList.length})
    console.log(this.addedVehicleList)
  }
  
  /**
   * @description To save and navigate to next page
   */
  save() {
    this.customer.vehicleList = JSON.stringify(this.addedVehicleList);
    this.customer.shiftType = 'Vehicle'
    this.userData.setUserInfo(this.customer)
    //localStorage.setItem('customerInfo',JSON.stringify(this.customer))
    this.router.navigateByUrl('home/shippingDetails')
    //location.assign('home/shippingDetails')
  }

  deleteAddedVehicle(addedVehicleList){
    console.log(addedVehicleList);
    this.addedVehicleList = this.addedVehicleList
                                          .map(row => row)
                                          .filter(res => res.count != addedVehicleList.count)                                      
    console.log(this.addedVehicleList);

  }
}
