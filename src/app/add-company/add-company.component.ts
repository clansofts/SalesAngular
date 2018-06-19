import { Component, OnInit } from '@angular/core';
import { Company } from '../company';
import { CompanysService } from '../companys.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {
  company: Company =new Company();
  sizes : Array<string> = ['0-20' ,'20-50' ,'50-100' ,'100-200','200-1000'];
  constructor(private companysService : CompanysService, private router : Router) { 

  }

  ngOnInit() {
  }

  addNewCompany(){
    this.companysService.add(this.company);
  }

}
