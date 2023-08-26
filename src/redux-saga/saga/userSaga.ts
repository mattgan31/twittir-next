import { call, put } from 'redux-saga/effects';
import UserAPI from '../../api/UserAPI';
import { doMessageError, doSigninSuccess, doSignoutSuccess, doSignupSuccess } from '../action/userAction';

function* handleSignup(action: any): any {
    const { payload } = action;
    if (payload.username === "") {
        yield put(doMessageError({ message: "Register Failed" }));
    }
    try {
        const result = yield call(UserAPI.register, payload);
        yield put(doSignupSuccess(result.data));
    } catch (error) {
        yield put(doMessageError({ message: "Register Failed" }));
    }
}

function* handleSignin(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(UserAPI.signin, payload)
        if (Object.keys(result.data).length === 0) {
            yield put(doMessageError({ message: 'Invalid User or Password, try again' }));
        } else {
            sessionStorage.setItem('token', result.data.token)
            if (action.callback) {
                action.callback();
            }
            const profile = yield call(UserAPI.profile)
            sessionStorage.setItem('profile', JSON.stringify(profile.data))
            yield put(doSigninSuccess({ payload: profile.data }))
        }
    } catch (error) {
        yield put(doMessageError({ message: 'Invalid User or Password, try again' }))
    }
}

function* handleSignout() {
    try {
        sessionStorage.clear();
        yield put(doSignoutSuccess({ message: 'User signed out' }))
    } catch (error) {
        yield put(doMessageError(error))
    }
}

export {
    handleSignin,
    handleSignout,
    handleSignup
}
