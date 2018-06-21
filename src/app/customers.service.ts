import { Injectable } from '@angular/core';
import { Customer } from './customer';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersService extends BaseService<Customer>{
  customer = new Customer();
  route : string;

  constructor(http : HttpClient) {
    super(http);
    this.route = "customers";
  }

  setChild(customer : Customer): void {
    this.customer = customer;
  }
}

