import { Action, createReducer ,on} from "@ngrx/store";
import { AuthStateInterface } from "../types/authState";
import { getCurrentUser, getCurrentUserFailure, getCurrentUserSuccess, login, loginFailure, loginSuccess, register, registerFailure, registerSuccess } from "./actions";

//class here is used to export reducers which are used to change the state of variables in store. 
//whatever is given as props in action resides insisde action and is accessible inside reducer for changing 
//state - for example in success you can see the current user which was given as props for action can be used 
//to reset the state here as on sccess you get the current user in action from effects.
const initialState: AuthStateInterface = {
    isSubmitting: false,
    currentUser: null,
    isLoggedIn: null,
    validationError: null,
    isLoading:false
}

const authReducer = createReducer(
    initialState, 
    on(register,
        (state):AuthStateInterface => ({
            ...state,
            isSubmitting: true,
            validationError: null
        })),
    on(registerSuccess,(state,action):AuthStateInterface => ({
        ...state,
        isSubmitting:false,
        isLoggedIn:true,
        currentUser:action.currentUser
    })),
    on(registerFailure,(state,action):AuthStateInterface => ({
        ...state,
        isSubmitting:false,
        validationError:action.error
    })),
    on(login,(state):AuthStateInterface => ({
        ...state,
        isSubmitting:true,
        validationError:null,
    })),
    on(loginSuccess,(state,action):AuthStateInterface => ({
        ...state,
        isSubmitting:false,
        isLoggedIn:true,
        currentUser:action.currentUser
    })),
    on(loginFailure,(state,action):AuthStateInterface => ({
        ...state,
        isSubmitting:false,
        validationError:action.error
    })),
    on(getCurrentUser,(state):AuthStateInterface => ({
        ...state,
        isLoading:true
    })),
    on(getCurrentUserSuccess,(state,action):AuthStateInterface => ({
        ...state,
        isLoading:false,
        isLoggedIn:true,
        currentUser:action.currentUser
    })),
    on(getCurrentUserFailure,(state):AuthStateInterface => ({
        ...state,
        isLoading:false,
        isLoggedIn:false,
        currentUser:null
    })),
        
)

export function reducers(state:AuthStateInterface, action: Action){
    return authReducer(state, action)
}