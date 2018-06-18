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
  }

  openAddCustomer() {
    const dialogRef = this.dialog.open(AddCustomerComponent, {
      height: '540px',
      width:'460px'
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.snackBar.open("Inserted new customer", "OK", {
    //     duration: 3000,
    //   });
    // });
  }

  openShowCustomer(customer : Customer) {
    this.customersService.setCustomer(customer);
    const dialogRef = this.dialog.open(ShowCustomerComponent, {
      height: '425px',
      width:'650px'
    });
  }

  openEditCustomer(customer : Customer) {
    this.customersService.setCustomer(customer);
    const dialogRef = this.dialog.open(EditCustomerComponent, {
      height: '540px',
      width:'460px'
    });
  }

  filterAll(){
    this.customersService.searchCustomers(this.selectedValue ,this.selectedFilter);
  }

  exportToCsv(){
    let csvContent = "data:text/csv;charset=utf-8,";
    let row = " ID , First name , Last name , Company ID , Email , Phone ";
    csvContent += row + "\r\n";
    this.customers.forEach(function(rowArray){
      row = rowArray.id + "," +
            rowArray.firstName + "," +
            rowArray.lastName + "," +
            rowArray.companyID + "," + 
            rowArray.email + "," +
            rowArray.phone.toString();
      csvContent += row + "\r\n";
    }); 
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "customers.csv");
    link.innerHTML= "Click Here to download";
    document.body.appendChild(link); // Required for FF

    link.click(); 
  }

  filterCompany(value :string, company:string){
    this.customersService.searchCustomers(value , company);
  }

  clearAll(){
    this.customersService.getCustomers();
    this.selectedValue = "";
    this.snackBar.open("All filters are clear", "OK", {
      duration: 3000,
    });

  }
}
 