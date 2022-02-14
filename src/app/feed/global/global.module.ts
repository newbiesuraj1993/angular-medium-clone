import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FeedModule } from "../feed/feed.module";
import { GlobalFeedComponent } from "./component/global.component";


const routes = [
    {
        path:"",component: GlobalFeedComponent
    }
]

@NgModule({
    imports:[CommonModule,RouterModule.forChild(routes),FeedModule],
    declarations:[GlobalFeedComponent]
})
export class GlobalFeedsModule {

}