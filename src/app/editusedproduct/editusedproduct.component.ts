import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from '../models/product.model';
import { Usedproduct } from '../models/usedproduct.model'
import { FormGroup, FormBuilder } from "@angular/forms";
import { ProductsusedComponent } from '../productsused/productsused.component';
import { MAT_DIALOG_DATA, } from "@angular/material/dialog";
import { UsedproductService } from '../services/usedproduct.service';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { FormControl } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-editusedproduct',
  templateUrl: './editusedproduct.component.html',
  styleUrls: ['./editusedproduct.component.css']
})
export class EditusedproductComponent implements OnInit {

isremactive = false;
  _id: string;
  //public id: string;
  usedproduct: Usedproduct;
  employee: Usedproduct = new Usedproduct();
  //route: any;
  updateSongForm: FormGroup;
  public productDetail: any;
  tobepaid: number;
  updatedvales: any;
  pushprovalue: any;
  getprovalue:any;
  product = new Product();
  Product = new Product();
  category: any;
  category2: any;
  productname1: any;
  productcode2: Product[];

  constructor(public dialogRef: MatDialogRef<EditusedproductComponent>, private usedproductService: UsedproductService, private router: Router, private datePipe: DatePipe, private actRoute: ActivatedRoute, public fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) private dialogData: any, private productService: ProductService) { }

  ngOnInit() {
    this._id = this.dialogData;
    console.log("gh" + this._id);
    // debugger;
    this.usedproductService.getUsedproductbyid(this._id)
      .subscribe(data => {
        console.log(data, 'here')
        this.usedproduct = data;
        this.updatedvales = data;
      this.changedvalue1();
        console.log(this.updatedvales);
        
      }, error => console.log(error));

  }


  updateUser() {
    this.usedproduct.lastupdated = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    //  this.allorders.isactive ='false';
    this.usedproductService.updateUsedproduct(this._id, this.usedproduct)
      .subscribe(data => {
        console.log(data);
        this.pushprovalue=data;
        this.usedproduct = new Usedproduct();
        

      }, error => console.log(error));
   window.location.reload();
  }


  closeModal() {
    this.dialogRef.close();
  }




 


  addvalue() {
    //this.totalCount = 20;

    let ews1 = this.usedproduct.enterworkshop1;
    let bws1 = this.usedproduct.balanceworkshop1;

    let ews2 = this.usedproduct.enterworkshop2;
    let bws2 = this.usedproduct.balanceworkshop2;

    let ews3 = this.usedproduct.enterworkshop3;
    let bws3 = this.usedproduct.balanceworkshop3;


    this.usedproduct.pushworkshop1 = parseInt(bws1) - parseInt(ews1);
    this.usedproduct.pushworkshop2 = parseInt(bws2) - parseInt(ews2);
    this.usedproduct.pushworkshop3 = parseInt(bws3) - parseInt(ews3);
    //  let total = pw1+pw2+pw3;
    this.usedproduct.pushtotal = this.usedproduct.pushworkshop1 + this.usedproduct.pushworkshop2 + this.usedproduct.pushworkshop3;

    console.log(this.usedproduct);

  }

  changedvalue1() {
    // this.emitValue.emit(this.selectedUser);
    //console.log(this.selectedUser)
    console.log();
    this.productService.getProductbyname(this.updatedvales.productname).subscribe((result) => {
   console.log(result);
   this.getprovalue = result;
    }, error => console.log(error));
    this.pushProduct();
  }



  pushProduct() {

    console.log(this.updatedvales, this.getprovalue)
    console.log(this.product)

    this.product._id = this.getprovalue._id;
    this.product.productname = this.getprovalue.productname;
    this.product.productcode = this.getprovalue.productcode;
    this.product.price = this.getprovalue.price;
    this.product.category = this.getprovalue.category;
    this.product.comments = this.getprovalue.comments;
    this.product.createddate = this.getprovalue.createddate;

    this.product.workshop1 = this.updatedvales.pushworkshop1;
    this.product.workshop2 = this.updatedvales.pushworkshop2;
    this.product.workshop3 = this.updatedvales.pushworkshop3;
    this.product.totalavailable = this.updatedvales.pushtotal;
    this.product.lastupdated = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.productService.updateUser2(this.updatedvales.productname, this.product)
      .subscribe(data => {
        console.log(data);
        this.product = new Product();

      }, error => console.log(error));


  }

  actionFunction() {
    //  alert("You have logged out.");
    this.updateUser();
    this.pushProduct();
   this.closeModal();
  }

}
