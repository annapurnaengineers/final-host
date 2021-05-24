import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatTableDataSource } from '@angular/material/table';
import { AllordersService } from '../services/allorders.service';
import { Router } from '@angular/router';
import { ClientlistService } from '../services/clientlist.service';
import { DcService } from '../services/dc.service';

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
  Test: FormGroup;
  patientdatasource: any;

  selectedclient :any;
dcid:any;
  constructor(private allordersService:  AllordersService,private clietlistService : ClientlistService,private dcservice : DcService) {}

  ngOnInit() { 
    this.getclientlist();
    this.isShown = true; 
    
   // this.data();
  }


  getclientlist()
  {
  this.clietlistService.getclientnameonly().subscribe((result) => { 
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

   this.allordersService.getDcprint(this.selectedclient,v.target.value).subscribe((result) => { 
    this.patientdatasource = result;
       console.log(this.patientdatasource);
      this.patientdatasource = new MatTableDataSource(this.patientdatasource);
     console.log(result);
this.getdcbyinvoiceid(v);
 // console.log(this.updatedvales);
 
   }, error => console.log(error));
    
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




}
