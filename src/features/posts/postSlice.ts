import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

import baseURL from '../../utils/baseURL';

export interface IPost {
    id: number;
    info: string;
}

export interface IPostState {
    posts: IPost[];
    activePost: IPost;
}

const initialState: IPostState = {
    posts: [],
    activePost: {
        id: 0,
        info: '',
    },
};

//api actions

//fetch all posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await baseURL.get('/posts');
    return response.data;
});

//fetch specific post by id

export const fetchPostById = createAsyncThunk(
    'posts/fetchPostById',
    async (postId: number) => {
        const response = await baseURL.get(`/posts/${postId}`);
        return response.data;
    }
);

//update specific post based on id
export const updatePostById = createAsyncThunk(
    'posts/updatePostById',
    async (updatedPost: IPost) => {
        console.log('payload', updatedPost);
        const response = await baseURL.put(
            `/posts/${updatedPost.id}`,
            updatedPost
        );
        return response.data;
    }
);

//create post
export const createPost = createAsyncThunk(
    'posts/createPost',
    async (postContent) => {
        const response = await baseURL.post('/posts', postContent);
        return response.data;
    }
);

//delete post
export const deletePostById = createAsyncThunk(
    'posts/deletePostById',
    async (postId: number) => {
        const response = await baseURL.delete(`/posts/${postId}`);
        return response.data;
    }
);

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        deletePost:(state,action)=>{
            state.posts=state.posts.filter((post)=>post.id!== action.payload)
        }
    },
    extraReducers: (builder) => {
        //fetching a single post
        builder.addCase(fetchPostById.fulfilled, (state, action) => {
            // single post
            console.log(action.payload);
            state.activePost = action.payload;
        });

        //fetching all posts
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            // Alls posts
            console.log(action.payload);
            state.posts = action.payload;
        });

        //update a post info
        builder.addCase(updatePostById.fulfilled, (state, action) => {
            // the payload is the updated post
            console.log('is the updated post', action.payload);
            const updatedPost = action.payload;
            state.posts = state.posts.filter(
                (post) => post.id !== updatedPost.id
            );
            state.posts = [updatedPost, ...state.posts];
        });

        //create a post info
        builder.addCase(createPost.fulfilled, (state, action) => {
            // the payload is the created post
            console.log('is the create post', action.payload);
            const updatedPost = action.payload;
            state.posts = [...state.posts, updatedPost];
        });

        //delete a post
        builder.addCase(deletePostById.fulfilled, (state, action) => {
            // the payload is the deleted post
            console.log('the deleted post is', action.payload);
            const updatedPost = action.payload;
            const filteredPosts = state.posts.filter(
                (post) => post.id !== updatedPost.id
            );
            console.log(filteredPosts.length);
            state.posts = [...filteredPosts];
            console.log(state.posts.length);
        });
    },
});

//fetch all posts

// Action creators are generated for each case reducer function
export const { deletePost } = postSlice.actions

export default postSlice.reducer;
