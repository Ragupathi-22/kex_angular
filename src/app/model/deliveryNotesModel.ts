export interface DeliveryNotesModel {
  success: boolean
  data: DeliveryDaum[]
}

export interface DeliveryDaum {
  fieldData: DeliveryNotesFieldData
  portalData: PortalData
  recordId: string
  modId: string
  portalDataInfo: PortalDataInfo[]
}

export interface DeliveryNotesFieldData {
  "Record Status": string
  "Todays Date": string
  __ADMIN__: string
  "Admin: Relationship": number
  "Report: Count": number
  "Record:Count": number
  "Record:Creator": string
  "Record:Creation Date": string
  "Record:Creation Time": string
  "Record:Modified By Whom": string
  "Record:Modified Date": string
  "Record:Modified Time": string
  "Record:#": number
  "Window Size": string
  __CONTACT__: string
  "Contact: Name": string
  "Contact: Ph: Work": string
  __CLIENT__: string
  "Client: #": number
  "Client: Name": string
  "Client: Trading As Label": string
  "Client: Trading As Name": string
  "Client: Delivery Name": string
  "Client: Delivery Trading As Name": string
  "Client: Delivery Trading As Label": string
  "__DELIVERY ADDRESS__": string
  "Delivery: Date": string
  "Delivery: ServiceDate": string
  "Delivery: Note#": number
  "Delivery: Contact Name": string
  "Delivery: Address": string
  "Delivery: Vehicle#": string
  "Delivery: Contact Phone#": string
  "Delivery: Contact Phone# ext": string
  "Delivery: Zone": string
  "Delivery: Total Qty Delivered": any
  "__BILLING ADDRESS__": string
  "Billing: Address": string
  Comments: string
  BatchID: string
  DeliveryCount: number
  "Contact: Ph: Work Ext": string
}

export interface PortalData {
  "Delivery Lines": Line[]
}

export interface Line {
  recordId: string
  "Delivery Lines::Description: Description": string
  "Delivery Lines::Quantity: Returned": any
  "Delivery Lines::Item#": number
  "Delivery Lines::Quantity: Delivered": any
  "Delivery Lines::Description: Type": string
  "Delivery Lines::Description: Colour": string
  "Delivery Lines::Description: Size": string
  modId: string
}

export interface PortalDataInfo {
  database: string
  table: string
  foundCount: number
  returnedCount: number
}



export class DeliveryNotesTable {
  date: string;
  del_notes: number;
  batch_id: string;
  total_qty: string;
  constructor() {
    this.date = ''
    this.del_notes = 0;
    this.batch_id = '';
    this.total_qty = '';
  }
}

export class DeliveryDetailsTable {
  productCode: number;
  quantityDelivered: string;
  quantityReturned: string;
  description: string;
  type: string;
  color: string;
  size: string;

  constructor() {
    this.productCode = 0;
    this.quantityDelivered = '';
    this.quantityReturned = '';
    this.description = '';
    this.type = '';
    this.color = '';
    this.size = '';

  }
}


