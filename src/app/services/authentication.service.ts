import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject  , Observable} from 'rxjs';
//import {  of } from 'rxjs/add/observable/of';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { normalizeGenFileSuffix } from '@angular/compiler/src/aot/util';


@Injectable({
  providedIn: 'root'
})



export class AuthenticationService {
  
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;
  xuser: any;
  public currentUser: Observable<User>;
  
  constructor( private router: Router ,  private http: HttpClient)  {
   this.xuser =JSON.parse(window.localStorage.getItem('candidate'));
   if(this.xuser)
   {
    this.userSubject = new BehaviorSubject(this.xuser);
   }
   else{
    this.userSubject = new BehaviorSubject(null);
   }
    this.user = this.userSubject.asObservable();
}
public get userValue() {
  return this.userSubject.value;
}



   
  // get isLoggedIn()
  //  {
  //   localStorage.getItem('Token');
  //  // window.localStorage.getItem('Token'); 
  //   sessionStorage.getItem('Token');
  //   return this.loggedIn.asObservable();
  // }


  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}users/login`, { email, password })
        .pipe(map(user => {
           
            console.log(user);
          //  localStorage.removeItem('candidate');
          this.userSubject.next(user);
            localStorage.setItem("candidate", JSON.stringify(user));
            localStorage.setItem('currentUser', JSON.stringify(user));
            
           
           console.log(user)
            return user;
        }));
}


logout() {
  
let user2 = JSON.parse(localStorage.getItem('candidate'));
user2.success=false;
this.userSubject.next(user2);
this.userSubject = null;
this.router.navigate(['/login']);  
window.location.reload();
localStorage.removeItem('candidate');
localStorage.removeItem('currentUser');
 
}

// isLoggedIn() {
//   if (this.userSubject == null) {
//     return false;
//   } else {
//     return true;
//   }
// }




  }

  




