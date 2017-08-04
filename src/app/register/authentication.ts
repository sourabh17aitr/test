import { Component, OnInit } from '@angular/core';

import { CookieService } from 'angular2-cookie/core';
import { UserService } from '../service/user.service';
import { User } from '../model/user'

/**
 * @description To get Login and Signup Authentication
 */
@Component({
    providers: [CookieService]
})
class Authentication {

    user: User;
    loginErrorMsg;

    constructor(private service: UserService,
        private cookieService: CookieService) {

    }

    private getLoginAuth() {
        return this.service
            .userLogin(this.user)
            .subscribe(
            data => {

                this.cookieService.put('user', JSON.stringify(this.user));
                location.replace('myLogin')
            },
            err => {
                this.loginErrorMsg = 'Please Enter Valid UserName'
                console.log('Something went wrong!');
            }
            )
    }
}