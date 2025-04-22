import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../userService/user.service';
import { environment } from '../../../environments/environment';
import { MatApiModel } from '../../model/MatModel';

@Injectable({
  providedIn: 'root'
})
export class MatLocationService {

  constructor(private userService:UserService,private http:HttpClient) { }
  
     getMatLocation(){
      
        const user =this.userService.getUser();
        const encodeCredential=btoa(`${user?.username}:${user?.password}`);
    
        const headers = new HttpHeaders({
          'Authorization': `Basic ${encodeCredential}`,
          'Content-Type': 'application/json'
        });

        const body={
          clientId :this.userService.getClientId()
        }
  
         return this.http.post<MatApiModel>(`${environment.apiBaseUrl}/matLocation`,body,{headers});
  
      }
  
      
  
}
