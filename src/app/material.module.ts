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
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort'; 
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  imports: [MatMenuModule,MatProgressBarModule,MatProgressSpinnerModule,MatDatepickerModule,MatSortModule,MatInputModule, MatFormFieldModule,MatCardModule,MatDialogModule,CommonModule,MatTableModule,MatSelectModule, MatButtonModule,MatToolbarModule , MatIconModule, MatSidenavModule, MatListModule, MatPaginatorModule],
  exports: [MatMenuModule,MatProgressBarModule,MatProgressSpinnerModule,MatDatepickerModule,MatSortModule,MatInputModule,MatFormFieldModule, MatCardModule,MatDialogModule,CommonModule,MatTableModule,MatSelectModule, MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatPaginatorModule],
})
export class CustomMaterialModule { }