import { Injectable } from '@angular/core';
import { Customer } from './customer';
import { Subject ,Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Company } from './company';
import { Base } from './base';

@Injectable({
  providedIn: 'root'
})
export class CustomersService implements Base{
  customer = new Customer();
  
  customers = new Array<Customer>();
  customersSubject : Subject<Customer[]> = new Subject<Customer[]>();
  customersObservable:Observable<Customer[]>;

  constructor(private http : HttpClient) {
    this.customersObservable = this.customersSubject.asObservable();
  }


  get(): void {
    this.http.get<Customer[]>('/customers').subscribe((data)=>{
      this.customers = data;
      this.customersSubject.next(this.customers);
    });
  }
  
  search(filterObj : any) : void {
    this.http.get<Customer[]>( '/customers/search?value=' + filterObj.value + "&filterBy=" + filterObj.filter).subscribe((data)=>{
      this.customers = data; 
      this.customersSubject.next(this.customers);
    });
  }

  add(newCustomer : Customer) {
    this.http.post<Customer>('/customers', { customer: newCustomer }).subscribe((data)=>{
      this.customers.push(data);
      this.customersSubject.next(this.customers);
    });
  }
  
  saveChild(customer : Customer): void {
    this.http.put<Customer[]>('/customers', { customer: customer }).subscribe((data)=>{
      this.customers = data;
      this.customersSubject.next(this.customers);
    });
  }
  setChild(customer : Customer): void {
    this.customer = customer;
  }


  delete(id): void {
    this.http.delete<Customer[]>('/customers/' + id).subscribe((data)=>{
      this.customers = data;
      this.customersSubject.next(this.customers);
    });
  }
}

