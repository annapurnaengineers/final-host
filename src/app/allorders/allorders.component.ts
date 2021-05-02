import { Component, EventEmitter, Inject, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditallordersComponent } from '../editallorders/editallorders.component';
import { AddallordersComponent } from '../addallorders/addallorders.component';
import { OnlyordersService } from '../services/onlyorders.service';
import * as XLSX from 'xlsx';
import { NgxSpinnerService } from "ngx-spinner";
import { AllordersService } from '../services/allorders.service';

import { DatePipe } from '@angular/common';
import { Allorders } from '../models/allorders.model';


@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {
  displayedColumns: string[] = ['sno','invoiceid','extracol','productname','category','quantity','clientname','clientprice','advancereceived','location','createddate','expecteddate','actions'];


  display = 'none';
  patientdatasource: any;
  //patientdatasource = new MatTableDataSource(  ); 
 private _id :string;
  route: any;
  productname : string;
  invoiceid : string;
  dataRow:any;
 public isactive : boolean ;
  allorders: Allorders;
  Allorders = new Allorders();

  constructor(public matDialog: MatDialog, private allordersService: AllordersService,private datePipe: DatePipe, private onlyordersService: OnlyordersService, private router: Router,  private spinner: NgxSpinnerService) { }
  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
  @Output() actionFunction = new EventEmitter();

  ngOnInit()
   {
   this.loading();
 //  this.data();
  }

  loading() 
  {
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
    this.allordersService.getAll().subscribe((result) => {
      this.patientdatasource = result;
      console.log(this.patientdatasource);
      this.patientdatasource = new MatTableDataSource(this.patientdatasource);
      this.patientdatasource.paginator = this.paginator;
      this.patientdatasource.sort = this.sort;
     

    })
  }


deleteUser(_id: string,productname:string) {
  if(confirm("Are you sure to delete "+ this.invoiceid)) {
  this.allordersService.deleteUser(_id)
    .subscribe(
      data => {
        console.log(data);
      //  this.reloadData();
      },
      error => console.log(error));
      window.location.reload();
}}

public  changeisactive(val : any,row){
  if(confirm("Sending To Production ")) {
  console.log(val);
 // this.dataRow = row;
 row.isactive=false;
 row.processdate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
 this.loading();
// this.dataRow.createddate = this.datePipe.transform(row.value, 'yyyy-MM-dd');
 this.onlyordersService.adddispatchproducts(row)
        .subscribe((res) => {
      //    console.log(res)
         // this.addProduct.reset();
         // this.actionFunction();
        // this.getaddproducts();
        
       })

   this.changeisactive1(val,row);
      }
}

changeisactive1(val, row)
{
  
 row.isactive=true;
 row.extracol="Processing";
// console.log(_id);
// console.log(row);
  this.allordersService.updateUser1(val, row)
  .subscribe((res) => {
    row = new Allorders();
    console.log(res)
  })

}


inputEvent1(){

  let createddate =  this.datePipe.transform(new Date(), 'yyyy-MM-dd');
   console.log(createddate);
  this.allordersService.getProductbydate(createddate)
     .subscribe(data => {
       console.log(data);
       this.patientdatasource = data;
       this.patientdatasource = new MatTableDataSource(this.patientdatasource);
       this.patientdatasource.paginator = this.paginator;
      this.patientdatasource.sort = this.sort;
       //this.gotoList();
     }, error => console.log(error));
  console.log(Date);
 
 
 }
 inputEvent(event){

  let createddate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
   console.log(createddate);
  this.allordersService.getProductbydate(createddate)
     .subscribe(data => {
       console.log(data);
       this.patientdatasource = data;
       this.patientdatasource = new MatTableDataSource(this.patientdatasource);
       this.patientdatasource.paginator = this.paginator;
       this.patientdatasource.sort = this.sort;
       //this.gotoList();
     }, error => console.log(error));
  console.log(Date);

 }


modelChanged(date) {
  var theDate = new Date(Date.parse(date));
  const localDate = theDate.toLocaleString().split(" ");

  console.log(localDate);
}



openModal1() {
  const dialogConfig = new MatDialogConfig();
  // The user can't close the dialog by clicking outside its body
  dialogConfig.disableClose = true;
  dialogConfig.id = "modal-component";
  dialogConfig.height = "550px";
  dialogConfig.width = "850px";
  
  const modalDialog = this.matDialog.open(AddallordersComponent, dialogConfig);
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
  const modalDialog = this.matDialog.open(EditallordersComponent, dialogConfig);
 }


ExportTOExcel()
{
  console.log("export");
  const workSheet = XLSX.utils.json_to_sheet(this.patientdatasource.data, {header:[]});
  workSheet['!cols'] = [];
  workSheet['!cols'][0] = { hidden: true };  
  workSheet['!cols'][10] = { hidden: true }; 
  workSheet['!cols'][15] = { hidden: true };  
  console.log(this.patientdatasource.data.expecteddate)
  const workBook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
  XLSX.writeFile(workBook, 'Orders.xlsx');

}

}
