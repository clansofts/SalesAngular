import {Comments} from "./comment";

export class Customer {
    public id : number;
    public firstName : string;
    public lastName : string;
    public companyID : number;
    public email : string;
    public phone : string;
    public comments : Array<Comments> = new Array<Comments>();
    constructor() {}
}
