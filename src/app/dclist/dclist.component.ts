import { Component, EventEmitter, Inject, OnInit, Optional, Output, ViewChild ,Pipe, PipeTransform} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdddclistComponent } from '../adddclist/adddclist.component';
import { AddscrapComponent } from '../addscrap/addscrap.component';
import { DcService } from '../services/dc.service';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import * as XLSX from 'xlsx';
import { EditdclistComponent } from '../editdclist/editdclist.component';
import { ClientlistService } from '../services/clientlist.service';
import { jsPDF } from "jspdf";
import { AllordersService} from '../services/allorders.service';



@Component({
  selector: 'app-dclist',
  templateUrl: './dclist.component.html',
  styleUrls: ['./dclist.component.css']

})
export class DclistComponent implements OnInit {
  displayedColumns: string[] = ['sno','dcid','invoiceid','clientname','balanceamount','advancegot','finalinvoicebill','totalproductstaken','createddate','lastupdated','actions'];
  displayedColumns1: string[] = ['sno','invoiceid','productname','clientprice','quantity','finalbill','createddate']
 
 
  display = 'none';
  patientdatasource: any;
  patientdatasource1: any;
  //patientdatasource = new MatTableDataSource(  ); 
 private _id :string;
  route: any;
  productname : string;
  balanceamount:number;
  clientlist:any;
  selectedclient:any;
  data1:any;
  isShown: boolean;
  v:any;
  clientbalancetobepaid :any;
  clientadvacnepaid :any;
  clienttotalbill:any;
  currentbalance:any;

  constructor(public matDialog: MatDialog,private clietlistService : ClientlistService,private allordersService : AllordersService, private DcService: DcService, private router: Router,private datePipe: DatePipe,private spinner: NgxSpinnerService) { }
  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
  @Output() actionFunction = new EventEmitter();


  
  loading() {
    this.spinner.show();
  
    setTimeout(() => {
      /** spinner ends after 5 seconds */
     // this.data();
      this.spinner.hide();
    }, 3000);
  };


  ngOnInit() 
  {
    this.loading();  
    this.getclientlist();
    this.isShown = true;
    
   
  }

 


getclientlist()
{
this.clietlistService.getclientnameonly().subscribe((result) => { 
this.clientlist = result;
console.log(this.clientlist);

   })
}

changedvalue1(v)
{

 console.log(v);
 this.selectedclient = v.target.value;
 this.DcService.getAlldcbyclientname(v.target.value).subscribe((result) => { 
this.data1 = result;
   console.log(this.data1);
this.data();
  
 }, error => console.log(error));
}

data()
{
let sc = this.selectedclient;
  this.DcService.getAlldcbyclientname(sc).subscribe((result) => {  
    this.patientdatasource = result;
    console.log(this.patientdatasource);
    this.v = this.patientdatasource;
   this.patientdatasource = new MatTableDataSource(this.patientdatasource);
    this.patientdatasource.paginator = this.paginator;
    this.patientdatasource.sort = this.sort;
  // this.getTotalCost();
  this.getTotalCost();
  this.getallinvoice();

  })
}

getallinvoice()
{

  this.allordersService.getAllinvoicebyclientname(this.selectedclient).subscribe((result) => {  
    this.patientdatasource1 = result;
    console.log(this.patientdatasource1);
    this.v = this.patientdatasource1;
   this.patientdatasource1 = new MatTableDataSource(this.patientdatasource1);
 
  })
}

getTotalCost()
{
 
  
    this.DcService.getTotalbalancebyclientname(this.selectedclient).subscribe((result) => { 
      this.clientbalancetobepaid = result && result[0].balanceamountfromclient;
      this.clientadvacnepaid =result && result[0].amountreceivedfromclient;
      this.clienttotalbill= result && result[0].finalamountfromclient;
     // this.currentbalance = this.clienttotalbill -
      this.currentbalance = parseInt(this.clienttotalbill)-parseInt(this.clientadvacnepaid);
       console.log(this.clientbalancetobepaid );
       console.log(this.clientadvacnepaid );
       console.log(this.clienttotalbill );
       console.log(result,"check");
      }, error => console.log(error));
  

}



public doFilter = (value: string) => {
  this.patientdatasource.filter = value.trim().toLocaleLowerCase();
}

deleteUser(_id: string,dcid:string) {
  if(confirm("Are you sure to delete "+ dcid))
   {
  this.DcService.deleteClientbyid(_id)
    .subscribe(
      data => {
        console.log(data);
      }, 
      error => console.log(error));
      window.location.reload();
} }



openModal0() {
  const dialogConfig = new MatDialogConfig();
  // The user can't close the dialog by clicking outside its body
  dialogConfig.disableClose = true;
  dialogConfig.id = "modal-component";
  dialogConfig.height = "400px";
  dialogConfig.width = "850px";
  const modalDialog = this.matDialog.open(AddscrapComponent, dialogConfig);
}


openModal1() {
  const dialogConfig = new MatDialogConfig();
  // The user can't close the dialog by clicking outside its body
  dialogConfig.disableClose = true;
  dialogConfig.id = "modal-component";
  dialogConfig.height = "400px";
  dialogConfig.width = "850px";
  const modalDialog = this.matDialog.open(AdddclistComponent, dialogConfig);
}

openModal(val) {
  console.log(val); 
  const dialogConfig = new MatDialogConfig();
  // The user can't close the dialog by clicking outside its body
  dialogConfig.disableClose = true;
  dialogConfig.id = "modal-component";
  dialogConfig.height = "400px";
  dialogConfig.width = "850px";
  dialogConfig.data = val._id;
  // https://material.angular.io/components/dialog/overview
  const modalDialog = this.matDialog.open(EditdclistComponent, dialogConfig);
 }

 ExportTOExcel()
{
  console.log("export");
  const workSheet = XLSX.utils.json_to_sheet(this.patientdatasource.data, {header:[]});
  // delete (workSheet['01'])
  workSheet['!cols'] = [];
  workSheet['!cols'][0] = { hidden: true };   
  // workSheet['!cols'][7] = { hidden: true };  
  // workSheet['!cols'][8] = { hidden: true };  
  // workSheet['!cols'][9] = { hidden: true };  
  // workSheet['!cols'][10] = { hidden: true };  
  // workSheet['!cols'][11] = { hidden: true };  
  // workSheet['!cols'][12] = { hidden: true }; 
  // workSheet['!cols'][14] = { hidden: true }; 
  // workSheet['!cols'][15] = { hidden: true }; 
  const workBook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
  
  XLSX.writeFile(workBook,  new Date().toDateString() + ' ClientPricelist .xlsx');

}


inputEvent(event){

  let createddate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
   console.log(createddate);
  this.DcService.getAlldcbycreateddate(createddate)
     .subscribe(data => {
       console.log(data);
       this.patientdatasource = data;
       this.patientdatasource = new MatTableDataSource(this.patientdatasource);
       this.patientdatasource.paginator = this.paginator;
       this.patientdatasource.sort = this.sort;
       //this.gotoList();
     }, error => console.log(error));
  console.log(Date);
 
 
 // inputEvent = (value: Date) => {
 //   Date:{{todayISOString  | date}}
 //   this.patientdatasource.filter = value.trim().toLocaleLowerCase();
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


toggleShow() {
  this.isShown = ! this.isShown;
}




}
