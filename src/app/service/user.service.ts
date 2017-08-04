import { User } from '../model/user';
import { Injectable } from '@angular/core'
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
/**
 * @description user service class having get post put methods to update user table
 */
export class UserService {

    user: User = new User();
    userId;

    constructor(private http: Http) {
    }

    /**
     * @description to add new user
     * @param newUser 
     */
    setnewUser(user: User) {
        return this.http
            .post('http://localhost:2403/users', {
                "username": user.email,
                "password": 'root',
                "name": user.name,
                'email': user.email,
                'mobile': user.mobile,
                'hasShiftingDetail': user.hasShiftingDetail,
                'role': user.role
            })

    }
    /**
     * @description Too add customer shifting Details and Item List
     * @param user 
     */
    setUserShippingDetails(user: User) {
        return this.http
            .post('http://localhost:2403/customer-vehicle-shipping', {
                "userName": user.email,
                "email": user.email,
                "vehicleList": user.vehicleList,
                "orignalCity": user.Origin,
                "orignalState": user.originState,
                "orignalAddress": user.originAddress,
                "orignalLandmark": user.originLandmark,
                "orignalPin": user.originPin,
                "destinationCity": user.Destination,
                "destinationState": user.destinationState,
                "destinationAddress": user.destinationAddress,
                "destinationLandmark": user.destinationLandmark,
                "destinationPin": user.destinationPin,
                'shiftType': user.shiftType,
                'status': 'pending',
                'date': user.date,
                'homeDetail': user.homeDetail
            })
            .subscribe(val => console.log(val))
    }

    /**
     * @description To verify the Login the user
     * @param user
     */
    userLogin(user: User) {
        return this.http
            .post('http://localhost:2403/users/login', {
                "username": user.email,
                "password": 'root'
            })


    }

    /**
     * @description To logout The User
     */
    userLogout() {
        this.http.post('http://localhost:2403/users/logout', {

        })
    }

    /**
     * @description To Get User Object form UID
     * @param id 
     */
    getUserDetails(id) {
        return this.http
            .get('http://localhost:2403/users/' + id)

    }

    /**
     * @description to get all shifting details of customers
     */
    getShiftingDetails() {
        return this.http
            .get('http://localhost:2403/customer-vehicle-shipping')

    }

    /**
     * @description To get current login user
     */
    getMe() {
        return this.http.get('http://localhost:2403//users/me')
    }

    /**
     * @description To get all available users
     */
    getUser() {
        return this.http
            .get('http://localhost:2403/users')
            .map(val => (val.json()))
    }

    /**
     * @description To add shifting item rates
     * @param item 
     */
    addItem(item: User) {
        if (item.itemDetails) {
            return this.http.post('http://localhost:2403/items', {
                "uesrname": item.email,
                "item": item.shiftType,
                "itemDetails": item.itemDetails,
                "price": item.price,
                "comments": item.comment,
                "vendorName": item.vendorName,
                "vendorId":item.vendorId
            })
        }
        else {
            return this.http.post('http://localhost:2403/items', {
                "uesrname": item.email,
                "item": item.shiftType,
                "itemDetails": item.vehicleList,
                "price": item.price,
                "comments": item.comment,
                "vendorName": item.vendorName,
                "vendorId":item.vendorId
            })
        }

    }

    getShiftingItmRate() {
        return this.http
            .get('http://localhost:2403/items')
    }

    putCustomerShiftingDetails(user) {
        return this.http
            .put('http://localhost:2403/customer-vehicle-shipping/' + user.id, {
                "userName": user.email,
                "email": user.email,
                "vehicleList": user.vehicleList,
                "orignalCity": user.Origin,
                "orignalState": user.originState,
                "orignalAddress": user.originAddress,
                "orignalLandmark": user.originLandmark,
                "orignalPin": user.originPin,
                "destinationCity": user.Destination,
                "destinationState": user.destinationState,
                "destinationAddress": user.destinationAddress,
                "destinationLandmark": user.destinationLandmark,
                "destinationPin": user.destinationPin,
                'shiftType': user.shiftType,
                'status': user.status,
                'date': user.date,
                'comments': user.comment
            })
    }
}
