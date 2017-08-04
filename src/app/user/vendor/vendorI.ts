import { User } from '../../model/user';
import { FormGroup} from '@angular/forms';

export class VendorI{

    constructor() {

    }


    vendor: User // contians vendor user details only
    // customer: User;
    orderDetails: [User]; //contains all the available customers data
    vehicleList;
    homeDetail
    selectedItemDetails: User;

    //html hidding elements...
    orderHtmlHidden: boolean = true;
    orderDescriptionHtmlForm: boolean = true;
    vechicleListHidden: boolean = true;
    homeDetailForm:boolean = true

    itemUpdateForm: FormGroup;
    formVaildationMssage;
    dbItem: User; //contains price list data

    selectedVehicle; //to mathch the vehicle from vehicle list
    currentItemType;

    updatedCustomerShiftingDetails;

    currentVendorId
    homeItemDetail
}