import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { AuthService } from '../services/auth.service';
import {
  getCurrentUser,
  getCurrentUserFailure,
  getCurrentUserSuccess,
  login,
  loginFailure,
  loginSuccess,
  register,
  registerFailure,
  registerSuccess,
} from './actions';

@Injectable()
export class Effect {
  //this code takes all the actions that are registered in the app and selects the register action by using ofType and
  //and then uses switch map to get another stream from current input stream - the request data which is on register action
  //then the service is called to fetch data and trigger the next action based on success or failure
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      switchMap(({ request }) => {
        return this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set('accessToken', currentUser.token);
            return registerSuccess({ currentUser });
          }),
          catchError((errorResp: HttpErrorResponse) => {
            //console.log(errorResp.error)
            return of(registerFailure({ error: errorResp.error.errors }));
          })
        );
      })
    )
  );
  //after successful register - trigger to navigate
  redirectAfterSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccess),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ request }) => {
        return this.authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set('accessToken', currentUser.token);
            return loginSuccess({ currentUser });
          }),
          catchError((errorResp: HttpErrorResponse) => {
            //console.log(errorResp.error)
            return of(loginFailure({ error: errorResp.error.errors }));
          })
        );
      })
    )
  );

  redirectAfterLoginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUser),
      switchMap(() => {
        const token = this.persistanceService.get('accessToken')
        if(!token){
            return of(getCurrentUserFailure())
        }
        return this.authService.getCurrentUser().pipe(
       
          map((currentUser: CurrentUserInterface) => {
            return getCurrentUserSuccess({ currentUser });
          }),
          catchError(() => {
            //console.log(errorResp.error)
            return of(getCurrentUserFailure());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router
  ) {}
}
