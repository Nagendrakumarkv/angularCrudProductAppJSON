import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApliService } from '../services/apli.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  register_validation_messages = {
    'firstName': [
      { type: 'required', message: 'first name is required' },
      { type: 'minlength', message: 'firstname must be at least 5 characters long' },
      { type: 'maxlength', message: 'first name cannot be more than 25 characters long' },
    ],
    'lastName': [
      { type: 'required', message: 'last name is required' },
      { type: 'minlength', message: 'last name must be at least 5 characters long' },
      { type: 'maxlength', message: 'last name cannot be more than 25 characters long' },
    ],
    'date': [
      { type: 'required', message: 'Date is required' },
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 8 characters long' },
      { type: 'pattern', message: 'password must contain at least one uppercase, lowercase, number and special char' }
    ],
    'confirmPassword': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'minlength', message: 'Password must be at least 8 characters long' },
      { type: 'areEqual', message: 'Password mismatch' }
    ]
    }

  genderList = ['Male', 'Female', 'both'];
  registerForm!: FormGroup;
  registerdUsers:any;
  alreadyRegisterUsernameError:any;
  isAlreadyRegisteredUsername:boolean=false;;

  constructor(
    private fb: FormBuilder,
    private service: ApliService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.compose([Validators.required,Validators.maxLength(25)])],
      lastName: ['', Validators.compose([Validators.required,Validators.maxLength(25)])],
      date: ['', Validators.required],
      email: ['', Validators.compose([Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])],
      password:['', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$') //this is for the letters (both uppercase and lowercase) and numbers validation
     ])],
     confirmPassword:['',Validators.compose([Validators.required,Validators.minLength(8)])]
    });
  }
   // convenience getter for easy access to form fields
   get f() {
    return this.registerForm.controls;
  }

  register() {
    this.isAlreadyRegisteredUsername=false;
    this.checkUsername();
    if(!this.isAlreadyRegisteredUsername){
    this.service.postRegister(this.registerForm.value).subscribe({
      next: (res) => {
          alert('successfully registered');
          this.registerForm.reset();
          this.router.navigate(['login']);
      },
      error: () => {
        alert('error while register');
      },
    });
  }
}
  checkUsername(){
    this.service.getRegister().subscribe({
      next:(res)=>{
       this.registerdUsers=res;
      },
      error:()=>{
        alert("error while fetching registered data")
      }
    })

    for(let i=0;i<this.registerdUsers.length;i++){
      if(this.registerForm.value.email===this.registerdUsers[i].email){
        this.isAlreadyRegisteredUsername=true;
        this.alreadyRegisterUsernameError="User name is already exits"
      }
    }
  }
}
