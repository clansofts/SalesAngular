import { Component, OnInit } from '@angular/core';
import { Company } from '../company';
import { CompanysService } from '../companys.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {
  company: Company ;
  sizes : Array<string> = ['0-20' ,'20-50' ,'50-100' ,'100-200','200-1000'];
  constructor(private companysService : CompanysService) {
    this.company = this.companysService.company;
  }

  ngOnInit() {
  }

  saveCompany(){
    this.companysService.saveChild(this.company);
  }

}
