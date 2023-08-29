import { combineReducers } from 'redux'
import userReducer from './userReducer'
import postReducer from './postReducer'
import likeReducer from './likeReducer'

const rootReducer = combineReducers({
    userState: userReducer,
    postState: postReducer,
    likeState: likeReducer
})

export default rootReducer
