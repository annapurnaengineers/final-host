import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddproductsComponent>) { }

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
