import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Logindetails } from '../models/logindetails.model'
import { environment } from '../../environments/environment';
import { LogindetailsService } from './logindetails.service';
import { DatePipe } from '@angular/common';




@Injectable({
  providedIn: 'root'
})



export class AuthenticationService {


  logindetails = new Logindetails();
  logindetail: Logindetails;
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;
  xuser: any;
  public currentUser: Observable<User>;
  public logoutdate: Date;
 public ipAddress: any;
  ip: string;
  ip1: string;
  ipaa : any;
  iplocalstorage: any;
  addLogs1: any;
  email: any;
  role: any;
  username: any;
  logintime: any;
  logouttime: any;
  _id: string;
  hope: string;

  constructor(private router: Router, private http: HttpClient,  private loginService: LogindetailsService, private datePipe: DatePipe) {
    this.xuser = JSON.parse(window.localStorage.getItem('candidate'));
    this.ipaa = JSON.parse(window. localStorage.getItem('ipaddress'));
    if (this.xuser) {
      this.userSubject = new BehaviorSubject(this.xuser);
    }
    else {
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

   ipa(user) {
    this.http.get<{ ip }>('https://jsonip.com')
      .subscribe( data => {
        console.log('th data', data);
        this.ipAddress = data.ip;

        this.logindetails.email = user.userCredentials.email;
        this.logindetails.role =  user.userCredentials.role;
        this.logindetails.username = user.userCredentials.username;
        this.logindetails.logintime = new Date().toISOString();
         this.logindetails.ip =  this.ipAddress;
        console.log(this.logindetails)
    
       this.loginService.adduserlogs(this.logindetails)
          .subscribe((res) => {
            console.log(res);
            this.hope = res && res._id;
            
        console.log(this.hope,"testing")
          })
 

      })
  }


  async login(email: string, password: string) {
   
    return this.http.post<any>(`${environment.apiUrl}users/login`, { email, password })
      .pipe(map(user => {
     
        console.log(user);
        //  localStorage.removeItem('candidate');
       
        this.userSubject.next(user);
        localStorage.setItem("candidate", JSON.stringify(user));
        this.ipa(user);
       // this.sendlogs(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        //   console.log(user)
       
        return user;
      }));
  }




  // sendlogs(user) {

  //   this.logindetails.email = user.userCredentials.email;
  //   this.logindetails.role =  user.userCredentials.role;
  //   this.logindetails.username = user.userCredentials.username;
  //   this.logindetails.logintime = new Date().toISOString();
  //  // let iapp = JSON.parse(localStorage.getItem('ipaddress')); 
  //    this.logindetails.ip =  iapp;
  //   console.log(this.logindetails)
  //  this.loginService.adduserlogs(this.logindetails)
  //     .subscribe((res) => {
  //       console.log(res)
  //     })
  // }


  logout() {

   
    let user2 = JSON.parse(localStorage.getItem('candidate'));
    this.logoutlog();
    user2.success = false;
    this.userSubject.next(user2);
    this.userSubject = null;
    this.router.navigate(['/login']);
    window.location.reload();
    localStorage.removeItem('candidate');
    localStorage.removeItem('currentUser');
   // localStorage.removeItem('ipaddress');
    //this.logoutdate = new Date();
    //console.log("logout", this.logoutdate);

  };

  logoutlog() {
 
 this.logindetails.logouttime = new Date().toISOString();;
    this.loginService.updateLogouttime(this.hope, this.logindetails)
      .subscribe(data => {
        this.logindetails = new Logindetails();
        console.log(data);
      }, error => console.log(error));
 }
 
  // isLoggedIn() {
  //   if (this.userSubject == null) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }




}






