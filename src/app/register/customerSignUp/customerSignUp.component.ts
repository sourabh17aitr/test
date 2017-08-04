import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'angular2-cookie/core';

import { UserService } from '../../service/user.service';
import { User } from '../../model/user'
import{Router} from '@angular/router'

@Component({
  selector: 'app-customerSignUp',
  templateUrl: './customerSignUp.component.html',
  styleUrls: ['./customerSignUp.component.css'],
  providers: [CookieService]
})
export class CustomerSignUpComponent implements OnInit {
  message: String;
  myForm: FormGroup;
  user: User;
  loginErrorMsg;

  constructor(private service: UserService,
    private router: Router,
    private cookieService: CookieService) { }

  ngOnInit() {
    this.getFormValidation();
  }

  onSubmit() {
    this.user = this.getUserInfo(this.myForm.value.profile);
    this.user.hasShiftingDetail = false

    /* if (this.service.setnewUser(this.user)) {
      this.cookieService.put('user', JSON.stringify(this.user))
      location.assign('myLogin')
    }; */
    this.getAuthtentication();
  }
  getAuthtentication() {
    this.service
      .setnewUser(this.user)
      .subscribe(
        data => {

          this.cookieService.put('user', JSON.stringify(this.user));
          this.router.navigateByUrl('myLogin')
        },
          err => {
            this.loginErrorMsg = 'This Email Alredy Exist Please Login'
            console.log('Something went wrong!');
          }
      )
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
          'email@example.com', [
            Validators.pattern("^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]*\.([a-z]{2,4})$"),
            Validators.required
          ]
        ),
        mobile: new FormControl(
          '9896532568', [
            Validators.required,
            Validators.pattern('^[0-9]{10,10}$')
          ]
        )
      })
    })
  }

  getUserInfo(obj) {
    this.user = new User()
    this.user.name = obj.name;
    this.user.email = obj.email;
    this.user.password = obj.mobile;
    return this.user;
  }

}
