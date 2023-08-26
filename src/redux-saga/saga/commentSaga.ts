import { call, put } from "redux-saga/effects";
import CommentAPI from "../../api/CommentAPI";
import {
    CreateCommentSuccess,
    CreateCommentFailed,
} from "../action/commentAction";


function* createComment(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(CommentAPI.createComment, payload.id, payload.payload);
        yield put(CreateCommentSuccess(result));
    } catch (error) {
        yield put(CreateCommentFailed(error));
    }
}

export {
    createComment
}
