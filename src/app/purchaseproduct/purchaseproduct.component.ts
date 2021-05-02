import { Component, EventEmitter, Inject, OnInit, Optional, Output, ViewChild ,Pipe, PipeTransform} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddpurchaseproductComponent } from '../addpurchaseproduct/addpurchaseproduct.component';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import * as XLSX from 'xlsx';
import { EditpurchaseproductComponent } from '../editpurchaseproduct/editpurchaseproduct.component';
import { PurchaseproductService } from '../services/purchaseproduct.service';




@Component({
  selector: 'app-purchaseproduct',
  templateUrl: './purchaseproduct.component.html',
  styleUrls: ['./purchaseproduct.component.css']
})
export class PurchaseproductComponent implements OnInit {

  displayedColumns: string[] = ['sno','purchaseorder','category','productname','productcode','sellername','sellerprice', 'purchasedate','createddate','lastupdated','actions'];

  
  display = 'none';
  patientdatasource: any;
  //patientdatasource = new MatTableDataSource(  ); 
 private _id :string;
  route: any;
  productname : string;
  dataRow:any;
  productleast: Object;


  constructor(public matDialog: MatDialog, private purchaseproductService: PurchaseproductService,private datePipe: DatePipe, private router: Router,  private spinner: NgxSpinnerService) { }
  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
  @Output() actionFunction = new EventEmitter();


  ngOnInit() {
    this.loading();
  }
  loading() {
    this.spinner.show();
  
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.data();
      this.spinner.hide();
    }, 5000);
  };

  public doFilter = (value: string) => {
    this.patientdatasource.filter = value.trim().toLocaleLowerCase();
  }

  data()
  {
    this.purchaseproductService.getAll().subscribe((result) => {
      this.patientdatasource = result;
      console.log(this.patientdatasource);
      this.patientdatasource = new MatTableDataSource(this.patientdatasource);
      this.patientdatasource.paginator = this.paginator;
      this.patientdatasource.sort = this.sort;
     

    })
  }


  openModal(val) {
    console.log(val);
    
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;

    dialogConfig.id = "modal-component";
    dialogConfig.height = "550px";
    dialogConfig.width = "850px";
    dialogConfig.data = val._id;
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(EditpurchaseproductComponent, dialogConfig);
   
}


openModal1() {
  const dialogConfig = new MatDialogConfig();
  // The user can't close the dialog by clicking outside its body
  dialogConfig.disableClose = true;
  dialogConfig.id = "modal-component";
  dialogConfig.height = "550px";
  dialogConfig.width = "850px";
  
  const modalDialog = this.matDialog.open(AddpurchaseproductComponent, dialogConfig);
}


deleteUser(_id: string,productname:string) {
  if(confirm("Are you sure to delete "+ productname)) {
  this.purchaseproductService.deleteUser(_id)
    .subscribe(
      data => {
        console.log(data);
      //  this.reloadData();
      },
      error => console.log(error));
      window.location.reload();
}}

ExportTOExcel()
{
  console.log("export");
  const workSheet = XLSX.utils.json_to_sheet(this.patientdatasource.data, {header:[]});
  workSheet['!cols'] = [];
  workSheet['!cols'][0] = { hidden: true };  
  workSheet['!cols'][12] = { hidden: true }; 
  const workBook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
  XLSX.writeFile(workBook, 'PurchasedProducts.xlsx');

}



}
