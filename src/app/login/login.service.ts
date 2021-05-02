import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable()
export class LoginService {

	constructor(private http: HttpClient){

	}
	
	validateLogin(user: User){
		return this.http.post('http://aapi-env.eba-jwp2b8qx.ap-south-1.elasticbeanstalk.com/users/login',{
			email : user.email,
			password : user.password,
			token :user.token
		})
	}

}