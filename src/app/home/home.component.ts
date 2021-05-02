import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AllordersService } from '../services/allorders.service';
import { OnlyordersService } from '../services/onlyorders.service';
import { OnlydispatchService } from '../services/onlydispatch.service';
import { DatePipe } from '@angular/common';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ProductService } from '../services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  displayedColumns: string[] = ['productname','totalavailable'];
  //loading = false;
  users: any;
  patientdatasource: any;
  productname1: any;
  ordercount: any;
  productname2: any;
  dispatchcount:any;
  isLoggedIn$: Observable<boolean>;       
         

  constructor(private authService: AuthenticationService,private router: Router,private userService: UserService,private OnlyordersService: OnlyordersService,private OnlydispatchService: OnlydispatchService, private productService: ProductService,private AllordersService: AllordersService, private spinner: NgxSpinnerService,private datePipe: DatePipe,) 
  {}
   

  loading() {
    this.spinner.show();
  
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.changedvalue1();
      this.changedvalue2();
      this.changedvalue3();
      this.data();
      this.spinner.hide();
    }, 5000);
  };


  ngOnInit() {
   this.loading();
  // this.isLoggedIn$ = this.authService.loggedIn; 
   // this.changedvalue1();
}


 changedvalue1(){
  // this.emitValue.emit(this.selectedUser);
   //console.log(this.selectedUser)
  
   let expecteddate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
   this.AllordersService.getcountbydate(expecteddate).subscribe((result) => { 
     this.productname1 = result;
    console.log(this.productname1); 
   },   
  error => console.log(error));
 }

 changedvalue2(){
  // this.emitValue.emit(this.selectedUser);
   //console.log(this.selectedUser)
  
   this.OnlyordersService.getAllordercount().subscribe((result) => { 
     this.productname2 = result;
    console.log(this.productname2); 
   },   
  error => console.log(error));
 }
 changedvalue3(){
 

   this.OnlydispatchService.getAllcount().subscribe((result) => { 
     this.dispatchcount = result;
    console.log(this.dispatchcount); 
   },   
  error => console.log(error));
 }

 data()
 {
   this.productService.getproductleast().subscribe((result) => {
     this.patientdatasource = result;
     console.log(this.patientdatasource);
     this.patientdatasource = new MatTableDataSource(this.patientdatasource);
 
   })
 }

}
