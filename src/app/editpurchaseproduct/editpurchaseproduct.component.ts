import { Component, OnInit,Input ,ViewChild ,Inject} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Purchaseproduct } from '../models/purchaseproduct.model'
import { FormGroup, FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA,} from "@angular/material/dialog";
import { PurchaseproductService } from '../services/purchaseproduct.service';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-editpurchaseproduct',
  templateUrl: './editpurchaseproduct.component.html',
  styleUrls: ['./editpurchaseproduct.component.css']
})
export class EditpurchaseproductComponent implements OnInit {

  _id: string;
  //public id: string;
  allorders: Purchaseproduct;
   employee: Purchaseproduct = new Purchaseproduct();
   //route: any;
   updateSongForm: FormGroup;
   public productDetail: any;
   tobepaid: number;
  category2: Object;
 
  


  constructor(public dialogRef: MatDialogRef<EditpurchaseproductComponent>,  private router: Router,private datePipe: DatePipe, private actRoute: ActivatedRoute,public fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any,
  @Inject(MAT_DIALOG_DATA) private dialogData: any, private purchaseproductService: PurchaseproductService) { }


  ngOnInit() {

    this._id = this.dialogData;     
    console.log("gh"+this._id);
   // debugger;
    this.purchaseproductService.getUser(this._id)
      .subscribe(data => {
        console.log(data,'here')
        this.allorders = data;
      }, error => console.log(error));
    
  }

  inputEvent(event){
    let purchasedate = this.datePipe.transform(new Date(event.target.value), 'yyyy-MM-dd');
     console.log(purchasedate);
     this.allorders.purchasedate = purchasedate;
  
   }

   actionFunction() {
    //  alert("You have logged out.");
    this. updateUser();
      this.closeModal();
    }
    
    closeModal() {
      this.dialogRef.close();
    }
  

    updateUser() {
      this.allorders.lastupdated =  this.datePipe.transform(new Date(), 'yyyy-MM-dd');
   //  this.allorders.isactive ='false';
      this.purchaseproductService.updateUser(this._id, this.allorders)
        .subscribe(data => {
          console.log(data);
          this.allorders = new Purchaseproduct();
        
        }, error => console.log(error));
        window.location.reload();
    }
  
}
