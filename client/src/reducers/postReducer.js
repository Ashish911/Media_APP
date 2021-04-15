import {
  POST_LOADING,
  GET_POST,
  GET_POSTS,
  ADD_POST,
  DELETE_POST
} from '../actions/types';

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
    default:
      return state;
  }
};
