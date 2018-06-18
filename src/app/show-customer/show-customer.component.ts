import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { Comments } from '../comment';
import { CustomersService } from '../customers.service';
import { CommentsService } from '../comments.service';

@Component({
  selector: 'app-show-customer',
  templateUrl: './show-customer.component.html',
  styleUrls: ['./show-customer.component.scss']
})
export class ShowCustomerComponent implements OnInit {
  customer: Customer;
  showComments:boolean;
  newComment : string = "";
  constructor(private customersService : CustomersService , private commentsService : CommentsService) {
    this.customer = this.customersService.customer;
    this.commentsService.customer = this.customer;
    this.commentsService.getComments();
    this.showComments = false;
    this.commentsService.commentsObservable.subscribe((data)=>{
      this.customer = data;
    });
  }

  openComments(){
    this.showComments = !this.showComments;
  }

  ngOnInit() {
  }

  addComment(fatherId: number){
    this.commentsService.addComment(this.newComment,fatherId);
    this.newComment = "";
  }

  
  deleteCustomer(id){
    if(confirm('Sure you want delete?')) this.customersService.deleteCustomer(id);
  }
  
}
