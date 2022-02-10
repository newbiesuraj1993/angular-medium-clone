import { Action, createReducer ,on} from "@ngrx/store";
import { AuthStateInterface } from "../types/authState";
import { register, registerFailure, registerSuccess } from "./actions";

//class here is used to export reducers which are used to change the state of variables in store. 
const initialState: AuthStateInterface = {
    isSubmitting: false,
    currentUser: null,
    isLoggedIn: null,
    validationError: null
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
    }))
        
)

export function reducers(state:AuthStateInterface, action: Action){
    return authReducer(state, action)
}