import { Component, EventEmitter, Inject, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditproductsComponent } from '../editproducts/editproducts.component';
import { AddproductsComponent } from '../addproducts/addproducts.component';
import { AddclientpriceComponent} from '../addclientprice/addclientprice.component';
import { ProductService } from '../services/product.service';
import * as XLSX from 'xlsx';
import { NgxSpinnerService } from "ngx-spinner";
import { UsedproductService } from '../services/usedproduct.service';

import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['sno','productname','productcode','category','price','totalavailable','workshop1','workshop2','workshop3','actions'];


  display = 'none';
  patientdatasource: any;
  //patientdatasource = new MatTableDataSource(  ); 
 private _id :string;
  route: any;
  productname : string;
  dataRow:any;
  productleast: Object;

  constructor(public matDialog: MatDialog, private productService: ProductService,private datePipe: DatePipe, private usedproductService: UsedproductService, private router: Router,  private spinner: NgxSpinnerService) { }
  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
  @Output() actionFunction = new EventEmitter();


  ngOnInit() {
    this.loading();
  this.getproductleast();
  }
  loading() {
    this.spinner.show();
  
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.data();
      this.spinner.hide();
    }, 5000);
  };

getproductleast()
{
  this.productService.getproductleast().subscribe((result) => {
   
    this.productleast = result;
    console.log(this.productleast);
  
  })

}

  public doFilter = (value: string) => {
    this.patientdatasource.filter = value.trim().toLocaleLowerCase();
  }



  data()
  {
    this.productService.getAll().subscribe((result) => {
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
    const modalDialog = this.matDialog.open(EditproductsComponent, dialogConfig);
   
}

deleteUser(_id: string,productname:string) {
  if(confirm("Are you sure to delete "+ productname)) {
  this.productService.deleteUser(_id)
    .subscribe(
      data => {
        console.log(data);
      //  this.reloadData();
      },
      error => console.log(error));
      window.location.reload();
}}


public  getRecord(row : any){
  console.log(row);
  this.dataRow = row;
 // this.dataRow.createddate = this.datePipe.transform(row.value, 'yyyy-MM-dd');
 

   this.usedproductService.adddispatchproducts(this.dataRow)
        .subscribe((res) => {
          console.log(res)
         // this.addProduct.reset();
         // this.actionFunction();
        // this.getaddproducts();
        // window.location.reload();
        })
}


openModal1() {
  const dialogConfig = new MatDialogConfig();
  // The user can't close the dialog by clicking outside its body
  dialogConfig.disableClose = true;
  dialogConfig.id = "modal-component";
  dialogConfig.height = "550px";
  dialogConfig.width = "850px";
  
  const modalDialog = this.matDialog.open(AddproductsComponent, dialogConfig);
}


openModal2(val) {
  const dialogConfig = new MatDialogConfig();
  // The user can't close the dialog by clicking outside its body
  dialogConfig.disableClose = true;
  dialogConfig.id = "modal-component";
  dialogConfig.height = "550px";
  dialogConfig.width = "850px";
  dialogConfig.data = val._id;
  const modalDialog = this.matDialog.open(AddclientpriceComponent, dialogConfig);
}


ExportTOExcel()
{
  console.log("export");
  const workSheet = XLSX.utils.json_to_sheet(this.patientdatasource.data, {header:[]});
  workSheet['!cols'] = [];
  workSheet['!cols'][0] = { hidden: true };  
  workSheet['!cols'][9] = { hidden: true }; 
  const workBook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
  XLSX.writeFile(workBook, 'Products.xlsx');

}


}
