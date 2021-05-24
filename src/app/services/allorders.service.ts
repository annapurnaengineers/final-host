import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Allorders } from '../models/allorders.model';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AllordersService {
    constructor(private http: HttpClient) { }
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    
      dataRow:any;

    addallorders(addProduct: Allorders): Observable<any> {
        return this.http.post<Allorders>(`${environment.apiUrl}allorders/addorders`, addProduct, this.httpOptions)
          .pipe(
            catchError(this.handleError<Allorders>('Add Song'))
          );
      }

      adddispatchproducts(dataRow: Allorders): Observable<any> {
        return this.http.post<Allorders>(`${environment.apiUrl}allorders/addorders`, dataRow, this.httpOptions)
          .pipe(
            catchError(this.handleError<Allorders>('Add Song'))
          );
      }


    getAll() {
        return this.http.get(`${environment.apiUrl}allorders/getorders`);
    }


    deleteUser(_id: string): Observable<any> {
      return this.http.delete(`${environment.apiUrl}allorders/deleteorderbyid/${_id}`, { responseType: 'text' });
    }

    getUser(_id: string): Observable<any> {
      return this.http.get(`${environment.apiUrl}allorders/getorderbyid/${_id}`);
    }

    updateUser(_id: string, value: any): Observable<Object> {
      return this.http.put(`${environment.apiUrl}allorders/editorderbyid/${_id}` , value);
    }


    updateUser1(_id: string, value: any): Observable<Object> {
      // console.log(value);
      return this.http.put(`${environment.apiUrl}allorders/setisactivebyid/${_id}` , value);
      
    }


    getcountbydate(expecteddate :String) {
      return this.http.get<Allorders[]>(`${environment.apiUrl}allorders/getproductbydatee/` + expecteddate )
      
        .pipe(
          tap(_ => console.log(`Product id retrieved: ${expecteddate}`)),
          catchError(this.handleError<Allorders[]>(`Get Song id=${expecteddate}`))
          
        );
        }
    getProductbydate(createddate :String) {
      return this.http.get<Allorders[]>(`${environment.apiUrl}allorders/getproductbydate/` + createddate )
        .pipe(
          tap(_ => console.log(`Product id retrieved: ${createddate}`)),
          catchError(this.handleError<Allorders[]>(`Get Song id=${createddate}`))  
        );  
    }
    getDcprint(clientname :String , invoiceid :String) {
      return this.http.get<Allorders[]>(`${environment.apiUrl}allorders/getdcprint/` + clientname +'/' + invoiceid )
        .pipe(
          tap(_ => console.log(`Product id retrieved: ${clientname},${invoiceid}`)),
          catchError(this.handleError<Allorders[]>(`Get Song id=${clientname}`))
        );
    }
    
    getInvoicebyclient(clientname :String) {
      return this.http.get<Allorders[]>(`${environment.apiUrl}allorders/getinvoicebyclient/` + clientname )
      
        .pipe(
          tap(_ => console.log(`Product id retrieved: ${clientname}`)),
          catchError(this.handleError<Allorders[]>(`Get Song id=${clientname}`))
          
        );
       
    }

    getDcadd(clientname :String , invoiceid :String) {
      return this.http.get<Allorders[]>(`${environment.apiUrl}allorders/getinvoicetotalbyclientname/` + clientname +'/' + invoiceid )
        .pipe(
          tap(_ => console.log(`Product id retrieved: ${clientname},${invoiceid}`)),
          catchError(this.handleError<Allorders[]>(`Get Song id=${clientname}`))
        );
    }
    
       

    getDcinvoiceprint(clientname :String , invoiceid :String) {
      return this.http.get<Allorders[]>(`${environment.apiUrl}allorders/getdcinvoiceprint/` + clientname +'/' + invoiceid )
        .pipe(
          tap(_ => console.log(`Product id retrieved: ${clientname},${invoiceid}`)),
          catchError(this.handleError<Allorders[]>(`Get Song id=${clientname}`))
        );
    }
    
    getAllinvoicebyclientname(clientname :String ) {
      return this.http.get<Allorders[]>(`${environment.apiUrl}allorders/getallinvoicebyclient/` + clientname  )
        .pipe(
          tap(_ => console.log(`Product id retrieved: ${clientname}`)),
          catchError(this.handleError<Allorders[]>(`Get Song id=${clientname}`))
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