import { takeEvery, all } from "redux-saga/effects";
import * as ActionUser from '../constant/userConstant';
import * as ActionPost from '../constant/postConstant';
import * as ActionComment from '../constant/commentConstant';
import { handleSignin, handleSignout, handleSignup } from "./userSaga";
import { handlePost, createPost, handlePostById, handlePostByUserId } from './postSaga';
import { createComment } from "./commentSaga";

function* watchAll() {
    yield all([
        takeEvery(ActionUser.SIGNIN_REQ, handleSignin),
        takeEvery(ActionUser.SIGNUP_REQ, handleSignup),
        takeEvery(ActionUser.SIGNOUT_REQ, handleSignout),
        takeEvery(ActionPost.GET_POST_REQ, handlePost),
        takeEvery(ActionPost.CREATE_POST_REQ, createPost),
        takeEvery(ActionPost.GET_POST_ID_REQ, handlePostById),
        takeEvery(ActionComment.CREATE_COMMENT_REQ, createComment),
        takeEvery(ActionPost.GET_POST_USER_REQ, handlePostByUserId)
    ])
}

export default watchAll
