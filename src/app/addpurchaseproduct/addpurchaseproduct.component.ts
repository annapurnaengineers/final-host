import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from "@angular/forms";
import { PurchaseproductService } from '../services/purchaseproduct.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-addpurchaseproduct',
  templateUrl: './addpurchaseproduct.component.html',
  styleUrls: ['./addpurchaseproduct.component.css']
})
export class AddpurchaseproductComponent implements OnInit {

  category1: any;

  addAllorders: FormGroup;
  AllordersService: any;
  ProductService:any;
  myDate = new Date();
  isLoggedIn$: Observable<boolean>;   
  totalCount: number;
  category: any;
  selectedUser ;
  productname1: any;
  purchasedate : any;
  minDate = new Date();
  @Output() emitValue: EventEmitter<string> = new EventEmitter<string>();
  category2: any;
  constructor(public dialogRef: MatDialogRef<AddpurchaseproductComponent>,private purchaseproductService : PurchaseproductService,  private router: Router,private authService: AuthenticationService,
    public fb: FormBuilder, public datepipe: DatePipe) {
    this.form()
  }

  ngOnInit(): void {
  }


  inputEvent(event){
    let purchasedate = this.datepipe.transform(new Date(event.target.value), 'yyyy-MM-dd');
     console.log(purchasedate);
     this.addAllorders.controls.purchasedate.setValue(purchasedate);
  
   }


   form() {
    this.addAllorders = this.fb.group({
      purchaseorder: [''],
      productname: [''],
      productcode:[''],
      category:  [''],
      sellername:  [''],
      sellerprice: [''], 
      quantitypurchased : [''],
      comments :[''],
      createddate:  this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      purchasedate:  this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      lastupdated: ['']

    })
  }


  submit() {
    // if (!this.addAllorders.valid) {
    //   return false;
    // } else {
      console.log(this.addAllorders.value)
      this.purchaseproductService.addproducts(this.addAllorders.value)   
        .subscribe((res) => {
          console.log(res)
          this.addAllorders.reset();
       this.actionFunction();
         window.location.reload();
        })
    // }
  }


  actionFunction() {
    // alert("Product Added Successfully");
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }

}
