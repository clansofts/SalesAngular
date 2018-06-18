import { Injectable } from '@angular/core';
import { Company } from './company';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanysService {
  companys = new Array<Company>();
  companysSubject : Subject<Company[]> = new Subject<Company[]>();
  companysObservable:Observable<Company[]>;
  
  constructor(private http : HttpClient) {
    this.companysObservable = this.companysSubject.asObservable();
  }

  getCompanys() : void {
    this.http.get<Company[]>('/companys').subscribe((data)=>{
      this.companys = data;
      this.companysSubject.next(this.companys);
    });
  } 

}
