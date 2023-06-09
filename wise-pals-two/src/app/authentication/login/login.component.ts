import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService,
    private router: Router) {
      sessionStorage.clear();

  }
  result: any;



  proceedlogin(loginForm:any) {

    let passwordRegex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}');

    let emailRegex = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');

    if (emailRegex.test(loginForm.email) && passwordRegex.test(loginForm.password)) {

      this.service.loginUser(loginForm.email, loginForm.password).subscribe(item => {
        this.result = item;
        if (this.result.accessToken) {
          console.log('Login successful');
          sessionStorage.setItem('accessToken',this.result.accessToken);
            sessionStorage.setItem('email',loginForm.email);
            sessionStorage.setItem('firstName',this.result.name);
            sessionStorage.setItem('lastName',this.result.lastName);
            sessionStorage.setItem('phone',this.result.phone);
            sessionStorage.setItem('id',this.result.id);
            sessionStorage.setItem('roles',this.result.roles);

            this.router.navigate(['']);
          } else {
            console.log('Invalid credentials');
            this.toastr.error('Invalid credentials');
          }
      },
        error => {
          console.log('Invalid credentials');
          this.toastr.error('Invalid credentials');
        }
      );
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }
}
