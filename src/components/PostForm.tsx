import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { selectCurrentUserID } from "../features/auth/authSlice"
import { addNewPost } from "../features/posts/postsSlice"

interface PostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
}

interface PostFormElements extends HTMLFormElement {
  elements: PostFormFields
}

export function PostForm() {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(selectCurrentUserID)
  const [addNewPostStatus, setAddNewPostStatus] = useState<'idle' | 'pending'>('idle')

  async function handleCreatePost(e: React.FormEvent<PostFormElements>) {
    e.preventDefault()

    const form = e.currentTarget
    const title = form.elements.postTitle.value
    const content = form.elements.postContent.value

    if (userId) {
      try {
        setAddNewPostStatus('pending')
        await dispatch(addNewPost({ title, content, user: userId })).unwrap()
        form.reset()
      } catch (error) {
        console.error('Failed to save the post: ', error)
      } finally {
        setAddNewPostStatus('idle')
      }
    }
  }

  return (
    <section>
      <h2>Add new post</h2>

      <form onSubmit={handleCreatePost}>
        <label>
          Post title
          <input type="text" name="postTitle" required />
        </label>

        <label>
          Post content
          <textarea name="postContent" required />
        </label>

        <button type="submit" disabled={addNewPostStatus === 'pending'}>Create post</button>
      </form>
    </section>
  )
}