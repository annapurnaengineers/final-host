import { Component ,Inject,OnInit,Optional,ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table'
import {MatSort} from '@angular/material/sort'
import { AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditproductsComponent } from '../editproducts/editproducts.component';
import {AddproductsComponent } from '../addproducts/addproducts.component';




@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit  {
  displayedColumns: string[] = ['patientname', 'gender', 'age', 'dob','patientname1', 'gender1', 'age1','dob1','actions'];
  patientdatasource = new MatTableDataSource(patientdata); 
  
  display='none';

  constructor(public matDialog: MatDialog) { }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  ngOnInit() {
    
  } 
 
  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "550px";
    dialogConfig.width = "850px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(EditproductsComponent, dialogConfig);
  }
  openModal1() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "650px";
    dialogConfig.width = "850px";
    const modalDialog = this.matDialog.open(AddproductsComponent, dialogConfig);
  }

}

export interface patientdetails {
  patientname: string;
  gender: string;
  age: number;
  dob: string;
  patientname1: string;
  gender1: string;
  age1: number;
  dob1: string;
}
const patientdata:patientdetails[]=[
{patientname:'john', gender:'Male',age:23,dob:'28/10/1990',patientname1:'john', gender1:'Male',age1:23,dob1:'28/10/1990'},
{patientname:'mary', gender:'Female',age:23,dob:'18/02/1980',patientname1:'john', gender1:'Male',age1:23,dob1:'28/10/1990'},
{patientname:'raj', gender:'Male',age:23,dob:'07/05/2000',patientname1:'john', gender1:'Male',age1:23,dob1:'28/10/1990'},
{patientname:'manikam', gender:'Female',age:13,dob:'03/03/2001',patientname1:'john', gender1:'Male',age1:23,dob1:'28/10/1990'},
{patientname:'charlie', gender:'Female',age:33,dob:'14/11/2001',patientname1:'john', gender1:'Male',age1:23,dob1:'28/10/1990'},
{patientname:'lucie', gender:'Female',age:53,dob:'30/10/2001',patientname1:'john', gender1:'Male',age1:23,dob1:'28/10/1990'},
{patientname:'dron', gender:'Female',age:43,dob:'05/09/2001',patientname1:'john', gender1:'Male',age1:23,dob1:'28/10/1990'},
{patientname:'druv', gender:'male',age:26,dob:'20/07/2001',patientname1:'john', gender1:'Male',age1:23,dob1:'28/10/1990'},
{patientname:'vikram', gender:'male',age:38,dob:'04/03/1987',patientname1:'john', gender1:'Male',age1:23,dob1:'28/10/1990'},
{patientname:'chiyan', gender:'male',age:42,dob:'05/06/1980',patientname1:'john', gender1:'Male',age1:23,dob1:'28/10/1990'},
{patientname:'samudra', gender:'male',age:72,dob:'13/08/1950',patientname1:'john', gender1:'Male',age1:23,dob1:'28/10/1990'},
]

