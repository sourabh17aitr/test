import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router'

import {HomeShifting} from '../../model/homeShifting'
import{UserData} from '../user-data'

@Component({
  selector: 'app-select-home',
  templateUrl: './select-home.component.html',
  styleUrls: ['./select-home.component.css']
})
export class SelectHomeComponent implements OnInit {
 

  quantity = [1, 2, 3, 4, 5];
  options = [
    'Air Condition',
    'Bed',
    'Sofa Set',
    'Table'
  ];
  homeDetail:HomeShifting
  homeDetailList = []
  constructor(private router: Router,
              private userData:UserData,
            ) { }

  ngOnInit() {
  }

  selecthomeType(type) {
    this.homeDetail = new HomeShifting()
    this.homeDetail.itemType = type;
  }
  selectTypeQuantity(quant) {
    this.homeDetail.quantity = quant
  }

  addItem() {
    this.homeDetailList.push(this.homeDetail)
    console.log(this.homeDetailList)
  }
  onSave(){
    this.userData.setHomeDetail(this.homeDetailList)
    //localStorage.setItem('homeDetail', JSON.stringify(this.homeDetailList))
    this.router.navigateByUrl('home/shippingDetails')
    //location.assign('home/shippingDetails')
  }

}
