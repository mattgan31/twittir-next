import * as ActionPost from '../constant/commentConstant';

export const CreateCommentRequest = (payload: any) => ({
    type: ActionPost.CREATE_COMMENT_REQ,
    payload
});

export const CreateCommentSuccess = (payload: any) => ({
    type: ActionPost.CREATE_COMMENT_OK,
    payload
});

export const CreateCommentFailed = (payload: any) => ({
    type: ActionPost.CREATE_COMMENT_FAIL,
    payload
});
