import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ClientaddService } from '../services/clientadd.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Clientadd } from '../models/clientadd.model'


@Component({
  selector: 'app-addclientadd',
  templateUrl: './addclientadd.component.html',
  styleUrls: ['./addclientadd.component.css']
})
export class AddclientaddComponent implements OnInit {


  addProduct: FormGroup;
  constructor(public dialogRef: MatDialogRef<AddclientaddComponent>,private datePipe: DatePipe,private clientaddService: ClientaddService, private router: Router,
    public fb: FormBuilder, public datepipe: DatePipe) {
    this.form()
  }


  ngOnInit(): void {
  }


  form() {
    this.addProduct = this.fb.group({
      clientname: [''],
      clientcode: [''],
      clientlocation: ['N/A'],
      createddate:  this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      lastupdated :[''],
    })
  }



  
  submit() {
    if (!this.addProduct.valid) {
      return false;
    } else {
      console.log(this.addProduct.value)
    
      this.clientaddService.addclientadd(this.addProduct.value)
        .subscribe((res) => {
          console.log(res)
          this.actionFunction();
          this.addProduct.reset();
        })
    }
  }


  actionFunction() {
    // alert("Stock Used Added Successfully");
   window.location.reload();
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }



}
