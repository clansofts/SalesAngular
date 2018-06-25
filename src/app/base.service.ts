import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BaseService<T> {
  public items: Array<T> = new Array<T>();
  public route : string; //the route for request to server API

  //set Observable & Subject
  public itemSubject : Subject<T[]> = new Subject<T[]>();
  public itemObservable:Observable<T[]>;

  constructor(private http : HttpClient) {
      this.itemObservable = this.itemSubject.asObservable(); // connect the Observable to Subject
  }

  // http request to server API to get all the items
  get(): void {
    this.http.get<T[]>("/" + this.route).subscribe((data)=>{
        this.items = data;
        this.itemSubject.next(this.items); //update the observable
    });
  }

  // http request to server API to get all the items with filter word
  search(filterObj : any) : void {
    this.http.get<T[]>( '/' + this.route + '/search?value=' + filterObj.value + "&filterBy=" + filterObj.filter).subscribe((data)=>{
      this.items = data; 
      this.itemSubject.next(this.items); //update the observable
    });
  }

  // http request to server API to add a new item
  add(item : T) {
    this.http.post<T>('/' + this.route, { item: item }).subscribe((data)=>{
      this.items.push(data);
      this.itemSubject.next(this.items); //update the observable
    });
  }

  // http request to server API to update item
  saveChild(item : T): void {
    this.http.put<T[]>('/' + this.route, { item: item }).subscribe((data)=>{
      this.items = data;
      this.itemSubject.next(this.items); //update the observable
    });
  }

  // http request to server API to delete item
  delete(id): void {
    this.http.delete<T[]>('/' + this.route + '/' + id).subscribe((data)=>{
      this.items = data;
      this.itemSubject.next(this.items); //update the observable
    });
  }

}
