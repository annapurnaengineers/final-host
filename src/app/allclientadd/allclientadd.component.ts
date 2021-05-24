import { Component, EventEmitter, Inject, OnInit, Optional, Output, ViewChild ,Pipe, PipeTransform} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddclientaddComponent } from '../addclientadd/addclientadd.component';
import { ClientaddService } from '../services/clientadd.service';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import * as XLSX from 'xlsx';
import { EditclientaddComponent } from '../editclientadd/editclientadd.component';


@Component({
  selector: 'app-allclientadd',
  templateUrl: './allclientadd.component.html',
  styleUrls: ['./allclientadd.component.css']
})
export class AllclientaddComponent implements OnInit {
  displayedColumns: string[] = ['sno','clientname','clientcode','clientlocation','createddate','lastupdated','actions'];


  display = 'none';
  patientdatasource: any;
  //patientdatasource = new MatTableDataSource(  ); 
 private _id :string;
  route: any;
  productname : string;

  constructor(public matDialog: MatDialog, private ClientaddService: ClientaddService, private router: Router,private datePipe: DatePipe,    private spinner: NgxSpinnerService) { }
  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
  @Output() actionFunction = new EventEmitter();

  loading() {
    this.spinner.show();
  
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.data();
      this.spinner.hide();
    }, 3000);
  };

  
  ngOnInit() 
  {
    this.loading();  
   
  }


  data()
  {
    this.ClientaddService.getAll().subscribe((result) => { 
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

  deleteUser(_id: string,clientname:string) {
    if(confirm("Are you sure to delete "+ clientname))
     {
    this.ClientaddService.deleteClienaddtbyid(_id)
      .subscribe(
        data => {
          console.log(data);
        }, 
        error => console.log(error));
        window.location.reload();
  } 
}

openModal1() {
  const dialogConfig = new MatDialogConfig();
  // The user can't close the dialog by clicking outside its body
  dialogConfig.disableClose = true;
  dialogConfig.id = "modal-component";
  dialogConfig.height = "350px";
  dialogConfig.width = "850px";
  const modalDialog = this.matDialog.open(AddclientaddComponent, dialogConfig);
}

openModal(val) {
  console.log(val); 
  const dialogConfig = new MatDialogConfig();
  // The user can't close the dialog by clicking outside its body
  dialogConfig.disableClose = true;
  dialogConfig.id = "modal-component";
  dialogConfig.height = "350px";
  dialogConfig.width = "850px";
  dialogConfig.data = val._id;
  // https://material.angular.io/components/dialog/overview
  const modalDialog = this.matDialog.open(EditclientaddComponent, dialogConfig);
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
