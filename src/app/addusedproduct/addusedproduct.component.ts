import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from "@angular/forms";
import { UsedproductService } from '../services/usedproduct.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model'
import { ProductService } from '../services/product.service';







@Component({
  selector: 'app-addusedproduct',
  templateUrl: './addusedproduct.component.html',
  styleUrls: ['./addusedproduct.component.css']
})
export class AddusedproductComponent implements OnInit {

  addProduct: FormGroup;
  ProductService: any;
  totalCount: number;
  category: any;
  category2: any;
  productname1: any;
  productcode2: any;
  product= new Product();
  Product = new Product();
updatedvales:any;
pushprovalue : any;

    constructor(public dialogRef: MatDialogRef<AddusedproductComponent>,private datePipe: DatePipe, private productService : ProductService,private usedproductService: UsedproductService, private router: Router,
      public fb: FormBuilder, public datepipe: DatePipe) {
      this.form()
    }
  ngOnInit() {

    this.getcategory();
  }


  form() {
    this.addProduct = this.fb.group({
      productname: [''],
      productcode: [''],
      category: [''],
      enterworkshop1: [0],
      enterworkshop2: [0],
      enterworkshop3: [0],
      balanceworkshop1: [''],
      balanceworkshop2: [''],
      balanceworkshop3: [''],
      pushworkshop1: [''],
      pushworkshop2: [''],
      pushworkshop3: [''],
     // createddate: new Date().toISOString()
      createddate:  this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      lastupdated :[''],
      pushtotal :['']

    })
  }

  // form1() {
  //   this.addProduct1 = this.fb.group({
  //     productname: [''],
  //     productcode: [''],
  //     category: [''],
  //     workshop1: [''],
  //     workshop2: [''],
  //     workshop3: [''],
  //     totalavailable: [''],
  //     lastupdated:  this.datepipe.transform(new Date(), 'yyyy-MM-dd'),

  //   })
  // }

  
  submit() {
    if (!this.addProduct.valid) {
      return false;
    } else {
      console.log(this.addProduct.value)
      this.usedproductService.addusedproducts(this.addProduct.value)
        .subscribe((res) => {
          console.log(res)
          this.updatedvales=res;
          this.actionFunction();
          this.addProduct.reset();
          
       //  this.getaddproducts();
        
      
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
       this.pushprovalue=result;
       console.log(this.productcode2); 
      this.addProduct.controls.productcode.setValue(this.productcode2.productcode);
      this.addProduct.controls.balanceworkshop1.setValue(this.productcode2.workshop1);
      this.addProduct.controls.balanceworkshop2.setValue(this.productcode2.workshop2);
      this.addProduct.controls.balanceworkshop3.setValue(this.productcode2.workshop3);
     }, error => console.log(error));
   
   }


   addvalue(){
    //this.totalCount = 20;
    let product = this.addProduct.controls.productname1;
    let ews1 = this.addProduct.controls.enterworkshop1.value || 0;
 let bws1 = this.addProduct.controls.balanceworkshop1.value || 0;
   // console.log(this.addProduct.get('workshop2').value);
    let ews2 =  this.addProduct.controls.enterworkshop2.value || 0;
    let bws2 = this.addProduct.controls.balanceworkshop2.value || 0;
    let ews3 =  this.addProduct.controls.enterworkshop3.value || 0;
    let bws3 = this.addProduct.controls.balanceworkshop3.value || 0;
    
    let pw1= parseInt(bws1)-parseInt(ews1);
    let pw2= parseInt(bws2)-parseInt(ews2);
    let pw3= parseInt(bws3)-parseInt(ews3); 
  let p1= this.addProduct.controls.pushworkshop1.setValue(pw1);
  let p2 =this.addProduct.controls.pushworkshop2.setValue(pw2);
  let p3 =  this.addProduct.controls.pushworkshop3.setValue(pw3);
    let total = pw1+pw2+pw3;
    this.addProduct.controls.pushtotal.setValue(total);

    console.log(this.addProduct);
  
  }
  
  
  pushProduct(){
  
    console.log(this.updatedvales,this.pushprovalue)
    console.log(this.product)

    this.product._id =  this.pushprovalue._id;
    this.product.productname =  this.pushprovalue.productname;
    this.product.productcode =  this.pushprovalue.productcode;
    this.product.price =  this.pushprovalue.price;
    this.product.category =  this.pushprovalue.category;
    this.product.comments =  this.pushprovalue.comments;
    this.product.createddate =  this.pushprovalue.createddate;

     this.product.workshop1 =  this.updatedvales.pushworkshop1;
     this.product.workshop2 =  this.updatedvales.pushworkshop2;
     this.product.workshop3 =  this.updatedvales.pushworkshop3;
     this.product.totalavailable =  this.updatedvales.pushtotal;
  this.product.lastupdated =  this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  this.productService.updateUser2(this.updatedvales.productname,this.product)
    .subscribe(data => {
      console.log(data);
      this.product = new Product();
     
    }, error => console.log(error));
   
    
  }

  // getaddproducts()
  // {
  // //this.isLoggedIn$ = this.authService.loggedIn; 
  //   this.router.navigate(['/productsused']);
  
  // }


  actionFunction() {
    // alert("Stock Used Added Successfully");
    this.pushProduct()
   window.location.reload();
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }





}
