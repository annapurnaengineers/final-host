import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Onlyorders } from '../models/onlyorders.model';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OnlyordersService {
    constructor(private http: HttpClient) { }
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    
      dataRow:any;

    addusedproducts(addProduct: Onlyorders): Observable<any> {
        return this.http.post<Onlyorders>(`${environment.apiUrl}onlyorders/addonlyorders`, addProduct, this.httpOptions)
          .pipe(
            catchError(this.handleError<Onlyorders>('Add Song'))
          );
      }

      adddispatchproducts(dataRow: Onlyorders): Observable<any> {
        return this.http.post<Onlyorders>(`${environment.apiUrl}onlyorders/addonlyorders`, dataRow, this.httpOptions)
          .pipe(
            catchError(this.handleError<Onlyorders>('Add Song'))
          );
      }


    getAll() {
        return this.http.get(`${environment.apiUrl}onlyorders/getonlyorders`);
    }

    getAllordercount() {
      return this.http.get(`${environment.apiUrl}onlyorders/getonlyorderscount`);
  }


    deleteUser(_id: string): Observable<any> {
      return this.http.delete(`${environment.apiUrl}onlyorders/deleteonlyorderbyid/${_id}`, { responseType: 'text' });
    }
    
    updateUser1(_id: string, value: any): Observable<Object> {
      console.log(value);
      return this.http.put(`${environment.apiUrl}onlyorders/setisactivebyid/${_id}` , value);
      
    }

    getProductbydate(processdate :String) {
      return this.http.get<Onlyorders[]>(`${environment.apiUrl}onlyorders/getproductbydate/` + processdate )
      
        .pipe(
          tap(_ => console.log(`Product id retrieved: ${processdate}`)),
          catchError(this.handleError<Onlyorders[]>(`Get Song id=${processdate}`))
          
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