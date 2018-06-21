import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../company';
import { CompanysService } from '../companys.service';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  customer: Customer =new Customer();
  companys :Array<Company>;
  constructor(private companysService : CompanysService, private customersService : CustomersService, private router : Router) { 
      this.companysService.get();
      this.companys = this.companysService.items;
      this.companysService.itemObservable.subscribe((data)=>{
      this.companys = data;
    }); 
  }

  ngOnInit() {
  }

  addNewCustomer(){
    this.customersService.add(this.customer);
  }

}
