import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import{Router} from '@angular/router'

import { UserService } from '../../service/user.service';
import { User } from '../../model/user'
import { UserI } from './userI'


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [CookieService]
})
export class UserComponent extends UserI implements OnInit {


  constructor(private service: UserService,
    private router: Router,
    private cookieService: CookieService) {
    super()
  }

  ngOnInit() {

    this.onLogin()
  }

  /**
   * @description On click of order menu
   */
  getOrders() {
    this.orderListHidden = false;
    this.termsHtmlHidden = true;
    this.selectedItemHidden = true;
    this.vechicleListHidden = true;
  }

  /**
   * 
   * @param order @description on click by user to get list of shifting of vehicle from order list
   */
  getVehicleList(order) {
    if (order.homeDetail) {
      this.homeList = JSON.parse(order.homeDetail)
      this.homeListHtmlHidden = false;
      this.getRateListObject(order.homeDetail);
      console.log(order)
      this.selectedHomeItemHidden = false
    }
    else if(order.vehicleList){
      this.vehicleList = JSON.parse(order.vehicleList);
      this.vechicleListHidden = false;
      this.termsHtmlHidden = true;
      this.selectedItemHidden = true
    }
    this.currentOrder = order
  }
  /**
   * @description on user click get the all rate list of selected vehicle
   * @param item 
   */
  getRateList(item) {
    let itemString = JSON.stringify(item.type) + '&&' + JSON.stringify(item.seg)
    this.getRateListObject(itemString);
    this.selectedItemHidden = false;
    console.log(itemString)

  }


  /**
   * To get show term and condition on user click
   */
  getTerms() {
    this.orderListHidden = true;
    this.selectedItemHidden = true;
    this.vechicleListHidden = true;
    this.termsHtmlHidden = false;
  }

  onLogin() {
    if (!this.cookieService.get('user')) {
      location.assign('signin')
    }
    this.user = JSON.parse(this.cookieService.get('user'))
    return this.getUserId(this.user)
  }

  /**
   * @description contains service call to get
   * UID of Login user Then User Details 
   * @param user
   */
  getUserId(user) {
    return this.service
      .userLogin(this.user) //To login the specific  user and get path or UID
      .subscribe(x => {
        this.service
          .getUserDetails(x.json().uid) //to get login user detail form above UID
          .subscribe(val => {
            console.log(val.json())

            this.user = val.json()

            this.cookieService.put('user', JSON.stringify(this.user))
            this.service.user = this.user //To assign service class user into current user
            if (this.user.role == 'vendor') { //Check if user is customer or vendor
              //location.assign('myLogin/vendor');
              this.router.navigateByUrl('myLogin/vendor')
              return
            }
            if (this.user.hasShiftingDetail) { //If user having shiftind order details..
              this.service
                .getShiftingDetails()
                .subscribe(x => {
                  if (this.matchUserDetails(x.json(), this.user)) {
                    //assign array of match orders...
                    this.orderDetails = this.matchUserDetails(x.json(), this.user)
                    //(this.orderDetails[0].date);
                    console.log(this.orderDetails)
                    this.date = JSON.parse(this.orderDetails[0].date)
                  }
                })
            }
          })
      })
  }

  /**
   * @description service call to get rates of selected item
   * @param itemString 
   */
  getRateListObject(itemString) {
    return this.service
      .getShiftingItmRate()
      .map(x => {
        return x.json()
          .filter(res => res.uesrname == this.user.email)
          .filter(res => {
            return res.itemDetails == itemString
          })
      })
      .subscribe(x => {
        this.selectedItem = x;
        console.log(x)
      })
  }


  matchUserDetails(obj, user) {
    return obj
      .map(x => x)
      .filter(res => res.userName == user.email)
  }

  onLogout() {
    this.cookieService.remove('user');
    location.assign('../signin')
  }

}
