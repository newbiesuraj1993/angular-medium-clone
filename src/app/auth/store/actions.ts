import { createAction, props } from "@ngrx/store";
import { BackendErrorInterface } from "src/app/shared/types/backendError.interface";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { LoginRequestInterface } from "../types/loginRequest.interface";
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

export const login = createAction(
    ActionTypes.LOGIN, props<{request:LoginRequestInterface}>()
)

export const loginSuccess = createAction(
    ActionTypes.LOGIN_SUCCESS, props<{currentUser:CurrentUserInterface}>()
)

export const loginFailure = createAction(
    ActionTypes.LOGIN_FAILURE, props<{error:BackendErrorInterface}>()
)

export const getCurrentUser = createAction(ActionTypes.GET_CURRENT)

export const getCurrentUserSuccess = createAction(
    ActionTypes.GET_CURRENT_SUCCESS,props<{currentUser:CurrentUserInterface}>()
)

export const getCurrentUserFailure= createAction(
    ActionTypes.GET_CURRENT_FAILURE
)