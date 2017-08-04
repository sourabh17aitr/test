
import { Injectable } from '@angular/core'
import { Http } from '@angular/http';
import 'rxjs/Rx';

import { Vendor } from '../model/vendor';

@Injectable()
export class VendorService {
    vendor:Vendor = new Vendor()

    constructor(private http: Http) {

    }
    /* addVendor(vendor:Vendor){
       return this.http.post('http://localhost:2403/vendors',{
            "username": vendor.email,
            "name": vendor.name,
             "password": "root"
        })
    
    } */
    
}