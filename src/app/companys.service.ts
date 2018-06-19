import { Injectable } from '@angular/core';
import { Company } from './company';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Base } from './base';

@Injectable({
  providedIn: 'root'
})
export class CompanysService implements Base{
  
  company = new Company();
  companys = new Array<Company>();
  companysSubject : Subject<Company[]> = new Subject<Company[]>();
  companysObservable:Observable<Company[]>;
  
  constructor(private http : HttpClient) {
    this.companysObservable = this.companysSubject.asObservable();
  }

  get(): void {
    this.http.get<Company[]>('/companys').subscribe((data)=>{
      this.companys = data;
      this.companysSubject.next(this.companys);
    });
  }
  
  search(filterObj : any) : void {
    this.http.get<Company[]>( '/companys/search?value=' + filterObj.value + "&filterBy=" + filterObj.filter).subscribe((data)=>{
      this.companys = data; 
      this.companysSubject.next(this.companys);
    });
  }
  
  add(newCompany : Company) {
    this.http.post<Company>('/companys', { company: newCompany }).subscribe((data)=>{
      this.companys.push(data);
      this.companysSubject.next(this.companys);
    });
  }
  
  setChild(company : Company): void {
    this.company = company;
  }
  
  delete(id): void {
    this.http.delete<Company[]>('/companys/' + id).subscribe((data)=>{
      this.companys = data;
      this.companysSubject.next(this.companys);
    });
  }

  saveChild(company : Company): void {
    this.http.put<Company[]>('/companys', { company: company }).subscribe((data)=>{
      this.companys = data;
      this.companysSubject.next(this.companys);
    });
  }
  
}
