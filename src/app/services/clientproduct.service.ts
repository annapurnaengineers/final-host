import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Clientproduct } from '../models/clientproduct.model';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ClientproductService {
    constructor(private http: HttpClient) { }
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    

    addclientsproducts(addProduct: Clientproduct): Observable<any> {
        return this.http.post<Clientproduct>(`${environment.apiUrl}clientproducts/addclientproduct`, addProduct, this.httpOptions)
          .pipe(
            catchError(this.handleError<Clientproduct>('Add Song'))
          );
      }

      getUser(_id: string): Observable<any> {
        return this.http.get(`${environment.apiUrl}clientproducts/getclientproductbyid/${_id}`);
      }

    updateUser(_id: string, value: any): Observable<Object> {
        return this.http.put(`${environment.apiUrl}clientproducts/editclientproductbyid/${_id}`, value);
      }


    getProductbyid(id) {
        return this.http.get<Clientproduct[]>(`${environment.apiUrl}clientproducts/getclientproductbyid/` + id)
        
          .pipe(
            tap(_ => console.log(`Product id retrieved: ${id}`)),
            catchError(this.handleError<Clientproduct[]>(`Get Song id=${id}`))
            
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