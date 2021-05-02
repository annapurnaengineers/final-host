import { Component, OnInit,Input ,ViewChild ,Inject} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../services/product.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from '../models/product.model'
import { FormGroup, FormBuilder } from "@angular/forms";
import { ProductsComponent } from '../products/products.component';
import { MAT_DIALOG_DATA,} from "@angular/material/dialog";



@Component({
  selector: 'app-editproducts',
  templateUrl: './editproducts.component.html',
  styleUrls: ['./editproducts.component.css']
})
export class EditproductsComponent implements OnInit {

 _id: string;
 //public id: string;
 product: Product;
  employee: Product = new Product();
  //route: any;
  updateSongForm: FormGroup;
  public productDetail: any;
  totalavailable: number;
 
  

  constructor(public dialogRef: MatDialogRef<EditproductsComponent>, private router: Router,private datePipe: DatePipe, private actRoute: ActivatedRoute,public fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any,
  @Inject(MAT_DIALOG_DATA) private dialogData: any, private productService: ProductService) { }

   

  
  ngOnInit() {
    
    this._id = this.dialogData;     
        console.log("gh"+this._id);
       // debugger;
        this.productService.getUser(this._id)
          .subscribe(data => {
            console.log(data,'here')
            this.product = data;
          }, error => console.log(error));
          this.totalavailable = this.totalavailable;
  }

  addvalue()
  {
    //this.totalCount = 20;
    let product1 = this.product;
    let ws1 = this.product.workshop1;
   // console.log(this.addProduct.get('workshop2').value);
    let ws2 =  this.product.workshop2;
    let ws3 =  this.product.workshop3;
    this.product.totalavailable = parseInt(ws1)+parseInt(ws2)+parseInt(ws3);
    //this.product.controls['totalavailable'].updateValue(this.totalCount);
   
    console.log(this.totalavailable);
  
  }
    
  
  actionFunction() {
  //  alert("You have logged out.");
  this. updateUser();
    this.closeModal();
  }
  updateUser() {
    this.product.lastupdated =  this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.productService.updateUser(this._id, this.product)
      .subscribe(data => {
        console.log(data);
        this.product = new Product();
      //  this.gotoList();
      }, error => console.log(error));
      window.location.reload();
  }

  // gotoList() {
  //   this.router.navigate(['/products']);
  // }
  closeModal() {
    this.dialogRef.close();
  }

}
