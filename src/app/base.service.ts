import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {
  public items: Array<T> = new Array<T>();
  public itemSubject : Subject<T[]> = new Subject<T[]>();
  public itemObservable:Observable<T[]>;
  public route : string;

  constructor(private http : HttpClient) {
      this.itemObservable = this.itemSubject.asObservable();
  }

  get(): void {
    this.http.get<T[]>("/"+this.route).subscribe((data)=>{
        this.items = data;
        this.itemSubject.next(this.items);
    });
  }

  search(filterObj : any) : void {
    this.http.get<T[]>( '/' + this.route + '/search?value=' + filterObj.value + "&filterBy=" + filterObj.filter).subscribe((data)=>{
      this.items = data; 
      this.itemSubject.next(this.items);
    });
  }

  add(item : T) {
    this.http.post<T>('/' + this.route, { item: item }).subscribe((data)=>{
      this.items.push(data);
      this.itemSubject.next(this.items);
    });
  }

  saveChild(item : T): void {
    this.http.put<T[]>('/' + this.route, { item: item }).subscribe((data)=>{
      this.items = data;
      this.itemSubject.next(this.items);
    });
  }

  delete(id): void {
    this.http.delete<T[]>('/' + this.route + '/' + id).subscribe((data)=>{
      this.items = data;
      this.itemSubject.next(this.items);
    });
  }

}
