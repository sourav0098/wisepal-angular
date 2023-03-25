import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private builder: FormBuilder, private service: AuthService, private router: Router,
    private toastr: ToastrService) {

  }

  registerform = this.builder.group({
    name: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])),
    lastName: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])),
    phone: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('[0-9]{10}')])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    role: this.builder.control(''),
    isactive: this.builder.control(false)
  });
  proceedregister() {
    if (this.registerform.valid) {
      console.log('form is valid');
      this.service.RegisterUser(this.registerform.value).subscribe(result => {
        this.toastr.success('Please login to the application.','Registered successfully')
        //this.router.navigate(['login'])
      },
        error => {
          this.toastr.error('Email already exists.')
        }
      
      );
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }

}