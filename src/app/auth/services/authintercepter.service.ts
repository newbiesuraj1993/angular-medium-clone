import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PersistanceService } from "src/app/shared/services/persistance.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{


    constructor(private persService:PersistanceService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders:{
                Authorization:this.persService.get('accessToken') ? `Token ${this.persService.get('accessToken')}`:''
            }
        })
        return next.handle(req)
    }
    

}