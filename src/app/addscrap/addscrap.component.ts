import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from "@angular/forms";
import { AllordersService } from '../services/allorders.service';
import { DcService } from '../services/dc.service';
import { ClientlistService } from '../services/clientlist.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-addscrap',
  templateUrl: './addscrap.component.html',
  styleUrls: ['./addscrap.component.css']
})
export class AddscrapComponent implements OnInit {


  addAllorders: FormGroup;
  AllordersService: any;
  ProductService:any;
  myDate = new Date();
  isLoggedIn$: Observable<boolean>;   
  totalCount: number;
  totalCount1: number;
  category: any;
  selectedUser ;
  invoiceid: any;
  selectedclient : any;
  minDate = new Date();
  clientlist :any;
  clientname :any;
  invoiceid1: any;
  clientocde :any;
  updatedvales:any;


  @Output() emitValue: EventEmitter<string> = new EventEmitter<string>();

 
  constructor(public dialogRef: MatDialogRef<AddscrapComponent>,private clietlistService : ClientlistService,private dcService : DcService, private allordersService: AllordersService, private router: Router,
    public fb: FormBuilder, public datepipe: DatePipe) {
    this.form()
  }


  ngOnInit(){

    this.getclientlist();
    // this.getcategory();
    
  }


  
  form() {
    this.addAllorders = this.fb.group({
      dcid: [''],
      invoiceid:  [''],
      clientname:  [''],
      balanceamount: 0,
      advancegot: [''],
      finalinvoicebill: 0,
      totalproductstaken : [''],
      createddate:  this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      lastupdated: ['']

    })
  }




  submit() {
    // if (!this.addAllorders.valid) {
    //   return false;
    // } else {
      console.log(this.addAllorders.value)
      this.dcService.addDclist(this.addAllorders.value)   
        .subscribe((res) => {
          console.log(res)
          this.addAllorders.reset();
       this.actionFunction();
         //this.getaddproducts();
         window.location.reload();
        })
    // }
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

 

  actionFunction() {
    // alert("Product Added Successfully");
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }








}
