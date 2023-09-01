import { getCookie } from 'cookies-next';
import * as ActionType from '../constant/userConstant';

const getFromStorage = (key: string) => {
    if (!key || typeof window === 'undefined') {
        return ""
    }
    return getCookie(key);
}

const INIT_STATE = {
    userProfile: getFromStorage('profile'),//? JSON.parse(getCookie('profile')) : 'null',
    userSignup: {},
    message: '',
    usersList: []
}

const userReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ActionType.SIGNIN_REQ:
            return state
        case ActionType.SIGNIN_OK:
            return SigninSuccess(state, action)
        case ActionType.SIGNUP_REQ:
            return state
        case ActionType.SIGNUP_OK:
            return SignupSuccess(state, action)
        case ActionType.SIGNOUT_REQ:
            return state
        case ActionType.SIGNOUT_OK:
            return SignoutSuccess(state, action)
        case ActionType.MESSAGE_ERROR:
            return showMessage(state, action)
        case ActionType.GET_USER_REQ:
            return state
        case ActionType.GET_USER_OK:
            return GetUserSuccess(state, action)
        case ActionType.SEARCH_USERS_REQ:
            return state
        case ActionType.SEARCH_USERS_OK:
            return SearchUserSuccess(state, action)
        default:
            return { ...state }
    }
}

const SigninSuccess = (state: any, action: any) => {
    return {
        ...state,
        userProfile: action.payload,
        message: action.payload.message
    }
}

const SignupSuccess = (state: any, action: any) => {
    return {
        ...state,
        userSignup: action.payload
    }
}

const SignoutSuccess = (state: any, action: any) => {
    return {
        ...state,
        userProfile: {},
        message: ''
    }
}

const GetUserSuccess = (state: any, action: any) => {
    return {
        ...state,
        userProfile: {},
    }
}

const SearchUserSuccess = (state: any, action: any) => {
    return {
        ...state,
        usersList: action.payload.data,
    }
}

const showMessage = (state: any, action: any) => {
    return {
        ...state,
        message: action.payload.message
    }
}

export default userReducer;
