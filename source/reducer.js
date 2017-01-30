const initialState = {
    posts: {
        page: 1,
        entities: []
    },
    comments: [],
    user: {}
}

const action = {
    type: "SET_POST",
    payload: {},
}


const reducer = (state = initialState , action = {}) => {
    switch (action.type) {
        case 'SET_POST':
            return Object.assign({}, state, {
                posts: Object.assign({}, state.posts, {
                    entities: state.posts.entities.concat(action.payload),
                    page : state.posts.page + 1
                })
            })
            break;
    
        default:
            return state;
            break;
    }
}

export default reducer;