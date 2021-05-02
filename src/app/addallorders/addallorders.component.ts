import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from "@angular/forms";
import { AllordersService } from '../services/allorders.service';
import { ProductService } from '../services/product.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { FormControl } from '@angular/forms';




@Component({
  selector: 'app-addallorders',
  templateUrl: './addallorders.component.html',
  styleUrls: ['./addallorders.component.css']
})
export class AddallordersComponent implements OnInit {
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
  expecteddate : any;
  minDate = new Date();
  @Output() emitValue: EventEmitter<string> = new EventEmitter<string>();
  category2: any;
 
  constructor(public dialogRef: MatDialogRef<AddallordersComponent>,private productService : ProductService, private allordersService: AllordersService, private router: Router,private authService: AuthenticationService,
    public fb: FormBuilder, public datepipe: DatePipe) {
    this.form()
  }

  ngOnInit(){

    //this.getcategory1();
    this.getcategory();
    
  }

  inputEvent(event){
    let expecteddate = this.datepipe.transform(new Date(event.target.value), 'yyyy-MM-dd');
     console.log(expecteddate);
     this.addAllorders.controls.expecteddate.setValue(expecteddate);
  
   }


  public ss(expecteddate)
  
   {
   this.expecteddate;
   console.log(expecteddate)
  
   }
  

  form() {
    this.addAllorders = this.fb.group({
      productname: [''],
      category:  [''],
      clientname:  [''],
      clientprice: [''],
      invoiceid: [''],
      location : [''],
      extracol: ['Pending'],
      advancereceived :[''],
 	    tobepaid :[''],
      isactive: 'false',
      quantity: [''],
      createddate:  this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      expecteddate:  this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      lastupdated: ['']

    })
  }

  addvalue(){
    //this.totalCount = 20;
    let product = this.addAllorders;
    let ws1 = this.addAllorders.get('clientprice').value || 0;
   // console.log(this.addProduct.get('workshop2').value);
    let ws2 =  this.addAllorders.get('advancereceived').value || 0;
   
    this.totalCount = parseInt(ws1)-parseInt(ws2);
    this.addAllorders.controls["tobepaid"].setValue(this.totalCount);
    console.log(this.addAllorders);
  
  }
  


  submit() {
    // if (!this.addAllorders.valid) {
    //   return false;
    // } else {
      console.log(this.addAllorders.value)
      this.allordersService.addallorders(this.addAllorders.value)   
        .subscribe((res) => {
          console.log(res)
          this.addAllorders.reset();
       this.actionFunction();
         //this.getaddproducts();
         window.location.reload();
        })
    // }
  }



  // getcategory(){
  //   this.productService.getcategory().subscribe((result) => {  
  //    this.category1 = result;
  //   //this.category2= this.category1._id ;
  //   //return this.category.find(x => x._id === this.category);
  //   console.log(this.category1);
  //     console.log(this.category2);
   
  //   }, error => console.log(error));

  // } 


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

//   getaddproducts()
//   {
//  // this.isLoggedIn$ = this.authService.loggedIn; 
//     this.router.navigate(['/products']);
  
//   }


  actionFunction() {
    // alert("Product Added Successfully");
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }



}
