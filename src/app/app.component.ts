import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import { User } from './models/user.model';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User;
  title = 'aep';

  user1: any;

  //xtrue: Observable<boolean>;

  constructor(private authService: AuthenticationService, private router: Router) {
  
   this.authService.user.subscribe(xtrue =>{

    this.user1= xtrue;
    console.log(this.user1,"ggg")
    if ( !this.user1 || (this.user1 && !this.user1.success))
    {
    //this.router.navigate(['/login']);
    localStorage.removeItem('candidate');
    }
   })

     // this.user1= JSON.parse(window.localStorage.getItem('candidate')); 
      // console.log(Object.assign({},this.user1["success"]))
    console.log(JSON.parse(window.localStorage.getItem('candidate')));
  }
  



  ngOnInit() {
    // this.xtrue$ = this.authService.isLoggedIn; 
  }



  // onLogout() {

  //   this.sidenavClose.emit();
  //   window.location.reload();
  //   this.authService.logout();
  //   // this.router.navigate(['/login']);  
  //   localStorage.removeItem('candidate');
  // }



  @Output() sidenavClose = new EventEmitter();

  onSidenavClose = () => {
    this.sidenavClose.emit();
  }


  
}


