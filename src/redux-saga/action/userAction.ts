import * as ActionUser from '../constant/userConstant';

export const doSignupRequest = (payload: any) => ({
    type: ActionUser.SIGNUP_REQ,
    payload
});

export const doSignupSuccess = (payload: any) => ({
    type: ActionUser.SIGNUP_OK,
    payload
});

export const doSigninRequest = (payload: any, callback: any) => ({
    type: ActionUser.SIGNIN_REQ,
    payload,
    callback
});

export const doSigninSuccess = (payload: any) => ({
    type: ActionUser.SIGNIN_OK,
    payload
});

export const doSignoutRequest = (payload: any) => ({
    type: ActionUser.SIGNOUT_REQ,
    payload
});

export const doSignoutSuccess = (payload: any) => ({
    type: ActionUser.SIGNOUT_OK,
    payload
});

export const getUserReq = (payload: any) => ({
    type: ActionUser.GET_USER_REQ,
    payload
});

export const getUserOk = (payload: any) => ({
    type: ActionUser.GET_USER_OK,
    payload
});

export const getUserFail = (payload: any) => ({
    type: ActionUser.GET_USER_FAIL,
    payload
});

export const doMessageError = (payload: any) => ({
    type: ActionUser.MESSAGE_ERROR,
    payload
});
