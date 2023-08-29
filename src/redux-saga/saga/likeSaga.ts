import { call, put } from "redux-saga/effects";
import LikeAPI from "../../api/LikeAPI";
import {
    CreateLikePostSuccess,
    CreateLikePostFailed,
    CreateLikeCommentSuccess,
    CreateLikeCommentFailed,
} from "../action/likeAction";


function* createLikePost(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(LikeAPI.createLikePost, payload.id);
        yield put(CreateLikePostSuccess(result));
    } catch (error) {
        yield put(CreateLikePostFailed(error));
    }
}

function* createLikeComment(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(LikeAPI.createLikeComment, payload.id);
        yield put(CreateLikeCommentSuccess(result));
    } catch (error) {
        yield put(CreateLikeCommentFailed(error));
    }
}

export {
    createLikePost,
    createLikeComment
}
