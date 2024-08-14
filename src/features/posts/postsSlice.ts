import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Post {
  id: string
  title: string
  content: string
} 

const initialState: Post[] = [
  { id: '1', title: 'First post', content: 'Hello guys :)' },
  { id: '2', title: 'Second post', content: 'Here we come' }
]

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.push(action.payload)
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const { id, title, content } = action.payload

      const post = state.find(post => post.id === id)

      if (post) {
        post.title = title
        post.content = content
      }
    }
  }
})

export const { addPost, updatePost } = postsSlice.actions
export const postsReducer = postsSlice.reducer