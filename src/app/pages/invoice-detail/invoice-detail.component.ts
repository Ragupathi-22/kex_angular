import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoadingComponent } from '../loading/loading.component';
import { InvoiceDaum, InvoiceFieldData, InvoicePaymentTable1, InvoicePaymentTable2 } from '../../model/invoiceModes';
import { Subject } from 'rxjs';
import { InvoicesService } from '../../services/invoices/invoices.service';
import { ActivatedRoute } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Location } from '@angular/common';

@Component({
  selector: 'app-invoice-detail',
  imports: [LoadingComponent,DataTablesModule],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.css'
})
export class InvoiceDetailComponent {


  isLoading: boolean = false;
  invoice_number: string | null = null;
  invoiceDetail: InvoiceFieldData | null = null;
  invoiceTable1: InvoicePaymentTable1[] = [];
  invoiceTable2: InvoicePaymentTable2[] = [];
  dtOptions1: any = {};
  dtTrigger1: Subject<any> = new Subject<any>();
  dtOptions2: any = {};
  dtTrigger2: Subject<any> = new Subject<any>();
  isDtInitialized1: boolean = false;
  isDtInitialized2: boolean = false;
  errorMessage: string = '';
  @ViewChild('dataTable2', { static: false }) table: ElementRef | undefined;

  constructor(private location:Location , private invoiceService: InvoicesService, private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log('<-----Invoice Detail component Rendered----->');

    this.dtOptions1 = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      search: true,
      ordering: true,
      lengthMenu: [5, 10, 15, 25, 50],
      language: {
        searchPlaceholder: "Search"
      },
      columns: [
        { title: 'DATE', data: 'date' },
        { title: 'CHEQUE', data: 'cheque' },
        { title: 'AMOUNT', data: 'amount' },
        { title: 'RECEIPT #', data: 'receipt' },
      ],
      data1: [],
    };


    this.dtOptions2 = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      search: true,
      ordering: true,
      lengthMenu: [5, 10, 15, 25, 50],
      language: {
        searchPlaceholder: "Search"
      },
      columns: [
        { title: 'PRODUCT', data: 'product' },
        { title: 'QUANTITY', data: 'quantity' },
        { title: 'DESCRIPTION', data: 'description' },
        { title: 'TYPE', data: 'type' },
        { title: 'COLOR', data: 'color' },
        { title: 'SIZE', data: 'size' },
        { title: 'MONTHLY UNIT COST', data: 'monthly_unit_cost' },
        { title: 'TOTAL AMOUNT', data: 'total_amt' },
   

      ],
      data2: [],
    };
    this.getInvoicesDetail();
  }

  async getInvoicesDetail() {
    this.isLoading = true;
    this.errorMessage = '';

    try {

      await new Promise(resolve => setTimeout(resolve, 1000));

      this.invoice_number = this.activateRoute.snapshot.paramMap.get('invoice_id');
      const storedData = sessionStorage.getItem('invoices');

      if (storedData) {
        const data: InvoiceDaum[] = JSON.parse(storedData);
        const list = data.find(
          (res: InvoiceDaum) => res.fieldData['Inv: #'] === Number(this.invoice_number)
        ) || null;

        this.invoiceDetail = list?.fieldData || null;
        this.extractDataTable1(list);
        this.initializeDataTable1(this.invoiceTable1);
        this.extractDataTable2(list);
        this.initializeDataTable2(this.invoiceTable2);
      }
      else {
        this.invoiceService.getInvoices().subscribe((res) => {
          if (res && res.success) {
            sessionStorage.setItem('invoices', JSON.stringify(res.data));
            const list = res.data.find((note: InvoiceDaum) => note.fieldData['Inv: #'] === Number(this.invoice_number)) || null;
            this.invoiceDetail = list?.fieldData || null;
            this.extractDataTable1(list);
            this.initializeDataTable1(this.invoiceTable1);
            this.extractDataTable2(list);
            this.initializeDataTable2(this.invoiceTable2);
          }
        })
      }

    } catch (e) {
      this.errorMessage = 'Error fetching delivery Notes. Please try again.';
      console.error('Error:', e);

    } finally {
      this.isLoading = false;
    }
  }

  extractDataTable2(data: InvoiceDaum | null) {
    if (!data || !data.portalData || !data.portalData['Inv LineItems']) {
      this.invoiceTable2 = [];
      return;
    }
  
    this.invoiceTable2 = data.portalData['Inv LineItems'].map((res) => ({
      product: res['Inv LineItems::Item #']?.toString() || '',
      quantity: res['Inv LineItems::Item:Qty']?.toString() || '',
      description: res['Inv LineItems::Item: Description'] || '',
      type: res['Inv LineItems::Item: Description: Type'] || '',
      color: res['Inv LineItems::Item: Colour'] || '',
      size: res['Inv LineItems::Item: Size'] || '',
      monthly_unit_cost: res['Inv LineItems::Item: Selling Price ea']?.toString() || '',
      total_amt: res['Inv LineItems::Item: Extended Price']?.toString() || '',
    }));
  }
  extractDataTable1(data: InvoiceDaum | null) {
    if (!data || !data.portalData || !data.portalData.Receipts) {
      this.invoiceTable1 = [];
      return;
    }
  
    this.invoiceTable1 = data.portalData.Receipts.map((res) => ({
      date: res['Receipts::Rec: Date']?.toString() || '',
      cheque: res['Receipts::Rec: Ch#']?.toString() || '',
      amount: res['Receipts::Rec: Amt']?.toString()  || '',
      receipt: res['Receipts::Receipt #']?.toString() || '',
    }));
  }
  
  initializeDataTable1(data: any[]) {
    // Destroy existing DataTable if already initialized
    if (this.isDtInitialized1) {
      const table = $('#dataTable1').DataTable();
      table.clear().destroy();
    }

    // Update DataTable with new data
    this.dtOptions1.data = data;

    // Trigger DataTable re-initialization
    setTimeout(() => {
      this.dtTrigger1.next(null);
      this.isDtInitialized1 = true;
    }, 0);
  }

  initializeDataTable2(data: any[]) {
    // Destroy existing DataTable if already initialized
    if (this.isDtInitialized2) {
      const table = $('#dataTable2').DataTable();
      table.clear().destroy();
    }

    // Update DataTable with new data
    this.dtOptions2.data = data;

    // Trigger DataTable re-initialization
    setTimeout(() => {
      this.dtTrigger2.next(null);
      this.isDtInitialized2 = true;
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.dtTrigger1 && !this.dtTrigger1.closed) {
      this.dtTrigger1.unsubscribe();
    }
    if (this.dtTrigger2 && !this.dtTrigger2.closed) {
      this.dtTrigger2.unsubscribe();
    }
 
  }
  onBack(){
    this.location.back();
    }

}
