import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Clientadd } from '../models/clientadd.model';
import { FormGroup, FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA, } from "@angular/material/dialog";
import { ClientaddService } from '../services/clientadd.service';


@Component({
  selector: 'app-editclientadd',
  templateUrl: './editclientadd.component.html',
  styleUrls: ['./editclientadd.component.css']
})
export class EditclientaddComponent implements OnInit {


  _id: string;
  //public id: string;
  usedproduct: Clientadd;
  employee: Clientadd = new Clientadd();

  constructor(public dialogRef: MatDialogRef<EditclientaddComponent>, private clientaddService: ClientaddService, private router: Router, private datePipe: DatePipe, private actRoute: ActivatedRoute, public fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
  @Inject(MAT_DIALOG_DATA) private dialogData: any,) { }


  ngOnInit() {
    this._id = this.dialogData;
    console.log("gh" + this._id);
    // debugger;
    this.clientaddService.getClientaddbyid(this._id)
      .subscribe(data => {
        console.log(data, 'here')
        this.usedproduct = data;
        let userAgent = window.navigator.userAgent;
     
      }, error => console.log(error));
  }

  
  updateUser() {
    this.usedproduct.lastupdated = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    //  this.allorders.isactive ='false';
    this.clientaddService.updateClientbyid(this._id, this.usedproduct)
      .subscribe(data => {
        console.log(data);
        this.usedproduct = new Clientadd();
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
