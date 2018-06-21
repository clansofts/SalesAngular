import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomersComponent } from './customers/customers.component';
import { CdkTableModule} from '@angular/cdk/table';
import { DataSource} from '@angular/cdk/table';
import { MatBadgeModule,MatListModule,MatIconModule,MatButtonModule,MatSnackBarModule,MatTooltipModule,MatDialogModule,MatSelectModule,MatInputModule , MatFormFieldModule,MatCheckboxModule ,MatCardModule, MatTableModule,MatPaginatorModule } from '@angular/material';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { ShowCustomerComponent } from './show-customer/show-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CompanysComponent } from './companys/companys.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { ShowCompanyComponent } from './show-company/show-company.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { BaseService } from './base.service';
import { CompanysService } from './companys.service';
import { CustomersService } from './customers.service';
@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    AddCustomerComponent,
    ShowCustomerComponent,
    EditCustomerComponent,
    HeaderComponent,
    HomePageComponent,
    CompanysComponent,
    AddCompanyComponent,
    ShowCompanyComponent,
    EditCompanyComponent
    
    ],
  imports: [
    MatListModule,
    MatBadgeModule,
    HttpClientModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    BrowserModule,
    MatInputModule ,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule, 
    MatCardModule,
    MatTableModule,
    MatCheckboxModule,
    CdkTableModule,
    MatPaginatorModule
  ],
    
  providers: [BaseService , CompanysService , CustomersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
