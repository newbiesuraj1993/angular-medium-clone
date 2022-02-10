import { Component, Input, OnInit } from "@angular/core";
import { BackendErrorInterface } from "../shared/types/backendError.interface";

@Component({
    selector:'backend-error',
    templateUrl:'./backenderror.component.html',
    styleUrls:['./backenderror.component.scss']
})
export class BackEndErrorMessagesComponent implements OnInit{
 
    @Input() backEndErrors : BackendErrorInterface | null;

    errorMessages: string[];

    ngOnInit(): void {
        console.log(this.backEndErrors)
       this.errorMessages = Object.keys(this.backEndErrors).map((name:string)=>{
            const messages = this.backEndErrors[name].join(' ')
            return `${name} ${messages}`
       })
    }   


}