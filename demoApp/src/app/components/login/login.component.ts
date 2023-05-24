import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private router :Router,
    private formBuilder: FormBuilder,
    private loginService : LoginService) { }


  isLoading: boolean = false;
  loginForm!: FormGroup;
  submitted = false;
  logInUser: any;
  loggedInUser: any;
  loggedUserMenuList: any;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }
  Login() {
     if (this.loginForm.invalid) {
      return;
    }
    else{

    //this.loginForm.get('clientIPAddress').setValue(JSON.parse(localStorage.getItem('ClientIP'))["ip"]);

    this.submitted = true;

    this.isLoading = true;
    this.router.navigate(['dashboard']);
    this.loginService.login(this.loginForm.value)
      .subscribe(
        (        data: { Data: { IsSuccess: any; UserId: string; BadLogOnCount: number; }; })=> {
          if (data.Data.IsSuccess) {
            this.isLoading = false;
            //this.commonService.UserId = data.Data.UserId; 
            sessionStorage.setItem("key", data.Data.UserId);
            this.router.navigate(['./plant/plantDashboard']);
          }
          else {
            this.isLoading = false;
            if (data.Data.BadLogOnCount == 2) {
             // this.toasterService.showError("Something is wrong","Login Failed");
              //swal('Failed', "After third failed login attempt, User will be locked by Domain", 'error');
            }
            else {
              //this.toasterService.showError("Something is wrong","Login Failed");
              //swal('Failed', data.Message, 'error');
            }

          }
          this.submitted = false;
        },
        (        error: any) => {
          this.isLoading = false; this.submitted = false;
        });
  }
  }
}
