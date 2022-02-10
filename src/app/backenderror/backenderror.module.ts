import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BackEndErrorMessagesComponent } from "./backenderror.component";

@NgModule({
    imports:[CommonModule],
    declarations:[BackEndErrorMessagesComponent],
    exports:[BackEndErrorMessagesComponent]
})
export class BackEndErrorModule{

}