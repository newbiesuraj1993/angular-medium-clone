import { createAction, props } from "@ngrx/store";
import { BackendErrorInterface } from "src/app/shared/types/backendError.interface";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { ActionTypes } from "./actiontypes";

//class used here is to have diff actions - takes arguments of an enum - actions and their props (the input )
export const register = createAction(
    ActionTypes.REGISTER, props<{request: RegisterRequestInterface}>()
) 

export const registerSuccess = createAction (
    ActionTypes.REGISTER_SUCCESS, props<{currentUser: CurrentUserInterface}>()
)

export const registerFailure = createAction (
    ActionTypes.REGISTER_FAILURE, props<{error:BackendErrorInterface}>()
)