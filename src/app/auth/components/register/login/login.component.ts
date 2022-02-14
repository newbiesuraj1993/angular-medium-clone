import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { login } from 'src/app/auth/store/actions';
import { isSubmittingSelector, validationErrorSelector } from 'src/app/auth/store/selectors';
import { LoginRequestInterface } from 'src/app/auth/types/loginRequest.interface';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { BackendErrorInterface } from 'src/app/shared/types/backendError.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  isSubmitting$: Observable<boolean>;
  backEndErrors$: Observable<BackendErrorInterface | null>;

  constructor(private fb: FormBuilder,private store: Store<AppStateInterface>){

  }
  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }
  initializeValues(){
    //the selector which was written in the selector file is used here for fetching values from store - here for button
    //value. the button is disabled by looking at this obersvable using async pipe
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backEndErrors$ = this.store.pipe(select(validationErrorSelector));
  }
  initializeForm() {
   
   this.formGroup = this.fb.group({
    
     password:['', Validators.required],
     email:['', Validators.required]
   })
  }

  onSubmit():void{
      
      //the dispatch action here dispatches an action or rather a change in current state..here we are dispacthing
      //form data which was entered by the user
      const request : LoginRequestInterface = {
        user : this.formGroup.value
      }
      this.store.dispatch(login({request}));
      // this.authservice.register(this.formGroup.value).subscribe((currentUser:CurrentUserInterface)=>{
      //   console.log(currentUser)
      // })
  }

}
