import { Injectable } from '@angular/core';
import { UserService } from '../userService/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ClientInfoModel } from '../../model/clientInfoModel';
import { DeliveryNotesModel } from '../../model/deliveryNotesModel';

@Injectable({
  providedIn: 'root'
})
export class DeliveryNoteService {

  constructor(private userService:UserService,private http:HttpClient) { }

   getDeliveryNotes(){
    
      const user =this.userService.getUser();
      const encodeCredential=btoa(`${user?.username}:${user?.password}`);
  
      const headers = new HttpHeaders({
        'Authorization': `Basic ${encodeCredential}`,
        'Content-Type': 'application/json'
      });

       return this.http.get<DeliveryNotesModel>(`${environment.apiBaseUrl}/deliveryNotes`,{headers})

    //    const data:DeliveryNotesModel  ={
    //     "success": true,
    //     "data": [
    //         {
    //             "fieldData": {
    //                 "Record Status": "Record 1 of 2 (77 total)",
    //                 "Todays Date": "",
    //                 "__ADMIN__": "",
    //                 "Admin: Relationship": 1,
    //                 "Report: Count": 2,
    //                 "Record:Count": 2,
    //                 "Record:Creator": "suresh",
    //                 "Record:Creation Date": "01/13/2025",
    //                 "Record:Creation Time": "12:23:43",
    //                 "Record:Modified By Whom": "suresh",
    //                 "Record:Modified Date": "01/13/2025",
    //                 "Record:Modified Time": "12:26:52",
    //                 "Record:#": 94,
    //                 "Window Size": "640 x 480",
    //                 "__CONTACT__": "",
    //                 "Contact: Name": "Ms. Georgia Jagdeo",
    //                 "Contact: Ph: Work": "",
    //                 "__CLIENT__": "",
    //                 "Client: #": 1092,
    //                 "Client: Name": "Hakka Express",
    //                 "Client: Trading As Label": "Branch:",
    //                 "Client: Trading As Name": "Shoppes of Maraval",
    //                 "Client: Delivery Name": "",
    //                 "Client: Delivery Trading As Name": "Shoppes of Maraval",
    //                 "Client: Delivery Trading As Label": "Branch:",
    //                 "__DELIVERY ADDRESS__": "",
    //                 "Delivery: Date": "01/13/2025",
    //                 "Delivery: ServiceDate": "",
    //                 "Delivery: Note#": 82833,
    //                 "Delivery: Contact Name": "Ms. Georgia Jagdeo",
    //                 "Delivery: Address": "Shoppes of Maraval\rSaddle Road\rMaraval",
    //                 "Delivery: Vehicle#": "",
    //                 "Delivery: Contact Phone#": "788-6542",
    //                 "Delivery: Contact Phone# ext": "",
    //                 "Delivery: Zone": "Port of Spain 9",
    //                 "Delivery: Total Qty Delivered": 4,
    //                 "__BILLING ADDRESS__": "",
    //                 "Billing: Address": "Shoppes of Maraval\rSaddle Road\rMaraval",
    //                 "Comments": "",
    //                 "BatchID": "009",
    //                 "DeliveryCount": 2,
    //                 "Contact: Ph: Work Ext": ""
    //             },
    //             "portalData": {
    //                 "Delivery Lines": [
    //                     {
    //                         "recordId": "194",
    //                         "Delivery Lines::Description: Description": "Test",
    //                         "Delivery Lines::Quantity: Returned": 1,
    //                         "Delivery Lines::Item#": 5,
    //                         "Delivery Lines::Quantity: Delivered": 4,
    //                         "Delivery Lines::Description: Type": "",
    //                         "Delivery Lines::Description: Colour": "",
    //                         "Delivery Lines::Description: Size": "",
    //                         "modId": "0"
    //                     }
    //                 ]
    //             },
    //             "recordId": "196",
    //             "modId": "3",
    //             "portalDataInfo": [
    //                 {
    //                     "database": "Kex Clone",
    //                     "table": "Delivery Lines",
    //                     "foundCount": 1,
    //                     "returnedCount": 1
    //                 }
    //             ]
    //         },
    //         {
    //             "fieldData": {
    //                 "Record Status": "Record 2 of 2 (77 total)",
    //                 "Todays Date": "",
    //                 "__ADMIN__": "",
    //                 "Admin: Relationship": 1,
    //                 "Report: Count": 2,
    //                 "Record:Count": 2,
    //                 "Record:Creator": "suresh",
    //                 "Record:Creation Date": "01/13/2025",
    //                 "Record:Creation Time": "19:40:31",
    //                 "Record:Modified By Whom": "suresh",
    //                 "Record:Modified Date": "01/13/2025",
    //                 "Record:Modified Time": "19:40:38",
    //                 "Record:#": 100,
    //                 "Window Size": "640 x 480",
    //                 "__CONTACT__": "",
    //                 "Contact: Name": "Ms. Georgia Jagdeo",
    //                 "Contact: Ph: Work": "",
    //                 "__CLIENT__": "",
    //                 "Client: #": 1092,
    //                 "Client: Name": "Hakka Express",
    //                 "Client: Trading As Label": "Branch:",
    //                 "Client: Trading As Name": "Shoppes of Maraval",
    //                 "Client: Delivery Name": "",
    //                 "Client: Delivery Trading As Name": "Shoppes of Maraval",
    //                 "Client: Delivery Trading As Label": "Branch:",
    //                 "__DELIVERY ADDRESS__": "",
    //                 "Delivery: Date": "01/17/2025",
    //                 "Delivery: ServiceDate": "",
    //                 "Delivery: Note#": 82873,
    //                 "Delivery: Contact Name": "Ms. Georgia Jagdeo",
    //                 "Delivery: Address": "Shoppes of Maraval\rSaddle Road\rMaraval",
    //                 "Delivery: Vehicle#": "",
    //                 "Delivery: Contact Phone#": "788-6542",
    //                 "Delivery: Contact Phone# ext": "",
    //                 "Delivery: Zone": "Port of Spain 9",
    //                 "Delivery: Total Qty Delivered": "",
    //                 "__BILLING ADDRESS__": "",
    //                 "Billing: Address": "Shoppes of Maraval\rSaddle Road\rMaraval",
    //                 "Comments": "",
    //                 "BatchID": "",
    //                 "DeliveryCount": 2,
    //                 "Contact: Ph: Work Ext": ""
    //             },
    //             "portalData": {
    //                 "Delivery Lines": [
    //                     {
    //                         "recordId": "207",
    //                         "Delivery Lines::Description: Description": "",
    //                         "Delivery Lines::Quantity: Returned": "",
    //                         "Delivery Lines::Item#": 2342,
    //                         "Delivery Lines::Quantity: Delivered": "",
    //                         "Delivery Lines::Description: Type": "",
    //                         "Delivery Lines::Description: Colour": "",
    //                         "Delivery Lines::Description: Size": "",
    //                         "modId": "0"
    //                     }
    //                 ]
    //             },
    //             "recordId": "236",
    //             "modId": "2",
    //             "portalDataInfo": [
    //                 {
    //                     "database": "Kex Clone",
    //                     "table": "Delivery Lines",
    //                     "foundCount": 1,
    //                     "returnedCount": 1
    //                 }
    //             ]
    //         }
    //     ]
    // }


    // return data;
    }

    
}
