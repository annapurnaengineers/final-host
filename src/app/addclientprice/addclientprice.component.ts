import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA,} from "@angular/material/dialog";
import { MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";

import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';


@Component({
  selector: 'app-addclientprice',
  templateUrl: './addclientprice.component.html',
  styleUrls: ['./addclientprice.component.css']
})
export class AddclientpriceComponent implements OnInit {

  
 _id: string;
 //public id: string;

 

 product: Product;

 // employee: Clientproduct = new Clientproduct();
  //route: any;
  

  constructor(public dialogRef: MatDialogRef<AddclientpriceComponent>, private router: Router, private actRoute: ActivatedRoute,public fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any,
  @Inject(MAT_DIALOG_DATA) private dialogData: any, private productService: ProductService ) { }

  ngOnInit(){
    this._id = this.dialogData;     
    console.log("gh"+this._id);
   // debugger;
    this.productService.getUser(this._id)
      .subscribe(data => {
      //  console.log(data,'here')
        this.product = data;
      }, error => console.log(error));
     
  }

  updateUser() {
    this.productService.updateUser(this._id, this.product)
      .subscribe(data => {
        console.log(data);
        this.product = new Product();
       
      // this.gotoList();
      }, error => console.log(error));
  }

  // gotoList() {
  //   window.location.reload();
  //   this.router.navigate(['/products']);
  // }

  actionFunction() {
    //  alert("You have logged out.");
    this. updateUser();
      this.closeModal();
    }



    closeModal() {
      this.dialogRef.close();
    }
}
