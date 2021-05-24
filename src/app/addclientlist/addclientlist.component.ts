import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ClientlistService } from '../services/clientlist.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Clientlist } from '../models/clientlist.model'
import { ProductService } from '../services/product.service';
import { ClientaddService} from '../services/clientadd.service';


@Component({
  selector: 'app-addclientlist',
  templateUrl: './addclientlist.component.html',
  styleUrls: ['./addclientlist.component.css']
})
export class AddclientlistComponent implements OnInit {

  addProduct: FormGroup;
  ProductService: any;
 category: any;
  category2: any;
  productname1: any;
  productcode2: any;
  clientname : any;
  clientcode2:any;
  clientlocation2:any;

  constructor(public dialogRef: MatDialogRef<AddclientlistComponent>,private datePipe: DatePipe, private clientaddService : ClientaddService, private productService : ProductService,private clientlistService: ClientlistService, private router: Router,
    public fb: FormBuilder, public datepipe: DatePipe) {
    this.form()
  }

  ngOnInit() {

    this.getcategory();
    this.getclient();
  }


  form() {
    this.addProduct = this.fb.group({
      productname: [''],
      clientcode: [''],
      category: [''],
      clientname: [''],
      clientprice: [''],
      clientlocation: [''],
      createddate:  this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      lastupdated :[''],
    })
  }


  submit() {
    if (!this.addProduct.valid) {
      return false;
    } else {
      console.log(this.addProduct.value)
    
      this.clientlistService.addclientproducts(this.addProduct.value)
        .subscribe((res) => {
          console.log(res)
          this.actionFunction();
          this.addProduct.reset();
        })
    }
  }

  getcategory()
  {
  this.productService.getcategoryonly().subscribe((result) => { 
  this.category2 = result;
  console.log(this.category2);
  
     })
  }

  getclient()
  {
  this.clientaddService.getAll().subscribe((result) => { 
  this.clientname = result;
  console.log(this.clientname);
  
     })
  }

  changedvalue3(v){
    // this.emitValue.emit(this.selectedUser);
     //console.log(this.selectedUser)
     console.log(v);
     this.changedvalue2(v);
     this.clientaddService.getCodebyclientname(v.target.value).subscribe((result) => { 
       this.clientcode2 = result && result[0].clientcode;
       this.clientlocation2 = result && result[0].clientlocation;
       

       console.log(this.clientcode2);
       this.addProduct.controls.clientcode.setValue(this.clientcode2);
       this.addProduct.controls.clientlocation.setValue(this.clientlocation2);
     }, error => console.log(error));  
    
   }  

  changedvalue1(v){
    // this.emitValue.emit(this.selectedUser);
     //console.log(this.selectedUser)
     console.log(v);
     this.changedvalue2(v);
     this.productService.getProductbycategory(v.target.value).subscribe((result) => { 
       this.productname1 = result;

       console.log(result);
     }, error => console.log(error));  
    
   }  

   changedvalue2(v){
    // this.emitValue.emit(this.selectedUser);
     //console.log(this.selectedUser)
     console.log(v,v.target.value);
    
     this.productService.getProductcodebyproduct(v.target.value).subscribe((result) => { 
       this.productcode2 = result;
       console.log(this.productcode2); 
     }, error => console.log(error));
   
   }

   
  actionFunction() {
    // alert("Stock Used Added Successfully");
   window.location.reload();
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }

}
