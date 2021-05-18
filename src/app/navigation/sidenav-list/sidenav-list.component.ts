import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { User  } from 'src/app/models/user.model';
import { Role  } from 'src/app/models/role.model';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  user1: User;
 
  currentUser: User;
  ipAddress:any;
  ip:string;
  idd: any;

  constructor(private authService: AuthenticationService,private router: Router,private http: HttpClient) 
  
  {
    this.authService.user.subscribe(x => {
      
     // this.user = x
     // console.log(this.user)
    });
 
    }  
   

  ngOnInit(){
  
    this.ipa();
  }

  get isAdmin() {
    let user1 = JSON.parse(localStorage.getItem('candidate')); 
    // console.log(user1 && user1.userCredentials.role);
    return user1 && user1.userCredentials.role === Role.Admin;
   
}

  onLogout(){

    this.sidenavClose.emit();
    this.authService.logout(); 
    //this.router.navigate(['/login']);     

                 
  }
  
 
  
  ipa()
  {
    this.http.get<{ip}>('https://jsonip.com')
    .subscribe( data => {
      console.log('th data', data);
      this.ipAddress = data.ip;
      console.log(this.ipAddress)
    })
  }
  
  
  @Output() sidenavClose = new EventEmitter();

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
}
