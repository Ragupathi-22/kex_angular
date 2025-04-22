import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponseModel, UserModel } from '../../model/userModel';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  
  userLogin(username: string, password: string) {
    const encodedCredentials = btoa(`${username}:${password}`);

    const headers = new HttpHeaders({
      'Authorization': `Basic ${encodedCredentials}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<UserResponseModel>(`${environment.apiBaseUrl}/auth`, { headers });
  }


  //store user info

  saveUser(user: UserModel) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }
  
  deleteUser() {
    sessionStorage.clear();
    // sessionStorage.removeItem('user');
    // sessionStorage.removeItem('clientId');
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }


  getUser(): UserModel | null {
    const isUser = sessionStorage.getItem('user');

    if (isUser) {
      const parsedUser: UserModel = JSON.parse(isUser);
      return parsedUser;
    }
    return null;
  }

  setClienId(id:any){
  sessionStorage.setItem('clientId',JSON.stringify(id));
  }

  getClientId(){
    const id=sessionStorage.getItem('clientId');
    if(id){
      const parse =JSON.parse(id);
      return parse;
    }
    return null;
  }


}
