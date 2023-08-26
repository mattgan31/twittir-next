import * as ActionType from "../constant/commentConstant";

const INIT_STATE = {
    comment: [],
};

const CommentReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ActionType.CREATE_COMMENT_REQ:
            return { ...state };
        case ActionType.CREATE_COMMENT_OK:
            return CreateCommentSuccessfully(state, action);
        default:
            return { ...state };
    }
};

const CreateCommentSuccessfully = (state: any, action: any) => {
    return {
        ...state,
        posts: [...state.posts, action.payload]
    }
}

export default CommentReducer;
