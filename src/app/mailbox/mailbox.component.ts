import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css']
})
export class MailboxComponent implements OnInit {


  password =  new FormControl();
  testmail : FormGroup;
  constructor(public dialogRef: MatDialogRef<MailboxComponent>, public fb: FormBuilder,) {  this.form()}

  ngOnInit(): void {
  }



  submit1() {
    // if (!this.addAllorders.valid) {
    //   return false;
    // } else {
      // console.log(this.addAllorders.value)
      // this.allordersService.addallorders(this.addAllorders.value)   
      //   .subscribe((res) => {
      //     console.log(res)
      //     this.addAllorders.reset();
       this.actionFunction();
         //this.getaddproducts();
         window.location.reload();
        // })
    // }
  }

  form() {
    this.testmail = this.fb.group({
      password: [''],

    })
  }



submit(){

  if( this.testmail.value.password === "dc@aep123")

  {
    this.actionFunction();
  }
 else
 {
   alert("Error Password ")
  }
}
  



  actionFunction() {
    // alert("Product Added Successfully");
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
