import { User } from '../../model/user'


export class UserI {
    constructor() {
    }

    user: User; // current Dashboard user
    date: Date; 
    vehicleList;
    homeList;
    //info = true;
    orderDetails: [User]; //To assign List of orders placed by user(from customerOrderDetails)
    currentOrder
    //To hide div in html
    orderListHidden: boolean = true;
    vechicleListHidden: boolean = true;
    selectedItemHidden: boolean = true;
    termsHtmlHidden: boolean = true;
    homeListHtmlHidden: boolean = true;
    selectedHomeItemHidden = true

    selectedItem: User;
    pageSize;


    
}