import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomersService } from '../customers.service';
import { Company } from '../company';
import { CompanysService } from '../companys.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  customer: Customer;
  companys :Array<Company>;
  selected :string ;
  constructor(private companysService : CompanysService , private customersService : CustomersService) {
    this.companysService.get();
    this.companys = this.companysService.items;
    this.companysService.itemObservable.subscribe((data)=>{
      this.companys = data;
    }); 
    this.customer = this.customersService.customer;
    this.selected = this.customer.companyID.toString();
  }

  ngOnInit() {
  }

  saveCustomer(){
    this.customer.companyID = parseInt(this.selected);
    this.customersService.saveChild(this.customer);
  }

}
