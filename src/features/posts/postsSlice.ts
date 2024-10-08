import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { userLoggedOut } from "../auth/authSlice";
import { createAppAsyncThunk } from "../../app/withTypes";
import { client } from "../../api/client";

interface PostReactions {
  thumbsUp: number
  tada: number
  heart: number
  rocket: number
  eyes: number
}

export interface Post {
  id: string
  title: string
  content: string
  user: string
  date: string
  reactions: PostReactions
}

interface PostsState {
  posts: Post[],
  status: 'idle' | 'pending' | 'completed' | 'rejected'
  error: string | null
}

export type ReactionsName = keyof PostReactions
interface NewPost extends Pick<Post, 'user' | 'title' | 'content'> {}
interface PostUpdate extends Pick<Post, 'id' | 'title' | 'content'> {}
interface PostUpdateReaction extends Pick<Post, 'id'> {
  reaction: ReactionsName
}

export const fetchPosts = createAppAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await client.get<Post[]>('/fakeApi/posts')
    return response.data
  },
  {
    condition: (arg, thunkApi) => {
      const postsStatus = selectPostsStatus(thunkApi.getState())
      if (postsStatus !== 'idle') {
        return false  // Don't execute the fetchPosts function
      }
    }
  }
)

export const addNewPost = createAppAsyncThunk(
  'posts/addNewPost',
  async (initialPost: NewPost) => {
    const response = await client.post<Post>('/fakeApi/posts', initialPost)
    return response.data
  }
)

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    updatePost: (state, action: PayloadAction<PostUpdate>) => {
      const { id, title, content } = action.payload

      const post = state.posts.find(post => post.id === id)

      if (post) {
        post.title = title
        post.content = content
      }
    },
    updateReaction: (state, action: PayloadAction<PostUpdateReaction>) => {
      const { id, reaction } = action.payload

      const post = state.posts.find(post => post.id === id)

      if (post) {
        post.reactions[reaction] += 1
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLoggedOut, () => {
        return initialState
      })
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.error.message ?? 'Unknown Error'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'completed'
        state.posts.push(...action.payload)
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload)
      })
  },
})

export const { updatePost, updateReaction } = postsSlice.actions
export const postsReducer = postsSlice.reducer

export const selectAllPosts = (state: RootState) => state.posts.posts

export const selectPostByID = (state: RootState, postId: string) => 
  state.posts.posts.find(post => post.id === postId
)

export const selectPostsStatus = (state: RootState) => state.posts.status

export const selectPostsError = (state: RootState) => state.posts.error