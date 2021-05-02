// export class User {
 
// 	constructor(){
// 		this.email = '';
// 		this.password = '';
// 		this.token?  ''
// 	}:
// 	public email;
// 	public password;
// 	public token?
// }


export class User {
    id: number;
    username: string;
    password: string;
    email: string;
    role: string;
    token?: string;
}