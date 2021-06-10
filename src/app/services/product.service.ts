import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class ProductService {
    constructor(private http: HttpClient) { }
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    

    addproducts(addProduct: Product): Observable<any> {
        return this.http.post<Product>(`${environment.apiUrl}products/addproduct`, addProduct, this.httpOptions)
          .pipe(
            catchError(this.handleError<Product>('Add products'))
          );
      }
    
      dataRow:any;


    getAll() {
        return this.http.get(`${environment.apiUrl}products/getproduct`);
    }

    getproductleast() {
      return this.http.get(`${environment.apiUrl}products/getproductleast2`);
  }


    getcategory() {
      return this.http.get(`${environment.apiUrl}products/getproductcategory`);
  }

  getcategoryonly() {
    return this.http.get(`${environment.apiUrl}products/getproductcategoryonly`);
}


    getProductbycategory(category :String) {
      return this.http.get<Product[]>(`${environment.apiUrl}products/getproductbycategory/` + category )
      
        .pipe(
          tap(_ => console.log(`Product id retrieved: ${category}`)),
          catchError(this.handleError<Product[]>(`Get Song id=${category}`))
          
        );
       
    }
    
    getProductcodebyproduct(productname :String) {
      return this.http.get<Product[]>(`${environment.apiUrl}products/getproductcodebyproduct/` + productname )
      
        .pipe(
          tap(_ => console.log(`Product code retrieved: ${productname}`)),
          catchError(this.handleError<Product[]>(`Get Song id=${productname}`))
          
        );
       
    }

    getUser(_id: string): Observable<any> {
      return this.http.get(`${environment.apiUrl}products/getproductbyid/${_id}`);
    }

    updateUser(_id: string, value: any): Observable<Object> {
      return this.http.put(`${environment.apiUrl}products/editproductbyid/${_id}`, value);
    }

    
    updateUser2(productname: string, value: any): Observable<Object> {
      return this.http.put(`${environment.apiUrl}products/editproductbyproductname/${productname}`, value);
    }


    deleteUser(_id: string): Observable<any> {
      return this.http.delete(`${environment.apiUrl}products/deleteproductbyid/${_id}`, { responseType: 'text' });
    }

    getProductbyid(id) {
      return this.http.get<Product[]>(`${environment.apiUrl}products/getproductbyid/` + id)
      
        .pipe(
          tap(_ => console.log(`Product id retrieved: ${id}`)),
          catchError(this.handleError<Product[]>(`Get Song id=${id}`))
          
        );
       
    }
    
    getProductbyname(productname) {
      return this.http.get<Product[]>(`${environment.apiUrl}products/getproductdetailsbyname/` + productname)
      
        .pipe(
          tap(_ => console.log(`Product name retrieved: ${productname}`)),
          catchError(this.handleError<Product[]>(`Get Song id=${productname}`))
          
        );
       
    }




    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          // TODO: send the error to remote logging infrastructure
          console.error(error);
          // TODO: better job of transforming error for user consumption
          console.log(`${operation} failed: ${error.message}`);
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }
}