import * as ActionLike from '../constant/likeConstant';

export const CreateLikePostRequest = (payload: any) => ({
    type: ActionLike.CREATE_LIKE_POST_REQ,
    payload
});

export const CreateLikePostSuccess = (payload: any) => ({
    type: ActionLike.CREATE_LIKE_POST_OK,
    payload
});

export const CreateLikePostFailed = (payload: any) => ({
    type: ActionLike.CREATE_LIKE_POST_FAIL,
    payload
});

export const CreateLikeCommentRequest = (payload: any) => ({
    type: ActionLike.CREATE_LIKE_COMMENT_REQ,
    payload
});

export const CreateLikeCommentSuccess = (payload: any) => ({
    type: ActionLike.CREATE_LIKE_COMMENT_OK,
    payload
});

export const CreateLikeCommentFailed = (payload: any) => ({
    type: ActionLike.CREATE_LIKE_COMMENT_FAIL,
    payload
});
