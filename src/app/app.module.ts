import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent} from './products/products.component';
import { ProductsusedComponent} from './productsused/productsused.component';
import{ EditproductsComponent } from './editproducts/editproducts.component';
import {AddproductsComponent } from './addproducts/addproducts.component';
import {DispatchComponent } from './dispatch/dispatch.component';
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
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsComponent,
    SidenavListComponent,
    ProductsusedComponent,
    EditproductsComponent,
    AddproductsComponent,
    DispatchComponent
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
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'products', component:ProductsComponent },
      { path: 'productsused', component:ProductsusedComponent },
      { path: 'dispatch', component:DispatchComponent }  
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

  MatSidenavModule;
  MatTableModule
}
