import { call, put } from "redux-saga/effects";
import PostAPI from "../../api/PostAPI";
import {
    GetPostsSuccess,
    GetPostsFailed,
    CreatePostSuccess,
    CreatePostFailed,
    GetPostByIdSuccess,
    GetPostByIdFailed,
    GetPostByUserIdSuccess,
    GetPostByUserIdFailed,
    DeletePostSuccess
} from "../action/postAction";

function* handlePost(): any {
    try {
        const result = yield call(PostAPI.getAllPosts);
        yield put(GetPostsSuccess(result));
    } catch (error) {
        yield put(GetPostsFailed(error));
    }
}

function* createPost(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(PostAPI.createPost, payload);
        yield put(CreatePostSuccess(result));
    } catch (error) {
        yield put(CreatePostFailed(error));
    }
}

function* handlePostById(action: any): any {
    const { payload } = action
    try {
        const result = yield call(PostAPI.showPost, payload);
        yield put(GetPostByIdSuccess(result));
    } catch (error) {
        yield put(GetPostByIdFailed(error));
    }
}

function* handlePostByUserId(action: any): any {
    const { payload } = action
    try {
        const result = yield call(PostAPI.getAllPostsByUserId, payload);
        yield put(GetPostByUserIdSuccess(result));
    } catch (error) {
        yield put(GetPostByUserIdFailed(error));
    }
}

function* deletePost(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(PostAPI.deletePost, payload);
        yield put(DeletePostSuccess(result));
    } catch (error) {
        yield put(CreatePostFailed(error));
    }
}


export {
    handlePost,
    createPost,
    handlePostById,
    handlePostByUserId,
    deletePost
}
