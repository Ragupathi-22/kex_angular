import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeliveryDaum, DeliveryDetailsTable, DeliveryNotesFieldData } from '../../model/deliveryNotesModel';
import { DeliveryNoteService } from '../../services/deliveryNotes/delivery-note.service';
import { Subject } from 'rxjs';
import { LoadingComponent } from '../loading/loading.component';
import { Location } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-delivery-details',
  imports: [ DataTablesModule,LoadingComponent],
  templateUrl: './delivery-details.component.html',
  styleUrl: './delivery-details.component.css'
})
export class DeliveryDetailsComponent implements OnInit {

  // Declarations 
  delivery_note: string | null = null;
  delivery_details: DeliveryNotesFieldData | null = null;
  deliveryDetailsTable: DeliveryDetailsTable[] = [];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  isLoading: boolean = false;
  isDtInitialized: boolean = false;
  errorMessage: string = '';
  @ViewChild('dataTable1', { static: false }) table: ElementRef | undefined;
  deliveryTable: boolean = true;

  constructor(private  location :Location,private activateRoute: ActivatedRoute, private deliveryNotesService: DeliveryNoteService) { }

  ngOnInit(): void {
    console.log("<----Delivery details component rendered---->");

    this.dtOptions = {
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
        { title: 'PRODUCT CODE', data: 'productCode' },
        { title: 'QUANTITY DELIVERED', data: 'quantityDelivered' },
        { title: 'QUANTITY RETURNED', data: 'quantityReturned' },
        { title: 'DESCRIPTION', data: 'description' },
        { title: 'TYPE', data: 'type' },
        { title: 'COLOR', data: 'color' },
        { title: 'SIZE', data: 'size' },
      ],
      data: [],
    };

    this.getDeliveryDetail();
  }

  async getDeliveryDetail() {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      this.delivery_note = this.activateRoute.snapshot.paramMap.get('delivery_note');
      const storedData = sessionStorage.getItem('delivery_Notes');

      if (storedData) {

        const data: DeliveryDaum[] = JSON.parse(storedData);

        const list = data.find(
          (res: DeliveryDaum) => res.fieldData['Delivery: Note#'] === Number(this.delivery_note)
        ) || null;


        this.delivery_details = list?.fieldData || null;
        
        this.deliveryDetailsTable = list?.portalData['Delivery Lines']?.map((res) => ({
          productCode: res['Delivery Lines::Item#'],
          quantityDelivered: res['Delivery Lines::Quantity: Delivered'],
          quantityReturned: res['Delivery Lines::Quantity: Returned'],
          description: res['Delivery Lines::Description: Description'],
          type: res['Delivery Lines::Description: Type'],
          color: res['Delivery Lines::Description: Colour'],
          size: res['Delivery Lines::Description: Size']
        })) ?? [];  
        


        this.initializeDataTable(this.deliveryDetailsTable);

      } else {
        // Fetch delivery notes from API
        this.deliveryNotesService.getDeliveryNotes().subscribe(
          (res) => {
            if (res && res.data) {
              // Store response in sessionStorage
              sessionStorage.setItem('delivery_Notes', JSON.stringify(res.data));

              // Filter the data to find the matching delivery note
              const list = res.data.find(
                (note: DeliveryDaum) => note.fieldData['Delivery: Note#'] === Number(this.delivery_note)
              ) || null;

              this.delivery_details = list?.fieldData || null;

              this.deliveryDetailsTable = list?.portalData['Delivery Lines']?.map((res) => ({
                productCode: res['Delivery Lines::Item#'],
                quantityDelivered: res['Delivery Lines::Quantity: Delivered'],
                quantityReturned: res['Delivery Lines::Quantity: Returned'],
                description: res['Delivery Lines::Description: Description'],
                type: res['Delivery Lines::Description: Type'],
                color: res['Delivery Lines::Description: Colour'],
                size: res['Delivery Lines::Description: Size']
              })) ?? [];


              this.initializeDataTable(this.deliveryDetailsTable); // Initialize DataTable with API data
            } else {
              console.error('No data received from API.');
              this.errorMessage = 'No delivery notes found.';
            }

          },
          (error) => {
            console.error('API Error:', error);
            this.errorMessage = 'Error fetching delivery notes. Please try again.';
          }
        );
      }
    } catch (e) {
      this.errorMessage = 'Error fetching delivery Notes. Please try again.';
      console.error('Error:', e);
    }
    finally{
      this.isLoading=false;
    }
  }


  initializeDataTable(data: any[]) {
    // Destroy existing DataTable if already initialized
    if (this.isDtInitialized) {
      const table = $('#dataTable').DataTable();
      table.clear().destroy();
    }

    // Update DataTable with new data
    this.dtOptions.data = data;

    // Trigger DataTable re-initialization
    setTimeout(() => {
      this.dtTrigger.next(null);
      this.isDtInitialized = true;
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.dtTrigger && !this.dtTrigger.closed) {
      this.dtTrigger.unsubscribe();
    }
  }
  onBack(){
  this.location.back();
  }
}
