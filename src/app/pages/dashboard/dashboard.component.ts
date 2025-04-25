import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/userService/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private userService: UserService, private router: Router) {

    // const user = this.userService.getUser();
    // if (user) {
    //   console.log('Logged-in User:', user.username, user.password);
    // } else {
    //   console.log('No user found');
    // }

  }
  ngOnInit(): void {
    const hasSeenVideo = sessionStorage.getItem('seenVideo');
    if (!hasSeenVideo) {
      this.showIntroVideo = true;
      sessionStorage.setItem('seenVideo', 'true');
    }
  }

  showIntroVideo = false;

  closeIntroVideo() {
    this.showIntroVideo = false;
  }

  onLogOut() {
    this.userService.deleteUser();
  }
  
  selectedRequest: string = '0';
  currentModal: string | null = null;

onRequestChange(event: any) {
  const value = event.target.value;
  this.selectedRequest = value;

  switch (value) {
    case '1':
      this.currentModal = 'adHoc';
      break;
    case '2':
      this.currentModal = 'clientDetails';
      break;
    case '3':
      this.currentModal = 'siteVisit';
      break;
    case '4':
      this.currentModal = 'statement';
      break;
    default:
      this.currentModal = null;
      break;
  }
}

revertService() {
  this.currentModal = null;
  this.selectedRequest = '0';
}


}
