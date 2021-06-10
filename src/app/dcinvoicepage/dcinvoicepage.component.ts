import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatTableDataSource } from '@angular/material/table';
import { AllordersService } from '../services/allorders.service';
import { Router } from '@angular/router';
import { ClientlistService } from '../services/clientlist.service';
import { DcService } from '../services/dc.service';
import { ClientaddService } from '../services/clientadd.service';
@Component({
  selector: 'app-dcinvoicepage',
  templateUrl: './dcinvoicepage.component.html',
  styleUrls: ['./dcinvoicepage.component.css']
})
export class DcinvoicepageComponent implements OnInit {
  displayedColumns: string[] = ['sno','dcid','invoiceid','clientname','balanceamount','advancegot','finalinvoicebill','totalproductstaken'];
  displayedColumns1: string[] = ['sno','invoiceid','productname','clientprice','quantity','finalbill'];
  isShown: boolean;
  clientlist :any;
  invoiceid :any;
  Test: FormGroup;
  patientdatasource: any;
  patientdatasource1: any;
  v:any;
  clientbalancetobepaid :any;
  clientadvacnepaid :any;
  clienttotalbill:any;
  currentbalance:any;

  selectedclient :any;
  selectedinvoice :any;
  dcid:any;
  fullbalance:any;
  balanceamountfromclient:any;


  constructor(private allordersService:  AllordersService,private cc :ClientaddService,private clietlistService : ClientlistService,private dcservice : DcService) {}


  ngOnInit() { 
    this.getclientlist();
    this.isShown = true; 
    
   // this.data();
  }

  getclientlist()
  {
    console.log(this.clientlist);
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

 console.log(v);
 this.selectedclient = v.target.value;
 this.dcservice.getAlldcbyclientname(v.target.value).subscribe((result) => { 

   console.log(this.selectedclient);
this.data();
  
 }, error => console.log(error));
}


  data()
{
let sc = this.selectedclient;
  this.dcservice.getAlldcbyclientname(sc).subscribe((result) => {  
    this.patientdatasource = result;
    console.log(this.patientdatasource);
    this.v = this.patientdatasource;
   this.patientdatasource = new MatTableDataSource(this.patientdatasource);
  
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
 
  
    this.dcservice.getTotalbalancebyclientname(this.selectedclient).subscribe((result) => { 
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
//   changedvalue2(v)
//   {
// //let cp =this.clientlist;
//    console.log(v);
// this.selectedinvoice = v.target.value;
//    this.allordersService.getDcinvoiceprint(this.selectedclient,v.target.value).subscribe((result) => { 
//     this.patientdatasource = result;
//        console.log(this.patientdatasource);
//       this.patientdatasource = new MatTableDataSource(this.patientdatasource);
//      console.log(result);
// this.getdcid();
//  // console.log(this.updatedvales);
 
//    }, error => console.log(error));
    
//   }

  getdcid()
  {
    this.dcservice.getDcidbyincoiceid(this.selectedclient,this.selectedinvoice).subscribe((result) => { 
      this.dcid = result && result[0].dcid;
       console.log(this.dcid);
      }, error => console.log(error));
  }

  getfullbalance()
  {
    this.dcservice.getTotalbalancebyclientname(this.selectedclient).subscribe((result) => { 
      this.fullbalance = result && result[0].balanceamountfromclient;
       console.log(this.fullbalance);
      }, error => console.log(error));
  }
  
  toggleShow() {
    this.isShown = ! this.isShown;
  }




}
