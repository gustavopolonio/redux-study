import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { sub } from "date-fns";

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
  createdBy: string
  createdAt: string
  reactions: PostReactions
}

export type ReactionsName = keyof PostReactions
interface PostUpdate extends Pick<Post, 'id' | 'title' | 'content'> {}
interface PostUpdateReaction extends Pick<Post, 'id'> {
  reaction: ReactionsName
}

const initialReactions = {
  thumbsUp: 0,
  tada: 0,
  heart: 0,
  rocket: 0,
  eyes: 0
}

const initialState: Post[] = [
  { id: '1', title: 'First post', content: 'Hello guys :)', createdBy: '0', createdAt: sub(new Date(), { minutes: 10 }).toISOString(), reactions: initialReactions },
  { id: '2', title: 'Second post', content: 'Here we come', createdBy: '1', createdAt: sub(new Date(), { minutes: 5 }).toISOString(), reactions: initialReactions }
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
            reactions: initialReactions,
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
    },
    updateReaction: (state, action: PayloadAction<PostUpdateReaction>) => {
      const { id, reaction } = action.payload

      const post = state.find(post => post.id === id)

      if (post) {
        post.reactions[reaction] += 1
      }
    }
  }
})

export const { addPost, updatePost, updateReaction } = postsSlice.actions
export const postsReducer = postsSlice.reducer

export const selectAllPosts = (state: RootState) => state.posts

export const selectPostByID = (state: RootState, postId: string) => 
  state.posts.find(post => post.id === postId
)