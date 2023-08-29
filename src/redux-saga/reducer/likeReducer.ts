import * as ActionType from "../constant/likeConstant";

const INIT_STATE = {
    posts: [],
};

const LikeReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ActionType.CREATE_LIKE_POST_REQ:
            return { ...state };
        case ActionType.CREATE_LIKE_POST_OK:
            return CreateLikeSuccessfully(state, action);
        case ActionType.CREATE_LIKE_COMMENT_REQ:
            return { ...state };
        case ActionType.CREATE_LIKE_COMMENT_OK:
            return CreateLikeSuccessfully(state, action);
        default:
            return { ...state };
    }
};

const CreateLikeSuccessfully = (state: any, action: any) => {
    return {
        ...state,
        posts: state.posts.map((post: any) => {
            if (post.id === action.payload.postId) {
                // Assuming you have a 'likes' array in your post objects
                return {
                    ...post,
                    likes: [...post.likes, action.payload.userId]
                };
            }
            return post;
        })
    }
}

export default LikeReducer;
