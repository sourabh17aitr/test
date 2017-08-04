import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
import { VendorI } from './vendorI'


@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css'],
  providers: [CookieService]
})
export class VendorComponent extends VendorI implements OnInit {

  constructor(private service: UserService, private cookieService: CookieService) {
    super()
  }

  ngOnInit() {
    this.onLogin();
    this.getFormValidation()
  }

  getOrders() {
    this.orderHtmlHidden = false;
    this.vechicleListHidden = true;
    this.orderDescriptionHtmlForm = true;
    console.log(this.orderDetails)
    console.log(this.selectedItemDetails)

  }

  getVehicleList(orderDetail) {
    if (orderDetail.homeDetail) {
      if (orderDetail.status == 'pending') {
        console.log(orderDetail)
        this.selectedItemDetails = orderDetail
        this.orderDescriptionHtmlForm = false;
        this.homeItemDetail = JSON.parse(this.selectedItemDetails.homeDetail)

      }
    }
    else {
      this.orderDescriptionHtmlForm = true;
      this.orderHtmlHidden = true;
      this.vechicleListHidden = false
      this.selectedItemDetails = orderDetail;
      this.vehicleList = JSON.parse(orderDetail.vehicleList)
      this.selectedItemDetails.status = orderDetail.status
      this.getMultipeVendorAction()
    }
  }
  getSelectedItemDetails(item) {
    if (this.selectedItemDetails.status == 'pending') {
      this.orderDescriptionHtmlForm = false;
      this.orderHtmlHidden = true;
      this.vechicleListHidden = false;

      this.currentItemType = item.type;
      this.selectedVehicle = JSON.stringify(item.type) + '&&' + JSON.stringify(item.seg)
      console.log(this.selectedItemDetails)
      console.log(this.orderDetails)
    }
    else if (!this.currentVendorId[0]) {
      this.orderDescriptionHtmlForm = false;
      this.orderHtmlHidden = true;
      this.vechicleListHidden = false;

      this.currentItemType = item.type;
      this.selectedVehicle = JSON.stringify(item.type) + '&&' + JSON.stringify(item.seg)
      console.log(this.selectedItemDetails)
      console.log(this.orderDetails)
    }

  }

  getMultipeVendorAction() {
    let previousVendorsId = this.selectedItemDetails.comments.split('&&')
    this.currentVendorId = previousVendorsId
      .map(id => id)
      .filter(id => id == this.vendor.id)

    /* if(previousVendorsId.contain(this.vendor.id)){
      console.log('yeeeee')
    } */
    console.log(previousVendorsId)
  }

  onLogin() {
    if (!this.cookieService.get('user')) {
      location.assign('register/vendorSignUp')
    }
    this.vendor = JSON.parse(this.cookieService.get('user'))

    this.service
      .getShiftingDetails()
      .subscribe(result => {
        this.orderDetails = result.json();

        this.orderDetails.map(x => {
          x.date = JSON.parse(x.date)
        })
        this.getFormValidation()


        this.service
          .userLogin(this.vendor) //To login autenticate the user and get path or UID
          .subscribe(x => {
            this.service
              .getUserDetails(x.json().uid) //to get login user detail form above UID
              .subscribe(val => {
                this.vendor = val.json()
                console.log(this.vendor)
                /* this.orderDetails.map(userObj => {
                  if (userObj.comment != this.vendor.id) {
                    return userObj.status = 'pending'
                  }
                }) */
              })

          })
        console.log(this.orderDetails)

      })
  }
  onLogout() {
    this.cookieService.remove('user');
    location.assign('signin')
  }

  getFormValidation() {
    this.itemUpdateForm = new FormGroup({
      details: new FormGroup({
        price: new FormControl(
          '', [
            Validators.required
          ]
        ),
        comment: new FormControl(
        )
      })
    })
  }
  onSubmition() {
    if (this.selectedItemDetails.homeDetail) {
      this.dbItem = this.selectedItemDetails;
      this.dbItem.price = this.itemUpdateForm.value.details.price;
      this.dbItem.vendorName = this.vendor.name;
      this.dbItem.status = 'Waiting For customer Response'
      this.dbItem.vendorId = this.vendor.id
      this.dbItem.itemDetails = this.selectedItemDetails.homeDetail;
      console.log(this.dbItem)
      this.service
        .addItem(this.dbItem)
        .subscribe(x => console.log(x))

    }

    else {
      this.orderDescriptionHtmlForm = true;
      this.dbItem = this.selectedItemDetails;
      this.dbItem.vehicleList = (this.selectedVehicle)
      this.dbItem.price = this.itemUpdateForm.value.details.price;
      //this.dbItem.comment = this.itemUpdateForm.value.details.comment;
      this.dbItem.vendorName = this.vendor.name;

      this.vehicleList = this.vehicleList
        .map(x => x)
        .filter(res => res.type != this.currentItemType)

      if (this.vehicleList.length == 0) {
        let orderDetails
        this.selectedItemDetails.status = 'Waiting For customer Response'
        this.service
          .getShiftingDetails()
          .subscribe(result => {
            orderDetails = result.json();
            orderDetails = orderDetails
              .map(x => x)
              .filter(row => row.id == this.selectedItemDetails.id);
            console.log(orderDetails)
            orderDetails[0].status = 'Waiting For customer Response'
            let com = (orderDetails[0].comments)
            console.log(com)
            if (com) {
              orderDetails[0].comment = com + '&&' + this.vendor.id;
            }
            else {
              orderDetails[0].comment = this.vendor.id;
            }
            console.log(orderDetails)
            this.service.putCustomerShiftingDetails(orderDetails[0]).
              subscribe(x => console.log(x))

          })
      }
      this.service
        .addItem(this.dbItem)
        .subscribe(x => console.log(x))
    }
  }
}
