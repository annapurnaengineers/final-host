import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Usedproduct } from '../models/usedproduct.model';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UsedproductService {
    constructor(private http: HttpClient) { }
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    
      dataRow:any;
    addusedproducts(addProduct: Usedproduct): Observable<any> {
        return this.http.post<Usedproduct>(`${environment.apiUrl}usedproducts/addusedproduct`, addProduct, this.httpOptions)
          .pipe(
            catchError(this.handleError<Usedproduct>('Add Song'))
          );
      }

      adddispatchproducts(dataRow: Usedproduct): Observable<any> {
        return this.http.post<Usedproduct>(`${environment.apiUrl}usedproducts/addusedproduct`, dataRow, this.httpOptions)
          .pipe(
            catchError(this.handleError<Usedproduct>('Add Song'))
          );
      }


    getAll() {
        return this.http.get(`${environment.apiUrl}usedproducts/getusedproduct`);
    }
    updateUsedproduct(_id: string, value: any): Observable<Object> {
      return this.http.put(`${environment.apiUrl}usedproducts/editusedproductbyid/${_id}`, value);
    }

  getUsedproductbyid(_id: string): Observable<any> {
        return this.http.get(`${environment.apiUrl}usedproducts/getusedproductbyid/${_id}`);
      }

    deleteUser(_id: string): Observable<any> {
      return this.http.delete(`${environment.apiUrl}usedproducts/deleteusedproductbyid/${_id}`, { responseType: 'text' });
    }


    getProductbydate(createddate :String) {
      return this.http.get<Usedproduct[]>(`${environment.apiUrl}usedproducts/getproductbydate/` + createddate )
      
        .pipe(
          tap(_ => console.log(`Product id retrieved: ${createddate}`)),
          catchError(this.handleError<Usedproduct[]>(`Get Song id=${createddate}`))
          
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