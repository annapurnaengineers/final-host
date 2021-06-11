import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { MatTableDataSource } from '@angular/material/table';
import { AllordersService } from '../services/allorders.service';
import { Router } from '@angular/router';
import { ClientlistService } from '../services/clientlist.service';
import { DcService } from '../services/dc.service';
import { ClientaddService } from '../services/clientadd.service';
import { filter, map, startWith } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { MailboxComponent } from '../mailbox/mailbox.component';
import { Observable ,BehaviorSubject, of } from 'rxjs';



@Component({
  selector: 'app-quoteinvoicepage',
  templateUrl: './quoteinvoicepage.component.html',
  styleUrls: ['./quoteinvoicepage.component.css']
})
export class QuoteinvoicepageComponent implements OnInit {

  displayedColumns: string[] = ['sno','productname','clientprice','quantity','total']
  
  isShown: boolean;
  clientlist :any;
  invoiceid :any;
  //Test: FormGroup;
  patientdatasource: any;
  patientdatasource1: any;
  productname:any;
  selectedclient :any;
  selectedlocation :any;
dcid:any;
names:any;
filter:String;
//h:any;
toppings = new FormControl();
Test = new FormControl();
matarray:any = [];
filteredOptions: Observable<Array<OptionItem>>;
  optionItems: Array<OptionItem>;
  autoFilter: Observable<string[]>;
Items : any;
productname2 = new FormControl();
total:any=[];
s1:any={};
today: number = Date.now();

  constructor(public matDialog: MatDialog,private allordersService:  AllordersService,private cc :ClientaddService,private clietlistService : ClientlistService,private dcservice : DcService) {}
  ngOnInit() { 
    this.getclientlist();
    this.isShown = true; 
    this.openModal0();
   // this.data();
  }


  

  getclientlist()
  {

      this.cc.getAll().subscribe((result) => { 
      this.clientlist = result;
      console.log(this.clientlist);
     
       })
  }

  printPage() {
    window.print();
  }


  changedvalue1(v)
  {

    //let cp =this.clientlist;
   console.log(v);
  this.selectedclient = v.target.value;
  this.cc.getCodebyclientname(this.selectedclient).subscribe((result) =>
  {
this.selectedlocation = result[0].clientlocation;
console.log(result)
  })
   this.clietlistService.getCategorybyclientname(this.selectedclient).subscribe((result) => { 
     this.productname= result;

     let temp =[];
     for (var index = 0; index < result.length; index++) {
       temp[index] = result[index].productname;

     }
     this.Items =  temp;
     console.log(temp,"temppp")
     console.log(this.Items,"hee")
   // this.productname = [...result];
   this.test1();
   }, error => console.log(error));
  }

  test1()
  {
    this.optionItems = this.Items.map(item => {
      return {
        name: item,
        show: true
      };
    });
    console.log(this.optionItems);
    this.filteredOptions = this.productname2.valueChanges.pipe(
      startWith(''),
      map((value: string) => {
        this.optionItems.forEach(option => {
          option.show = option.name
            .toLocaleLowerCase()
            .includes(value.toLowerCase());
        });
        console.log(this.optionItems)
        return this.optionItems;
      })
    );
  }


    // test() {
    //   this.autoFilter = this.productname2.valueChanges.pipe(
    //     startWith(''),
    //     map(value => this.mafilter(value))
      
    //   );
      
    // }
  
    //  mafilter(value: string): string[] {
    //   const filterValue = value.toLowerCase();
    //  return this.Items.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    //  // return this.Items.filter(item => item.toLowerCase().includes(filterValue));
    // }
  
  


  onPanelClose() {
    this.Test.setValue('');
}


  changedvalue3(v)
  {
//let cp =this.clientlist;
   
  //  this.allordersService.getDcprint(this.selectedclient,this.names).subscribe((result) => { 
    // const found = array1.find(element => element > 10);
    //  console.log(result);
     console.log(v);
     let selectedelement;
     this.matarray=[];

      for (var i = 0; i < v.length; i++) {
        selectedelement  = this.productname.find(el=>el.productname == v[i]);
      // selectedelement.total='';
        this.matarray.push(selectedelement);
        console.log(this.s1,"gg")
      }
        this.patientdatasource1 = new MatTableDataSource(this.matarray);
   
    
  }


  addvalue(v,i){
    console.log(this.matarray[i]);
    console.log('index',i)
    let ews0 = this.matarray[i].clientprice || 0;
    console.log(ews0)
    let ews1 = v.target.value || 0 ;
    console.log(ews1)
    let pw1= parseInt(ews0)*parseInt(ews1);
    console.log(pw1,"hhh")
  
    this.total[i]=pw1;

  }



  
  toggleShow() {
    this.isShown = ! this.isShown;
  }


  openModal0() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "350px";
    
    const modalDialog = this.matDialog.open(MailboxComponent, dialogConfig);
  }




 


}

export interface OptionItem {
  name: string;
  show: boolean;
}

