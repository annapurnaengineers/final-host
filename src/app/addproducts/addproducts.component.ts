import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ProductService } from '../services/product.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit {
  addProduct: FormGroup;
  ProductService: any;
  myDate = new Date();
  isLoggedIn$: Observable<boolean>;   
    totalCount: number;


  constructor(public dialogRef: MatDialogRef<AddproductsComponent>, private productService: ProductService, private router: Router,private authService: AuthenticationService,
    public fb: FormBuilder, public datepipe: DatePipe) {
    this.form()
  }


  ngOnInit() {
    this.totalCount = 0;
   }
  

  form() {
    this.addProduct = this.fb.group({
      productname: [''],
      productcode: [''],
      category: [''],
      price: [''],
      workshop1: [''],
      workshop2: [''],
      workshop3: [''],
      totalavailable:[''],
      createddate:  this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      lastupdated: ['']

    })
  }


  addvalue(){
    //this.totalCount = 20;
    let product = this.addProduct;
    let ws1 = this.addProduct.get('workshop1').value || 0;
   // console.log(this.addProduct.get('workshop2').value);
    let ws2 =  this.addProduct.get('workshop2').value || 0;
    let ws3 =  this.addProduct.get('workshop3').value || 0;
    this.totalCount = parseInt(ws1)+parseInt(ws2)+parseInt(ws3);
    this.addProduct.controls["totalavailable"].setValue(this.totalCount);
    console.log(this.addProduct);
  
  }
  
  submit() {
    // if (!this.addProduct.valid) {
    //   return false;
     
      this.productService.addproducts(this.addProduct.value)
        .subscribe((res) => {
          console.log(res)
          this.addProduct.reset();
          this.actionFunction();
       //  this.getaddproducts();
       
        })
    
  }

//   getaddproducts()
//   {
//  // this.isLoggedIn$ = this.authService.loggedIn; 
//     this.router.navigate(['/products']);


  
//   }


  actionFunction() {
    // alert("Product Added Successfully");
    window.location.reload();
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
