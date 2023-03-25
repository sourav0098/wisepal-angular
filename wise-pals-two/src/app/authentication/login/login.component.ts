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

  loginform = this.builder.group({
    email: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  proceedlogin() {
    if (this.loginform.valid) {
      this.service.loginUser(this.loginform.value.email, this.loginform.value.password).subscribe(item => {
        this.result = item;
        if (this.result.accessToken) {
            sessionStorage.setItem('email',this.result.email);
            sessionStorage.setItem('roles',this.result.roles);
            this.router.navigate(['']);
          } else {
            this.toastr.error('Invalid credentials');
          }
      });
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }
}
