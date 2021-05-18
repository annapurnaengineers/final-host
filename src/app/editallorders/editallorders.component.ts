import { Component, OnInit,Input ,ViewChild ,Inject} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from '../models/product.model';
import { Allorders } from '../models/allorders.model'
import { FormGroup, FormBuilder } from "@angular/forms";
import { ProductsComponent } from '../products/products.component';
import { MAT_DIALOG_DATA,} from "@angular/material/dialog";
import { AllordersService } from '../services/allorders.service';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { FormControl } from '@angular/forms';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-editallorders',
  templateUrl: './editallorders.component.html',
  styleUrls: ['./editallorders.component.css']
})
export class EditallordersComponent implements OnInit {

  _id: string;
  //public id: string;
  allorders: Allorders;
   employee: Allorders = new Allorders();
   //route: any;
   updateSongForm: FormGroup;
   public productDetail: any;
 //  tobepaid: number;
   finalbill: number;
  category2: Object;
  productname1: Product[];
  


   constructor(public dialogRef: MatDialogRef<EditallordersComponent>,private allordersService: AllordersService,  private router: Router,private datePipe: DatePipe, private actRoute: ActivatedRoute,public fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any,
   @Inject(MAT_DIALOG_DATA) private dialogData: any, private productService: ProductService) { }

  ngOnInit() {

    this._id = this.dialogData;     
    console.log("gh"+this._id);
   // debugger;
    this.allordersService.getUser(this._id)
      .subscribe(data => {
        console.log(data,'here')
        this.allorders = data;
      }, error => console.log(error));
      //this.tobepaid = this.tobepaid;
  }

  addvalue()
  {
    //this.totalCount = 20;
    let product1 = this.allorders;
    let ws1 = this.allorders.finalbill;
   // console.log(this.addProduct.get('workshop2').value);
    let ws2 =  this.allorders.advancereceived;
  
    this.allorders.tobepaid = parseInt(ws1)-parseInt(ws2);
  
   // this.allorders.controls['totalavailable'].updateValue(this.totalCount);
   
    console.log(this.allorders.tobepaid);
  
  }


  addvalue1()
  {
    //this.totalCount = 20;
    let product1 = this.allorders;
    let ws3 = this.allorders.clientprice;
   // console.log(this.addProduct.get('workshop2').value);
    let ws4 =  this.allorders.quantity;
    this.allorders.finalbill = parseInt(ws3)*parseInt(ws4);
    let fb = this.allorders.finalbill;
    let ws2 =  this.allorders.advancereceived;
    this.allorders.tobepaid = parseInt(fb)-parseInt(ws2);

    //this.product.controls['totalavailable'].updateValue(this.totalCount);
    console.log(this.allorders.finalbill);
  
  }

  inputEvent(event){
    let expecteddate = this.datePipe.transform(new Date(event.target.value), 'yyyy-MM-dd');
     console.log(expecteddate);
     this.allorders.expecteddate = expecteddate
  
   }

  actionFunction() {
    //  alert("You have logged out.");
    this. updateUser();
      this.closeModal();
    }

    updateUser() {
    this.allorders.lastupdated =  this.datePipe.transform(new Date(), 'yyyy-MM-dd');
 //  this.allorders.isactive ='false';
    this.allordersService.updateUser(this._id, this.allorders)
      .subscribe(data => {
        console.log(data);
        this.allorders = new Allorders();
      
      }, error => console.log(error));
      window.location.reload();
  }


  closeModal() {
    this.dialogRef.close();
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
    this.productService.getProductbycategory(v.target.value).subscribe((result) => { 
      this.productname1 = result;  
      console.log(result);
   
    }, error => console.log(error));


  }
}
