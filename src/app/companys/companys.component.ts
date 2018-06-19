import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog,MatPaginator, MatTableDataSource,MatSnackBar} from '@angular/material';

import { Company } from '../company';
import { CompanysService } from '../companys.service';
import { ShowCompanyComponent } from '../show-company/show-company.component';
import { EditCompanyComponent } from '../edit-company/edit-company.component';

@Component({
  selector: 'app-companys',
  templateUrl: './companys.component.html',
  styleUrls: ['./companys.component.scss']
})
export class CompanysComponent implements OnInit {
  displayedColumns = ['id', 'name', 'address', 'country', 'sizeCompany','establishedYear','ceo','actions'];
  companys: Array<Company>;
  dataSource : MatTableDataSource<Company>;
  selectedFilter : string = "name";
  selectedValue : string = "";
  constructor(private companysService : CompanysService ,public dialog: MatDialog , public snackBar: MatSnackBar) {
    this.companysService.companysObservable.subscribe((data)=>{
      this.companys = data;
      this.dataSource = new MatTableDataSource<Company>(this.companys);
    });
  }
  
  ngOnInit() {
    this.companysService.get();
  }

  openShowCompany(company : Company) {
    this.companysService.setChild(company);
    const dialogRef = this.dialog.open(ShowCompanyComponent, {
      height: '525px',
      width:'650px'
    });
  }

  openEditCompany(company : Company) {
    var newCompany = JSON.parse(JSON.stringify(company)); //create new company
    this.companysService.setChild(newCompany);
    const dialogRef = this.dialog.open(EditCompanyComponent, {
      height: '600px',
      width:'460px'
    });
  }

  filterAll(){
    var filterObj = {value : this.selectedValue , filter : this.selectedFilter};
    this.companysService.search(filterObj);
  }

  clearAll(){
    this.companysService.get();
    this.selectedValue = "";
    this.snackBar.open("All filters are clear", "OK", {
      duration: 3000,
    });

  }
}
 