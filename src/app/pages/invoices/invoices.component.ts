import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoadingComponent } from '../loading/loading.component';
import { InvoicesService } from '../../services/invoices/invoices.service';
import {  Router} from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
import { InvoiceTableModel } from '../../model/invoiceModes';

@Component({
  selector: 'app-invoices',
  imports: [LoadingComponent,DataTablesModule],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css'
})
export class InvoicesComponent {
   constructor(private invoiceService: InvoicesService, private router: Router) {
    }
  
    // Declarations 
    invoices: InvoiceTableModel[] = [];
    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject<any>(); 
    isLoading: boolean = false;
    isDtInitialized: boolean = false;
    errorMessage: string = '';
    @ViewChild('dataTable', { static: false }) table: ElementRef | undefined;
    private routerSubscription: Subscription | undefined;
  
    ngOnInit() {
      console.log("<----Invoices component rendered---->");
   
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 15,
        processing: true,
        search: true,
        ordering: true,
        order: [[0, 'desc']], 
        lengthMenu: [5, 10, 15, 10, 25, 50],
        language: {
          searchPlaceholder: "Search"
        },        
        columns: [
          { title: 'DATE', data: 'date' },
          { title: 'INVOICE #', data: 'invoice' },
          { title: 'AMOUNT', data: 'amount' },
          { title: 'AMT PAID', data: 'amtPaid' },
          { title: 'BAL OS', data: 'balOs' },
          { title: 'PAID?', data: 'paid' },
        ],
        data: [],
        rowCallback: (row: Node, data: any) => {
          $(row).off('click');
          $(row).on('click', () => {
            this.onRowClick(data);
          });
        }
      };
      this.getInvoices();
    }
   
    onRowClick(data: any) {
      this.router.navigate(['/dashboard/invoices/invoiceDetail', data.invoice]);
    }
  
    async getInvoices() {
      this.isLoading = true;
      this.errorMessage = '';
  
      try {
        // Simulating network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
  
        this.invoiceService.getInvoices().subscribe({
          next: (res) => {
            sessionStorage.setItem('invoices', JSON.stringify(res.data));
  
            this.invoices = res.data.map((data) => ({
              date: data.fieldData['Inv: Date'],
              invoice: data.fieldData['Inv: #'].toString(),
              amount: data.fieldData['Total Incl.VAT'].toString(),
              amtPaid: data.fieldData['Pmt: Total Payments'],
              balOs: data.fieldData['Pmt: Bal. OS'].toString(),
              paid: data.fieldData['Pmt: Inv fully Paid?']
            }));
  
          

            // Destroy DataTable before re-initializing
            if (this.isDtInitialized) {
              const table = $('#dataTable').DataTable();
              table.clear().destroy();
            }
  
            // Update DataTable with fetched data
            this.dtOptions.data = this.invoices;
  
            // Trigger DataTable re-initialization
            setTimeout(() => {
              this.dtTrigger.next(null);
              this.isDtInitialized = true;
            }, 0);
            
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error fetching invoices :', err);
            this.errorMessage = 'Error fetching invoices Notes. Please try again.';
          },
          complete: () => {
            this.isLoading = false;
          }
        });
      } catch (e) {
        this.errorMessage = 'Error fetching invoices Notes. Please try again.';
        console.error('Error:', e);
      }
      finally{
        this.isLoading=false;
      }
    }
  
    ngOnDestroy(): void {
      if (this.dtTrigger) {
        this.dtTrigger.unsubscribe();
        this.dtTrigger = new Subject<any>(); 
      }
      if (this.routerSubscription) {
        this.routerSubscription.unsubscribe();
      }
    }
}
