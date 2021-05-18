import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Logindetails } from '../models/logindetails.model';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LogindetailsService {
    constructor(private http: HttpClient) { }
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    adduserlogs(logindetails: Logindetails): Observable<any> {
        return this.http.post<Logindetails>(`${environment.apiUrl}logindetails/addlogindetails`, logindetails, this.httpOptions)
            .pipe(
                catchError(this.handleError<Logindetails>('Added Logs'))
            );
    }


    updateLogouttime(_id: String, value: any): Observable<Object> {
        return this.http.put(`${environment.apiUrl}logindetails/editlogouttime/${_id}`, value);
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