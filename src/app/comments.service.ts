import { Injectable } from '@angular/core';
import { Comments } from './comment';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  customer = new Customer();
  commentsSubject : Subject<Customer> = new Subject<Customer>();
  commentsObservable:Observable<Customer>;
  constructor(private http : HttpClient) {
    this.commentsObservable = this.commentsSubject.asObservable();
  }

  getComments() : void {
    this.http.get<Comments[]>('/comments/' + this.customer.id).subscribe((data)=>{
      this.customer.comments = data;
      this.commentsSubject.next(this.customer);
    });
  } 

  addComment(text: string , fatherID: number) {
    var comment = new Comments(text,new Date(),fatherID);
    this.http.post<Comments>('/comments', { comment: comment }).subscribe((data)=>{
      this.customer.comments.push(data);
      this.commentsSubject.next(this.customer);
    });
  }
}
