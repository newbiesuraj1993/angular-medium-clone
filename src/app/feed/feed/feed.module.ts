import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { FeedService } from "../service/feed.service";
import { FeedEffect } from "../types/store/effect";
import { reducers } from "../types/store/reducer";
import { FeedComponent } from "./component/feed.component";

@NgModule({
    imports:[CommonModule,EffectsModule.forFeature([FeedEffect]),StoreModule.forFeature('feed',reducers),RouterModule],
    declarations:[FeedComponent],
    exports:[FeedComponent,RouterModule],
    providers:[FeedService]
})
export class FeedModule {

}