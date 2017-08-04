
import { Injectable } from '@angular/core'

import { User } from '../model/user';

@Injectable()
export class UserData{

    private userInfo:User

    private shiftingType:string;

    private homeDetail;

    getShiftingType(){
        return this.shiftingType
    }
    setShiftingType(shiftType){
        this.shiftingType = shiftType
    }

    getUserInfo(){
        return this.userInfo;
    }
    setUserInfo(user:User){
        this.userInfo = user
    }

    getHomeDetail(){
        return this.homeDetail
    }
    setHomeDetail(homeDetail){
        this.homeDetail = homeDetail
    }
}

