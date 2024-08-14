import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Post {
  id: string
  title: string
  content: string
  createdBy: string
}

interface PostUpdate extends Omit<Post, 'createdBy'> {}

const initialState: Post[] = [
  { id: '1', title: 'First post', content: 'Hello guys :)', createdBy: '0' },
  { id: '2', title: 'Second post', content: 'Here we come', createdBy: '1' }
]

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload)
      },
      prepare(title: string, content: string, createdBy: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            createdBy
          }
        }
      }
    },
    updatePost: (state, action: PayloadAction<PostUpdate>) => {
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

export const selectAllPosts = (state: RootState) => state.posts

export const selectPostByID = (state: RootState, postId: string) => 
  state.posts.find(post => post.id === postId
)