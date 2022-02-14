import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { currentLoggedInUser, isLoggedin } from "src/app/auth/store/selectors";
import { AppStateInterface } from "../../types/appState.interface";
import { CurrentUserInterface } from "../../types/currentUser.interface";

@Component({
    selector:'app-topbar',
    templateUrl:'./topbar.component.html',
    styleUrls:['./topbar.component.scss']
})
export class TopBarComponent implements OnInit {

    currentUser$: Observable<CurrentUserInterface | null>;
    isLoggedIn$: Observable<boolean>;

    constructor(private store : Store<AppStateInterface>){
        
    }
    ngOnInit(): void {
        this.initializeValues()
    }

    initializeValues() {
        this.isLoggedIn$ = this.store.pipe(select(isLoggedin));
        this.currentUser$ = this.store.pipe(select(currentLoggedInUser));
    
    }

}