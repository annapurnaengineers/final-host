import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Onlydispatch } from '../models/onlydisptach.model';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OnlydispatchService {
    constructor(private http: HttpClient) { }
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    
      dataRow:any;

    addusedproducts(addProduct: Onlydispatch): Observable<any> {
        return this.http.post<Onlydispatch>(`${environment.apiUrl}onlydispatch/addonlydispatch`, addProduct, this.httpOptions)
          .pipe(
            catchError(this.handleError<Onlydispatch>('Add Song'))
          );
      }

      adddispatchproducts(dataRow: Onlydispatch): Observable<any> {
        return this.http.post<Onlydispatch>(`${environment.apiUrl}onlydispatch/addonlydispatch`, dataRow, this.httpOptions)
          .pipe(
            catchError(this.handleError<Onlydispatch>('Add Song'))
          );
      }


    getAll() {
        return this.http.get(`${environment.apiUrl}onlydispatch/getonlydispatch`);
    }

    getAllcount() {
      return this.http.get(`${environment.apiUrl}onlydispatch/getonlydispatchcount`);
  }

    updateUser1(_id: string, value: any): Observable<Object> {
        console.log(value);
        return this.http.put(`${environment.apiUrl}onlydispatch/setisactivebyid/${_id}` , value);
        
      }

    deleteUser(_id: string): Observable<any> {
      return this.http.delete(`${environment.apiUrl}onlydispatch/deleteonlydispatchbyid/${_id}`, { responseType: 'text' });
    }


    getProductbydate(dispatchdate :String) {
      return this.http.get<Onlydispatch[]>(`${environment.apiUrl}onlydispatch/getdispatchbydate/` + dispatchdate )
      
        .pipe(
          tap(_ => console.log(`Product id retrieved: ${dispatchdate}`)),
          catchError(this.handleError<Onlydispatch[]>(`Get Song id=${dispatchdate}`))
          
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