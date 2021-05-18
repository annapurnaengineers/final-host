import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from "@angular/forms";
import { AllordersService } from '../services/allorders.service';
import { ProductService } from '../services/product.service';
import { ClientlistService } from '../services/clientlist.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { FormControl } from '@angular/forms';
import { AnonymousSubject } from 'rxjs/internal/Subject';




@Component({
  selector: 'app-addallorders',
  templateUrl: './addallorders.component.html',
  styleUrls: ['./addallorders.component.css']
})
export class AddallordersComponent implements OnInit {
  category1: any;

  addAllorders: FormGroup;
  AllordersService: any;
  ProductService:any;
  myDate = new Date();
  isLoggedIn$: Observable<boolean>;   
  totalCount: number;
  totalCount1: number;
  category: any;
  selectedUser ;
  productname1: any;
  expecteddate : any;
  minDate = new Date();
  @Output() emitValue: EventEmitter<string> = new EventEmitter<string>();
  category2: any;
  clientlist :any;
  clientname :any;
  productcode2: any;
  clientocde :any;
  updatedvales:any;

  constructor(public dialogRef: MatDialogRef<AddallordersComponent>,private clietlistService : ClientlistService,private productService : ProductService, private allordersService: AllordersService, private router: Router,private authService: AuthenticationService,
    public fb: FormBuilder, public datepipe: DatePipe) {
    this.form()
  }

  ngOnInit(){

    this.getclientlist();
    // this.getcategory();
    
  }

  inputEvent(event){
    let expecteddate = this.datepipe.transform(new Date(event.target.value), 'yyyy-MM-dd');
     console.log(expecteddate);
     this.addAllorders.controls.expecteddate.setValue(expecteddate);
  
   }


  public ss(expecteddate)
  
   {
   this.expecteddate;
   console.log(expecteddate)
  
   }
  

  form() {
    this.addAllorders = this.fb.group({
      productname: [''],
      category:  [''],
      clientname:  [''],
      finalbill: [''],
      clientprice: [''],
      invoiceid: [''],
      location : [''],
      extracol: ['Pending'],
      advancereceived :[''],
 	    tobepaid :[''],
      isactive: 'false',
      quantity: [''],
      createddate:  this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      expecteddate:  this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      lastupdated: ['']

    })
  }

  qut(){
    let ws3 = this.addAllorders.get('clientprice').value || 0;
    let ws4 =  this.addAllorders.get('quantity').value || 0;
    this.totalCount1 = parseInt(ws3)*parseInt(ws4);
    this.addAllorders.controls["finalbill"].setValue(this.totalCount1);

  }

  addvalue(){
    //this.totalCount = 20;
    let product = this.addAllorders;
    let ws1 = this.addAllorders.get('finalbill').value || 0;
   // console.log(this.addProduct.get('workshop2').value);
    let ws2 =  this.addAllorders.get('advancereceived').value || 0;
   
    this.totalCount = parseInt(ws1)-parseInt(ws2);
    this.addAllorders.controls["tobepaid"].setValue(this.totalCount);
    console.log(this.addAllorders);
  
  }
  


  submit() {
    // if (!this.addAllorders.valid) {
    //   return false;
    // } else {
      console.log(this.addAllorders.value)
      this.allordersService.addallorders(this.addAllorders.value)   
        .subscribe((res) => {
          console.log(res)
          this.addAllorders.reset();
       this.actionFunction();
         //this.getaddproducts();
         window.location.reload();
        })
    // }
  }



  // getcategory(){
  //   this.productService.getcategory().subscribe((result) => {  
  //    this.category1 = result;
  //   //this.category2= this.category1._id ;
  //   //return this.category.find(x => x._id === this.category);
  //   console.log(this.category1);
  //     console.log(this.category2);
   
  //   }, error => console.log(error));

  // } 

  getclientlist()
  {
  this.clietlistService.getclientnameonly().subscribe((result) => { 
  this.clientlist = result;
  console.log(this.clientlist);
  
     })
  }


// getcategory()
// {
// this.productService.getcategoryonly().subscribe((result) => { 
// this.category2 = result;
// console.log(this.category2);

//    })
// }

changedvalue3(v){
  // this.emitValue.emit(this.selectedUser);
   //console.log(this.selectedUser)
   console.log(v);
   this.clietlistService.getCategorybyclientname(v.target.value).subscribe((result) => { 
     this.productname1 = result;
    // this.category2 =  this.productname1.productname;
    this.updatedvales =  result && result[0].clientname;
     // this.addAllorders.controls.category.setValue(cp);
     console.log(result);

  console.log(this.updatedvales);
 
   }, error => console.log(error));}


   changedvalue2(v){
    // this.emitValue.emit(this.selectedUser);
     //console.log(this.selectedUser)
     console.log(v);
    let cp1  = v.target.value;
    let v1 = this.updatedvales;
     this.clietlistService.getProductbycategory1(v1,cp1).subscribe((result) => { 
       this.category = result && result[0].category;
       this.productcode2 = result && result[0].clientprice;
      // this.productcode2 = result;
   //   let cp = result && result[0].clientprice
    //  this.addAllorders.controls.clientprice.setValue(cp);
     //  console.log(this.productname1); 
     this.addAllorders.controls.category.setValue(this.category);
     this.addAllorders.controls.clientprice.setValue(this.productcode2);
     console.log(result,"fianl")
     
     }, error => console.log(error));
   
   }

 
  // changedvalue1(v){
  //  // this.emitValue.emit(this.selectedUser);
  //   //console.log(this.selectedUser)
  //   console.log(v.target.value,"test");
  //  let cn = v.target.value;
  //  debugger;
  //   this.clietlistService.getProductbycategory1("MCM",cn).subscribe((result) => { 
    
  //     this.productname1 =  result;
  //   // let cp = result && result[0].clientprice
  //     //this.addAllorders.controls.clientprice.setValue(cp);
  //   //  console.log(cp);
  //     console.log(result,"hash");
  //     //
  //   }, error => console.log(error));

  // }



  actionFunction() {
    // alert("Product Added Successfully");
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }



}
