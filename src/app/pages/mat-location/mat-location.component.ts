import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingComponent } from '../loading/loading.component';
import { MatLocationService } from '../../services/matService/mat-location.service';
import { MatLocationTable } from '../../model/MatModel';
import { Subject } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-mat-location',
  imports: [LoadingComponent,DataTablesModule],
  templateUrl: './mat-location.component.html',
  styleUrl: './mat-location.component.css'
})
export class MatLocationComponent implements OnInit {

  isLoading: boolean = false;
  errorMessage: string = '';
  matTable: MatLocationTable[] = [];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild('dataTable1', { static: false }) table: ElementRef | undefined;
  isDtInitialized: boolean = false;


  constructor(private matService: MatLocationService) {

  }
  ngOnInit() {
    console.log("<----Mat Location component rendered---->");

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
      processing: true,
      search: true,
      ordering: true,
      lengthMenu: [5,10,15, 25, 50],
      language: {
        searchPlaceholder: "Search"
      },
      columns: [
        { title: 'SIZE', data: 'size' },
        { title: 'DESCRIPTION', data: 'description' },
        { title: 'LOCATION', data: 'location' },
      ],
      data: [],
    };

    this.getMatLocation();
  }

  async getMatLocation() {
    this.isLoading = true;
    this.errorMessage = '';
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      this.matService.getMatLocation().subscribe({
        next: (res) => {
          this.matTable = res.data.map((res) => ({
            size: res.fieldData.Size,
            description: res.fieldData.Description,
            location: res.fieldData.Location
          })
          );

          this.initializeDataTable(this.matTable);
        },
        error: (err) => {
          console.error('Error fetching invoices :', err);
          this.errorMessage = 'Error fetching invoices Notes. Please try again.';
        },
        complete: () => {
          this.isLoading = false;
        }
      })

    } catch (e) {
      this.errorMessage = 'Error fetching invoices Notes. Please try again.';
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

}


