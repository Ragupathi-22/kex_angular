import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DeliveryNoteService } from '../../services/deliveryNotes/delivery-note.service';
import { DeliveryNotesTable } from '../../model/deliveryNotesModel';
import { Subject, Subscription } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
import { LoadingComponent } from '../loading/loading.component';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-delivery-notes',
  imports: [DataTablesModule, LoadingComponent],
  templateUrl: './delivery-notes.component.html',
  styleUrl: './delivery-notes.component.css'
})
export class DeliveryNotesComponent implements OnInit, OnDestroy {

  constructor(private deliveryNotesService: DeliveryNoteService, private router: Router) {
  }

  // Declarations 
  deliveryNotes: DeliveryNotesTable[] = [];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>(); // Initialize Subject
  isLoading: boolean = false;
  isDtInitialized: boolean = false;
  errorMessage: string = '';
  @ViewChild('dataTable', { static: false }) table: ElementRef | undefined;
  private routerSubscription: Subscription | undefined;

  ngOnInit() {
    console.log("<----Delivery Notes component rendered---->");

    // // Detect when navigating back
    // this.routerSubscription = this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd && event.url === '/dashboard/deliverynotes') {
    //     this.reloadComponent();
    //   }
    // });

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
        { title: 'DEL.NOTES', data: 'batch_id' },
        { title: 'BATCH ID', data: 'del_notes' },
        { title: 'TOTAL QTY', data: 'total_qty' },
      ],
      data: [],
      rowCallback: (row: Node, data: any) => {
        $(row).off('click');
        $(row).on('click', () => {
          this.onRowClick(data);
        });
      }
    };
    this.getDeliveryNotes();
  }

  // reloadComponent() {deliveryTable
  //   console.log('Reloading Delivery Notes Component...');
  //   this.router.navigateByUrl('/dashboard', { skipLocationChange: true }).then(() => {
  //     this.router.navigate(['/dashboard/deliverynotes']);
  //   });
  // }

  onRowClick(data: any) {
    this.router.navigate(['/dashboard/deliverynotes/deliveryDetails', data.del_notes]);
  }

  async getDeliveryNotes() {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      // Simulating network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      this.deliveryNotesService.getDeliveryNotes().subscribe({
        next: (res) => {
          sessionStorage.setItem('delivery_Notes', JSON.stringify(res.data));

          this.deliveryNotes = res.data.map((data) => ({
            date: data.fieldData['Delivery: Date'],
            batch_id: data.fieldData.BatchID,
            del_notes: data.fieldData['Delivery: Note#'],
            total_qty: data.fieldData['Delivery: Total Qty Delivered']
          }));

          // Destroy DataTable before re-initializing
          if (this.isDtInitialized) {
            const table = $('#dataTable').DataTable();
            table.clear().destroy();
          }

          // Update DataTable with fetched data
          this.dtOptions.data = this.deliveryNotes;

          // Trigger DataTable re-initialization
          setTimeout(() => {
            this.dtTrigger.next(null);
            this.isDtInitialized = true;
          }, 0);
          
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching delivery notes:', err);
          this.errorMessage = 'Error fetching delivery Notes. Please try again.';
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } catch (e) {
      this.errorMessage = 'Error fetching delivery Notes. Please try again.';
      console.error('Error:', e);
    }
    finally{
      this.isLoading=false;
    }
  }

  ngOnDestroy(): void {
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
      this.dtTrigger = new Subject<any>(); // Reset dtTrigger to avoid ObjectUnsubscribedError
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
