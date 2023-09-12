import { GetPostByUserIdSuccess } from "../action/postAction";
import * as ActionType from "../constant/postConstant";

const INIT_STATE = {
    posts: [],
};

const PostReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ActionType.GET_POST_REQ:
            return { ...state };
        case ActionType.GET_POST_OK:
            return GetPostsSuccessfully(state, action);
        case ActionType.CREATE_POST_REQ:
            return { ...state };
        case ActionType.CREATE_POST_OK:
            return CreatePostSuccessfully(state, action);
        case ActionType.GET_POST_ID_REQ:
            return { ...state };
        case ActionType.GET_POST_ID_OK:
            return GetPostByIdSuccessfully(state, action);
        case ActionType.GET_POST_USER_REQ:
            return { ...state };
        case ActionType.GET_POST_USER_OK:
            return GetPostByUserIdSuccessfully(state, action);
        default:
            return { ...state };
    }
};

const GetPostsSuccessfully = (state: any, action: any) => {
    return {
        ...state,
        posts: action.payload
    }
}

const CreatePostSuccessfully = (state: any, action: any) => {
    return {
        ...state,
        posts: [...state.posts, action.payload]
    }
}

const GetPostByIdSuccessfully = (state: any, action: any) => {
    return {
        ...state,
        selectedPost: action.payload,
    }
}

const GetPostByUserIdSuccessfully = (state: any, action: any) => {
    return {
        ...state,
        userPosts: action.payload,
    }
}

export default PostReducer;
