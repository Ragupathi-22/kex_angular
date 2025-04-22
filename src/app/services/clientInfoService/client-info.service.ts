import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserService } from '../userService/user.service';
import { ClientInfoModel } from '../../model/clientInfoModel';

@Injectable({
  providedIn: 'root'
})
export class ClientInfoService {

  constructor( private http:HttpClient,private userService :UserService) { }

  getClientInfo(){
    const user =this.userService.getUser();
    const encodeCredential=btoa(`${user?.username}:${user?.password}`);

    const headers = new HttpHeaders({
      'Authorization': `Basic ${encodeCredential}`,
      'Content-Type': 'application/json'
    });
     return this.http.get<ClientInfoModel>(`${environment.apiBaseUrl}/clientinfo`,{headers})

  //    const data : ClientInfoModel={
  //     "success": true,
  //     "data": [
  //         {
  //             "fieldData": {
  //                 "Client: #": 1092,
  //                 "Client: Name": "Hakka Express",
  //                 "Contact: Name": "Ms. Georgia Jagdeo",
  //                 "Contact: Position": "",
  //                 "Contact: Ph: Work": "",
  //                 "Contact: Ph: Work 2": "",
  //                 "Contact: Ph: Ext": "",
  //                 "Contact: Ph: Ext 2": "",
  //                 "Contact: Fax": "",
  //                 "Contact: E Mail": "georgia@hakkarestaurant.com",
  //                 "Contact: Cell": "788-6542",
  //                 "Contact: Cell 2": "",
  //                 "Contact: Ph: Private": "",
  //                 "Contact: Name:Count": 2,
  //                 "Delivery: Contact Name": "Ms. Georgia Jagdeo",
  //                 "Delivery: Address": "Shoppes of Maraval\rSaddle Road\rMaraval",
  //                 "Delivery: Phone": "788-6542",
  //                 "Delivery: Phone ext": "",
  //                 "Delivery: Ph: Work 2": "",
  //                 "Delivery: Ph: Ext 2": "",
  //                 "Delivery: Position": "",
  //                 "Delivery: Fax": "",
  //                 "Delivery: E Mail": "georgia@hakkarestaurant.com",
  //                 "Delivery: Cell": "",
  //                 "Delivery: Cell 2": "",
  //                 "MontlhyRouteSort": 3,
  //                 "FortNightlyRouteSort": "",
  //                 "Billing: Address": "Shoppes of Maraval\rSaddle Road\rMaraval",
  //                 "Username": "Hakka Express",
  //                 "Password": "123",
  //                 "Contact: Trading Name": "Shoppes of Maraval",
  //                 "Contact: Trading As Label": "Branch:",
  //                 "Client: Type": "Service",
  //                 "Delivery: Run": "Port of Spain 1",
  //                 "Delivery: RunBiMonthly": "Port of Spain 1",
  //                 "BillingType": "",
  //                 "BillingFreguency": ""
  //             },
  //             "portalData": {},
  //             "recordId": "9",
  //             "modId": "12"
  //         }
  //     ]
  // };

  //    return data;
  }
}
