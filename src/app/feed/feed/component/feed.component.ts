import { Component, Input, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppStateInterface } from "src/app/shared/types/appState.interface";
import { GetFeedResponseInterface } from "../../types/getFeedResponse.interface";
import { getFeed } from "../../types/store/action";
import { dataSelector, isLoadingSelector } from "../../types/store/selector";

@Component({
    selector:'local-feed',
    templateUrl:'./feed.component.html',
    styleUrls:['./feed.component.scss']
})
export class FeedComponent implements OnInit {

    @Input() apiUrl: string;

    data$:Observable<GetFeedResponseInterface | null>
    isLoading$:Observable<boolean>
    error$:Observable<string|null>

    constructor(private store: Store<AppStateInterface>){
        
    }

     ngOnInit(): void {
         this.initializeValues()
         this.fetchData()
     }

     initializeValues(){
        this.data$=this.store.pipe(select(dataSelector));
        this.isLoading$=this.store.pipe(select(isLoadingSelector));
     }
    fetchData(){
        this.store.dispatch(getFeed({url:this.apiUrl}))
    }
}