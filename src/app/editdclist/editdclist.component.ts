import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Dcadd } from '../models/dcadd.model';
import { FormGroup, FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA, } from "@angular/material/dialog";
import { DcService } from '../services/dc.service';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-editdclist',
  templateUrl: './editdclist.component.html',
  styleUrls: ['./editdclist.component.css']
})
export class EditdclistComponent implements OnInit {
  
  _id: string;
  //public id: string;
  usedproduct: Dcadd;
  employee: Dcadd = new Dcadd();
  public productDetail: any;
  category: any;
  category2: any;
  productname1: any;

  constructor(public dialogRef: MatDialogRef<EditdclistComponent>, private dcService: DcService, private router: Router, private datePipe: DatePipe, private actRoute: ActivatedRoute, public fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
  @Inject(MAT_DIALOG_DATA) private dialogData: any, private productService: ProductService) { }

  ngOnInit() {
    this._id = this.dialogData;
    console.log("gh" + this._id);
    // debugger;
    this.dcService.getClientbyid(this._id)
      .subscribe(data => {
        console.log(data, 'here')
        this.usedproduct = data;
     
      }, error => console.log(error));
  }

  updateUser() {
    this.usedproduct.lastupdated = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    //  this.allorders.isactive ='false';
    this.dcService.updateClientbyid(this._id, this.usedproduct)
      .subscribe(data => {
        console.log(data);
        this.usedproduct = new Dcadd();
      }, error => console.log(error));
   window.location.reload();
  }

  addvalue()
  {
    //this.totalCount = 20;
    let product1 = this.usedproduct;
    let ws1 = this.usedproduct.finalinvoicebill;
   // console.log(this.addProduct.get('workshop2').value);
    let ws2 =  this.usedproduct.advancegot;
  
    this.usedproduct.balanceamount = parseInt(ws1)-parseInt(ws2);
  
   // this.allorders.controls['totalavailable'].updateValue(this.totalCount);
   
    console.log(this.usedproduct.balanceamount);
  
  }


  closeModal() {
    this.dialogRef.close();
  }


  actionFunction() {
    //  alert("You have logged out.");
    this.updateUser();
   this.closeModal();
  }


}
