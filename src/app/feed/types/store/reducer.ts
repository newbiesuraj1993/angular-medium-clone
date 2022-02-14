import { Action, createReducer, on } from "@ngrx/store";
import { FeedStateInterface } from "../FeedStateInterface";
import { getFeed, getFeedFailure, getFeedSuccess } from "./action";

const initialState: FeedStateInterface = {
    data: null,
    isLoading: false,
    error: null
}

const feedReducer = createReducer(initialState,
    on(getFeed,(state):FeedStateInterface=>({
    ...state,
    isLoading:true
})),
on(getFeedSuccess,(state,action):FeedStateInterface=>({
    ...state,
    isLoading:false,
    data:action.feed
})),
on(getFeedFailure,(state):FeedStateInterface=>({
    ...state,
    isLoading:false
}))
)

export function reducers(state:FeedStateInterface, action:Action){
        return feedReducer(state, action)
}