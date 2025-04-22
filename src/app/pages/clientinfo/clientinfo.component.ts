import { Component, OnInit } from '@angular/core';
import { ClientInfoService } from '../../services/clientInfoService/client-info.service';
import { ClientInfoFieldData } from '../../model/clientInfoModel';
import { LoadingComponent } from "../loading/loading.component";
import { UserService } from '../../services/userService/user.service';

@Component({
  selector: 'app-clientinfo',
  imports: [LoadingComponent],
  templateUrl: './clientinfo.component.html',
  styleUrl: './clientinfo.component.css'
})
export class ClientinfoComponent implements OnInit{
constructor(private clientService:ClientInfoService,private userService:UserService){

}
// Declaration
  clientInfo!: ClientInfoFieldData;
  loading :boolean=false;


ngOnInit(): void {
  console.log("<----Client Info component rendered---->");

  // this.clientInfo=this.clientService.getClientInfo().data[0].fieldData;
  this.getClientInfo();
}

async getClientInfo() {
  this.loading = true;
  this.clientService.getClientInfo().subscribe({
    next: (res) => {
      this.clientInfo = res.data[0].fieldData;
      this.userService.setClienId(res.data[0].fieldData['Client: #']);
      this.loading = false; // Success
    },
    error: (err) => {
      console.error(err);
      this.loading = false; // Error case
    }
  });
}


}
