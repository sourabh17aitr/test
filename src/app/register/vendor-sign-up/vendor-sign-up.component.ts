import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'angular2-cookie/core';

import { User } from '../../model/user'
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-vendor-sign-up',
  templateUrl: './vendor-sign-up.component.html',
  styleUrls: ['./vendor-sign-up.component.css'],
  providers: [CookieService]
})
export class VendorSignUpComponent implements OnInit {
  myForm: FormGroup;
  user: User;
  constructor(private service: UserService,
    private cookieService: CookieService) { }

  ngOnInit() {
    this.getFormValidation()
  }
  onSubmit() {
    this.user = this.myForm.value.profile;
    this.user.hasShiftingDetail = false;
    this.user.role = 'vendor';
    this.login();
  }
  login() {
    this.service
      .setnewUser(this.user)
      .subscribe(res => {
        if (res.json().errors) {
          console.log(res.json());
        }
        else {
          this.cookieService.put('user', JSON.stringify(this.user))
          location.assign('myLogin')
        }
      })
  }
  getFormValidation() {
    this.myForm = new FormGroup({
      profile: new FormGroup({
        name: new FormControl(
          '', [
            Validators.required
          ]
        ),
        email: new FormControl(
          'email@exapmle.com', [
            Validators.required,
            Validators.pattern("^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]*\.([a-z]{2,4})$")
          ]
        ),
        mobile: new FormControl(
          '9898789825', [
            Validators.required,
            Validators.pattern('^[0-9]{10,10}$')
          ]
        )
      })
    })
  }

}

