import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/userService/user.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private userService:UserService,private router:Router){
    
    // const user = this.userService.getUser();
    // if (user) {
    //   console.log('Logged-in User:', user.username, user.password);
    // } else {
    //   console.log('No user found');
    // }
    
  }

  onLogOut(){
    this.userService.deleteUser();
 
  }
}
