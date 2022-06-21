import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login_validation_messages = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' },
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength',message: 'Password must be at least 8 characters long',},
      { type: 'pattern',message: 'password must contain at least one uppercase, lowercase, number and special char',},
    ]
  };

  loginForm!: FormGroup;
  dbEmail: any;
  dbPassword: any;
  isLogginError: boolean = false;
  loginError: any;
  dbCredential: any;
  dbCredentialId:any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private authService:AuthService

  ) {}
  ngOnInit(): void {
    this.isLogginError = false;
    this.loginForm = this.fb.group({
      email: ['',Validators.compose([  Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),]),],
      password: ['',Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$') //this is for the letters (both uppercase and lowercase) and numbers validation
     ])],
    });
  }
  login() {
    if(this.loginForm.valid){
      this.authService.loginUser(this.loginForm.value.email,this.loginForm.value.password);
    }

  }
}