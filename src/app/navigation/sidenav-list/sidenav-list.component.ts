import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { User  } from 'src/app/models/user.model';
import { Role  } from 'src/app/models/role.model';


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  user1: User;
 
  currentUser: User;
            

  constructor(private authService: AuthenticationService,private router: Router) 
  
  {
    this.authService.user.subscribe(x => {
      
     // this.user = x
     // console.log(this.user)
    });
 
    }  
   

  ngOnInit(){
  
    
  }

  get isAdmin() {
    let user1 = JSON.parse(localStorage.getItem('candidate')); 
    return user1 && user1.role === Role.Admin;
}

  onLogout(){
   
    this.sidenavClose.emit();
    this.authService.logout(); 
    //this.router.navigate(['/login']);     

                 
  }
  
 
  
  
  
  @Output() sidenavClose = new EventEmitter();

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
}
