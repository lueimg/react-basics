import {combineReducers} from 'redux-immutable';
import { fromJS, Map as map  } from 'immutable';

// immutable todo puede ser mapas
const initialState = fromJS({
    posts: {
        page: 1,
        entities: {}
    },
    comments: {},
    users: {}
});

const action = {
    type: "SET_POST",
    payload: {},
}

const postPageReducer = (state= initialState.get('posts').get('page'), action = {}) => {
    switch (action.type) {
        case 'SET_POST':
            return state + 1
            break;
        default:
             return state;
            break;
    }
}

const postEntitiesReducer = (state= initialState.get('posts').get('entities'), action = {}) => {
    switch (action.type) {
        case 'SET_POST':
            return action.payload.reduce((posts, post) => posts.set(post.id, map(post)), state)
            break;
        default:
             return state;
            break;
    }
}

const commentsReducer = (state= initialState.get('comments'), action = {}) => {
    switch (action.type) {
        case 'SET_COMMENTS':
            return action.payload.reduce((comments, comment) => comments.set(comment.id, map(comment)), state)
            return state.concat(action.payload)
            break;
        default:
             return state;
            break;
    }
} 

const usersReducer = (state= initialState.get('users'), action = {}) => {
    switch (action.type) {
        case 'SET_USER':
            return state.set(action.payload.id, map(action.payload));
            break;
        default:
             return state;
            break;
    }
}


const postReducer = combineReducers({
    page: postPageReducer,
    entities: postEntitiesReducer
});

const reducer = combineReducers({
    posts: postReducer,
    comments:commentsReducer,
    users: usersReducer
})


export default reducer;