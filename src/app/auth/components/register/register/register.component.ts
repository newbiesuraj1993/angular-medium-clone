import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { register } from 'src/app/auth/store/actions';
import { isSubmittingSelector, validationErrorSelector } from 'src/app/auth/store/selectors';
import { RegisterRequestInterface } from 'src/app/auth/types/registerRequest.interface';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { BackendErrorInterface } from 'src/app/shared/types/backendError.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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
   console.log("form intialized")
   this.formGroup = this.fb.group({
     username:['', Validators.required],
     password:['', Validators.required],
     email:['', Validators.required]
   })
  }

  onSubmit():void{
      console.log(this.formGroup.value['username'],this.formGroup.valid);
      //the dispatch action here dispatches an action or rather a change in current state..here we are dispacthing
      //form data which was entered by the user
      const request : RegisterRequestInterface = {
        user : this.formGroup.value
      }
      this.store.dispatch(register({request}));
      // this.authservice.register(this.formGroup.value).subscribe((currentUser:CurrentUserInterface)=>{
      //   console.log(currentUser)
      // })
  }

}
