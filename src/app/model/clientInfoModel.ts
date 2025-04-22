// client Info Response
export interface ClientInfoModel {
    success: boolean
    data: ClientInfoDaum[]
  }
  
  export interface ClientInfoDaum {
    fieldData: ClientInfoFieldData
    portalData: PortalData
    recordId: string
    modId: string
  }
  
  export interface ClientInfoFieldData {
    "Client: #": number
    "Client: Name": string
    "Contact: Name": string
    "Contact: Position": string
    "Contact: Ph: Work": string
    "Contact: Ph: Work 2": string
    "Contact: Ph: Ext": string
    "Contact: Ph: Ext 2": string
    "Contact: Fax": string
    "Contact: E Mail": string
    "Contact: Cell": string
    "Contact: Cell 2": string
    "Contact: Ph: Private": string
    "Contact: Name:Count": number
    "Delivery: Contact Name": string
    "Delivery: Address": string
    "Delivery: Phone": string
    "Delivery: Phone ext": string
    "Delivery: Ph: Work 2": string
    "Delivery: Ph: Ext 2": string
    "Delivery: Position": string
    "Delivery: Fax": string
    "Delivery: E Mail": string
    "Delivery: Cell": string
    "Delivery: Cell 2": string
    MontlhyRouteSort: number
    FortNightlyRouteSort: string
    "Billing: Address": string
    Username: string
    Password: string
    "Contact: Trading Name": string
    "Contact: Trading As Label": string
    "Client: Type": string
    "Delivery: Run": string
    "Delivery: RunBiMonthly": string
    BillingType: string
    BillingFreguency: string
  }
  
  export interface PortalData { }
  