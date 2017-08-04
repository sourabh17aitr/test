/**
 * @description vehicle model class contains type of vehicle and 
 * array of segment available for that vehicle
 */
export class Vehicle{
    public selectedSegment:string
    constructor(public type:string,
        public typeList:Array<string>
    )
    {
        
    }
    
}
/**
 * @description model class for selected vehicle type and segment
 */
export class SelectedVehicle{
    public selectedSegment:string;
    public selectedType:string
    constructor()
    {
        
    }
    
}