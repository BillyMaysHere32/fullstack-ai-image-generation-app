import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
// 'https://bit-pic.herokuapp.com/post'
const POSTS_URL = 'http://localhost:4000/post';

const initialState = {
  posts: [],
  status: 'idle', // idle, loading, succeeded, failed
  error: null, 
}

export const fetchPosts = createAsyncThunk('/post/fetchPosts', async () => {
  try {
    const response = await axios.get(POSTS_URL)
    return response.data.data;
  } catch (err) {
    return console.log('fetch error'), err.message;
  }  
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
  console.log('initialPost', initialPost)
  const response = await axios.post(POSTS_URL, initialPost)
  return response.data.data
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
      .addCase(addNewPost.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        // const sortedPosts = state.posts.sort((a, b) => {
        //     if (a.id > b.id) return 1
        //     if (a.id < b.id) return -1
        //     return 0
        // })
        // action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
        // action.payload.userId = Number(action.payload.userId)
        // action.payload.date = new Date().toISOString();
        // action.payload.reactions = {
        //     thumbsUp: 0,
        // }
        state.posts.push(action.payload)
        state.status = 'succeeded'
    })
  },
})

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

// export reducer to pass it into store "index.js", 
export default postsSlice.reducer