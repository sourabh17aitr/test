/**
 * @description Contains shifting details
 */
export class CustomerDetails{
    shiftType:string
    vehicleList;

    Origin:string;
    originState:string;
    originAddress:string;
    originLandmark:string;
    originPin;

    Destination:string;
    destinationState:string;
    destinationAddress:string;
    destinationLandmark:string;
    destinationPin;

    status:string;

    date:string;

    item:string;
    itemDetails:string;
    price
    comment:string
    comments;
    vendorName:string
    homeDetail:string
    vendorId;

    constructor(){
    }
}

/**
 * @description user model class contains parameter of user
 * id,name,email,password,origin and destination city
 */
export class User extends CustomerDetails{
   
    id:string;
    name:string;
    email:string;
    mobile;
    password:string;
    hasShiftingDetail:boolean;
    role:string
    

    constructor(){
        super();
    }
}

