import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {map} from 'rxjs/operators'

import {HttpClient} from '@angular/common/http'
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { environment } from "src/environments/environment";
import { AuthResponseInterface } from "../types/authResponse.interface";
import { LoginRequestInterface } from "../types/loginRequest.interface";

@Injectable()
export class AuthService{
    constructor(private http:HttpClient){

    }
    getUser(response:AuthResponseInterface):CurrentUserInterface{
        return response.user;
    }
    register(data:RegisterRequestInterface):Observable<CurrentUserInterface>{
        return this.http.post<AuthResponseInterface>(environment.apiUrl+'/users',data).
        pipe(
            map
            (this.getUser))
    }

    login(data:LoginRequestInterface):Observable<CurrentUserInterface> {
        return this.http.post<AuthResponseInterface> (environment.apiUrl+'/users/login',data).
        pipe(
            map(this.getUser)
        )
    }

    getCurrentUser():Observable<CurrentUserInterface>{
        return this.http.get<AuthResponseInterface> (environment.apiUrl+'/user').
        pipe(
            map(this.getUser)
        )
    }
}