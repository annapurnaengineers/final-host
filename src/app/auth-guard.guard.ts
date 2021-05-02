import { Injectable } from '@angular/core';
import { CanActivate, Router , ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthenticationService } from './services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor( private authService: AuthenticationService, private router: Router, ) {}


  // canActivate(
  //   route: ActivatedRouteSnapshot
  // ): Observable<boolean> | Promise<boolean> | boolean {
  //   if (this.authService.isLoggedIn())
  //    {
  //       if(this.authService.isLoggedIn())
        
  //       {
  //         console.log('logged in guard');
  //     this.router.navigate(['dashboard']);
  //           return true;
  //       } else 
  //       {
  //         console.log('not logged in guard');
  //           this.router.navigate(['login']);
  //           return false;
  //       }
  //   } else {
  //     console.log('no token not logged in guard');
  //     this.router.navigate(['landing']);
  //     return false;
  //   }


  // }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //     if (this.authService.isLoggedIn) {
  //       console.log('logged in guard');
  //       this.router.navigate(['/dashboard']);
  //       return true;
  //     }
  //     window.alert('You dont have permission to view this page');
  //     return false;
  // }

  // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
  //   return this.authService.isLoggedIn.pipe(
  //     take(2),
  //     map((isLoggedIn: boolean) => {
  //       if (!isLoggedIn) {
  //         this.router.navigate(['/login']);
  //         return false;
  //       }
  //       if (localStorage.getItem('Token') != null) 
       
  //       return true;
  //       console.log('logged in guard');
  //     //  return true;
  //     })
  //   );
  // }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user =JSON.parse(localStorage.getItem('candidate')); 
   // const user1 = this.authService.xuser;
    console.log(user);
    console.log(user && user.userCredentials.role,"fff")
    //const user1 = this.authService.user;
   //  console.log(user1);
    if (user) {
     
    //  if (user && user.userCredentials.role == 'Admin') 
    
      // {
      //  this.router.navigate(['/dashboard']);
      //  return true;
      // }
      // else(user && user.userCredentials.role == 'User')
      // {
      //   this.router.navigate(['/products']);
      //   return true;
      // }

        // logged in so return true
       // if (this.authService.isLoggedIn) { return true; } 
       return true;
    } else {
        // not logged in so redirect to login page with the return url
    
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
        return false;
       
    }
}

  // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   if (localStorage.getItem('Token') != null) return true;
    
  //   this.router.navigate([ '/login' ]);
  //   return false;
  // }
}
