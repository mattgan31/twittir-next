import * as ActionPost from '../constant/postConstant';

export const GetPostsRequest = () => ({
    type: ActionPost.GET_POST_REQ,
});

export const GetPostsSuccess = (payload: any) => ({
    type: ActionPost.GET_POST_OK,
    payload
});

export const GetPostsFailed = (payload: any) => ({
    type: ActionPost.GET_POST_FAIL,
    payload
});

export const CreatePostRequest = (payload: any) => ({
    type: ActionPost.CREATE_POST_REQ,
    payload
});

export const CreatePostSuccess = (payload: any) => ({
    type: ActionPost.CREATE_POST_OK,
    payload
});

export const CreatePostFailed = (payload: any) => ({
    type: ActionPost.CREATE_POST_FAIL,
    payload
});

export const GetPostByIdRequest = (payload: any) => ({
    type: ActionPost.GET_POST_ID_REQ,
    payload
});

export const GetPostByIdSuccess = (payload: any) => ({
    type: ActionPost.GET_POST_ID_OK,
    payload
});

export const GetPostByIdFailed = (payload: any) => ({
    type: ActionPost.GET_POST_ID_FAIL,
    payload
});

export const GetPostByUserIdRequest = (payload: any) => ({
    type: ActionPost.GET_POST_USER_REQ,
    payload
});

export const GetPostByUserIdSuccess = (payload: any) => ({
    type: ActionPost.GET_POST_USER_OK,
    payload
});

export const GetPostByUserIdFailed = (payload: any) => ({
    type: ActionPost.GET_POST_USER_FAIL,
    payload
});
