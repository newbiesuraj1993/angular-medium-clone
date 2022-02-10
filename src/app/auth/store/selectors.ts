import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/types/appState.interface";
import { AuthStateInterface } from "../types/authState";

//the variable needs to be selected for which state needs to be checked - selector helps component to be aware of
//current state.Appstate interface acts as global reference for all state referneces
export const authFeatureSelector = (state: AppStateInterface): AuthStateInterface => state.auth

export const isSubmittingSelector  = createSelector(authFeatureSelector, 
    (authstate:AuthStateInterface)=>authstate.isSubmitting)

export const validationErrorSelector  = createSelector(authFeatureSelector, 
        (authstate:AuthStateInterface)=>authstate.validationError)