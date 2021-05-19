import { Component, EventEmitter, Inject, OnInit, Optional, Output, ViewChild ,Pipe, PipeTransform} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AllordersService } from '../services/allorders.service';
import { OnlyordersService } from '../services/onlyorders.service';
import {OnlydispatchService} from '../services/onlydispatch.service';
import { OnlycompletedService } from '../services/onlycompleted.service';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import * as XLSX from 'xlsx';
import { Onlyorders } from '../models/onlyorders.model';
import { Allorders } from '../models/allorders.model';
import{ Onlydispatch} from '../models/onlydisptach.model';
import { PrintService } from '../print.service';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.css']
})
export class DispatchComponent implements OnInit {

  displayedColumns: string[] = ['sno','invoiceid','extracol','productname','category','quantity','clientname','location','processdate', 'dispatchdate','createddate','expecteddate','actions'];
  display = 'none';
  patientdatasource: any;
  //patientdatasource = new MatTableDataSource(  ); 
 private _id :string;
  route: any;
  productname : string;
  onlydispatch: Onlydispatch;
  Onlydispatch = new Onlydispatch();
  onlyorders: Onlyorders;
  Onlyorders = new Onlyorders();
  allorders: Allorders;
  Allorders = new Allorders();
  public isactive : boolean ;
  
  
  
  constructor(public matDialog: MatDialog, private OnlycompletedService: OnlycompletedService, public printService: PrintService, private allordersService: AllordersService,private OnlydispatchService: OnlydispatchService, private OnlyordersService: OnlyordersService, private router: Router,private datePipe: DatePipe,    private spinner: NgxSpinnerService) { }
  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
  @Output() actionFunction = new EventEmitter();

  loading() {
    this.spinner.show();
  
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.inputEvent1();
      this.spinner.hide();
    }, 5000);
  };

  ngOnInit() 
  {
    this.loading();  
    this.inputEvent1();
  }

  refresh(){
    this.spinner.show();
    setTimeout(() => {
      this.data();
      this.spinner.hide();
    }, 3000);
    
  }

  data()
  {
    this.OnlydispatchService.getAll().subscribe((result) => { 
      this.patientdatasource = result;
      console.log(this.patientdatasource);
      this.patientdatasource = new MatTableDataSource(this.patientdatasource);
      this.patientdatasource.paginator = this.paginator;
      this.patientdatasource.sort = this.sort;
     
  
    })
  }

 
public doFilter = (value: string) => {
  this.patientdatasource.filter = value.trim().toLocaleLowerCase();
}

deleteUser(_id: string,invoiceid:string) {
  if(confirm("Are you sure to delete "+ invoiceid))
   {
  this.OnlydispatchService.deleteUser(_id)
    .subscribe(
      data => {
        console.log(data);
      }, 
      error => console.log(error));
      window.location.reload();
} }

ExportTOExcel()
{
  console.log("export");
  const workSheet = XLSX.utils.json_to_sheet(this.patientdatasource.data, {header:[]});
  // delete (workSheet['01'])
  workSheet['!cols'] = [];
  workSheet['!cols'][0] = { hidden: true };  
 
  const workBook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
  
  XLSX.writeFile(workBook,  new Date().toDateString() + ' DailyDispatch .xlsx');

}

public  changeisactive(val : any,row){
  if(confirm("Sending To Completed ")) {
  console.log(val);
 // this.dataRow = row;
 row.extracol="Done";
 row.completeddate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
 this.loading();
// this.dataRow.createddate = this.datePipe.transform(row.value, 'yyyy-MM-dd');
 this.OnlycompletedService.adddispatchproducts(row)
        .subscribe((res) => {
      //    console.log(res)
         // this.addProduct.reset();
         // this.actionFunction();
        // this.getaddproducts();   
       })
   this.changeisactive1(val,row);
   this.changeisactive2(val,row);
 }
}

changeisactive1(val, row)
{ 
 row.isactive=true;
 row.extracol="Done";
// console.log(_id);
// console.log(row);
  this.OnlydispatchService.updateUser1(val, row)
  .subscribe((res) => {
    row = new Onlydispatch();
    console.log(res)
  })

}
changeisactive2(val, row)
{
 row.extracol="Order Completed";
// console.log(_id);
// console.log(row);
  this.allordersService.updateUser1(val, row)
  .subscribe((res) => {
    row = new Allorders();
    console.log(res)
  })

}

inputEvent(event){

  let dispatchdate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
   console.log(dispatchdate);
  this.OnlydispatchService.getProductbydate(dispatchdate)
     .subscribe(data => {
       console.log(data);
       this.patientdatasource = data;
       this.patientdatasource = new MatTableDataSource(this.patientdatasource);
       //this.gotoList();
     }, error => console.log(error));
  console.log(Date);

 }

 inputEvent1(){

  let dispatchdate =  this.datePipe.transform(new Date(), 'yyyy-MM-dd');
   console.log(dispatchdate);
  this.OnlydispatchService.getProductbydate(dispatchdate)
     .subscribe(data => {
       console.log(data);
       this.patientdatasource = data;
       this.patientdatasource = new MatTableDataSource(this.patientdatasource);
       //this.gotoList();
     }, error => console.log(error));
  console.log(Date);
 
 }

 modelChanged(date) {
  var theDate = new Date(Date.parse(date));
  const localDate = theDate.toLocaleString().split(" ");

  console.log(localDate);
}

changeEvent(event){
  // Return date object
  console.log(event.value);
}



}
