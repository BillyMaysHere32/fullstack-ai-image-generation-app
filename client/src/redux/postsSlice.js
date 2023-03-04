import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
// 'https://bit-pic.herokuapp.com/api/v1/post'
const POSTS_URL = 'http://localhost:4000/api/v1/post';

const initialState = {
  posts: [],
  status: 'idle', // idle, loading, succeeded, failed
  error: null, 
}

export const fetchPosts = createAsyncThunk('api/v1/post/fetchPosts', async () => {
  try {
    const response = await axios.get(POSTS_URL)
    return response.data.data;
  } catch (err) {
    return console.log('fetch error'), err.message;
  }  
})

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const loadedPosts = action.payload.map(post => {
          post.reactions = {
              thumbsUp: 0,
          }
          return post;
      });

      // Add any fetched posts to the array
      state.posts = state.posts.concat(loadedPosts)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

// export reducer to pass it into store "index.js", 
export default postsSlice.reducer