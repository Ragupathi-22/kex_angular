import { Routes } from '@angular/router';
import { ClientinfoComponent } from './pages/clientinfo/clientinfo.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DeliveryNotesComponent } from './pages/delivery-notes/delivery-notes.component';
import { authGuard } from './services/guard/auth.guard';
import { DeliveryDetailsComponent } from './pages/delivery-details/delivery-details.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { InvoiceDetailComponent } from './pages/invoice-detail/invoice-detail.component';
import { MatLocationComponent } from './pages/mat-location/mat-location.component';
import { RegistrationComponent } from './pages/registration/registration.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },
    // { path: 'clientinfo', component: ClientinfoComponent },
    {
        path: 'dashboard', component: DashboardComponent, canActivate: [authGuard], canActivateChild: [authGuard], children: [
            { path: '', redirectTo: 'clientinfo', pathMatch: 'full' },
            { path: 'clientinfo', component: ClientinfoComponent },
            { path: 'deliverynotes', component: DeliveryNotesComponent },
            { path: 'deliverynotes/deliveryDetails/:delivery_note', component: DeliveryDetailsComponent },
            { path: 'invoices', component: InvoicesComponent },
            { path: 'invoices/invoiceDetail/:invoice_id', component: InvoiceDetailComponent },
            { path: 'matLocation', component: MatLocationComponent }
        ]
    },

];
