import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog,MatPaginator, MatTableDataSource,MatSnackBar} from '@angular/material';

import { CustomersService } from '../customers.service';
import { Customer } from '../customer';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { ShowCustomerComponent } from '../show-customer/show-customer.component';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  displayedColumns = ['id', 'firstName', 'lastName', 'companyID', 'email','phone','actions'];
  customers: Array<Customer>;
  dataSource : MatTableDataSource<Customer>;
  selectedFilter : string = "firstName";
  selectedValue : string = "";
  constructor(private customersService : CustomersService,public dialog: MatDialog , public snackBar: MatSnackBar) {
    this.customersService.customersObservable.subscribe((data)=>{
      this.customers = data;
      this.dataSource = new MatTableDataSource<Customer>(this.customers);
    });
  }
  
  ngOnInit() {
    this.customersService.get();
  }

  openShowCustomer(customer : Customer) {
    this.customersService.setChild(customer);
    const dialogRef = this.dialog.open(ShowCustomerComponent, {
      height: '425px',
      width:'650px'
    });
  }

  openEditCustomer(customer : Customer) {
    var newCustomer = JSON.parse(JSON.stringify(customer)); //create new customer
    this.customersService.setChild(newCustomer);
    const dialogRef = this.dialog.open(EditCustomerComponent, {
      height: '540px',
      width:'460px'
    });
  }

  filterAll(){
    var filterObj = {value : this.selectedValue , filter : this.selectedFilter};
    this.customersService.search(filterObj);
  }

  filterCompany(value :string, company:string){
    var filterObj = {value : value , filter : company};
    this.customersService.search(filterObj);
  }

  clearAll(){
    this.customersService.get();
    this.selectedValue = "";
    this.snackBar.open("All filters are clear", "OK", {
      duration: 3000,
    });

  }
}
 