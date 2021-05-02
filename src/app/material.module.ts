import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon'; 
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  imports: [MatDialogModule,CommonModule,MatTableModule,MatSelectModule, MatButtonModule,MatToolbarModule , MatIconModule, MatSidenavModule, MatListModule, MatPaginatorModule],
  exports: [MatDialogModule,CommonModule,MatTableModule,MatSelectModule, MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatPaginatorModule],
})
export class CustomMaterialModule { }