import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { sub } from "date-fns";

interface Post {
  id: string
  title: string
  content: string
  createdBy: string
  createdAt: string
}

interface PostUpdate extends Omit<Post, 'createdBy'> {}

const initialState: Post[] = [
  { id: '1', title: 'First post', content: 'Hello guys :)', createdBy: '0', createdAt: sub(new Date(), { minutes: 10 }).toISOString() },
  { id: '2', title: 'Second post', content: 'Here we come', createdBy: '1', createdAt: sub(new Date(), { minutes: 5 }).toISOString() }
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
            createdBy,
            createdAt: new Date().toISOString()
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