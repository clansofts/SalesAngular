import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { ShowCustomerComponent } from './show-customer/show-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CompanysComponent } from './companys/companys.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { ShowCompanyComponent } from './show-company/show-company.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'customers-page', component: CustomersComponent},
  { path: 'companys-page', component: CompanysComponent},
  { path: 'add-customer', component: AddCustomerComponent },
  { path: 'add-company', component: AddCompanyComponent },
  { path: 'edit-company', component: EditCompanyComponent },
  { path: 'edit-customer', component: EditCustomerComponent },
  { path: 'show-customer', component: ShowCustomerComponent },
  { path: 'show-company', component: ShowCompanyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
