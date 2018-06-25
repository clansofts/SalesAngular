import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CompanysService extends BaseService<Company>{
  company = new Company();
  route : string;

  constructor(http : HttpClient) {
    super(http);
    this.route = "companys"; //change the route for http request
  }
  
  setChild(company : Company): void {
    this.company = company;
  }
  
}
