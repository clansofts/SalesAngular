import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { MatDialog } from '@angular/material';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private customersService : CustomersService , private router : Router, public dialog: MatDialog) {}

  ngOnInit() {}

  openAddCustomer() {
    const dialogRef = this.dialog.open(AddCustomerComponent, {
      height: '540px',
      width:'460px'
    });
  }

  exportCustomersToCsv(){
    let csvContent = "data:text/csv;charset=utf-8,";
    let row = " ID , First name , Last name , Company ID , Email , Phone ";
    csvContent += row + "\r\n";
    this.customersService.customers.forEach(function(rowArray){
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
    document.body.appendChild(link); // Required for FF
    link.click(); 
  }

}
