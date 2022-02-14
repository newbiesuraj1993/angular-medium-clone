import { createAction, props } from "@ngrx/store";
import { GetFeedResponseInterface } from "../getFeedResponse.interface";
import { ActionType } from "./actionTypes";

export const getFeed = createAction(ActionType.GET_FEED,props<{url:string}>());

export const getFeedSuccess = createAction(ActionType.GET_FEED_SUCCESS,props<{feed:GetFeedResponseInterface}>())

export const getFeedFailure = createAction(ActionType.GET_FEED_FAILURE) 