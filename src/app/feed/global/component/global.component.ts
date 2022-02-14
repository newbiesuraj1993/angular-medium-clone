import { Component } from "@angular/core";

@Component({
    selector:'global-feed',
    templateUrl:'./global.component.html',
    styleUrls:['./global.component.scss']
})
export class GlobalFeedComponent {
    apiUrl="/articles"
}