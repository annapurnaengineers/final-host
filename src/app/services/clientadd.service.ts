import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Clientadd } from '../models/clientadd.model';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientaddService {
  constructor(private http: HttpClient) { }
  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };


    addclientadd(addProduct: Clientadd): Observable<any> {
      return this.http.post<Clientadd>(`${environment.apiUrl}clientadd/addclientadd`, addProduct, this.httpOptions)
        .pipe(
          catchError(this.handleError<Clientadd>('Add Client'))
        );
    }


    getAll() {
      return this.http.get(`${environment.apiUrl}clientadd/getclientadd`);
  }


  getClientaddbyid(_id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}clientadd/getclientadd/${_id}`);
  }

  updateClientbyid(_id: string, value: any): Observable<Object> {
    return this.http.put(`${environment.apiUrl}clientadd/editclientaddbyid/${_id}`, value);
  }


  deleteClienaddtbyid(_id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}clientadd/deleteclientaddbyid/${_id}`, { responseType: 'text' });
  }
  

  

  getCodebyclientname(clientname :String) {
    return this.http.get<Clientadd[]>(`${environment.apiUrl}clientadd/getcodebyclientname/` + clientname )
      .pipe(
        tap(_ => console.log(`ClientProduct id retrieved: ${clientname}`)),
        catchError(this.handleError<Clientadd[]>(`Get Song id=${clientname}`))    
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
