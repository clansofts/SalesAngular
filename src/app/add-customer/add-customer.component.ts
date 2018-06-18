import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomersService } from '../customers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../company';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  customer: Customer =new Customer();
  companys :Array<Company>;
  constructor(private customersService : CustomersService, private router : Router) { 
      this.companys = this.customersService.companys;
      this.customersService.companysObservable.subscribe((data)=>{
      this.companys = data;
      console.log(data);
    }); 
  }

  ngOnInit() {
  }

  addNewCustomer(){
    this.customersService.addNewCustomer(this.customer);
  }

}
