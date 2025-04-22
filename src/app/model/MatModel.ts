export interface MatApiModel {
    success: boolean
    data: MatDaum[]
  }
  
  export interface MatDaum {
    fieldData: MatFieldData
    portalData: PortalData
    recordId: string
    modId: string
  }
  
  export interface MatFieldData {
    PrimaryKey: string
    CreationTimestamp: string
    CreatedBy: string
    ModificationTimestamp: string
    ModifiedBy: string
    ClientID: number
    Location: string
    Description: string
    Size: string
  }
  
  export interface PortalData {}
  

  export class MatLocationTable {
  size :string;
  description :string;
  location :string;
  constructor(){
    this.size='';
    this.description='';
    this.location='';
  }
  }