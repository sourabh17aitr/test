import { Component, OnInit } from '@angular/core';


import {UserService} from '../../service/user.service';
import{User} from'../../model/user'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user :User;
  constructor(private service: UserService) { }

  ngOnInit() {
  }

}
