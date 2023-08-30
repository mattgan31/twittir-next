import { takeEvery, all } from "redux-saga/effects";
import * as ActionUser from '../constant/userConstant';
import * as ActionPost from '../constant/postConstant';
import * as ActionComment from '../constant/commentConstant';
import * as ActionLike from '../constant/likeConstant'
import { handleSearchUsers, handleSignin, handleSignout, handleSignup } from "./userSaga";
import { handlePost, createPost, handlePostById, handlePostByUserId } from './postSaga';
import { createComment } from "./commentSaga";
import { createLikeComment, createLikePost } from "./likeSaga";

function* watchAll() {
    yield all([
        takeEvery(ActionUser.SIGNIN_REQ, handleSignin),
        takeEvery(ActionUser.SIGNUP_REQ, handleSignup),
        takeEvery(ActionUser.SIGNOUT_REQ, handleSignout),
        takeEvery(ActionUser.SEARCH_USERS_REQ, handleSearchUsers),
        takeEvery(ActionPost.GET_POST_REQ, handlePost),
        takeEvery(ActionPost.CREATE_POST_REQ, createPost),
        takeEvery(ActionPost.GET_POST_ID_REQ, handlePostById),
        takeEvery(ActionComment.CREATE_COMMENT_REQ, createComment),
        takeEvery(ActionPost.GET_POST_USER_REQ, handlePostByUserId),
        takeEvery(ActionLike.CREATE_LIKE_POST_REQ, createLikePost),
        takeEvery(ActionLike.CREATE_LIKE_COMMENT_REQ, createLikeComment)
    ])
}

export default watchAll
