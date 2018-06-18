import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomersService } from '../customers.service';
import { Company } from '../company';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  customer: Customer;
  companys :Array<Company>;
  selected :string ;
  constructor(private customersService : CustomersService) {
    this.customer = this.customersService.customer;
    this.companys = this.customersService.companys;
    this.selected = this.customer.companyID.toString();
  }

  ngOnInit() {
  }

  saveCustomer(){
    this.customer.companyID = parseInt(this.selected);
    this.customersService.saveCustomer(this.customer);
  }

}
