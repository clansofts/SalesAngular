import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { MatDialog } from '@angular/material';
import { CustomersService } from '../customers.service';
import { CompanysService } from '../companys.service';
import { AddCompanyComponent } from '../add-company/add-company.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private companysService : CompanysService ,private customersService : CustomersService , private router : Router, public dialog: MatDialog) {}

  ngOnInit() {}

  openAddCustomer() {
    const dialogRef = this.dialog.open(AddCustomerComponent, {
      height: '540px',
      width:'460px'
    });
  }

  openAddCompany() {
    const dialogRef = this.dialog.open(AddCompanyComponent, {
      height: '600px',
      width:'460px'
    });
  }

  exportCompanysToCsv(){
    let csvContent = "data:text/csv;charset=utf-8,";
    let row = " ID , Name , Address , Country , Size company , Established year , Ceo ";
    csvContent += row + "\r\n";

    this.companysService.items.forEach(function(rowArray){
      row = rowArray.id + "," +
            rowArray.name + "," +
            rowArray.address + "," +
            rowArray.country + "," +
            rowArray.sizeCompany + "," +
            rowArray.establishedYear + "," +
            rowArray.ceo;
      csvContent += row + "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "companys.csv");
    document.body.appendChild(link); // Required for FF
    link.click();
  }

  exportCustomersToCsv(){
    let csvContent = "data:text/csv;charset=utf-8,";
    let row = " ID , First name , Last name , Company ID , Email , Phone ";
    csvContent += row + "\r\n";
    this.customersService.items.forEach(function(rowArray){
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
