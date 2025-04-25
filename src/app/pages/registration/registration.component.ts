import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserResponseModel, UserModel } from '../../model/userModel';
import { UserService } from '../../services/userService/user.service';
import { LoadingComponent } from "../loading/loading.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  imports: [LoadingComponent,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

   isLogin: boolean = true;
    isLoading :boolean =false;
    errorMessage: string = '';
    constructor(private router: Router, private userService: UserService) { }
  
    loginForm: FormGroup = new FormGroup(
      {
        company: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required,Validators.email]),
        fullName: new FormControl('', [Validators.required]),
        phoneNo: new FormControl('', [Validators.required])

      }
    );
  
    onLogin() {
      this.errorMessage='';
      const data = this.loginForm.value;
  
      if (this.loginForm.valid) {
      this.isLoading=true;
        // this.userService.userLogin(data.name, data.password).subscribe({
        //   next: (res: UserResponseModel) => {
        //     //save user  detail
        //     const user = new UserModel();
        //     user.username = data.name;
        //     user.password = data.password
  
        //     if (res && res.success) {
        //       this.userService.saveUser(user);
        //       this.router.navigate(['dashboard']);
        //     } else {
        //       this.errorMessage = res?.message;
        //     }
        //   },
        //   error: (err) => {
        //     this.isLoading=false;
        //     if (err.error && err.error.message) {
        //       this.errorMessage = err.error.message;
        //     } else {
        //       this.errorMessage = 'Unexpected error';
        //       console.error('Unexpected Error:', err);
        //     }
        //   },
        //   complete: ()=> {
        //     this.isLoading=false;
        //   },
        // });
  
      }
      else{
        this.isLoading=false;
        this.errorMessage="Field not to be empty..Please fill.."
      }
    }
}
