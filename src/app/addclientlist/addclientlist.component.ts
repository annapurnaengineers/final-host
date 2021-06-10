import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { ClientlistService } from '../services/clientlist.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Clientlist } from '../models/clientlist.model'
import { ProductService } from '../services/product.service';
import { ClientaddService} from '../services/clientadd.service';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-addclientlist',
  templateUrl: './addclientlist.component.html',
  styleUrls: ['./addclientlist.component.css']
})
export class AddclientlistComponent implements OnInit {

  addProduct: FormGroup;
  ProductService: any;
 category: any;
  category2: any;
  productname1: any;
  productcode2: any;
  clientname : any;
  clientcode2:any;
  clientlocation2:any;
  autoFilter: Observable<string[]>;
  Items: any;
  productname = new FormControl();
  cp1:any;

  constructor(public dialogRef: MatDialogRef<AddclientlistComponent>,private datePipe: DatePipe, private clientaddService : ClientaddService, private productService : ProductService,private clientlistService: ClientlistService, private router: Router,
    public fb: FormBuilder, public datepipe: DatePipe) {
    this.form()
  }

  ngOnInit() {

    this.getcategory();
    this.getclient();
  }


  form() {
    this.addProduct = this.fb.group({
      productname: [''],
      clientcode: [''],
      category: [''],
      clientname: [''],
      clientprice: [''],
      clientlocation: [''],
      createddate:  this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      lastupdated :[''],
    })
  }


  submit() {
    if (!this.addProduct.valid) {
      return false;
    } else {
      console.log(this.addProduct.value)
    
      this.clientlistService.addclientproducts(this.addProduct.value)
        .subscribe((res) => {
          console.log(res)
          this.actionFunction();
          this.addProduct.reset();
        })
    }
  }

  getcategory()
  {
  this.productService.getcategoryonly().subscribe((result) => { 
  this.category2 = result;
  console.log(this.category2);
  
     })
  }

  getclient()
  {
  this.clientaddService.getAll().subscribe((result) => { 
  this.clientname = result;
  console.log(this.clientname);
  
     })
  }


  changedvalue1(v){
    // this.emitValue.emit(this.selectedUser);
     //console.log(this.selectedUser)
     console.log(v);
     this.changedvalue2(v);
     this.productService.getProductbycategory(v.target.value).subscribe((result) => { 
       this.productname1 = result;
       let temp = []
       for (var index = 0; index < result.length; index++) {
         temp[index] = result[index].productname;
 
       }
       console.log(temp, "yyy")
       let pp = JSON.stringify(temp);
       this. Items = temp;
       let Items1 = this.Items.toString();
 
       console.log(this.Items, "tttttt")
       this.test();

       console.log(result);
     }, error => console.log(error));  
    
   }  

   test() {
    this.autoFilter = this.productname.valueChanges.pipe(
      startWith(''),
      map(value => this.mafilter(value))
    
    );
    
  }

   mafilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.Items.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
   // return this.Items1.filter(item => item.toLowerCase().includes(filterValue));
  }

   changedvalue2(item){
    // this.emitValue.emit(this.selectedUser);
     //console.log(this.selectedUser)
     
     this. cp1 = item;
     console.log(this.cp1);
    // this.addProduct.controls.productname.setValue(item);
    // console.log(this.productname,"testtsts");
     this.productService.getProductcodebyproduct(this.cp1).subscribe((result) => { 
       this.productcode2 = result;
       console.log(this.productcode2); 
     }, error => console.log(error));
   
   }

   
  changedvalue3(v){
    // this.emitValue.emit(this.selectedUser);
     //console.log(this.selectedUser)
     console.log(v.target.value);
     this.addProduct.controls.productname.setValue(this.cp1);
     this.changedvalue2(v);
     this.clientaddService.getCodebyclientname(v.target.value).subscribe((result) => { 
       this.clientcode2 = result && result[0].clientcode;
       this.clientlocation2 = result && result[0].clientlocation;
       

       console.log(this.clientcode2);
       this.addProduct.controls.clientcode.setValue(this.clientcode2);
       this.addProduct.controls.clientlocation.setValue(this.clientlocation2);
     }, error => console.log(error));  
    
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
