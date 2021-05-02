import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Purchaseproduct } from '../models/purchaseproduct.model';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class PurchaseproductService {
    constructor(private http: HttpClient) { }
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    

    addproducts(addProduct: Purchaseproduct): Observable<any> {
        return this.http.post<Purchaseproduct>(`${environment.apiUrl}purchaseproduct/addpurchaseproduct`, addProduct, this.httpOptions)
          .pipe(
            catchError(this.handleError<Purchaseproduct>('Add products'))
          );
      }



    getAll() {
        return this.http.get(`${environment.apiUrl}purchaseproduct/getpurchaseproduct`);
    }



    getUser(_id: string): Observable<any> {
      return this.http.get(`${environment.apiUrl}purchaseproduct/getpurchaseproductbyid/${_id}`);
    }

    updateUser(_id: string, value: any): Observable<Object> {
      return this.http.put(`${environment.apiUrl}purchaseproduct/editpurchaseproductbyid/${_id}`, value);
    }


    deleteUser(_id: string): Observable<any> {
      return this.http.delete(`${environment.apiUrl}purchaseproduct/deletepurchaseproductbyid/${_id}`, { responseType: 'text' });
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