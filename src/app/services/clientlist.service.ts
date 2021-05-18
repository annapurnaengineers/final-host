import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Clientlist } from '../models/clientlist.model';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class ClientlistService {
    constructor(private http: HttpClient) { }
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    

    addclientproducts(addProduct: Clientlist): Observable<any> {
        return this.http.post<Clientlist>(`${environment.apiUrl}clientlist/addclientlist`, addProduct, this.httpOptions)
          .pipe(
            catchError(this.handleError<Clientlist>('Add products'))
          );
      }



    getAll() {
        return this.http.get(`${environment.apiUrl}clientlist/getclientlist`);
    }



    getClientbyid(_id: string): Observable<any> {
      return this.http.get(`${environment.apiUrl}clientlist/getclientlistid/${_id}`);
    }

    updateClientbyid(_id: string, value: any): Observable<Object> {
      return this.http.put(`${environment.apiUrl}clientlist/editclientlistbyid/${_id}`, value);
    }


    deleteClientbyid(_id: string): Observable<any> {
      return this.http.delete(`${environment.apiUrl}clientlist/deleteclientlistbyid/${_id}`, { responseType: 'text' });
    }
    


    getclientnameonly() {
      return this.http.get(`${environment.apiUrl}clientlist/getclientnames`);
  }

    getCategorybyclientname(clientname :String) {
        return this.http.get<Clientlist[]>(`${environment.apiUrl}clientlist/getproductdetailsbyname/` + clientname )
          .pipe(
            tap(_ => console.log(`ClientProduct id retrieved: ${clientname}`)),
            catchError(this.handleError<Clientlist[]>(`Get Song id=${clientname}`))    
          );     
      }

      getProductbycategory(category :String) {
        return this.http.get<Clientlist[]>(`${environment.apiUrl}clientlist/getproductbycategory/` + category )
          .pipe(
            tap(_ => console.log(`Product id retrieved: ${category}`)),
            catchError(this.handleError<Clientlist[]>(`Get Song id=${category}`))
            
          );
         
      }
      getProductbycategory1(clientname :String , productname :String) {
        return this.http.get<Clientlist[]>(`${environment.apiUrl}clientlist/getproductbycategory1/` + clientname +'/' + productname )
          .pipe(
            tap(_ => console.log(`Product id retrieved: ${clientname},${productname}`)),
            catchError(this.handleError<Clientlist[]>(`Get Song id=${clientname}`))
            
          );
         
      }
      
      
      
      getProductpricebyproduct(productname :String) {
        return this.http.get<Clientlist[]>(`${environment.apiUrl}clientlist/getproductdetailsbycat/` + productname )
          .pipe(
            tap(_ => console.log(`Product id retrieved: ${productname}`)),
            catchError(this.handleError<Clientlist[]>(`Get Song id=${productname}`))
            
          );
         
      }

      getClientproductcreatedbydate(createddate :String) {
        return this.http.get<Clientlist[]>(`${environment.apiUrl}clientlist/getclientproductcreateddatebydate/` + createddate )
        
          .pipe(
            tap(_ => console.log(`Product id retrieved: ${createddate}`)),
            catchError(this.handleError<Clientlist[]>(`Get Song id=${createddate}`))
            
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