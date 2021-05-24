import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Dcadd } from '../models/dcadd.model';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DcService {
  constructor(private http: HttpClient) { }
  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    addDclist(addProduct: Dcadd): Observable<any> {
      return this.http.post<Dcadd>(`${environment.apiUrl}dc/adddclist`, addProduct, this.httpOptions)
        .pipe(
          catchError(this.handleError<Dcadd>('Add DC'))
        );
    }

    getAll() {
      return this.http.get(`${environment.apiUrl}dc/getdclist`);
  }



  getClientbyid(_id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}dc/getdcid/${_id}`);
  }

  updateClientbyid(_id: string, value: any): Observable<Object> {
    return this.http.put(`${environment.apiUrl}dc/editdclistbyid/${_id}`, value);
  }


  
  deleteClientbyid(_id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}dc/deletedcbyid/${_id}`, { responseType: 'text' });
  }
  
  getAlldcbyclientname(clientname :String) {
    return this.http.get<Dcadd[]>(`${environment.apiUrl}dc/getalldcbyclient/` + clientname )
      .pipe(
        tap(_ => console.log(`ClientProduct id retrieved: ${clientname}`)),
        catchError(this.handleError<Dcadd[]>(`Get Song id=${clientname}`))    
      );     
  }

  getAlldcbycreateddate(createddate :String) {
    return this.http.get<Dcadd[]>(`${environment.apiUrl}dc/getdcbydate/` + createddate )
      .pipe(
        tap(_ => console.log(`ClientProduct id retrieved: ${createddate}`)),
        catchError(this.handleError<Dcadd[]>(`Get Song id=${createddate}`))    
      );     
  }

  getTotalbalancebyclientname(clientname :String) {
    return this.http.get<Dcadd[]>(`${environment.apiUrl}dc/gettotalbalancebyclientname/` + clientname )
      .pipe(
        tap(_ => console.log(`ClientProduct id retrieved: ${clientname}`)),
        catchError(this.handleError<Dcadd[]>(`Get Song id=${clientname}`))    
      );     
  }

  getDcidbyincoiceid(clientname :String,invoiceid:String) {
    return this.http.get<Dcadd[]>(`${environment.apiUrl}dc/getdcidbyinvoiceid/` + clientname +'/' + invoiceid )
      .pipe(
        tap(_ => console.log(`ClientProduct id retrieved: ${clientname}`)),
        catchError(this.handleError<Dcadd[]>(`Get Song id=${clientname}`))    
      );     
  }

  getInvoicebalanceby(clientname :String) {
    return this.http.get<Dcadd[]>(`${environment.apiUrl}dc/gettotalbalancebyclientname/` + clientname )
      .pipe(
        tap(_ => console.log(`ClientProduct id retrieved: ${clientname}`)),
        catchError(this.handleError<Dcadd[]>(`Get Song id=${clientname}`))    
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
