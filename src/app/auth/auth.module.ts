import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { AuthService } from './services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { Effect } from './store/effects';
import { BackEndErrorModule } from '../backenderror/backenderror.module';
import { PersistanceService } from '../shared/services/persistance.service';
import { LoginComponent } from './components/register/login/login.component';

const routes: Routes = [
{
  path:'register', component: RegisterComponent,
},
{
  path:'login', component: LoginComponent,
}
];
@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth',reducers),
    EffectsModule.forFeature([Effect]),
    BackEndErrorModule
  ],
  providers:[AuthService,PersistanceService]
})
export class AuthModule { }
