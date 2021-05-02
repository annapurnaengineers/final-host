import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editproducts',
  templateUrl: './editproducts.component.html',
  styleUrls: ['./editproducts.component.css']
})
export class EditproductsComponent implements OnInit {

  
  constructor(public dialogRef: MatDialogRef<EditproductsComponent>) { }
  ngOnInit(): void {
  }


  actionFunction() {
    alert("You have logged out.");
    this.closeModal();
  }


  closeModal() {
    this.dialogRef.close();
  }

}
