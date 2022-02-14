import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { FeedService } from "../../service/feed.service";
import { GetFeedResponseInterface } from "../getFeedResponse.interface";
import { getFeed, getFeedFailure, getFeedSuccess } from "./action";

@Injectable()
export class FeedEffect{
    constructor(
        private actions$: Actions,
        private feedService: FeedService
      ) {}

      getFeed$ = createEffect(() =>
      this.actions$.pipe(
        ofType(getFeed),
        switchMap(({url}) => {
          return this.feedService.getFeed(url).pipe(
            map((feed: GetFeedResponseInterface) => {
              return getFeedSuccess({feed})
            }),
  
            catchError(() => {
              return of(getFeedFailure())
            })
          )
        })
      )
    )
}


