import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators, ValidatorFn} from '@angular/forms'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  signupForm : FormGroup = new FormGroup({
    email : new FormControl(null,[Validators.required,Validators.email]),
    fname : new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    lname : new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    password : new FormControl(null,[Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
      Validators.minLength(8),Validators.maxLength(15)]),
    verifyPassword : new FormControl(null,[Validators.required]),
    phone : new FormControl(null,[Validators.required,Validators.minLength(11), Validators.maxLength(13)]),
  },
  { validators: this.passwordMatchValidator() })

  showLoader : boolean = false;

  displayLoader(){
    this.showLoader = true;
    setTimeout(() => {
      this.showLoader = false;
    }, 3000);
  }

  passwordMatchValidator(pass = 'password', confirmPass = 'verifyPassword'): ValidatorFn{
    return(FormGroup: AbstractControl): ValidationErrors | null => {
      const password = FormGroup.get(pass)?.value;
      const confirmPassword = FormGroup.get(confirmPass)?.value;
        console.log(password," =?= ",confirmPassword);
      return password === confirmPassword ? null : {passwordNotMatch : true};
    };
  }

  submitSignupForm(form : FormGroup){
    console.log(form.value);
  }

  ngOnInit() {
  }

}
