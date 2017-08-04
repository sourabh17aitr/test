import { Component, OnInit } from '@angular/core';

import { User } from '../../model/user'
import {UserService} from '../../service/user.service'

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  user:User
  resultuser;

  tiles = [
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  constructor(private service : UserService) { }

  ngOnInit() {
    this.onLogin()
  }
  onLogin(){
    let user = JSON.parse(localStorage.getItem('customerInfo'));
    
    //console.log(this.service.getUser().subscribe())
    return this.service
                .getUser()
                .subscribe(x => this.resultuser = x)
                

  }
  
}
