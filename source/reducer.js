import {combineReducers} from 'redux';

const initialState = {
    posts: {
        page: 1,
        entities: []
    },
    comments: [],
    users: {}
}

const action = {
    type: "SET_POST",
    payload: {},
}

const postPageReducer = (state= initialState.posts.page, action = {}) => {
    switch (action.type) {
        case 'SET_POST':
            return state + 1
            break;
        default:
             return state;
            break;
    }
}

const postEntitiesReducer = (state= initialState.posts.entities, action = {}) => {
    switch (action.type) {
        case 'SET_POST':
            return state.concat(action.payload)
            break;
        default:
             return state;
            break;
    }
}

const commentsReducer = (state= initialState.comments, action = {}) => {
    switch (action.type) {
        case 'SET_COMMENTS':
            return state.concat(action.payload)
            break;
        default:
             return state;
            break;
    }
}

const usersReducer = (state= initialState.users, action = {}) => {
    switch (action.type) {
        case 'SET_USER':
            return Object.assign({}, state, {
                [action.payload.id]: action.payload
            })
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