import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../userService/user.service';
import { environment } from '../../../environments/environment';
import { InvoiceApiModel } from '../../model/invoiceModes';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  constructor( private http :HttpClient,private userService :UserService) { }

   getInvoices(){
      
        const user =this.userService.getUser();
        const encodeCredential=btoa(`${user?.username}:${user?.password}`);
    
        const headers = new HttpHeaders({
          'Authorization': `Basic ${encodeCredential}`,
          'Content-Type': 'application/json'
        });
  
         return this.http.get<InvoiceApiModel>(`${environment.apiBaseUrl}/invoices`,{headers})
  
//          const data:InvoiceApiModel  ={
//     "success": true,
//     "data": [
//         {
//             "fieldData": {
//                 "Record Status": "Record 1 of 4 (229 total)",
//                 "––––––––––––––––––––– 4": "",
//                 "––CLIENT: DETAILS––": "",
//                 "Client: Number": 1092,
//                 "Client: Name": "Hakka Express",
//                 "Client: Contact Name": "Ms. Georgia Jagdeo",
//                 "Client: Delivery Name": "",
//                 "Client: Delivery Trading As Name": "",
//                 "Client: Delivery Trading As Label": "",
//                 "Client: Delivery Contact Name": "Ms. Georgia Jagdeo",
//                 "Client: Delivery Phone": "788-6542",
//                 "Client: Delivery Phone ext": "",
//                 "Client: Delivery Address": "Shoppes of Maraval\rSaddle Road\rMaraval",
//                 "Client: Trading As Label": "Branch:",
//                 "Client: Trading As Name": "Shoppes of Maraval",
//                 "Client: Order #": "",
//                 "––CLIENT: ADDRESS––": "",
//                 "Client: Billing Address": "Shoppes of Maraval\rSaddle Road\rMaraval",
//                 "Client: Work Phone": "",
//                 "Client: Fax": "",
//                 "Client: Run": "Port of Spain 9",
//                 "--------------------": "",
//                 "––INV––": "",
//                 "Inv: #": 61966,
//                 "Inv: Comments": "This invoice is for the month of October 2024.",
//                 "Inv: Contract Period": "",
//                 "Inv: Service Frequency": "",
//                 "––––––––––––––––––––– 7": "",
//                 "Inv: Date": "10/01/2024",
//                 "Inv: Due Date": "10/31/2024",
//                 "Inv: Date: Month: #": 10,
//                 "Inv: Date: Month: Name": "October",
//                 "Inv: Date: Week:#": 40,
//                 "Inv: Date: Year": 2024,
//                 "––––––––––––––––––––– 9": "",
//                 "Inv: US Exchange Rate": 6.3824,
//                 "Inv: Number of Quotes": 4,
//                 "––––––––––––––––––––– 13": "",
//                 "––RECORD/LAYOUT––": "",
//                 "Record:Created By": "Lochanee",
//                 "Record:Created On": "10/18/2024",
//                 "Record:Modified By": "Suresh",
//                 "Record:Modified On": "11/15/2024",
//                 "Layout Plus 1": 12,
//                 "-------------------- 4": "",
//                 "Total before VAT": 420,
//                 "Total before VAT: Sum": 2133.01,
//                 "Total Incl.VAT": 472.5,
//                 "Total Incl.VAT:Sum": 2399.64,
//                 "––––––––––––––––––––– 12": "",
//                 "––VAT––": "",
//                 "VAT: %": 0.125,
//                 "VAT: Amount": 52.5,
//                 "VAT: Amount: Sum": 266.63,
//                 "-------------------- 3": "",
//                 "Window size": "480 x 640",
//                 "__PAYMENTS__": "",
//                 "Pmt: Total Payments": "",
//                 "Pmt: Bal. OS": 472.5,
//                 "Pmt: Inv fully Paid?": "N",
//                 "Monthly Unit Cost Label": "Monthly Unit Cost",
//                 "Monthly Unit Cost Label: On?": "Yes",
//                 "Overdue: Days": 17,
//                 "Overdue: Period": "d",
//                 "Overdue: Period: Text": "Less Than 30 Days",
//                 "Pmt: Bal. OS: Sum": 2399.64,
//                 "Custom Logo": "Custom Logo",
//                 "Custom Logo Flag": 0,
//                 "BatchId": "",
//                 "Batch:ServiceDate": "",
//                 "Custom Order": ""
//             },
//             "portalData": {
//                 "Receipts": [],
//                 "Inv LineItems": [
//                     {
//                         "recordId": "16",
//                         "Inv LineItems::Item: Size": "3’ x 5’",
//                         "Inv LineItems::Item: Colour": "Patterned Grey",
//                         "Inv LineItems::Item: Description: Type": "Patterned",
//                         "Inv LineItems::Item: Description": "Patterned Grey - 3’ x 5’",
//                         "Inv LineItems::Item:Qty": 2,
//                         "Inv LineItems::Item #": 6237,
//                         "Inv LineItems::Item: Selling Price ea": 120,
//                         "Inv LineItems::Item: Extended Price": 240,
//                         "modId": "4"
//                     },
//                     {
//                         "recordId": "17",
//                         "Inv LineItems::Item: Size": "4’ x 6’",
//                         "Inv LineItems::Item: Colour": "Patterned Grey",
//                         "Inv LineItems::Item: Description: Type": "Patterned",
//                         "Inv LineItems::Item: Description": "Patterned Grey - 4’ x 6’",
//                         "Inv LineItems::Item:Qty": 1,
//                         "Inv LineItems::Item #": 6238,
//                         "Inv LineItems::Item: Selling Price ea": 130,
//                         "Inv LineItems::Item: Extended Price": 130,
//                         "modId": "4"
//                     },
//                     {
//                         "recordId": "40",
//                         "Inv LineItems::Item: Size": "",
//                         "Inv LineItems::Item: Colour": "",
//                         "Inv LineItems::Item: Description: Type": "",
//                         "Inv LineItems::Item: Description": "Fortnightly Service (4’ x 6’)",
//                         "Inv LineItems::Item:Qty": 1,
//                         "Inv LineItems::Item #": 6240,
//                         "Inv LineItems::Item: Selling Price ea": 50,
//                         "Inv LineItems::Item: Extended Price": 50,
//                         "modId": "4"
//                     }
//                 ]
//             },
//             "recordId": "8",
//             "modId": "12",
//             "portalDataInfo": [
//                 {
//                     "database": "Kex Clone",
//                     "table": "Receipts",
//                     "foundCount": 0,
//                     "returnedCount": 0
//                 },
//                 {
//                     "database": "Kex Clone",
//                     "table": "Inv LineItems",
//                     "foundCount": 3,
//                     "returnedCount": 3
//                 }
//             ]
//         },
//         {
//             "fieldData": {
//                 "Record Status": "Record 2 of 4 (229 total)",
//                 "––––––––––––––––––––– 4": "",
//                 "––CLIENT: DETAILS––": "",
//                 "Client: Number": 1092,
//                 "Client: Name": "Hakka Express",
//                 "Client: Contact Name": "Ms. Georgia Jagdeo",
//                 "Client: Delivery Name": "",
//                 "Client: Delivery Trading As Name": "",
//                 "Client: Delivery Trading As Label": "",
//                 "Client: Delivery Contact Name": "Ms. Georgia Jagdeo",
//                 "Client: Delivery Phone": "788-6542",
//                 "Client: Delivery Phone ext": "",
//                 "Client: Delivery Address": "Shoppes of Maraval\rSaddle Road\rMaraval",
//                 "Client: Trading As Label": "Branch:",
//                 "Client: Trading As Name": "Shoppes of Maraval",
//                 "Client: Order #": "",
//                 "––CLIENT: ADDRESS––": "",
//                 "Client: Billing Address": "Shoppes of Maraval\rSaddle Road\rMaraval",
//                 "Client: Work Phone": "",
//                 "Client: Fax": "",
//                 "Client: Run": "Port of Spain 9",
//                 "--------------------": "",
//                 "––INV––": "",
//                 "Inv: #": 62075,
//                 "Inv: Comments": "",
//                 "Inv: Contract Period": "",
//                 "Inv: Service Frequency": "",
//                 "––––––––––––––––––––– 7": "",
//                 "Inv: Date": "01/13/2025",
//                 "Inv: Due Date": "02/12/2025",
//                 "Inv: Date: Month: #": 1,
//                 "Inv: Date: Month: Name": "January",
//                 "Inv: Date: Week:#": 3,
//                 "Inv: Date: Year": 2025,
//                 "––––––––––––––––––––– 9": "",
//                 "Inv: US Exchange Rate": 6.3824,
//                 "Inv: Number of Quotes": 4,
//                 "––––––––––––––––––––– 13": "",
//                 "––RECORD/LAYOUT––": "",
//                 "Record:Created By": "suresh",
//                 "Record:Created On": "01/13/2025",
//                 "Record:Modified By": "suresh",
//                 "Record:Modified On": "01/13/2025",
//                 "Layout Plus 1": 19,
//                 "-------------------- 4": "",
//                 "Total before VAT": 0,
//                 "Total before VAT: Sum": 2133.01,
//                 "Total Incl.VAT": 0,
//                 "Total Incl.VAT:Sum": 2399.64,
//                 "––––––––––––––––––––– 12": "",
//                 "––VAT––": "",
//                 "VAT: %": 0.125,
//                 "VAT: Amount": 0,
//                 "VAT: Amount: Sum": 266.63,
//                 "-------------------- 3": "",
//                 "Window size": "480 x 640",
//                 "__PAYMENTS__": "",
//                 "Pmt: Total Payments": "",
//                 "Pmt: Bal. OS": 0,
//                 "Pmt: Inv fully Paid?": "N",
//                 "Monthly Unit Cost Label": "Monthly\rUnit Cost",
//                 "Monthly Unit Cost Label: On?": "",
//                 "Overdue: Days": 0,
//                 "Overdue: Period": "d",
//                 "Overdue: Period: Text": "Less Than 30 Days",
//                 "Pmt: Bal. OS: Sum": 2399.64,
//                 "Custom Logo": "Custom Logo",
//                 "Custom Logo Flag": 1,
//                 "BatchId": "",
//                 "Batch:ServiceDate": "",
//                 "Custom Order": ""
//             },
//             "portalData": {
//                 "Receipts": [],
//                 "Inv LineItems": [
//                     {
//                         "recordId": "121",
//                         "Inv LineItems::Item: Size": "",
//                         "Inv LineItems::Item: Colour": "",
//                         "Inv LineItems::Item: Description: Type": "Custom Logo",
//                         "Inv LineItems::Item: Description": "Fortnightly Service",
//                         "Inv LineItems::Item:Qty": 0,
//                         "Inv LineItems::Item #": 6240,
//                         "Inv LineItems::Item: Selling Price ea": 50,
//                         "Inv LineItems::Item: Extended Price": 0,
//                         "modId": "0"
//                     }
//                 ]
//             },
//             "recordId": "117",
//             "modId": "7",
//             "portalDataInfo": [
//                 {
//                     "database": "Kex Clone",
//                     "table": "Receipts",
//                     "foundCount": 0,
//                     "returnedCount": 0
//                 },
//                 {
//                     "database": "Kex Clone",
//                     "table": "Inv LineItems",
//                     "foundCount": 1,
//                     "returnedCount": 1
//                 }
//             ]
//         },
//         {
//             "fieldData": {
//                 "Record Status": "Record 3 of 4 (229 total)",
//                 "––––––––––––––––––––– 4": "",
//                 "––CLIENT: DETAILS––": "",
//                 "Client: Number": 1092,
//                 "Client: Name": "Hakka Express",
//                 "Client: Contact Name": "Ms. Georgia Jagdeo",
//                 "Client: Delivery Name": "",
//                 "Client: Delivery Trading As Name": "",
//                 "Client: Delivery Trading As Label": "",
//                 "Client: Delivery Contact Name": "Ms. Georgia Jagdeo",
//                 "Client: Delivery Phone": "788-6542",
//                 "Client: Delivery Phone ext": "",
//                 "Client: Delivery Address": "Shoppes of Maraval\rSaddle Road\rMaraval",
//                 "Client: Trading As Label": "Branch:",
//                 "Client: Trading As Name": "Shoppes of Maraval",
//                 "Client: Order #": "",
//                 "––CLIENT: ADDRESS––": "",
//                 "Client: Billing Address": "Shoppes of Maraval\rSaddle Road\rMaraval",
//                 "Client: Work Phone": "",
//                 "Client: Fax": "",
//                 "Client: Run": "Port of Spain 1",
//                 "--------------------": "",
//                 "––INV––": "",
//                 "Inv: #": 62133,
//                 "Inv: Comments": "",
//                 "Inv: Contract Period": "",
//                 "Inv: Service Frequency": "",
//                 "––––––––––––––––––––– 7": "",
//                 "Inv: Date": "03/17/2025",
//                 "Inv: Due Date": "04/16/2025",
//                 "Inv: Date: Month: #": 3,
//                 "Inv: Date: Month: Name": "March",
//                 "Inv: Date: Week:#": 12,
//                 "Inv: Date: Year": 2025,
//                 "––––––––––––––––––––– 9": "",
//                 "Inv: US Exchange Rate": 6.3824,
//                 "Inv: Number of Quotes": 4,
//                 "––––––––––––––––––––– 13": "",
//                 "––RECORD/LAYOUT––": "",
//                 "Record:Created By": "Dell",
//                 "Record:Created On": "02/17/2025",
//                 "Record:Modified By": "suresh",
//                 "Record:Modified On": "02/17/2025",
//                 "Layout Plus 1": 23,
//                 "-------------------- 4": "",
//                 "Total before VAT": 1600,
//                 "Total before VAT: Sum": 2133.01,
//                 "Total Incl.VAT": 1800,
//                 "Total Incl.VAT:Sum": 2399.64,
//                 "––––––––––––––––––––– 12": "",
//                 "––VAT––": "",
//                 "VAT: %": 0.125,
//                 "VAT: Amount": 200,
//                 "VAT: Amount: Sum": 266.63,
//                 "-------------------- 3": "",
//                 "Window size": "480 x 640",
//                 "__PAYMENTS__": "",
//                 "Pmt: Total Payments": "",
//                 "Pmt: Bal. OS": 1800,
//                 "Pmt: Inv fully Paid?": "N",
//                 "Monthly Unit Cost Label": "Monthly\rUnit Cost",
//                 "Monthly Unit Cost Label: On?": "",
//                 "Overdue: Days": -28,
//                 "Overdue: Period": "d",
//                 "Overdue: Period: Text": "Less Than 30 Days",
//                 "Pmt: Bal. OS: Sum": 2399.64,
//                 "Custom Logo": "Custom Logo",
//                 "Custom Logo Flag": 1,
//                 "BatchId": "",
//                 "Batch:ServiceDate": "",
//                 "Custom Order": ""
//             },
//             "portalData": {
//                 "Receipts": [],
//                 "Inv LineItems": [
//                     {
//                         "recordId": "186",
//                         "Inv LineItems::Item: Size": "",
//                         "Inv LineItems::Item: Colour": "",
//                         "Inv LineItems::Item: Description: Type": "Custom Logo",
//                         "Inv LineItems::Item: Description": "Fortnightly Service",
//                         "Inv LineItems::Item:Qty": 50,
//                         "Inv LineItems::Item #": 6240,
//                         "Inv LineItems::Item: Selling Price ea": 32.00,
//                         "Inv LineItems::Item: Extended Price": 1600,
//                         "modId": "2"
//                     }
//                 ]
//             },
//             "recordId": "175",
//             "modId": "3",
//             "portalDataInfo": [
//                 {
//                     "database": "Kex Clone",
//                     "table": "Receipts",
//                     "foundCount": 0,
//                     "returnedCount": 0
//                 },
//                 {
//                     "database": "Kex Clone",
//                     "table": "Inv LineItems",
//                     "foundCount": 1,
//                     "returnedCount": 1
//                 }
//             ]
//         },
//         {
//             "fieldData": {
//                 "Record Status": "Record 4 of 4 (229 total)",
//                 "––––––––––––––––––––– 4": "",
//                 "––CLIENT: DETAILS––": "",
//                 "Client: Number": 1092,
//                 "Client: Name": "Hakka Express",
//                 "Client: Contact Name": "Ms. Georgia Jagdeo",
//                 "Client: Delivery Name": "",
//                 "Client: Delivery Trading As Name": "",
//                 "Client: Delivery Trading As Label": "",
//                 "Client: Delivery Contact Name": "Ms. Georgia Jagdeo",
//                 "Client: Delivery Phone": "788-6542",
//                 "Client: Delivery Phone ext": "",
//                 "Client: Delivery Address": "Shoppes of Maraval\rSaddle Road\rMaraval",
//                 "Client: Trading As Label": "Branch:",
//                 "Client: Trading As Name": "Shoppes of Maraval",
//                 "Client: Order #": "",
//                 "––CLIENT: ADDRESS––": "",
//                 "Client: Billing Address": "Shoppes of Maraval\rSaddle Road\rMaraval",
//                 "Client: Work Phone": "",
//                 "Client: Fax": "",
//                 "Client: Run": "Port of Spain 1",
//                 "--------------------": "",
//                 "––INV––": "",
//                 "Inv: #": 62145,
//                 "Inv: Comments": "",
//                 "Inv: Contract Period": "",
//                 "Inv: Service Frequency": "",
//                 "––––––––––––––––––––– 7": "",
//                 "Inv: Date": "03/12/2025",
//                 "Inv: Due Date": "04/11/2025",
//                 "Inv: Date: Month: #": 3,
//                 "Inv: Date: Month: Name": "March",
//                 "Inv: Date: Week:#": 11,
//                 "Inv: Date: Year": 2025,
//                 "––––––––––––––––––––– 9": "",
//                 "Inv: US Exchange Rate": 6.3824,
//                 "Inv: Number of Quotes": 4,
//                 "––––––––––––––––––––– 13": "",
//                 "––RECORD/LAYOUT––": "",
//                 "Record:Created By": "Windows User",
//                 "Record:Created On": "03/12/2025",
//                 "Record:Modified By": "Windows User",
//                 "Record:Modified On": "03/12/2025",
//                 "Layout Plus 1": 33,
//                 "-------------------- 4": "",
//                 "Total before VAT": 113.01,
//                 "Total before VAT: Sum": 2133.01,
//                 "Total Incl.VAT": 127.14,
//                 "Total Incl.VAT:Sum": 2399.64,
//                 "––––––––––––––––––––– 12": "",
//                 "––VAT––": "",
//                 "VAT: %": 0.125,
//                 "VAT: Amount": 14.13,
//                 "VAT: Amount: Sum": 266.63,
//                 "-------------------- 3": "",
//                 "Window size": "480 x 640",
//                 "__PAYMENTS__": "",
//                 "Pmt: Total Payments": "",
//                 "Pmt: Bal. OS": 127.14,
//                 "Pmt: Inv fully Paid?": "N",
//                 "Monthly Unit Cost Label": "Monthly\rUnit Cost",
//                 "Monthly Unit Cost Label: On?": "",
//                 "Overdue: Days": 0,
//                 "Overdue: Period": "d",
//                 "Overdue: Period: Text": "Less Than 30 Days",
//                 "Pmt: Bal. OS: Sum": 2399.64,
//                 "Custom Logo": "Custom Logo",
//                 "Custom Logo Flag": 0,
//                 "BatchId": "",
//                 "Batch:ServiceDate": "",
//                 "Custom Order": ""
//             },
//             "portalData": {
//                 "Receipts": [],
//                 "Inv LineItems": [
//                     {
//                         "recordId": "225",
//                         "Inv LineItems::Item: Size": "",
//                         "Inv LineItems::Item: Colour": "",
//                         "Inv LineItems::Item: Description: Type": "",
//                         "Inv LineItems::Item: Description": "Saral Home Polyester Doormat",
//                         "Inv LineItems::Item:Qty": 1,
//                         "Inv LineItems::Item #": 6247,
//                         "Inv LineItems::Item: Selling Price ea": 113.01,
//                         "Inv LineItems::Item: Extended Price": 113.01,
//                         "modId": "0"
//                     }
//                 ]
//             },
//             "recordId": "187",
//             "modId": "0",
//             "portalDataInfo": [
//                 {
//                     "database": "Kex Clone",
//                     "table": "Receipts",
//                     "foundCount": 0,
//                     "returnedCount": 0
//                 },
//                 {
//                     "database": "Kex Clone",
//                     "table": "Inv LineItems",
//                     "foundCount": 1,
//                     "returnedCount": 1
//                 }
//             ]
//         }
//     ]
// }
  
  
//       return data;
      }
  

}
