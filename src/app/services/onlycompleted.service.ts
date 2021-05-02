import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Onlycompleted } from '../models/onlycompleted.model';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OnlycompletedService {
    constructor(private http: HttpClient) { }
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    
      dataRow:any;

    addusedproducts(addProduct: Onlycompleted): Observable<any> {
        return this.http.post<Onlycompleted>(`${environment.apiUrl}onlycompleted/addonlycompleted`, addProduct, this.httpOptions)
          .pipe(
            catchError(this.handleError<Onlycompleted>('Add Song'))
          );
      }

      adddispatchproducts(dataRow: Onlycompleted): Observable<any> {
        return this.http.post<Onlycompleted>(`${environment.apiUrl}onlycompleted/addonlycompleted`, dataRow, this.httpOptions)
          .pipe(
            catchError(this.handleError<Onlycompleted>('Add Song'))
          );
      }


    getAll() {
        return this.http.get(`${environment.apiUrl}onlycompleted/getonlycompleted`);
    }


    deleteUser(_id: string): Observable<any> {
      return this.http.delete(`${environment.apiUrl}onlycompleted/deleteonlycompletedbyid/${_id}`, { responseType: 'text' });
    }

    updateUser1(_id: string, value: any): Observable<Object> {
        console.log(value);
        return this.http.put(`${environment.apiUrl}onlycompleted/setisactivebyid/${_id}` , value);
        
      }
    getProductbydate(completeddate :String) {
      return this.http.get<Onlycompleted[]>(`${environment.apiUrl}onlycompleted/getcompletedbydate/` + completeddate )
      
        .pipe(
          tap(_ => console.log(`Product id retrieved: ${completeddate}`)),
          catchError(this.handleError<Onlycompleted[]>(`Get Song id=${completeddate}`))
          
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