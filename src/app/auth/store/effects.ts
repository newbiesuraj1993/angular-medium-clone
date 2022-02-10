import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { AuthService } from "../services/auth.service";
import { register, registerFailure, registerSuccess } from "./actions";

@Injectable()
export class Effect {
    //this code takes all the actions that are registered in the app and selects the register action by using ofType and 
    //and then uses switch map to get another stream from current input stream - the request data which is on register action
    //then the service is called to fetch data and trigger the next action based on success or failure
    register$ = createEffect(()=>this.actions$.pipe(ofType(register),
    switchMap(({request})=>{
        return this.authService.register(request).pipe(map((currentUser:CurrentUserInterface) =>{
            return registerSuccess({currentUser})
        }),catchError((errorResp: HttpErrorResponse)=>{
            //console.log(errorResp.error)
            return of(registerFailure({error: errorResp.error.errors}))
        }))
    })
    ))
    
    
    constructor(private actions$: Actions,private authService: AuthService){

    }
}