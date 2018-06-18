export class Comments {
    public id : number;
    public customerID : number;
    public text : string;
    public createDate : Date;
    constructor(text,createDate,customerID) {
        this.text = text;
        this.createDate = createDate;
        this.customerID = customerID;
    }
}
