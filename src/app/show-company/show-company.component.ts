import { Component, OnInit } from '@angular/core';
import { CompanysService } from '../companys.service';
import { Company } from '../company';

@Component({
  selector: 'app-show-company',
  templateUrl: './show-company.component.html',
  styleUrls: ['./show-company.component.scss']
})
export class ShowCompanyComponent implements OnInit {
  company : Company;
  constructor(private companysService : CompanysService) {
    this.company = this.companysService.company;
  }


  ngOnInit() {
  }

  
  deleteCompany(id){
    if(confirm('Sure you want delete?')) this.companysService.delete(id);
  }
  
}
