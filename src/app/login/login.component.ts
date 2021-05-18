import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { User } from '../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent {

  public user: User;




  // constructor(private loginService: LoginService ,private router:Router, ) {
  // 	this.user = new User();
  // }

  // validateLogin() {
  // 	if(this.user.email && this.user.password) {

  // 		this.loginService.validateLogin(this.user).subscribe(result => {
  //       console.log('result is ', result);
  //       this.router.navigate(['/dashboard']);
  //     },
  //      error => {
  //       console.log('error is ', error);
  //     });
  // 	} else {
  // 		alert('enter email and password');
  // 	}
  // }


  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,


  ) {
    // redirect to home if already logged in
    if (this.authService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dasboard' || '/products';
  }
  get f() { return this.loginForm.controls; }




  // onSubmit() {
  //   this.submitted = true;
  //   if (this.loginForm.invalid) {
  //     return;
  //   } 
  //   this.loading = true;
  //   this.authService.login(this.f.email.value, this.f.password.value)
  //     .pipe(first())
  //     .subscribe({
  //       // (data: any) {
  //       next: () => {
  //         this.router.navigate([this.returnUrl]);
  //         // this.authService.login(this.form.value);
  //       },
  //       error: error => {
  //         this.error = error;
  //         this.loading = false;
  //       }
  //     });
  // }
 async  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    (await this.authService.login(this.f.email.value, this.f.password.value))
        .pipe(first())
        .subscribe({
            next: () => {
                this.router.navigate([this.returnUrl]);
            },
            error: error => {
                this.error = error;
                this.loading = false;
            }
        });
}

}
