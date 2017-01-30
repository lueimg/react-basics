import api from './api';

const setPost = (post) => {
    return {
        type: 'SET_POST',
        payload: post,
    }
}

const setComments = (comments) => {
    return {
        type: 'SET_COMMENTS',
        payload: comments,
    }
}

const setUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user,
    }
}

const postNextPage = () => {
    return async (dispatch, getState) => {
        const state = getState();
        const currentPage = state.posts.page;
        const posts = await api.posts.getList(currentPage);
        dispatch(setPost(posts));
        return posts;
    }
}

const loadUser = (userId) => {
    return async (dispatch) => {
        const user = await api.users.getSingle(userId);
        dispatch(setUser(user));
        return user;
    }
}


const loadCommentForPost = (postId) => {
    return async (dispatch) => {
        const comments = await api.posts.getComments(postId);
        dispatch(setComments(comments));
        return comments;
    }
}

export default {
    postNextPage,
    loadUser,
    loadCommentForPost,

    setPost,
    setComments,
    setUser,
}