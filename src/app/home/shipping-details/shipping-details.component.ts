import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'angular2-cookie/core';
import{Router} from '@angular/router'

import{UserData} from '../user-data'
import { User } from '../../model/user'
import { CityService } from '../../service/city.service'
import { UserService } from '../../service/user.service'

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.css'],
  providers: [CookieService]
})
export class ShippingDetailsComponent implements OnInit {
  customer: User;
  shipingDetailForm: FormGroup;
  CustomerName = 'Name';


  constructor(private service: UserService,
              private router: Router,
              private userData:UserData,
                private cookieService:CookieService) { }

  ngOnInit() {
    this.customer = this.getCustomerInfo()
    console.log(this.customer)
    console.log(this.userData.getHomeDetail())
    this.doFormValidation();
  }
  /**
   * @description To get customer details from previous selection
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
   * @description on submitiing of form assigning values of form in customer object
   */
  onSubmit() {
    if(this.userData.getShiftingType() == 'shiftHome'){
      this.customer.homeDetail = JSON.stringify(this.userData.getHomeDetail())
    }
    //this.customer.homeDetail = this.userData.getHomeDetail()

    this.customer.name = this.shipingDetailForm.value.personalDetails.name;
    this.customer.email = this.shipingDetailForm.value.personalDetails.email;
    this.customer.mobile = this.shipingDetailForm.value.personalDetails.mobile;

    this.customer.originAddress = this.shipingDetailForm.value.orignalAddress.address;
    this.customer.originLandmark = this.shipingDetailForm.value.orignalAddress.landmark;
    this.customer.originPin = this.shipingDetailForm.value.orignalAddress.postCode;

    this.customer.destinationAddress = this.shipingDetailForm.value.destinationAddress.address;
    this.customer.destinationLandmark = this.shipingDetailForm.value.destinationAddress.landmark;
    this.customer.destinationPin = this.shipingDetailForm.value.destinationAddress.postCode;

    this.customer.hasShiftingDetail = true;
    this.customer.role = 'customer'

    this.service.setnewUser(this.customer).subscribe( x=> console.log(x));
    this.service.setUserShippingDetails(this.customer);
    this.cookieService.put('user',JSON.stringify(this.customer))
    console.log(this.customer)
    this.router.navigateByUrl('myLogin')
    //location.assign('myLogin');

   // localStorage.setItem('customerInfo', JSON.stringify(this.customer))
    /* if (this.service.setnewUser(this.customer)) {
      //localStorage.setItem('user', JSON.stringify(this.customer))
      this.cookieService.put('user',JSON.stringify(this.customer))
      //location.assign('myLogin')
    }; */
  }

  doFormValidation() {
    //let user = JSON.parse(this.cookieService.get('user'))

    this.shipingDetailForm = new FormGroup({
      personalDetails: new FormGroup({
        name: new FormControl(
          ' Name', [
            Validators.required
          ]
        ),
        email: new FormControl(
          'example@email.com', [
            Validators.required,  //^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$
            Validators.pattern("^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]*\.([a-z]{2,4})$")
          ]
        ),
        mobile: new FormControl(
          '9876543210', [
            Validators.required,
            Validators.pattern('^[0-9]{10,10}$')
          ]
        )
      }),
      orignalAddress: new FormGroup({
        name: new FormControl({ value: '', disabled: true }, Validators.required),
        address: new FormControl(
          'kukatpaly', [
            Validators.required
          ]
        ),
        landmark: new FormControl(
          'near RTO', [
            Validators.required
          ]
        ),
        city: new FormControl(
          { value: '', disabled: true },
          Validators.required
        ),
        state: new FormControl(
          { value: '', disabled: true },
          Validators.required
        ),
        postCode: new FormControl(
          '', [
            Validators.required
          ]
        )
      }),
      destinationAddress: new FormGroup({
        name: new FormControl({ value: 'Nancy', disabled: true }, Validators.required),
        address: new FormControl(
          'Near 100 Feet', [
            Validators.required
          ]
        ),
        landmark: new FormControl(
          '1st Extension', [
            Validators.required
          ]
        ),
        city: new FormControl(
          { value: '', disabled: true },
          Validators.required
        ),
        state: new FormControl(
          { value: '', disabled: true },
          Validators.required
        ),
        postCode: new FormControl(
          '987454', [
            Validators.required
          ]
        )
      })
    })
  }
}
