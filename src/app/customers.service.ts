import { Injectable } from '@angular/core';
import { Customer } from './customer';
import { Subject ,Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  customer = new Customer();
  
  customers = new Array<Customer>();
  customersSubject : Subject<Customer[]> = new Subject<Customer[]>();
  customersObservable:Observable<Customer[]>;
  
  companys = new Array<Company>();
  companysSubject : Subject<Company[]> = new Subject<Company[]>();
  companysObservable:Observable<Company[]>;

  constructor(private http : HttpClient) {
    this.customersObservable = this.customersSubject.asObservable();
    this.companysObservable = this.companysSubject.asObservable();
    this.getCustomers();
    this.getCompanys();
  }

  getCustomers() : void {
    this.http.get<Customer[]>('/customers').subscribe((data)=>{
      this.customers = data;
      this.customersSubject.next(this.customers);
    });
  } 
  
  searchCustomers(searchVal : string  ,filter : string) : void {
    this.http.get<Customer[]>( '/customers/search?value=' + searchVal + "&filterBy="+filter).subscribe((data)=>{
      this.customers = data; 
      this.customersSubject.next(this.customers);
    });
  } 

  addNewCustomer(newCustomer: Customer){
    this.http.post<Customer>('/customers', { customer: newCustomer }).subscribe((data)=>{
      this.customers.push(data);
      this.customersSubject.next(this.customers);
    });
  }

  setCustomer(customer : Customer){
    this.customer = customer;
  }

  saveCustomer(customer : Customer){
    this.http.put<Customer[]>('/customers', { customer: customer }).subscribe((data)=>{
      this.customers = data;
      this.customersSubject.next(this.customers);
    });
  }

  getCompanys() : void {
    this.http.get<Company[]>('/companys').subscribe((data)=>{
      this.companys = data;
      this.companysSubject.next(this.companys);
    });
  } 

  deleteCustomer(id){
    this.http.delete<Customer[]>('/customers/' + id).subscribe((data)=>{
      this.customers = data;
      this.customersSubject.next(this.customers);
    });
  }

}

