
import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/types/appState.interface";
import { FeedStateInterface } from "../FeedStateInterface";


export const feedFeatureSelector = (state: AppStateInterface): FeedStateInterface => state.feed

export const isLoadingSelector  = createSelector(feedFeatureSelector, 
    (feedState:FeedStateInterface)=>feedState.isLoading)

export const dataSelector  = createSelector(feedFeatureSelector, 
        (feedState:FeedStateInterface)=>feedState.data)

export const errorSelector = createSelector(feedFeatureSelector,
        (feedState:FeedStateInterface)=>feedState.error)