export interface InvoiceApiModel {
  success: boolean
  data: InvoiceDaum[]
}

export interface InvoiceDaum {
  fieldData: InvoiceFieldData
  portalData: PortalData
  recordId: string
  modId: string
  portalDataInfo: PortalDataInfo[]
}

export interface InvoiceFieldData {
  "Record Status": string
  "––––––––––––––––––––– 4": string
  "––CLIENT: DETAILS––": string
  "Client: Number": number
  "Client: Name": string
  "Client: Contact Name": string
  "Client: Delivery Name": string
  "Client: Delivery Trading As Name": string
  "Client: Delivery Trading As Label": string
  "Client: Delivery Contact Name": string
  "Client: Delivery Phone": string
  "Client: Delivery Phone ext": string
  "Client: Delivery Address": string
  "Client: Trading As Label": string
  "Client: Trading As Name": string
  "Client: Order #": string
  "––CLIENT: ADDRESS––": string
  "Client: Billing Address": string
  "Client: Work Phone": string
  "Client: Fax": string
  "Client: Run": string
  "--------------------": string
  "––INV––": string
  "Inv: #": number
  "Inv: Comments": string
  "Inv: Contract Period": string
  "Inv: Service Frequency": string
  "––––––––––––––––––––– 7": string
  "Inv: Date": string
  "Inv: Due Date": string
  "Inv: Date: Month: #": number
  "Inv: Date: Month: Name": string
  "Inv: Date: Week:#": number
  "Inv: Date: Year": number
  "––––––––––––––––––––– 9": string
  "Inv: US Exchange Rate": number
  "Inv: Number of Quotes": number
  "––––––––––––––––––––– 13": string
  "––RECORD/LAYOUT––": string
  "Record:Created By": string
  "Record:Created On": string
  "Record:Modified By": string
  "Record:Modified On": string
  "Layout Plus 1": number
  "-------------------- 4": string
  "Total before VAT": number
  "Total before VAT: Sum": number
  "Total Incl.VAT": number
  "Total Incl.VAT:Sum": number
  "––––––––––––––––––––– 12": string
  "––VAT––": string
  "VAT: %": number
  "VAT: Amount": number
  "VAT: Amount: Sum": number
  "-------------------- 3": string
  "Window size": string
  __PAYMENTS__: string
  "Pmt: Total Payments": string
  "Pmt: Bal. OS": number
  "Pmt: Inv fully Paid?": string
  "Monthly Unit Cost Label": string
  "Monthly Unit Cost Label: On?": string
  "Overdue: Days": number
  "Overdue: Period": string
  "Overdue: Period: Text": string
  "Pmt: Bal. OS: Sum": number
  "Custom Logo": string
  "Custom Logo Flag": number
  BatchId: string
  "Batch:ServiceDate": string
  "Custom Order": string
}

export interface PortalData {
  Receipts: Receipt[]
  "Inv LineItems": LineItem[]
}

export interface Receipt {
  recordId: string
  "Receipts::Rec: Date": string
  "Receipts::Rec: Ch#": string
  "Receipts::Rec: Amt": number
  "Receipts::Receipt #": string
  modId: string
}

export interface LineItem {
  recordId: string
  "Inv LineItems::Item: Size": string
  "Inv LineItems::Item: Colour": string
  "Inv LineItems::Item: Description: Type": string
  "Inv LineItems::Item: Description": string
  "Inv LineItems::Item:Qty": number
  "Inv LineItems::Item #": number
  "Inv LineItems::Item: Selling Price ea": number
  "Inv LineItems::Item: Extended Price": number
  modId: string
}

export interface PortalDataInfo {
  database: string
  table: string
  foundCount: number
  returnedCount: number
}

export class InvoiceTableModel {
  date: string;
  invoice: string;
  amount: string;
  amtPaid: string;
  balOs: string;
  paid: string;
  constructor() {
    this.date = '';
    this.invoice = '';
    this, this.amount = '';
    this, this.amtPaid = '';
    this.balOs = '';
    this.paid = '';
  }

}

export class InvoicePaymentTable1 {
  date: string;
  cheque: string;
  amount: string;
  receipt: string;
  constructor() {
    this.date = '';
    this.cheque = '';
    this.amount = '';
    this.receipt = '';
  }
}

export class InvoicePaymentTable2 {
  product: string;
  quantity: string;
  description: string;
  type: string;
  color: string;
  size: string;
  monthly_unit_cost: string;
  total_amt;
  constructor() {
    this.product = '';
    this.quantity = '';
    this.description = '';
    this.type = '';
    this.color = '';
    this.size = '';
    this.monthly_unit_cost = '';
    this.total_amt = '';
  }

}
