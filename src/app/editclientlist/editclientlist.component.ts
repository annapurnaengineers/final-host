import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Clientlist } from '../models/clientlist.model';
import { FormGroup, FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA, } from "@angular/material/dialog";
import { ClientlistService } from '../services/clientlist.service';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-editclientlist',
  templateUrl: './editclientlist.component.html',
  styleUrls: ['./editclientlist.component.css']
})
export class EditclientlistComponent implements OnInit {

  _id: string;
  //public id: string;
  usedproduct: Clientlist;
  employee: Clientlist = new Clientlist();
  public productDetail: any;
  category: any;
  category2: any;
  productname1: any;
 

  constructor(public dialogRef: MatDialogRef<EditclientlistComponent>, private clientlistService: ClientlistService, private router: Router, private datePipe: DatePipe, private actRoute: ActivatedRoute, public fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
  @Inject(MAT_DIALOG_DATA) private dialogData: any, private productService: ProductService) { }



  ngOnInit() {
    this._id = this.dialogData;
    console.log("gh" + this._id);
    // debugger;
    this.clientlistService.getClientbyid(this._id)
      .subscribe(data => {
        console.log(data, 'here')
        this.usedproduct = data;
        let userAgent = window.navigator.userAgent;
     
      }, error => console.log(error));
  }


  
  updateUser() {
    this.usedproduct.lastupdated = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    //  this.allorders.isactive ='false';
    this.clientlistService.updateClientbyid(this._id, this.usedproduct)
      .subscribe(data => {
        console.log(data);
        this.usedproduct = new Clientlist();
      }, error => console.log(error));
   window.location.reload();
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
