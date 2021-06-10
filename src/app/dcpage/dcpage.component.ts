import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { MatTableDataSource } from '@angular/material/table';
import { AllordersService } from '../services/allorders.service';
import { Router } from '@angular/router';
import { ClientlistService } from '../services/clientlist.service';
import { DcService } from '../services/dc.service';
import { ClientaddService } from '../services/clientadd.service';
import { filter } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { MailboxComponent } from '../mailbox/mailbox.component';

@Component({
  selector: 'app-dcpage',
  templateUrl: './dcpage.component.html',
  styleUrls: ['./dcpage.component.css']
})
export class DcpageComponent implements OnInit {
  displayedColumns: string[] = ['sno','productname','quantity']
  isShown: boolean;
  clientlist :any;
  invoiceid :any;
  //Test: FormGroup;
  patientdatasource: any;
  patientdatasource1: any;
  productname:any;
  selectedclient :any;
dcid:any;
names:any;
filter:String;
//h:any;
toppings = new FormControl();
Test = new FormControl();
matArray = [];

  constructor(public matDialog: MatDialog,private allordersService:  AllordersService,private cc :ClientaddService,private clietlistService : ClientlistService,private dcservice : DcService) {}

  ngOnInit() { 
    this.getclientlist();
    this.isShown = true; 
    this.openModal0();
   // this.data();
  }


  getclientlist()
  {

      this.cc.getAll().subscribe((result) => { 
      this.clientlist = result;
      console.log(this.clientlist);
       })
  }

  printPage() {
    window.print();
  }


  changedvalue1(v)
  {

    //let cp =this.clientlist;
   console.log(v);
   this.selectedclient = v.target.value;
   this.allordersService.getInvoicebyclient(v.target.value).subscribe((result) => { 
   // this.invoiceid = result;
   let temp = {}
    for (var i = 0; i < result.length; i++) {
        temp[result[i].invoiceid] = result[i].invoiceid;
    }
    
    console.log(temp);
    this.invoiceid = Object.keys(temp) ; //Object.values(temp) ;
    // this.category2 =  this.productname1.productname;
  //  let invoiceid =  result && result[0].invoiceid;
     // this.addAllorders.controls.category.setValue(cp);
     console.log(this.invoiceid);
    
   }, error => console.log(error));
  }


  changedvalue2(v)
  {
//let cp =this.clientlist;
   console.log(v);
this.names = v.target.value;
   this.allordersService.getDcprint(this.selectedclient,v.target.value).subscribe((result) => { 
    this.productname = [...result];
    //   console.log(this.patientdatasource);
     console.log(result);
this.getdcbyinvoiceid(v);
 // console.log(this.updatedvales);
 
   }, error => console.log(error));
    
  }

  changedvalue3(v)
  {
//let cp =this.clientlist;
   
  //  this.allordersService.getDcprint(this.selectedclient,this.names).subscribe((result) => { 
    // const found = array1.find(element => element > 10);
    //  console.log(result);
     console.log(v);
     let selectedelement,matarray=[];

      for (var i = 0; i < v.length; i++) {
        selectedelement  = this.productname.find(el=>el.productname == v[i]);
        matarray.push(selectedelement);
      }
        this.patientdatasource1 = new MatTableDataSource(matarray);
   


 

    // let dataFiltered = result.filter(function(result){
    //   return result.productname[0].indexOf(filter) > 1
    // })
    // console.log(dataFiltered);
   //  this.patientdatasource = result;

  //  let temp1 = [];

  //  for (var i = 0; i < h; i++) {
  //      temp1[i] = h;
  //  }
   
 //this.productname = Object.keys(temp1) ;
// this.patientdatasource1 = Object.keys(this.matArray) ;
 //this.productname= temp1 && temp1[0].keys;
 
  // console.log(this.patientdatasource1);
    
  // }, error => console.log(error));
    
  }
  getdcbyinvoiceid(v)
  {
    this.dcservice.getDcidbyincoiceid(this.selectedclient,v.target.value).subscribe((result) => { 
      this.dcid = result && result[0].dcid;
       console.log(this.dcid);
     console.log(result);
 
   }, error => console.log(error));
    
  }

  
  toggleShow() {
    this.isShown = ! this.isShown;
  }


  openModal0() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "350px";
    
    const modalDialog = this.matDialog.open(MailboxComponent, dialogConfig);
  }

}
