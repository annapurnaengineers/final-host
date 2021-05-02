import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent} from './products/products.component';
import { ProductsusedComponent} from './productsused/productsused.component';
import{ EditproductsComponent } from './editproducts/editproducts.component';
import {AddproductsComponent } from './addproducts/addproducts.component';
import {DispatchComponent } from './dispatch/dispatch.component';
import {AddusedproductComponent} from './addusedproduct/addusedproduct.component';
import {AddclientpriceComponent} from './addclientprice/addclientprice.component';
import {AddallordersComponent} from './addallorders/addallorders.component';
import {EditallordersComponent} from './editallorders/editallorders.component';
import {AllordersComponent} from './allorders/allorders.component';
import {OnlyordersComponent} from './onlyorders/onlyorders.component';
import {OnlycompletedComponent} from './onlycompleted/onlycompleted.component';
import {EditusedproductComponent} from './editusedproduct/editusedproduct.component';
import {NotfoundComponent} from './notfound/notfound.component';
import {PurchaseproductComponent} from './purchaseproduct/purchaseproduct.component';
import {AddpurchaseproductComponent} from './addpurchaseproduct/addpurchaseproduct.component';
import {EditpurchaseproductComponent} from './editpurchaseproduct/editpurchaseproduct.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatToolbarModule,MatSidenavModule,MatButtonModule,MatIconModule,MatDividerModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table'
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { CustomMaterialModule } from './material.module';
import { AuthGuardGuard as AuthGuard  } from './auth-guard.guard';
import { AuthenticationService } from './services/authentication.service';
import {ReactiveFormsModule  } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {DatePipe} from '@angular/common';  
import { MatSortModule } from '@angular/material/sort'; 
import { ProductService } from './services/product.service';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import {MatNativeDateModule} from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatMenuModule } from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {SubjectService} from './services/subjectservice.service';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Role } from './models/role.model';






// const APPROUTES: RouterModule = [
//   {path: 'products', component: ProductsComponent , data: { requiresLogin: true }},
//   {path: '', component: LoginComponent},
//   {path: 'productsused', component: ProductsusedComponent},
//   {path: 'dispatch', component: DispatchComponent},
//  // {path: '**', component: NotFoundComponent}
// ];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsComponent,
    SidenavListComponent,
    ProductsusedComponent,
    EditproductsComponent,
    AddproductsComponent,
    DispatchComponent,
   HomeComponent,
   AddusedproductComponent,
   AddclientpriceComponent,
   AddallordersComponent,
   EditallordersComponent,
   AllordersComponent,
   OnlyordersComponent,
   OnlycompletedComponent,
   EditusedproductComponent,
   NotfoundComponent,
   PurchaseproductComponent,
   AddpurchaseproductComponent,
   EditpurchaseproductComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomMaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    NgxSpinnerModule,
    MatMenuModule,
    MatTooltipModule,
    RouterModule.forRoot([
      // { path: 'login', component: LoginComponent },
      // { path: 'products', component:ProductsComponent },
      // { path: 'productsused', component:ProductsusedComponent },
      // { path: 'dispatch', component:DispatchComponent }  
    // {  path: '',
     
    //   component: LoginComponent,
    //   children: [
    //     {
    //       path: '',
    //       redirectTo: 'login',
    //       pathMatch: 'full'
    //     },
    //     {
    //       path: 'login ',
    //       component: LoginComponent
    //     },
    //    ] },
        
           
             { path: 'login', component: LoginComponent },
             { path: '', redirectTo:'/login', pathMatch: 'full' ,},
             { path: 'dashboard', component: HomeComponent,  canActivate: [AuthGuard] , data: { role: [Role.Admin] } },
             { path: 'products', component: ProductsComponent,  canActivate: [AuthGuard]},
            //  { path: 'product/:_id', component: EditproductsComponent },
             { path: 'productsused', component: ProductsusedComponent,canActivate: [AuthGuard]},
             { path: 'addclientprice', component: AddclientpriceComponent ,canActivate: [AuthGuard]},          
             { path: 'addusedproduct', component: AddusedproductComponent , canActivate: [AuthGuard]},
             { path: 'addallorders', component: AddallordersComponent ,canActivate: [AuthGuard]},  
             { path: 'editallorders', component: EditallordersComponent ,canActivate: [AuthGuard]},  
             { path: 'allorders', component: AllordersComponent ,canActivate: [AuthGuard]},  
             { path: 'dispatch', component: DispatchComponent ,canActivate: [AuthGuard]},
             { path: 'onlyorders', component: OnlyordersComponent ,canActivate: [AuthGuard]},
             { path: 'onlycompleted', component: OnlycompletedComponent ,canActivate: [AuthGuard]},
             { path: 'editusedproduct', component: EditusedproductComponent , canActivate: [AuthGuard]},
             { path: 'purchaseproduct', component: PurchaseproductComponent ,canActivate: [AuthGuard]},
             { path: 'addpurchaseproduct', component: AddpurchaseproductComponent ,canActivate: [AuthGuard]},
             { path: 'editpurchaseproduct', component: EditpurchaseproductComponent , canActivate: [AuthGuard]},
             { path: 'notfound', component: NotfoundComponent },
             { path: '**', redirectTo: '/dashboard'  },
           
              
    ]),
  ],


  providers: [AuthenticationService, AuthGuard,DatePipe,ProductService,SubjectService,  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  MatSidenavModule;
  MatTableModule;
  MatDatepickerModule;
}
