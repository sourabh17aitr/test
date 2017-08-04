import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'angular2-cookie/core';

import { UserService } from '../../service/user.service';
import { User } from '../../model/user'
import{Router} from '@angular/router'


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [CookieService]
})
export class SignInComponent implements OnInit {
  myForm: FormGroup;
  user: User = new User();
  loginErrorMsg;
  
  constructor(private service: UserService,
    private router: Router,
    private cookieService: CookieService) {

  }

  ngOnInit() {
    this.getFormValidation(); //for validation of form
  }

  onSubmit() {
    this.user.email = this.myForm.value.profile.email;
    this.getLoginAuth(); //to authenticating the user   
  }

  getLoginAuth() {
    return this.service
      .userLogin(this.user)
      .subscribe(
          data => {
            
            this.cookieService.put('user',JSON.stringify(this.user));
            this.router.navigateByUrl('myLogin')
          },
          err => {
            this.loginErrorMsg = 'Please Enter Valid UserName'
            console.log('Something went wrong!');
          }
        )
  }

  getFormValidation() {
    this.myForm = new FormGroup({
      profile: new FormGroup({

        email: new FormControl(
          '', []
        ),
        mobile: new FormControl(
          'root', [
            Validators.required
          ]
        )
      })
    })
  }
  onEmailClick(){
    this.loginErrorMsg = ''
  }
}

